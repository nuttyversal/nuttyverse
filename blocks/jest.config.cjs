module.exports = {
	preset: "ts-jest",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testEnvironment: "jsdom",
	testEnvironmentOptions: {
		customExportConditions: [""],
	},
	moduleNameMapper: {
		"^~/(.*)$": "<rootDir>/src/$1",
	},
	transform: {
		"\\.css\\.ts$": "@vanilla-extract/jest-transform",
	},
};
