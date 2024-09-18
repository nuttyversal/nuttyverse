import { HttpClient, HttpClientRequest } from "@effect/platform";
import { HttpClientError } from "@effect/platform/HttpClientError";
import { HttpBodyError } from "@effect/platform/HttpBody";
import { ParseError } from "@effect/schema/ParseResult";
import { Context, Effect, Option } from "effect";
import { Scope } from "effect/Scope";
import { Accessor, createMemo } from "solid-js";
import { createActor, SnapshotFrom } from "xstate";
import { HttpService } from "~/services/http";
import { authenticationMachine } from "./machine";
import { Login } from "./schema";
import { createAuthenticationStore } from "./store";

/**
 * A service that manages the authentication state of the application.
 */
class AuthenticationService extends Context.Tag("AuthenticationService")<
	AuthenticationService,
	{
		readonly state: Accessor<SnapshotFrom<
			typeof authenticationMachine
		> | null>;

		readonly login: (
			attributes: Login.RequestAttributes,
		) => Effect.Effect<
			Login.ResponseBody,
			HttpClientError | HttpBodyError | ParseError,
			HttpService | Scope | HttpClient.HttpClient.Service
		>;

		readonly logout: () => Effect.Effect<
			void,
			HttpClientError,
			HttpService | Scope | HttpClient.HttpClient.Service
		>;
	}
>() {}

/**
 * A service that manages the authentication state of the application.
 */
function createAuthenticationService(): Context.Tag.Service<AuthenticationService> {
	const [authenticationStore, setAuthenticationStore] =
		createAuthenticationStore();

	const state = createMemo(() => {
		return authenticationStore.currentState;
	});

	const stateMachine = createActor(authenticationMachine);

	const login = (attributes: Login.RequestAttributes) => {
		return Effect.gen(function* () {
			stateMachine.send({
				type: "LOGIN_ATTEMPT",
			});

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

			const response = yield* httpClient.execute(request);
			const responseJson = yield* response.json;
			const responseBody = yield* Login.decodeResponseBody(responseJson);

			if (
				response.status === 200 &&
				"data" in responseBody &&
				responseBody.data.attributes.is_valid
			) {
				const session = Option.some({
					username: responseBody.data.attributes.username,
					expiresAt: new Date(responseBody.data.attributes.expires_at),
				});

				setAuthenticationStore("session", session);

				stateMachine.send({
					type: "LOGIN_SUCCESS",
				});
			} else {
				stateMachine.send({
					type: "LOGIN_FAILURE",
				});
			}

			return responseBody;
		});
	};

	const logout = () => {
		return Effect.gen(function* () {
			stateMachine.send({
				type: "LOGOUT_ATTEMPT",
			});

			const httpService = yield* HttpService;
			const httpClient = yield* httpService.httpClient;

			const loginRequest = httpService.httpRequest({
				method: "POST",
				url: "/navigator/logout",
			});

			const response = yield* httpClient.execute(loginRequest);

			if (response.status === 200) {
				stateMachine.send({
					type: "LOGOUT_SUCCESS",
				});
			} else {
				stateMachine.send({
					type: "LOGOUT_FAILURE",
				});
			}
		});
	};

	stateMachine.start();

	stateMachine.subscribe((snapshot) => {
		if (
			JSON.stringify(snapshot) ===
			JSON.stringify(authenticationStore.currentState)
		) {
			// No-op if state hasn't changed.
			return;
		}

		setAuthenticationStore({
			...authenticationStore,
			currentState: snapshot,
		});
	});

	return {
		state,
		login,
		logout,
	};
}

export { AuthenticationService, createAuthenticationService };
