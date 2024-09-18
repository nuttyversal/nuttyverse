import { HttpClient } from "@effect/platform";
import { HttpClientError } from "@effect/platform/HttpClientError";
import { Context, Effect, Option } from "effect";
import { Scope } from "effect/Scope";
import { createHttpRequest } from "~/utils/api";
import { createHttpStore } from "./store";

/**
 * A service that manages the HTTP client.
 */
class HttpService extends Context.Tag("HttpService")<
	HttpService,
	{
		readonly httpClient: Effect.Effect<
			HttpClient.HttpClient.WithResponse<HttpClientError, Scope>,
			never,
			HttpClient.HttpClient.Service
		>;

		readonly httpRequest: ReturnType<typeof createHttpRequest>;
	}
>() {}

/**
 * A service that manages the HTTP client.
 */
function createHttpService(
	baseUrl: string = "/api",
): Context.Tag.Service<HttpService> {
	const [httpStore, setHttpStore] = createHttpStore();

	const httpClient = Effect.gen(function* () {
		// If the HTTP client has already been created, return it.
		if (Option.isSome(httpStore.client)) {
			return httpStore.client.value;
		}

		// Otherwise, create a new HTTP client.
		const httpClient = yield* HttpClient.HttpClient;
		setHttpStore({ client: Option.some(httpClient) });

		return httpClient;
	});

	const httpRequest = createHttpRequest(baseUrl);

	return {
		httpClient,
		httpRequest,
	};
}

export { HttpService, createHttpService };
