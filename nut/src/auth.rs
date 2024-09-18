use crate::api::{self, Document, ResourceObject};
use std::borrow::Cow;
use std::sync::Arc;

use axum::body::Body;
use axum::extract::State;
use axum::middleware::{self, Next};
use axum::{Json, Router};
use axum_keycloak_auth::extract::{ExtractedToken, TokenExtractor};
use axum_keycloak_auth::instance::KeycloakAuthInstance;
use axum_keycloak_auth::layer::KeycloakAuthLayer;
use axum_keycloak_auth::{NonEmpty, PassthroughMode};
use http::header;
use http::{HeaderMap, HeaderValue, Request, Response, StatusCode};
use jsonwebtoken::jwk::{AlgorithmParameters, JwkSet};
use jsonwebtoken::{Algorithm, DecodingKey};
use redis::AsyncCommands;
use serde::{Deserialize, Serialize};
use thiserror::Error;
use tokio::sync::RwLock;
use typed_builder::TypedBuilder;

/// The duration of time that an access token will remain in the blocklist.
/// This is used to prevent access tokens issued prior to a logout from being
/// used to refresh the user's session. This value should be longer than the
/// refresh token's expiration time.
const BLOCKLIST_DURATION: u64 = 7 * 24 * 60 * 60;

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

	/// A cache of the decoding keys for the Keycloak server.
	#[builder(default)]
	keycloak_decoding_keys_cache: Arc<RwLock<Vec<DecodingKey>>>,

	/// A handle to the Redis client for managing the token cache.
	redis_client: redis::Client,
}

/// The request data for the token creation endpoint.
#[derive(Deserialize)]
pub struct TokenCreationRequestAttributes {
	/// The username of the user.
	username: String,

	/// The password of the user.
	password: String,
}

/// The response data from the token status endpoint.
#[derive(Serialize)]
pub struct TokenStatusResponseAttributes {
	/// Whether the access token is valid.
	is_valid: bool,

	/// The access token expiration time.
	expires_at: Option<u64>,

	/// The username of the user.
	username: Option<String>,
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
	/// The error message.
	error_description: String,
}

/// The JWT claims in an access token.
#[derive(Debug, Serialize, Deserialize)]
struct AccessTokenClaims {
	/// The expiration time of the token.
	exp: u64,

	/// The username of the user.
	preferred_username: String,
}

/// The JWT claims in a refresh token.
#[derive(Debug, Serialize, Deserialize)]
struct RefreshTokenClaims {
	/// The expiration time of the token.
	exp: u64,
}

/// The errors that can occur during authentication operations.
#[derive(Error, Debug)]
pub enum AuthError {
	#[error("The request body is invalid.")]
	MalformedRequestBody,

	#[error("Failed to parse response from Keycloak server.")]
	KeycloakResponseParseFailure,

	#[error("Failed to send request to Keycloak server.")]
	KeycloakRequestFailure,

	#[error("Received an error response from Keycloak server (reason: {message}).")]
	KeycloakRequestError { message: String },

	#[error("Missing authentication cookie.")]
	MissingAuthenticationCookie,

	#[error("Failed to parse access token.")]
	AccessTokenParseFailure,

	#[error("Failed to connect to Redis cache.")]
	RedisConnectionFailure,

	#[error("Failed to add token to Redis cache.")]
	RedisCacheAddFailure,

	#[error("Failed to update token in Redis cache.")]
	RedisCacheUpdateFailure,

	#[error("Failed to check token in Redis cache.")]
	RedisCacheCheckFailure,

	#[error("The login session has expired.")]
	LoginSessionExpired,
}

