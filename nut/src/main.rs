use axum::routing;
use tokio::net;
use tower_http::services;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
	let fallback = services::ServeFile::new("frontend/index.html");
	let frontend = services::ServeDir::new("frontend").not_found_service(fallback.clone());
	let fonts = services::ServeDir::new("fonts").not_found_service(fallback);

	let app = axum::Router::new()
		.nest_service("/fonts", routing::get_service(fonts))
		.nest_service("/", routing::get_service(frontend));

	let listener = net::TcpListener::bind("0.0.0.0:4000").await?;

	axum::serve(listener, app).await?;

	Ok(())
}
