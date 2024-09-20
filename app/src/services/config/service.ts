import { Context, Effect, Layer } from "effect";

/**
 * A service that provides access to application configuration.
 */
class ConfigService extends Context.Tag("ConfigService")<
	ConfigService,
	{
		/**
		 * Gets the configuration for the application.
		 */
		readonly getConfig: Effect.Effect<{
			/**
			 * The base URL for the API (e.g., `https://api.nuttyver.se`).
			 */
			readonly apiBaseUrl: string;
		}>;
	}
>() {}

const ConfigLive = Layer.succeed(ConfigService, {
	getConfig: Effect.succeed({
		apiBaseUrl: "https://nuttyver.se/api",
	}),
});

const ConfigTest = Layer.succeed(ConfigService, {
	getConfig: Effect.succeed({
		apiBaseUrl: "http://localhost:4000/api",
	}),
});

export { ConfigService, ConfigLive, ConfigTest };
