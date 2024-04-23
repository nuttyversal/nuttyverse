import { useState } from "react";
import { NuttyverseContext } from "../src/styles/themes/context";
import { spacing } from "../src/styles/tokens/spacing";

// Import CSS reset as a side effect.
import "../src/styles/reset.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
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

			const initialContextValue = {
				theme,
				setTheme,
				toggleTheme,
			};

			return (
				<>
					<div
						style={{
							position: "absolute",
							top: spacing[4],
							right: spacing[4],
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
						<div style={{ width: spacing[144], padding: spacing[4] }}>
							<NuttyverseContext.Provider value={initialContextValue}>
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
