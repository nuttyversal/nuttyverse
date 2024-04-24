import type { ReactNode } from "react";
import { useState } from "react";
import {
	NuttyverseContext,
	setDocumentRootBackground,
} from "@nuttyverse/blocks";
import { body, darkMode, lightMode, main } from "./Landing.css.ts";

type Props = {
	children: ReactNode;
};

export const ThemeProvider: React.FC<Props> = (props) => {
	const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const defaultTheme = colorSchemeQuery.matches ? "dark" : "light";

	const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);
	setDocumentRootBackground(defaultTheme);

	colorSchemeQuery.addEventListener("change", (event) => {
		setTheme(event.matches ? "dark" : "light");
		setDocumentRootBackground(event.matches ? "dark" : "light");
	});

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
		setDocumentRootBackground(theme === "light" ? "dark" : "light");
	};

	const initialContext = {
		theme,
		setTheme,
		toggleTheme,
	} as const;

	const themeClass = theme === "light" ? lightMode : darkMode;

	return (
		<NuttyverseContext.Provider value={initialContext}>
			<div className={[themeClass, body].join(" ")}>
				<main className={main}>{props.children}</main>
			</div>
		</NuttyverseContext.Provider>
	);
};
