import { useState } from "react";
import { NuttyverseContext, Singularity } from "@nuttyverse/blocks";

export const Landing = () => {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

	colorSchemeQuery.addEventListener("change", (event) => {
		setTheme(event.matches ? "dark" : "light");
	});

	return (
		<NuttyverseContext.Provider value={theme}>
			<Singularity />
		</NuttyverseContext.Provider>
	);
};
