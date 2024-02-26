import { useState } from "react";
import { NuttyverseContext, Singularity } from "@nuttyverse/blocks";
import { body, darkMode, lightMode, main } from "./Landing.css.ts";

export const Landing = () => {
	const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const defaultTheme = colorSchemeQuery.matches ? "dark" : "light";
	const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);

	colorSchemeQuery.addEventListener("change", (event) => {
		setTheme(event.matches ? "dark" : "light");
	});

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	const initialContext = {
		theme,
		setTheme,
		toggleTheme,
	} as const;

	const themeClass = theme === "light" ? lightMode : darkMode;

	return (
		<NuttyverseContext.Provider value={initialContext}>
			<div className={[body, themeClass].join(" ")}>
				<main className={main}>
					<Singularity />
				</main>
			</div>
		</NuttyverseContext.Provider>
	);
};
