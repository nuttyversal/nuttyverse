import { HttpClient, HttpClientRequest } from "@effect/platform";
import { HttpClientResponse } from "@effect/platform/HttpClientResponse";
import { HttpClientError } from "@effect/platform/HttpClientError";
import { HttpBodyError } from "@effect/platform/HttpBody";
import { Context, Effect } from "effect";
import { Scope } from "effect/Scope";
import { HttpService } from "~/services/http";
import { Login } from "./schema";

/**
 * A service that manages the authentication state of the application.
 */
class AuthenticationService extends Context.Tag("AuthenticationService")<
	AuthenticationService,
	{
		readonly login: (
			attributes: Login.RequestAttributes,
		) => Effect.Effect<
			HttpClientResponse,
			HttpClientError | HttpBodyError,
			HttpService | Scope | HttpClient.HttpClient.Service
		>;

		readonly logout: () => Effect.Effect<
			HttpClientResponse,
			HttpClientError,
			HttpService | Scope | HttpClient.HttpClient.Service
		>;
	}
>() {}

/**
 * A service that manages the authentication state of the application.
 */
function createAuthenticationService(): Context.Tag.Service<AuthenticationService> {
	const login = (attributes: Login.RequestAttributes) => {
		return Effect.gen(function* () {
			const httpService = yield* HttpService;
			const httpClient = yield* httpService.httpClient;

			const requestBody = Login.requestBody(attributes);
			const requestBodyJson = HttpClientRequest.bodyJson(requestBody);

			const request = yield* httpService
				.httpRequest({
					method: "POST",
					url: "/navigator/token",
				})
				.pipe(requestBodyJson);

			return yield* httpClient.execute(request);
		});
	};

	const logout = () => {
		return Effect.gen(function* () {
			const httpService = yield* HttpService;
			const httpClient = yield* httpService.httpClient;

			const loginRequest = httpService.httpRequest({
				method: "POST",
				url: "/navigator/logout",
			});

			return yield* httpClient.execute(loginRequest);
		});
	};

	return {
		login,
		logout,
	};
}

export { AuthenticationService, createAuthenticationService };
