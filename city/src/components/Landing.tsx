import { useState } from "react";
import { NuttyverseContext, Singularity } from "@nuttyverse/blocks";

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

	return (
		<NuttyverseContext.Provider value={initialContext}>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: theme === "light" ? "white" : "black",
					width: "100%",
					minHeight: "100vh",
				}}
			>
				<main
					style={{
						margin: "auto",
						width: "500px",
						padding: "1em 2em",
					}}
				>
					<Singularity />
				</main>
			</div>
		</NuttyverseContext.Provider>
	);
};
