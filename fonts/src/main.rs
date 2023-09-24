use std::env;
use warp::Filter;

#[tokio::main]
async fn main() {
	let font_directory = env::var("FONT_DIRECTORY").unwrap_or_else(|_| "./fonts".into());
	let fonts = warp::fs::dir(font_directory);
	let root = warp::path::end().map(|| format!("Font Force Field 🛡️"));
	let routes = fonts.or(root);
	warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
}
