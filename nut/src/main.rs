use axum::{
	body::Body,
	http::header,
	http::{Request, Response, StatusCode},
	middleware::{self, Next},
	routing, Router,
};
use std::convert::Infallible;
use tokio::net::TcpListener;
use tower_http::services::{ServeDir, ServeFile};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
	let fallback = ServeFile::new("frontend/index.html");
	let frontend = ServeDir::new("frontend").not_found_service(fallback.clone());
	let fonts = ServeDir::new("fonts").not_found_service(fallback);

	let fonts_router = Router::new()
		.nest_service("/", routing::get_service(fonts))
		.layer(middleware::from_fn(hotlink_protection));

	let app = Router::new()
		.nest_service("/fonts", fonts_router)
		.nest_service("/", routing::get_service(frontend));

	let listener = TcpListener::bind("0.0.0.0:4000").await?;
	axum::serve(listener, app).await?;

	Ok(())
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
