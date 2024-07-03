/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],

	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@storybook/addon-interactions",
	],

	framework: {
		name: "@storybook/react-vite",
		options: {},
	},

	docs: {
		defaultName: "Documentation",
	},

	typescript: {
		reactDocgen: "react-docgen-typescript",
	},
};
export default config;
