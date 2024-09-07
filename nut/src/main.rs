mod api;
mod auth;
mod config;

use auth::{auth_token_handler, require_roles};
use config::Config;

use anyhow::Result;
use axum::{
	body::Body,
	http::{header, Request, Response, StatusCode},
	middleware::{self, Next},
	routing, Extension, Router,
};
use axum_keycloak_auth::{
	decode::KeycloakToken,
	expect_role,
	instance::{KeycloakAuthInstance, KeycloakConfig},
	Url,
};
use std::{convert::Infallible, sync::Arc};
use tokio::net::TcpListener;
use tower_http::services::{ServeDir, ServeFile};

#[tokio::main]
async fn main() -> Result<()> {
	let config = Config::load();

	let keycloak_state = Arc::new(
		auth::KeycloakState::builder()
			.keycloak_url(config.keycloak_url.clone())
			.keycloak_realm(config.keycloak_realm.clone())
			.keycloak_client_id(config.keycloak_client_id)
			.keycloak_client_secret(config.keycloak_client_secret)
			.build(),
	);

	let keycloak_auth_instance = Arc::new(KeycloakAuthInstance::new(
		KeycloakConfig::builder()
			.server(Url::parse(&config.keycloak_url)?)
			.realm(config.keycloak_realm)
			.build(),
	));

	let fallback = ServeFile::new("frontend/index.html");
	let frontend = ServeDir::new("frontend").not_found_service(fallback.clone());
	let fonts = ServeDir::new("fonts").not_found_service(fallback);

	let auth_service = Router::new()
		.route("/api/auth/token", routing::post(auth_token_handler))
		.with_state(keycloak_state);

	let fonts_service = Router::new()
		.nest_service("/fonts", routing::get_service(fonts))
		.layer(middleware::from_fn(hotlink_protection));

	let protected_service = require_roles(
		vec![String::from("admin")],
		Router::new().route("/protected", routing::get(protected)),
		keycloak_auth_instance,
	);

	let frontend_service = Router::new().nest_service("/", routing::get_service(frontend));

	let app = auth_service
		.merge(fonts_service)
		.merge(protected_service)
		.merge(frontend_service);

	let listener = TcpListener::bind("0.0.0.0:4000").await?;

	axum::serve(listener, app).await?;

	Ok(())
}

/// A protected handler that requires the user to have the `admin` role.
async fn protected(Extension(token): Extension<KeycloakToken<String>>) -> Response<Body> {
	expect_role!(&token, "admin");

	Response::builder()
		.status(StatusCode::OK)
		.body(Body::empty())
		.unwrap()
}

/// Middleware for hotlink protection.
///
/// Prevents requests from being served if they do not originate from within the
/// Nuttyverse as a protection against casual copying of licensed assets. This
/// is only enforced in production builds (i.e., building with `--release`).
async fn hotlink_protection(req: Request<Body>, next: Next) -> Result<Response<Body>, Infallible> {
	if check_host(&req) || cfg!(debug_assertions) {
		Ok(next.run(req).await)
	} else {
		Ok(Response::builder()
			.status(StatusCode::FORBIDDEN)
			.body(Body::empty())
			.unwrap())
	}
}

/// Check if the request's referer is from the Nuttyverse.
fn check_host<T>(req: &Request<T>) -> bool {
	req.headers()
		.get(header::REFERER)
		.and_then(|referer| referer.to_str().ok())
		.and_then(|str| str.parse::<axum::http::Uri>().ok())
		.map(|uri| uri.host().map(is_nuttyverse_host).unwrap_or(false))
		.unwrap_or(false)
}

/// Check if the given host is an allowed Nuttyverse host.
fn is_nuttyverse_host(host: &str) -> bool {
	const VALID_DOMAINS: &[&str] = &["nuttyver.se", "nuttyverse.com", "nuttyverse.neocities.org"];
	VALID_DOMAINS.contains(&host) || host.ends_with(".nuttyver.se")
}
