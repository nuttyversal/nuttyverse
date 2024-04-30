// import darkTheme from "highlight.js/styles/github-dark.css?inline";
import { globalStyle } from "@vanilla-extract/css";
import { darkTheme } from "~/styles/themes/contract.css";

globalStyle(`.${darkTheme} pre code.hljs`, {
	display: "block",
	overflowX: "auto",
	padding: "1em",
});

globalStyle(`.${darkTheme} code.hljs`, {
	padding: "3px 5px",
});

globalStyle(`.${darkTheme} .hljs`, {
	color: "#c9d1d9",
	background: "#0d1117",
});

globalStyle(
	`.${darkTheme} .hljs-doctag, .${darkTheme} .hljs-keyword, .${darkTheme} .hljs-meta .hljs-keyword, .${darkTheme} .hljs-template-tag, .${darkTheme} .hljs-template-variable, .${darkTheme} .hljs-type, .${darkTheme} .hljs-variable.language_`,
	{
		color: "#ff7b72",
	},
);

globalStyle(
	`.${darkTheme} .hljs-title, .${darkTheme} .hljs-title.class_, .${darkTheme} .hljs-title.class_.inherited__, .${darkTheme} .hljs-title.function_`,
	{
		color: "#d2a8ff",
	},
);

globalStyle(
	`.${darkTheme} .hljs-attr, .${darkTheme} .hljs-attribute, .${darkTheme} .hljs-literal, .${darkTheme} .hljs-meta, .${darkTheme} .hljs-number, .${darkTheme} .hljs-operator, .${darkTheme} .hljs-variable, .${darkTheme} .hljs-selector-attr, .${darkTheme} .hljs-selector-class, .${darkTheme} .hljs-selector-id`,
	{
		color: "#79c0ff",
	},
);

globalStyle(
	`.${darkTheme} .hljs-regexp, .${darkTheme} .hljs-string, .${darkTheme} .hljs-meta .hljs-string`,
	{
		color: "#a5d6ff",
	},
);

globalStyle(`.${darkTheme} .hljs-built_in, .${darkTheme} .hljs-symbol`, {
	color: "#ffa657",
});

globalStyle(
	`.${darkTheme} .hljs-comment, .${darkTheme} .hljs-code, .${darkTheme} .hljs-formula`,
	{
		color: "#8b949e",
	},
);

globalStyle(
	`.${darkTheme} .hljs-name, .${darkTheme} .hljs-quote, .${darkTheme} .hljs-selector-tag, .${darkTheme} .hljs-selector-pseudo`,
	{
		color: "#7ee787",
	},
);

globalStyle(`.${darkTheme} .hljs-subst`, {
	color: "#c9d1d9",
});

globalStyle(`.${darkTheme} .hljs-section`, {
	color: "#1f6feb",
	fontWeight: "bold",
});

globalStyle(`.${darkTheme} .hljs-bullet`, {
	color: "#f2cc60",
});

globalStyle(`.${darkTheme} .hljs-emphasis`, {
	color: "#c9d1d9",
	fontStyle: "italic",
});

globalStyle(`.${darkTheme} .hljs-strong`, {
	color: "#c9d1d9",
	fontWeight: "bold",
});

globalStyle(`.${darkTheme} .hljs-addition`, {
	color: "#aff5b4",
	backgroundColor: "#033a16",
});

globalStyle(`.${darkTheme} .hljs-deletion`, {
	color: "#ffdcd7",
	backgroundColor: "#67060c",
});

globalStyle(
	`.${darkTheme} .hljs-char.escape_, .${darkTheme} .hljs-link, .${darkTheme} .hljs-params, .${darkTheme} .hljs-property, .${darkTheme} .hljs-punctuation, .${darkTheme} .hljs-tag`,
	{
		// [NOTE] Purposely ignored.
	},
);
