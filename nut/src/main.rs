use axum::routing;
use tokio::net;
use tower_http::services;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
	let static_files = services::ServeDir::new("dist")
		.not_found_service(services::ServeFile::new("dist/index.html"));

	let app = axum::Router::new().nest_service("/", routing::get_service(static_files));

	let listener = net::TcpListener::bind("0.0.0.0:4000").await?;

	axum::serve(listener, app).await?;

	Ok(())
}
