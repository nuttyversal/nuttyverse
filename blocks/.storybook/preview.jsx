import * as colors from "../src/styles/tokens/colors";
import { spacing } from "../src/styles/tokens/spacing";
import { useThemeSwitcher } from "../src/styles/themes/contract";

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
			const { theme, toggleTheme } = useThemeSwitcher();

			const themeVars =
				theme === "light"
					? {
							icon: "☀️",
							background: colors.white,
						}
					: {
							icon: "🌙",
							background: colors.black,
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
						<button onClick={toggleTheme}>{themeVars.icon}</button>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							width: "100%",
							backgroundColor: themeVars.background,
						}}
					>
						<div style={{ width: spacing[144], padding: spacing[4] }}>
							<Story />
						</div>
					</div>
				</>
			);
		},
	],
};

export default preview;
