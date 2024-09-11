use crate::api::{self, Document, ResourceObject};
use std::sync::Arc;

use axum::extract::State;
use axum::{Json, Router};
use axum_keycloak_auth::instance::KeycloakAuthInstance;
use axum_keycloak_auth::layer::KeycloakAuthLayer;
use axum_keycloak_auth::PassthroughMode;
use http::StatusCode;
use jsonwebtoken::jwk::{AlgorithmParameters, JwkSet};
use jsonwebtoken::{Algorithm, DecodingKey};
use redis::{AsyncCommands};
use serde::{Deserialize, Serialize};
use thiserror::Error;
use typed_builder::TypedBuilder;

/// The state required to authenticate against a Keycloak server.
#[derive(TypedBuilder)]
pub struct KeycloakState {
	/// The URL of the Keycloak server.
	keycloak_url: String,

	/// The realm of the Keycloak server.
	keycloak_realm: String,

	/// The client ID of the Keycloak client.
	keycloak_client_id: String,

	/// The client secret of the Keycloak client.
	keycloak_client_secret: String,

	/// A handle to the Redis client for managing the token cache.
	redis_client: redis::Client,
}

/// The request data for the token endpoint.
#[derive(Deserialize)]
pub struct TokenRequestAttributes {
	username: String,
	password: String,
}

/// The response data for the token endpoint.
#[derive(Serialize)]
pub struct TokenResponseAttributes {
	jwt: String,
}

/// The response data from the Keycloak token endpoint (success).
#[derive(Deserialize)]
struct KeycloakTokenResponse {
	/// The access token.
	access_token: String,

	/// The refresh token.
	refresh_token: String,
}

/// The response data from the Keycloak token endpoint (error).
#[derive(Deserialize)]
struct KeycloakErrorResponse {
	error_description: String,
}

/// The claims in a JSON Web Token (JWT).
#[derive(Debug, Serialize, Deserialize)]
struct TokenClaims {
	/// The expiration time of the token.
	exp: u64,
}

/// The errors that can occur during authentication operations.
#[derive(Error, Debug)]
enum AuthError {
	#[error("The request body is invalid.")]
	MalformedRequestBody,

	#[error("Failed to parse response from Keycloak server.")]
	KeycloakResponseParseFailure,

	#[error("Failed to send request to Keycloak server.")]
	KeycloakRequestFailure,

	#[error("Received an error response from Keycloak server (reason: {message}).")]
	KeycloakRequestError { message: String },

	#[error("Failed to parse access token.")]
	AccessTokenParseFailure,

	#[error("Failed to parse refresh token.")]
	RefreshTokenParseFailure,

	#[error("Failed to connect to Redis cache.")]
	RedisConnectionFailure,

	#[error("Failed to track token in Redis cache.")]
	RedisCacheAddFailure,

	#[error("Failed to check token in Redis cache.")]
	RedisCacheCheckFailure,
}

/// Handles an authentication error by returning an appropriate HTTP response.
///
/// The error is converted to a JSON:API error document and the appropriate HTTP
/// status code is returned. The response is returned as a tuple containing the
/// status code and the JSON:API error document.
fn handle_auth_error(error: AuthError) -> (StatusCode, Json<Document<TokenResponseAttributes>>) {
	let (title, detail, status) = match error {
		AuthError::MalformedRequestBody => (
			"MalformedRequestBody",
			error.to_string(),
			StatusCode::BAD_REQUEST,
		),

		AuthError::KeycloakResponseParseFailure => (
			"KeycloakResponseParseFailure",
			error.to_string(),
			StatusCode::INTERNAL_SERVER_ERROR,
		),

		AuthError::KeycloakRequestFailure => (
			"KeycloakRequestFailure",
			error.to_string(),
			StatusCode::INTERNAL_SERVER_ERROR,
		),

		AuthError::KeycloakRequestError { .. } => (
			"KeycloakRequestError",
			error.to_string(),
			StatusCode::UNAUTHORIZED,
		),

		AuthError::AccessTokenParseFailure => (
			"AccessTokenParseFailure",
			error.to_string(),
			StatusCode::INTERNAL_SERVER_ERROR,
		),

		AuthError::RefreshTokenParseFailure => (
			"RefreshTokenParseFailure",
			error.to_string(),
			StatusCode::INTERNAL_SERVER_ERROR,
		),

		AuthError::RedisConnectionFailure => (
			"RedisConnectionFailure",
			error.to_string(),
			StatusCode::INTERNAL_SERVER_ERROR,
		),

		AuthError::RedisCacheAddFailure => (
			"RedisCacheAddFailure",
			error.to_string(),
			StatusCode::INTERNAL_SERVER_ERROR,
		),

		AuthError::RedisCacheCheckFailure => (
			"RedisCacheCheckFailure",
			error.to_string(),
			StatusCode::INTERNAL_SERVER_ERROR,
		),
	};

	let error = api::Error::builder()
		.title(title.to_string())
		.detail(detail)
		.status(status.to_string())
		.build();

	(
		status,
		Json(Document::Error {
			errors: vec![error],
		}),
	)
}

