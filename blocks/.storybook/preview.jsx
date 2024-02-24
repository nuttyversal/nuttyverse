import { useState } from "react";
import { NuttyverseContext } from "../src/styles/themes/Context";

/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => {
			const [theme, setTheme] = useState("light");
			const themeButtonText = theme === "light" ? "☀️" : "🌙";
			const backgroundColor = theme === "light" ? "white" : "black";

			const toggleTheme = () => {
				setTheme((prevTheme) => {
					return prevTheme === "light" ? "dark" : "light";
				});
			};

			return (
				<>
					<div
						style={{
							position: "absolute",
							top: "1em",
							right: "1em",
						}}
					>
						<button onClick={toggleTheme}>{themeButtonText}</button>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							width: "100%",
							backgroundColor,
						}}
					>
						<div style={{ width: "30em", padding: "1em" }}>
							<NuttyverseContext.Provider value={theme}>
								<Story />
							</NuttyverseContext.Provider>
						</div>
					</div>
				</>
			);
		},
	],
};

export default preview;
