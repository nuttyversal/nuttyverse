use std::env;
use warp::http::header::REFERER;
use warp::{Filter, Rejection, Reply};

#[derive(Debug, serde::Serialize)]
struct ErrorMessage {
	header: String,
	message: String,
}

#[derive(Debug)]
struct InvalidOrigin;
impl warp::reject::Reject for InvalidOrigin {}

async fn is_nutty_host(uri: Option<String>) -> Result<(), Rejection> {
	let origin = uri.ok_or_else(|| warp::reject::custom(InvalidOrigin))?;

	let uri = origin
		.parse::<http::Uri>()
		.map_err(|_| warp::reject::custom(InvalidOrigin))?;

	let host = uri
		.host()
		.ok_or_else(|| warp::reject::custom(InvalidOrigin))?;

	match host {
		"nuttyver.se" | "nuttyverse.com" | "nuttyverse.neocities.org" => Ok(()),
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

	// Protect against hotlinking.
	let cors = warp::cors()
		.allow_methods(vec!["GET"])
		.allow_origins(vec![
			"https://nuttyver.se",
			"https://nuttyverse.com",
			"https://nuttyverse.neocities.org",
		])
		.build();

	// Protect against direct downloads.
	let referer_origins = warp::header::optional::<String>(REFERER.as_str())
		.and_then(is_nutty_host)
		.untuple_one();

	let routes = fonts
		.and(referer_origins)
		.with(cors)
		.or(root)
		.recover(handle_rejection);

	println!("Font Force Field 🛡️");
	println!("Starting server at http://0.0.0.0:3030");
	warp::serve(routes).run(([0, 0, 0, 0], 3030)).await;
}

#[tokio::test]
async fn test_valid_uris() {
	let valid_uris = vec![
		"nuttyver.se",
		"http://nuttyver.se",
		"https://nuttyverse.com/path?query=value",
		"https://nuttyverse.neocities.org",
	];

	for uri in valid_uris {
		assert!(is_nutty_host(Some(uri.to_string())).await.is_ok());
	}
}

#[tokio::test]
async fn test_invalid_uris() {
	let invalid_uris = vec![
		"this is not a uri",
		"spoof-attempt-nuttyver.se",
		"http://nuttyverse.not.com",
		"https://not-nuttyverse.com",
		"https://nuttyverse.neocities.org",
	];

	for uri in invalid_uris {
		assert!(is_nutty_host(Some(uri.to_string())).await.is_err());
	}
}

#[tokio::test]
async fn test_no_uri() {
	assert!(is_nutty_host(None).await.is_err());
}
