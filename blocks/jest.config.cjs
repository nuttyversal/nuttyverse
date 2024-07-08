module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	moduleNameMapper: {
		"^~/(.*)$": "<rootDir>/src/$1",
	},
	transform: {
		"\\.css\\.ts$": "@vanilla-extract/jest-transform",
	},
};
