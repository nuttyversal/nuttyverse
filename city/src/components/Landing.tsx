import { useState } from "react";
import { NuttyverseContext, Singularity } from "@nuttyverse/blocks";

export const Landing = () => {
	const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const defaultTheme = colorSchemeQuery.matches ? "dark" : "light";
	const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);

	colorSchemeQuery.addEventListener("change", (event) => {
		setTheme(event.matches ? "dark" : "light");
	});

	return (
		<NuttyverseContext.Provider value={theme}>
			<Singularity />
		</NuttyverseContext.Provider>
	);
};