/// Handles an authentication error by returning an appropriate HTTP response.
///
/// The error is converted to a JSON:API error document and the appropriate HTTP
/// status code is returned. The response is returned as a tuple containing the
/// status code and the JSON:API error document.
fn handle_auth_error(error: AuthError) -> (StatusCode, Json<Document<()>>) {
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

		AuthError::MissingAuthenticationCookie => (
			"MissingAuthenticationCookie",
			error.to_string(),
			StatusCode::UNAUTHORIZED,
		),

		AuthError::AccessTokenParseFailure => (
			"AccessTokenParseFailure",
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

		AuthError::RedisCacheUpdateFailure => (
			"RedisCacheUpdateFailure",
			error.to_string(),
			StatusCode::INTERNAL_SERVER_ERROR,
		),

		AuthError::RedisCacheCheckFailure => (
			"RedisCacheCheckFailure",
			error.to_string(),
			StatusCode::INTERNAL_SERVER_ERROR,
		),

		AuthError::LoginSessionExpired => (
			"LoginSessionExpired",
			error.to_string(),
			StatusCode::UNAUTHORIZED,
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

/// Creates an authentication cookie for the user.
///
/// The cookie is used to authenticate the user in subsequent requests. The
/// cookie is stored in the user's browser and sent with every request.
async fn create_authentication_cookie(
	state: Arc<KeycloakState>,
	access_token: &str,
) -> Result<HeaderValue, AuthError> {
	// Parse the expiration time of the access token.
	let expiration = decode_jwt_access_token(state.clone(), access_token, false)
		.await
		.map_err(|_| AuthError::AccessTokenParseFailure)?
		.exp
		.to_string();

	// Create the authentication cookie.
	let cookie = format!(
		"auth={access_token}; HttpOnly; Secure; SameSite=Strict; Expires={expiration}",
		access_token = access_token,
		expiration = expiration,
	);

	Ok(HeaderValue::from_str(&cookie).map_err(|_| AuthError::AccessTokenParseFailure)?)
}

/// Creates an expired authentication cookie.
///
/// This is used to clear the authentication cookie when the user logs out.
/// It expires at the Unix epoch, which is the beginning of time.
fn create_expired_authentication_cookie() -> HeaderValue {
	let cookie = "auth=; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
	HeaderValue::from_str(cookie).unwrap()
}

/// Extracts the authentication cookie from the request headers.
///
/// The authentication cookie is used to authenticate the user in subsequent
/// requests. The cookie is stored in the user's browser and sent with every
/// request.
fn extract_access_token_from_cookie(headers: &HeaderMap) -> Result<String, AuthError> {
	headers
		.get(header::COOKIE)
		.and_then(|cookie| cookie.to_str().ok())
		.and_then(|cookie_str| {
			cookie_str
				.split(';')
				.find(|s| s.trim().starts_with("auth="))
		})
		.and_then(|auth_cookie| auth_cookie.trim().strip_prefix("auth="))
		.map(|token| token.to_string())
		.ok_or(AuthError::MissingAuthenticationCookie)
}

/// Sends a request to the Keycloak server to generate a JWT for authenticating
/// and authorizing the user in subsequent requests made to protected endpoints.
///
/// The function generates an access token and a refresh token for the user. The
/// access token is used to authenticate the user in subsequent requests. The
/// refresh token is used to generate a new access token when the current access
/// token expires.
async fn generate_jwt_with_password(
	state: Arc<KeycloakState>,
	username: &str,
	password: &str,
) -> Result<KeycloakTokenResponse, AuthError> {
	let token_url = format!(
		"{}/realms/{}/protocol/openid-connect/token",
		state.keycloak_url, state.keycloak_realm
	);

	let auth_request = vec![
		("grant_type", "password"),
		("client_id", &state.keycloak_client_id),
		("client_secret", &state.keycloak_client_secret),
		("username", username),
		("password", password),
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

/// Sends a request to the Keycloak server to generate a JWT for authenticating
/// and authorizing the user in subsequent requests.
///
/// The function generates an access token and a refresh token for the user. The
/// access token is used to authenticate the user in subsequent requests. The
/// refresh token is used to generate a new access token when the current access
/// token expires.
async fn generate_jwt_with_refresh_token(
	state: Arc<KeycloakState>,
	refresh_token: &str,
) -> Result<KeycloakTokenResponse, AuthError> {
	let token_url = format!(
		"{}/realms/{}/protocol/openid-connect/token",
		state.keycloak_url, state.keycloak_realm
	);

	let auth_request = vec![
		("grant_type", "refresh_token"),
		("client_id", &state.keycloak_client_id),
		("client_secret", &state.keycloak_client_secret),
		("refresh_token", refresh_token),
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

/// Sends a request to the Keycloak server to log out the user's session.
///
/// This will invalidate the refresh token in the Keycloak server. This prevents
/// the refresh token from being used to generate a new access token.
async fn invalidate_jwt_in_keycloak(
	state: Arc<KeycloakState>,
	refresh_token: &str,
) -> Result<(), AuthError> {
	let token_url = format!(
		"{}/realms/{}/protocol/openid-connect/logout",
		state.keycloak_url, state.keycloak_realm
	);

	let auth_request = vec![
		("client_id", state.keycloak_client_id.as_str()),
		("client_secret", state.keycloak_client_secret.as_str()),
		("refresh_token", refresh_token),
	];

	let response = reqwest::Client::new()
		.post(&token_url)
		.form(&auth_request)
		.send()
		.await
		.map_err(|_| AuthError::KeycloakRequestFailure)?;

	if response.status().is_success() {
		Ok(())
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

/// Fetches the decoding keys from the Keycloak server which are used to decode
/// the access token. RS256 is an asymmetric algorithm, so the public keys are
/// used to verify the signature of the access token.
///
/// The keys are fetched from the JWKS endpoint of the Keycloak server, and then
/// used to create `DecodingKey`s for decoding access tokens issued by the server.
///
/// The keys are cached in the `KeycloakState` to avoid having to fetch them
/// from the JWKS endpoint on each request.
async fn fetch_jwt_decoding_keys(state: Arc<KeycloakState>) -> Result<Vec<DecodingKey>, AuthError> {
	if !state.keycloak_decoding_keys_cache.read().await.is_empty() {
		return Ok(state.keycloak_decoding_keys_cache.read().await.clone());
	}

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
		*state.keycloak_decoding_keys_cache.write().await = decoding_keys.clone();
		Ok(decoding_keys)
	}
}

/// Decodes the access token using the provided decoding keys.
///
/// The access token is decoded using the provided decoding keys and the
/// `AccessTokenClaims` are returned. If the access token is not valid, then an
/// `AuthError::AccessTokenParseFailure` is returned.
async fn decode_jwt_access_token(
	state: Arc<KeycloakState>,
	token: &str,
	validate_exp: bool,
) -> Result<AccessTokenClaims, AuthError> {
	let decoding_keys = fetch_jwt_decoding_keys(state.clone()).await?;

	let mut validation = jsonwebtoken::Validation::new(Algorithm::RS256);
	validation.validate_exp = validate_exp;
	validation.validate_aud = false;

	for key in decoding_keys {
		if let Ok(token_data) = jsonwebtoken::decode::<AccessTokenClaims>(token, &key, &validation) {
			return Ok(token_data.claims);
		}
	}

	Err(AuthError::AccessTokenParseFailure)
}

/// Decodes the refresh token.
///
/// The refresh token is decoded and the `RefreshTokenClaims` are returned. If
/// the refresh token is not valid, then an `AuthError::AccessTokenParseFailure`
/// is returned.
async fn decode_jwt_refresh_token(token: &str) -> Result<RefreshTokenClaims, AuthError> {
	let mut validation = jsonwebtoken::Validation::new(Algorithm::HS512);
	validation.validate_aud = false;
	validation.validate_exp = false;

	// The refresh token is just an opaque string for the application, so its
	// signature does not need to be validated.
	validation.insecure_disable_signature_validation();

	let token_data = jsonwebtoken::decode::<RefreshTokenClaims>(
		token,
		&DecodingKey::from_secret(&[]),
		&validation,
	)
	.map_err(|_| AuthError::AccessTokenParseFailure)?;

	Ok(token_data.claims)
}

/// Stores the access token and refresh token in the Redis cache.
///
/// The tokens are stored in Redis under the user's username. This makes it easy
/// to retrieve the tokens when the user wants to refresh their access token or
/// when the tokens need to be invalidated.
async fn store_jwt_in_redis_cache(
	state: Arc<KeycloakState>,
	access_token: &str,
	refresh_token: &str,
) -> Result<(), AuthError> {
	let mut connection = state
		.redis_client
		.get_multiplexed_tokio_connection()
		.await
		.map_err(|_| AuthError::RedisConnectionFailure)?;

	let access_token_claims = decode_jwt_access_token(state.clone(), access_token, false)
		.await
		.map_err(|_| AuthError::AccessTokenParseFailure)?;

	let username = access_token_claims.preferred_username;
	let access_token_expiration = access_token_claims.exp.to_string();

	connection
		.set::<_, _, ()>(
			format!("navigator:{}:refresh_token", username),
			refresh_token,
		)
		.await
		.map_err(|_| AuthError::RedisCacheAddFailure)?;

	connection
		.zadd::<_, _, _, ()>(
			format!("navigator:{}:access_tokens", username),
			access_token,
			access_token_expiration.parse::<f64>().unwrap(),
		)
		.await
		.map_err(|_| AuthError::RedisCacheAddFailure)?;

	Ok(())
}

/// Retrieves the refresh token from the Redis cache.
///
/// The refresh token is retrieved using the username. The refresh token is
/// used to generate a new access token when the current access token expires.
/// The refresh token is optional because it may not exist if the user is not
/// logged in.
async fn get_jwt_from_redis_cache(
	state: Arc<KeycloakState>,
	username: &str,
) -> Result<Option<String>, AuthError> {
	let mut connection = state
		.redis_client
		.get_multiplexed_tokio_connection()
		.await
		.map_err(|_| AuthError::RedisConnectionFailure)?;

	let refresh_token: Option<String> = connection
		.get(format!("navigator:{}:refresh_token", username))
		.await
		.map_err(|_| AuthError::RedisCacheCheckFailure)?;

	Ok(refresh_token)
}

/// Invalidates the access token and refresh token in the Redis cache.
///
/// The access token and refresh token are invalidated by deleting them from the
/// Redis cache. The access tokens are also added to a blocklist in Redis with
/// their expiration.
async fn invalidate_jwt_in_redis_cache(
	state: Arc<KeycloakState>,
	username: &str,
) -> Result<(), AuthError> {
	let mut connection = state
		.redis_client
		.get_multiplexed_tokio_connection()
		.await
		.map_err(|_| AuthError::RedisConnectionFailure)?;

	// Fetch access tokens for the user.
	let access_tokens: Vec<String> = connection
		.zrange(format!("navigator:{}:access_tokens", username), 0, -1)
		.await
		.map_err(|_| AuthError::RedisCacheCheckFailure)?;

	// Add the access tokens to a blocklist in Redis.
	for token in access_tokens {
		let access_token_claims = decode_jwt_access_token(state.clone(), &token, false)
			.await
			.map_err(|_| AuthError::AccessTokenParseFailure)?;

		let expiration = access_token_claims.exp + BLOCKLIST_DURATION;

		connection
			.zadd::<_, _, _, ()>("navigator:blocklisted_tokens", token, expiration)
			.await
			.map_err(|_| AuthError::RedisCacheAddFailure)?;
	}

	// Remove the user's access tokens from the cache.
	connection
		.del::<_, ()>(format!("navigator:{}:access_tokens", username))
		.await
		.map_err(|_| AuthError::RedisCacheUpdateFailure)?;

	// Remove the user's refresh token from the cache.
	connection
		.del::<_, ()>(format!("navigator:{}:refresh_token", username))
		.await
		.map_err(|_| AuthError::RedisCacheUpdateFailure)?;

	Ok(())
}

/// Checks if the access token is blocklisted.
///
/// When a user logs out, the access token is added to the blocklist in Redis.
/// This function checks if the access token is in the blocklist.
pub async fn is_blocklisted(
	state: Arc<KeycloakState>,
	access_token: &str,
) -> Result<bool, AuthError> {
	let mut connection = state
		.redis_client
		.get_multiplexed_tokio_connection()
		.await
		.map_err(|_| AuthError::RedisConnectionFailure)?;

	let is_blocklisted: Option<f64> = connection
		.zscore("navigator:blocklisted_tokens", access_token)
		.await
		.map_err(|_| AuthError::RedisConnectionFailure)?;

	Ok(is_blocklisted.is_some())
}

/// The handler for the authentication status endpoint.
///
/// The request must contain the access token. The handler will return the
/// authentication status of the user.
pub async fn check_token_status_handler(
	State(state): State<Arc<KeycloakState>>,
	headers: HeaderMap,
) -> Result<Json<Document<TokenStatusResponseAttributes>>, (StatusCode, Json<Document<()>>)> {
	let unauthenticated_response = ResourceObject::builder()
		.r#type("auth_token".to_string())
		.attributes(TokenStatusResponseAttributes {
			is_valid: false,
			expires_at: None,
			username: None,
		})
		.build();

	match extract_access_token_from_cookie(&headers) {
		Ok(access_token) => match decode_jwt_access_token(state.clone(), &access_token, true).await {
			Ok(access_token_claims) => {
				if is_blocklisted(state.clone(), &access_token)
					.await
					.map_err(handle_auth_error)?
				{
					// Access token is blocklisted. ❌
					return Ok(Json(Document::Single {
						data: Some(unauthenticated_response),
					}));
				}

				// Access token is valid. ✅
				return Ok(Json(Document::Single {
					data: Some(
						ResourceObject::builder()
							.r#type("auth_token".to_string())
							.attributes(TokenStatusResponseAttributes {
								is_valid: true,
								expires_at: Some(access_token_claims.exp),
								username: Some(access_token_claims.preferred_username),
							})
							.build(),
					),
				}));
			}

			Err(_) => {
				// Access token is invalid. ❌
				return Ok(Json(Document::Single {
					data: Some(unauthenticated_response),
				}));
			}
		},

		Err(_) => {
			// Access token is not in the cookie. ❌
			return Ok(Json(Document::Single {
				data: Some(unauthenticated_response),
			}));
		}
	}
}

/// The handler for the JWT creation endpoint.
///
/// The request must contain the username and password of the user attempting to
/// login. The handler will return an access token if the authentication was
/// successful.
pub async fn create_jwt_handler(
	State(state): State<Arc<KeycloakState>>,
	Json(payload): Json<Document<TokenCreationRequestAttributes>>,
) -> Result<(HeaderMap, Json<Document<TokenStatusResponseAttributes>>), (StatusCode, Json<Document<()>>)> {
	let username = payload
		.extract_resource_object()
		.map(|resource| &resource.attributes.username)
		.ok_or(AuthError::MalformedRequestBody)
		.map_err(handle_auth_error)?;

	let password = payload
		.extract_resource_object()
		.map(|resource| &resource.attributes.password)
		.ok_or(AuthError::MalformedRequestBody)
		.map_err(handle_auth_error)?;

	let token_response = generate_jwt_with_password(state.clone(), username, password)
		.await
		.map_err(handle_auth_error)?;

	let access_token_claims = decode_jwt_access_token(state.clone(), &token_response.access_token, true)
		.await
		.map_err(handle_auth_error)?;

	store_jwt_in_redis_cache(
		state.clone(),
		&token_response.access_token,
		&token_response.refresh_token,
	)
	.await
	.map_err(handle_auth_error)?;

	let cookie = create_authentication_cookie(state, &token_response.access_token)
		.await
		.map_err(handle_auth_error)?;

	let mut headers = HeaderMap::new();
	headers.insert(header::SET_COOKIE, cookie);

	let resource = ResourceObject::builder()
		.r#type("auth_token".to_string())
		.attributes(TokenStatusResponseAttributes {
			is_valid: true,
			expires_at: Some(access_token_claims.exp),
			username: Some(access_token_claims.preferred_username),
		})
		.build();

	Ok((
		headers,
		Json(Document::Single {
			data: Some(resource),
		}),
	))
}

/// The handler for the JWT refresh endpoint.
///
/// The request must contain the expired access token. The handler will return
/// the new access token if the refresh was successful.
pub async fn refresh_jwt_handler(
	State(state): State<Arc<KeycloakState>>,
	headers: HeaderMap,
) -> Result<(HeaderMap, Json<Document<()>>), (StatusCode, Json<Document<()>>)> {
	let access_token = extract_access_token_from_cookie(&headers).map_err(handle_auth_error)?;

	let access_token_claims = decode_jwt_access_token(state.clone(), &access_token, false)
		.await
		.map_err(handle_auth_error)?;

	let username = access_token_claims.preferred_username;
	let expiration = access_token_claims.exp;

	// The access token must be younger than the blocklist duration to be refreshed.
	let time_past_expiration = chrono::Utc::now().timestamp() - expiration as i64;

	if time_past_expiration > BLOCKLIST_DURATION as i64 {
		return Err(handle_auth_error(AuthError::AccessTokenParseFailure));
	}

	// Get the refresh token from the Redis cache.
	let refresh_token = match get_jwt_from_redis_cache(state.clone(), &username).await {
		// If the token is in the cache, then return it.
		Ok(Some(token)) => token,

		// If the token is not in the cache, then the session has expired.
		Ok(None) => {
			// Invalidate all issued access tokens.
			invalidate_jwt_in_redis_cache(state.clone(), &username)
				.await
				.map_err(handle_auth_error)?;
			return Err(handle_auth_error(AuthError::LoginSessionExpired));
		}

		// If there is an error, then return it.
		Err(e) => return Err(handle_auth_error(e)),
	};

	// Generate a new access token with the refresh token.
	let token_response = generate_jwt_with_refresh_token(state.clone(), &refresh_token)
		.await
		.map_err(handle_auth_error)?;

	// Store the new access token and refresh token in the Redis cache.
	store_jwt_in_redis_cache(
		state.clone(),
		&token_response.access_token,
		&token_response.refresh_token,
	)
	.await
	.map_err(handle_auth_error)?;

	let cookie = create_authentication_cookie(state, &token_response.access_token)
		.await
		.map_err(handle_auth_error)?;

	let mut headers = HeaderMap::new();
	headers.insert(header::SET_COOKIE, cookie);

	let resource = ResourceObject::builder()
		.r#type("auth_token".to_string())
		.attributes(())
		.build();

	Ok((
		headers,
		Json(Document::Single {
			data: Some(resource),
		}),
	))
}

/// The handler for the JWT logout endpoint.
///
/// The request must contain the access token to be logged out. The handler will
/// invalidate the Keycloak session and any associated access tokens in the
/// Redis cache.
pub async fn logout_jwt_handler(
	State(state): State<Arc<KeycloakState>>,
	headers: HeaderMap,
) -> Result<(HeaderMap, Json<Document<()>>), (StatusCode, Json<Document<()>>)> {
	// Extract the access token from the cookie.
	let access_token = extract_access_token_from_cookie(&headers).map_err(handle_auth_error)?;

	// Decode the access token and get the username.
	let username = decode_jwt_access_token(state.clone(), &access_token, false)
		.await
		.map_err(handle_auth_error)?
		.preferred_username;

	// Get the refresh token from the Redis cache.
	let refresh_token = get_jwt_from_redis_cache(state.clone(), &username)
		.await
		.map_err(handle_auth_error)?;

	// Invalidate the refresh token at the Keycloak server.
	if let Some(refresh_token) = refresh_token {
		invalidate_jwt_in_keycloak(state.clone(), &refresh_token)
			.await
			.map_err(handle_auth_error)?;
	}

	// Invalidate the access tokens in the Redis cache.
	invalidate_jwt_in_redis_cache(state.clone(), &username)
		.await
		.map_err(handle_auth_error)?;

	let mut headers = HeaderMap::new();
	headers.insert(header::SET_COOKIE, create_expired_authentication_cookie());

	Ok((headers, Json(Document::Single { data: None })))
}

/// Middleware for checking if the access token is blocklisted.
///
/// When a user logs out, the access token is added to the blocklist in Redis.
/// This middleware checks if the access token is in the blocklist and returns
/// an error if it is.
pub async fn check_token_blocklist(
	State(state): State<Arc<KeycloakState>>,
	headers: HeaderMap,
	request: Request<Body>,
	next: Next,
) -> Result<Response<Body>, StatusCode> {
	let access_token =
		extract_access_token_from_cookie(&headers).map_err(|_| StatusCode::UNAUTHORIZED)?;

	if is_blocklisted(state.clone(), &access_token)
		.await
		.map_err(|_| StatusCode::UNAUTHORIZED)?
	{
		Err(StatusCode::UNAUTHORIZED)
	} else {
		Ok(next.run(request).await)
	}
}

/// Middleware that wraps a router with Keycloak authentication and token
/// blocklist checking.
///
/// This middleware requires the user to have the specified roles to access the
/// protected routes. If a route requires fine-grained role-based access, then
/// the roles should be checked manually in the route handler.
pub fn require_roles(
	required_roles: Vec<String>,
	router: Router,
	instance: Arc<KeycloakAuthInstance>,
	state: Arc<KeycloakState>,
) -> Router {
	// Check if the access token is blocklisted.
	let check_token_blocklist = middleware::from_fn_with_state(state.clone(), check_token_blocklist);

	/// Extracts the access token from the cookie.
	#[derive(Debug, Clone, Default)]
	pub struct AccessTokenExtractor {}

	impl TokenExtractor for AccessTokenExtractor {
		fn extract<'a>(
			&self,
			request: &'a axum::extract::Request,
		) -> Result<ExtractedToken<'a>, axum_keycloak_auth::error::AuthError> {
			extract_access_token_from_cookie(request.headers())
				.map_err(|_| axum_keycloak_auth::error::AuthError::MissingAuthorizationHeader)
				.map(|token| Cow::Owned(token.to_string()))
		}
	}

	let token_extractors = NonEmpty::<Arc<dyn TokenExtractor>> {
		head: Arc::new(AccessTokenExtractor::default()),
		tail: vec![],
	};

	// Check if the access token has the required roles.
	let check_required_roles = KeycloakAuthLayer::<String>::builder()
		.instance(instance)
		.passthrough_mode(PassthroughMode::Block)
		.persist_raw_claims(false)
		.expected_audiences(vec![String::from("account")])
		.required_roles(required_roles)
		.token_extractors(token_extractors)
		.build();

	router
		.layer(check_token_blocklist)
		.layer(check_required_roles)
}

/// Cleans up the expired access tokens in the blocklist.
///
/// This function removes the expired blocklisted tokens from the Redis cache.
/// This is necessary because Redis does not automatically delete expired keys.
pub async fn clean_up_expired_tokens(state: Arc<KeycloakState>) -> Result<(), AuthError> {
	let mut connection = state
		.redis_client
		.get_multiplexed_tokio_connection()
		.await
		.map_err(|_| AuthError::RedisConnectionFailure)?;

	// Query the keys for refresh tokens for all users.
	let refresh_token_keys: Vec<String> = connection
		.keys("navigator:*:refresh_token")
		.await
		.map_err(|_| AuthError::RedisConnectionFailure)?;

	// Iterate over each user and remove their expired refresh tokens.
	for key in refresh_token_keys {
		// Get the refresh token from the Redis cache.
		let refresh_token: String = connection
			.get(&key)
			.await
			.map_err(|_| AuthError::RedisConnectionFailure)?;

		// Decode the refresh token.
		let refresh_token_claims = decode_jwt_refresh_token(&refresh_token)
			.await
			.map_err(|_| AuthError::AccessTokenParseFailure)?;

		// Get the expiration of the refresh token.
		let expiration = refresh_token_claims.exp;

		// Remove the refresh token from the Redis cache if it is expired.
		if chrono::Utc::now().timestamp() > expiration as i64 {
			connection
				.del::<_, ()>(&key)
				.await
				.map_err(|_| AuthError::RedisConnectionFailure)?;
		}
	}

	// Remove the expired access tokens from the blocklist.
	connection
		.zrembyscore::<_, _, _, ()>(
			"navigator:blocklisted_tokens",
			"-inf",
			chrono::Utc::now().timestamp(),
		)
		.await
		.map_err(|_| AuthError::RedisCacheUpdateFailure)?;

	Ok(())
}
