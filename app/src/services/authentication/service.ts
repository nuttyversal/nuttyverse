import { HttpClient, HttpClientRequest } from "@effect/platform";
import { HttpClientError } from "@effect/platform/HttpClientError";
import { HttpBodyError } from "@effect/platform/HttpBody";
import { ParseError } from "@effect/schema/ParseResult";
import { Context, Effect, Layer, Option } from "effect";
import { Scope } from "effect/Scope";
import { Store } from "solid-js/store";
import { createActor } from "xstate";
import { ConfigService } from "~/services/config";
import { createHttpRequest } from "~/utils/api";
import { AlreadyLoggedInError, LoginError, NotLoggedInError } from "./errors";
import { authenticationMachine } from "./machine";
import { Login } from "./schema";
import { AuthenticationStore, createAuthenticationStore } from "./store";

/**
 * A service that manages authentication state and provides operations
 * for logging in and out.
 */
class AuthenticationService extends Context.Tag("AuthenticationService")<
	AuthenticationService,
	{
		/**
		 * Read-only access to the authentication store with reactive
		 * values that can be used in Solid components.
		 */
		readonly store: Store<AuthenticationStore>;

		/**
		 * Logs in the user with the given credentials.
		 */
		readonly login: (
			attributes: Login.RequestAttributes,
		) => Effect.Effect<
			Login.ResponseBody,
			| AlreadyLoggedInError
			| LoginError
			| HttpClientError
			| HttpBodyError
			| ParseError,
			Scope
		>;

		/**
		 * Logs out the currently logged-in user.
		 */
		readonly logout: Effect.Effect<
			void,
			NotLoggedInError | HttpClientError,
			Scope
		>;
	}
>() {}

const AuthenticationLive = Layer.effect(
	AuthenticationService,
	Effect.gen(function* () {
		const httpClient = yield* HttpClient.HttpClient;
		const configService = yield* ConfigService;

		const config = yield* configService.getConfig;
		const apiRequest = createHttpRequest(config.apiBaseUrl);

		// Set up the authentication state machine.
		const authenticationActor = createActor(authenticationMachine);
		const initialSnapshot = authenticationActor.getSnapshot();

		const [authenticationStore, setAuthenticationStore] =
			createAuthenticationStore(initialSnapshot);

		authenticationActor.subscribe((snapshot) => {
			setAuthenticationStore("snapshot", snapshot);
		});

		authenticationActor.start();

		return {
			store: authenticationStore,

			login: (attributes: Login.RequestAttributes) => {
				return Effect.gen(function* () {
					if (!authenticationStore.snapshot.matches("loggedOut")) {
						// The user is already logged in.
						yield* Effect.fail(new AlreadyLoggedInError());
					}

					authenticationActor.send({
						type: "LOGIN_ATTEMPT",
					});

					const requestBody = Login.requestBody(attributes);
					const withRequestBody = HttpClientRequest.bodyJson(requestBody);

					const request = yield* apiRequest({
						method: "POST",
						url: "/navigator/token",
					}).pipe(withRequestBody);

					const response = yield* httpClient.execute(request);
					const responseBody = yield* response.json;
					const responseBodyDecoded =
						yield* Login.decodeResponseBody(responseBody);

					if (
						"data" in responseBodyDecoded &&
						responseBodyDecoded.data.attributes.is_valid
					) {
						setAuthenticationStore(
							"session",
							Option.some({
								username: responseBodyDecoded.data.attributes.username,
								expiresAt: new Date(
									responseBodyDecoded.data.attributes.expires_at *
										1000,
								),
							}),
						);
					} else {
						// The login attempt failed.
						yield* Effect.fail(new LoginError());
					}

					return responseBodyDecoded;
				}).pipe(
					Effect.tapBoth({
						onSuccess: () => {
							return Effect.succeed(
								authenticationActor.send({
									type: "LOGIN_SUCCESS",
								}),
							);
						},
						onFailure: () => {
							return Effect.succeed(
								authenticationActor.send({
									type: "LOGIN_FAILURE",
								}),
							);
						},
					}),
				);
			},

			logout: Effect.gen(function* () {
				if (!authenticationStore.snapshot.matches("loggedIn")) {
					// The user is not logged in.
					yield* Effect.fail(new NotLoggedInError());
				}

				authenticationActor.send({
					type: "LOGOUT_ATTEMPT",
				});

				yield* httpClient.execute(
					apiRequest({
						method: "POST",
						url: "/navigator/logout",
					}),
				);

				setAuthenticationStore("session", Option.none());
			}).pipe(
				Effect.tapBoth({
					onSuccess: () => {
						return Effect.succeed(
							authenticationActor.send({
								type: "LOGOUT_SUCCESS",
							}),
						);
					},
					onFailure: () => {
						return Effect.succeed(
							authenticationActor.send({
								type: "LOGOUT_FAILURE",
							}),
						);
					},
				}),
			),
		};
	}),
);

export { AuthenticationService, AuthenticationLive };
