import { globalStyle } from "@vanilla-extract/css";

// This is based off Josh Comeau's CSS reset.
// https://www.joshwcomeau.com/css/custom-css-reset/

globalStyle(`*`, {
	boxSizing: `border-box`,
	margin: 0,
});

globalStyle(`html, body`, {
	height: `100%`,
});

globalStyle(`body`, {
	lineHeight: 1.5,
	WebkitFontSmoothing: `antialiased`,
});

globalStyle(`img, picture, video, canvas, svg`, {
	display: `block`,
	maxWidth: `100%`,
});

globalStyle(`input, button, textarea, select`, {
	font: `inherit`,
});

globalStyle(`p, h1, h2, h3, h4, h5, h6`, {
	overflowWrap: `break-word`,
});

globalStyle(`#root`, {
	isolation: `isolate`,
});