/// Sends a request to the Keycloak server to generate a JWT for authenticating
/// and authorizing the user in subsequent requests made to protected endpoints.
async fn generate_auth_token(
	state: &KeycloakState,
	payload: &Document<TokenRequestAttributes>,
) -> Result<KeycloakTokenResponse, AuthError> {
	let token_url = format!(
		"{}/realms/{}/protocol/openid-connect/token",
		state.keycloak_url, state.keycloak_realm
	);

	let attributes = match payload {
		Document::Single {
			data: Some(ResourceObject {
				r#type, attributes, ..
			}),
		} if r#type == "navigator" => attributes,
		_ => return Err(AuthError::MalformedRequestBody),
	};

	let auth_request = vec![
		("grant_type", "password"),
		("client_id", &state.keycloak_client_id),
		("client_secret", &state.keycloak_client_secret),
		("username", &attributes.username),
		("password", &attributes.password),
	];

	let response = reqwest::Client::new()
		.post(&token_url)
		.form(&auth_request)
		.send()
		.await;

	let response = match response {
		Ok(response) => response,
		Err(_) => return Err(AuthError::KeycloakRequestFailure),
	};

	if response.status().is_success() {
		return response
			.json::<KeycloakTokenResponse>()
			.await
			.map_err(|_| AuthError::KeycloakResponseParseFailure);
	} else {
		let error_response = response
			.json::<KeycloakErrorResponse>()
			.await
			.map_err(|_| AuthError::KeycloakResponseParseFailure)?;

		Err(AuthError::KeycloakRequestError {
			message: error_response.error_description,
		})
	}
}

/// Fetches the decoding keys from the Keycloak server.
///
/// The keys are fetched from the JWKS endpoint of the Keycloak server, and then
/// used to create `DecodingKey`s for decoding access tokens issued by the server.
async fn fetch_decoding_keys(
	state: &KeycloakState,
) -> Result<Vec<jsonwebtoken::DecodingKey>, AuthError> {
	let client = reqwest::Client::new();

	let keycloak_jwks_url = format!(
		"{}/realms/{}/protocol/openid-connect/certs",
		state.keycloak_url, state.keycloak_realm
	);

	let response = client
		.get(keycloak_jwks_url)
		.send()
		.await
		.map_err(|_| AuthError::KeycloakRequestFailure)?;

	if !response.status().is_success() {
		return Err(AuthError::KeycloakRequestFailure);
	}

	let jwks: JwkSet = response
		.json()
		.await
		.map_err(|_| AuthError::KeycloakResponseParseFailure)?;

	let decoding_keys: Vec<DecodingKey> = jwks
		.keys
		.into_iter()
		.filter_map(|jwk| match &jwk.algorithm {
			AlgorithmParameters::RSA(rsa) => DecodingKey::from_rsa_components(&rsa.n, &rsa.e).ok(),
			_ => None,
		})
		.collect();

	if decoding_keys.is_empty() {
		Err(AuthError::KeycloakResponseParseFailure)
	} else {
		Ok(decoding_keys)
	}
}

