use std::env;
use warp::http::header::ORIGIN;
use warp::{Filter, Rejection, Reply};

#[derive(Debug, serde::Serialize)]
struct ErrorMessage {
	header: String,
	message: String,
}

#[derive(Debug)]
struct InvalidOrigin;
impl warp::reject::Reject for InvalidOrigin {}

async fn is_nutty_origin(origin: Option<String>) -> Result<(), Rejection> {
	match origin {
		Some(o)
			if o.ends_with(".nuttyver.se")
				|| o.ends_with(".nuttyverse.com")
				|| o == "nuttyver.se"
				|| o == "nuttyverse.com"
				|| o == "nuttyverse.neocities.org" =>
		{
			Ok(())
		}
		_ => Err(warp::reject::custom(InvalidOrigin)),
	}
}

async fn handle_rejection(err: Rejection) -> Result<impl Reply, Rejection> {
	let error_message = if err.is_not_found() {
		ErrorMessage {
			header: "Font Force Field".to_string(),
			message: "There is nothing to see here.".to_string(),
		}
	} else if let Some(InvalidOrigin) = err.find() {
		ErrorMessage {
			header: "Font Force Field".to_string(),
			message: "Permission denied".to_string(),
		}
	} else {
		ErrorMessage {
			header: "Font Force Field".to_string(),
			message: "Something went wrong!".to_string(),
		}
	};

	Ok(warp::reply::json(&error_message))
}

#[tokio::main]
async fn main() {
	// GET / => index.html
	let root = warp::path::end().map(|| format!("Font Force Field 🛡️"));

	// GET /* => ${FONT_DIRECTORY}/*
	let font_directory =
		env::var("FONT_DIRECTORY").expect("FONT_DIRECTORY environment variable not set");
	let fonts = warp::fs::dir(font_directory);

	// Enable CORS.
	let cors = warp::cors()
		.allow_methods(vec!["GET"])
		.allow_headers(vec!["Content-Type"])
		.build();

	// Protect against hotlinking.
	let allowed_origins = warp::header::optional::<String>(ORIGIN.as_str())
		.and_then(is_nutty_origin)
		.untuple_one();

	let routes = fonts
		.and(allowed_origins)
		.with(cors)
		.or(root)
		.recover(handle_rejection);

	println!("Font Force Field 🛡️");
	println!("Starting server at http://localhost:3030");
	warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
}
