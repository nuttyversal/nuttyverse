import { darkBackground } from "./utils.css";

/**
 * Sets the background color of the document root based on the theme. Since the
 * theme context provider is not globally scoped, the background color of the
 * document root will need to be manually set.
 */
export function setDocumentRootBackground(theme: "light" | "dark") {
	if (theme === "dark") {
		document.documentElement.classList.add(darkBackground);
	} else {
		document.documentElement.classList.remove(darkBackground);
	}
}
