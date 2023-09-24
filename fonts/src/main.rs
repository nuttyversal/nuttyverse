use std::env;
use warp::http::header::ORIGIN;
use warp::Filter;

#[derive(Debug)]
struct InvalidOrigin;
impl warp::reject::Reject for InvalidOrigin {}

#[tokio::main]
async fn main() {
	// GET /* => ${FONT_DIRECTORY}/*
	let font_directory = env::var("FONT_DIRECTORY").unwrap_or_else(|_| "./fonts".into());
	let fonts = warp::fs::dir(font_directory);

	let cors = warp::cors()
		.allow_methods(vec!["GET"])
		.allow_headers(vec!["Content-Type"])
		.build();

	let nutty_origins = warp::header::optional::<String>(ORIGIN.as_str())
		.and_then(|origin: Option<String>| async move {
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
		})
		.untuple_one();

	// GET / => index.html
	let root = warp::path::end().map(|| format!("Font Force Field 🛡️"));

	let routes = fonts.and(nutty_origins).with(cors).or(root);
	warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
}
