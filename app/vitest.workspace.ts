import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
	{
		extends: "vite.config.ts",
		test: {
			browser: {
				enabled: true,
				headless: true,
				name: "chromium",
				provider: "playwright",
				providerOptions: {},
			},
		},
	},
]);
