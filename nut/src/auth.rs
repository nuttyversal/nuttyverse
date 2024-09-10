use crate::api::{self, Document, ResourceObject};
use std::sync::Arc;

use axum::extract::State;
use axum::{Json, Router};
use axum_keycloak_auth::instance::KeycloakAuthInstance;
use axum_keycloak_auth::layer::KeycloakAuthLayer;
use axum_keycloak_auth::PassthroughMode;
use http::StatusCode;
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
	access_token: String,
}

/// The response data from the Keycloak token endpoint (error).
#[derive(Deserialize)]
struct KeycloakErrorResponse {
	error_description: String,
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
		if let Ok(token_response) = response.json::<KeycloakTokenResponse>().await {
			Ok(token_response)
		} else {
			Err(AuthError::KeycloakResponseParseFailure)
		}
	} else {
		let response = response.json::<KeycloakErrorResponse>().await;

		let error_response = if let Ok(response) = response {
			response
		} else {
			return Err(AuthError::KeycloakResponseParseFailure);
		};

		Err(AuthError::KeycloakRequestError {
			message: error_response.error_description,
		})
	}
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
	match generate_auth_token(&state, &payload).await {
		Ok(token_response) => {
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

		Err(e) => {
			let (title, detail, status) = match e {
				AuthError::MalformedRequestBody => (
					"MalformedRequestBody",
					e.to_string(),
					StatusCode::BAD_REQUEST,
				),

				AuthError::KeycloakResponseParseFailure => (
					"KeycloakResponseParseFailure",
					e.to_string(),
					StatusCode::INTERNAL_SERVER_ERROR,
				),

				AuthError::KeycloakRequestFailure => (
					"KeycloakRequestFailure",
					e.to_string(),
					StatusCode::INTERNAL_SERVER_ERROR,
				),

				AuthError::KeycloakRequestError { .. } => (
					"KeycloakRequestError",
					e.to_string(),
					StatusCode::UNAUTHORIZED,
				),
			};

			let error = api::Error::builder()
				.title(title.to_string())
				.detail(detail)
				.status(status.to_string())
				.build();

			Err((
				status,
				Json(Document::Error {
					errors: vec![error],
				}),
			))
		}
	}
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
