module.exports = {
	tabWidth: 3,
	arrowParens: "always",
	trailingComma: "all",
	plugins: ["prettier-plugin-astro"],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