/// Stores the access and refresh tokens in Redis.
///
/// The tokens are stored in Redis under the user's username. This makes it easy
/// to retrieve the tokens when the user wants to refresh their access token or
/// when the tokens needs to be invalidated.
async fn store_tokens_in_redis(
	state: &KeycloakState,
	username: &str,
	access_token: &str,
	refresh_token: &str,
) -> Result<(), AuthError> {
	let mut connection = state
		.redis_client
		.get_multiplexed_tokio_connection()
		.await
		.map_err(|_| AuthError::RedisConnectionFailure)?;

	let decoding_keys = fetch_decoding_keys(&state)
		.await
		.map_err(|_| AuthError::KeycloakRequestFailure)?;

	// RS256 is an asymmetric algorithm, which uses the JWKS endpoint to decode the JWT.
	let decode_access_token = |token: &str| -> Result<TokenClaims, AuthError> {
		let mut validation = jsonwebtoken::Validation::new(Algorithm::RS256);
		validation.validate_aud = false;

		for key in &decoding_keys {
			if let Ok(token_data) = jsonwebtoken::decode::<TokenClaims>(token, key, &validation) {
				return Ok(token_data.claims);
			}
		}

		Err(AuthError::AccessTokenParseFailure)
	};

	// HS512 is a symmetric algorithm.
	let decode_refresh_token = |token: &str| -> Result<TokenClaims, AuthError> {
		let mut validation = jsonwebtoken::Validation::new(Algorithm::HS512);
		validation.validate_aud = false;

		// The refresh token is just an opaque string for the application, so its
		// signature does not need to be validated.
		validation.insecure_disable_signature_validation();

		jsonwebtoken::decode::<TokenClaims>(token, &DecodingKey::from_secret(&[]), &validation)
			.map(|token_data| token_data.claims)
			.map_err(|_| AuthError::RefreshTokenParseFailure)
	};

	let access_token_claims =
		decode_access_token(access_token).map_err(|_| AuthError::AccessTokenParseFailure)?;

	let refresh_token_claims =
		decode_refresh_token(refresh_token).map_err(|_| AuthError::RefreshTokenParseFailure)?;

	let access_token_expiration = access_token_claims.exp.to_string();
	let refresh_token_expiration = refresh_token_claims.exp.to_string();

	connection
		.hset_multiple(
			format!("navigator:{}", username),
			&[
				("access_token", access_token),
				("access_token_expiration", &access_token_expiration),
				("refresh_token", refresh_token),
				("refresh_token_expiration", &refresh_token_expiration),
			],
		)
		.await
		.map_err(|_| AuthError::RedisCacheAddFailure)
}

/// The handler for the authentication token endpoint.
///
/// The request must contain the username and password of the user attempting to
/// login. The handler will return the JWT if the authentication was successful.
pub async fn auth_token_handler(
	State(state): State<Arc<KeycloakState>>,
	Json(payload): Json<Document<TokenRequestAttributes>>,
) -> Result<
	Json<Document<TokenResponseAttributes>>,
	(StatusCode, Json<Document<TokenResponseAttributes>>),
> {
	let token_response = generate_auth_token(&state, &payload)
		.await
		.map_err(handle_auth_error)?;

	let username = payload
		.extract_resource_object()
		.map(|resource| resource.attributes.username.clone())
		.ok_or(AuthError::MalformedRequestBody)
		.map_err(handle_auth_error)?;

	store_tokens_in_redis(
		&state,
		&username,
		&token_response.access_token,
		&token_response.refresh_token,
	)
	.await
	.map_err(handle_auth_error)?;

	let attributes = TokenResponseAttributes {
		jwt: token_response.access_token,
	};

	let resource = ResourceObject::builder()
		.r#type("auth_token".to_string())
		.attributes(attributes)
		.build();

	Ok(Json(Document::Single {
		data: Some(resource),
	}))
}

/// Middleware that wraps a router with Keycloak authentication.
///
/// This middleware requires the user to have the specified roles to access the
/// protected routes. If a route requires fine-grained role-based access, then
/// the roles should be checked manually in the route handler.
pub fn require_roles(
	required_roles: Vec<String>,
	router: Router,
	instance: Arc<KeycloakAuthInstance>,
) -> Router {
	router.layer(
		KeycloakAuthLayer::<String>::builder()
			.instance(instance)
			.passthrough_mode(PassthroughMode::Block)
			.persist_raw_claims(false)
			.expected_audiences(vec![String::from("account")])
			.required_roles(required_roles)
			.build(),
	)
}
