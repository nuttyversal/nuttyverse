import { HttpClient, HttpClientRequest } from "@effect/platform";
import { HttpClientError } from "@effect/platform/HttpClientError";
import { HttpBodyError } from "@effect/platform/HttpBody";
import { ParseError } from "@effect/schema/ParseResult";
import { Clock, Context, Effect, Layer, Option, Schedule } from "effect";
import { Scope } from "effect/Scope";
import { Store } from "solid-js/store";
import { createActor } from "xstate";
import { ConfigService } from "~/services/config";
import { createHttpRequest } from "~/utils/api";
import {
	AlreadyLoggedInError,
	LoginError,
	NotLoggedInError,
	TokenRefreshError,
} from "./errors";
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
		 * Derived signal that indicates whether the user is logged in.
		 */
		readonly isLoggedIn: () => boolean;

		/**
		 * Derived signal that indicates whether the user is attempting
		 * to log in.
		 */
		readonly isLoggingIn: () => boolean;

		/**
		 * Derived signal that indicates whether the user is attempting
		 * to log out.
		 */
		readonly isLoggingOut: () => boolean;

		/**
		 * Derived signal that indicates whether the user is attempting
		 * to refresh their session token.
		 */
		readonly isRefreshingToken: () => boolean;

		/**
		 * Derived signal that indicates whether the user's access token
		 * has expired.
		 */
		readonly isTokenValid: Effect.Effect<boolean>;

		/**
		 * Derived signal that tracks the lifespan of the access token in
		 * milliseconds (ms).
		 */
		readonly tokenLifespan: Effect.Effect<number>;

		/**
		 * Initializes the authentication service.
		 */
		readonly initialize: Effect.Effect<any, any, Scope>;

		/**
		 * Starts the heartbeat that refreshes the user's access token when
		 * it gets close to expiring to extend the session.
		 */
		readonly startHeartbeat: Effect.Effect<any, any, never>;

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

		/**
		 * Attempt to refresh the user's session.
		 */
		readonly refresh: Effect.Effect<
			Login.ResponseBody,
			| NotLoggedInError
			| TokenRefreshError
			| HttpClientError
			| HttpBodyError
			| ParseError,
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

		const [store, setStore] = createAuthenticationStore(initialSnapshot);

		authenticationActor.subscribe((snapshot) => {
			setStore("snapshot", snapshot);
		});

		authenticationActor.start();

		const tokenLifespan = Effect.gen(function* () {
			const now = yield* Clock.currentTimeMillis;

			const expiresAt = store.session.pipe(
				Option.map((session) => session.expiresAt),
				Option.map((expiresAt) => expiresAt.getTime()),
				Option.getOrElse(() => 0),
			);

			return Math.max(expiresAt - now, 0);
		});

		const isTokenValid = Effect.gen(function* () {
			const lifespan = yield* tokenLifespan;
			return lifespan > 0;
		});

		const refresh = Effect.gen(function* () {
			if (store.snapshot.matches({ loggedIn: "refreshingToken" })) {
				yield* Effect.fail(new NotLoggedInError());
			}

			authenticationActor.send({
				type: "REFRESH_ATTEMPT",
			});

			const request = apiRequest({
				method: "POST",
				url: "/navigator/token/refresh",
			});

			const response = yield* httpClient.execute(request);
			const responseBody = yield* response.json;
			const responseBodyDecoded =
				yield* Login.decodeResponseBody(responseBody);

			if (
				"data" in responseBodyDecoded &&
				responseBodyDecoded.data.attributes.is_valid
			) {
				setStore(
					"session",
					Option.some({
						username: responseBodyDecoded.data.attributes.username,
						expiresAt: new Date(
							responseBodyDecoded.data.attributes.expires_at * 1000,
						),
					}),
				);
			} else {
				// The refresh attempt failed.
				yield* Effect.fail(new TokenRefreshError());
			}

			return responseBodyDecoded;
		}).pipe(
			Effect.tapBoth({
				onSuccess: () => {
					console.log("Refreshed token.");
					return Effect.succeed(
						authenticationActor.send({
							type: "REFRESH_SUCCESS",
						}),
					);
				},
				onFailure: (error) => {
					console.log("Failed to refresh token.", error);
					return Effect.gen(function* () {
						if (error instanceof NotLoggedInError) {
							return;
						}

						const shouldLogout = !(yield* isTokenValid);

						if (shouldLogout) {
							setStore("session", Option.none());
						}

						authenticationActor.send({
							type: shouldLogout
								? "REFRESH_FAILURE"
								: "REFRESH_FAILURE_WITH_LOGOUT",
						});
					});
				},
			}),
		);

		const heartbeat = Effect.gen(function* () {
			const lifespan = yield* tokenLifespan;

			if (store.snapshot.matches("loggedIn")) {
				if (lifespan <= 60 * 1000) {
					yield* refresh.pipe(Effect.scoped);
				}
			}
		});

		const startHeartbeat = Effect.repeat(
			heartbeat,
			Schedule.fixed("1 second"),
		);

		return {
			store,

			isLoggedIn: () => {
				return store.snapshot.matches("loggedIn");
			},

			isLoggingIn: () => {
				return store.snapshot.matches({ loggedOut: "loggingIn" });
			},

			isLoggingOut: () => {
				return store.snapshot.matches({ loggedIn: "loggingOut" });
			},

			isRefreshingToken: () => {
				return store.snapshot.matches({ loggedIn: "refreshingToken" });
			},

			tokenLifespan,

			isTokenValid,

			startHeartbeat,

			initialize: Effect.gen(function* () {
				const request = apiRequest({
					method: "POST",
					url: "/navigator/token/refresh",
				});

				const response = yield* httpClient.execute(request);
				const responseBody = yield* response.json;
				const responseBodyDecoded =
					yield* Login.decodeResponseBody(responseBody);

				if (
					"data" in responseBodyDecoded &&
					responseBodyDecoded.data.attributes.is_valid
				) {
					setStore(
						"session",
						Option.some({
							username: responseBodyDecoded.data.attributes.username,
							expiresAt: new Date(
								responseBodyDecoded.data.attributes.expires_at * 1000,
							),
						}),
					);
				} else {
					// The refresh attempt failed.
					yield* Effect.fail(new TokenRefreshError());
				}

				return responseBodyDecoded;
			}).pipe(
				Effect.tapBoth({
					onSuccess: () => {
						return Effect.succeed(
							authenticationActor.send({
								type: "ACCESS_TOKEN_VALID",
							}),
						);
					},
					onFailure: () => {
						return Effect.succeed(
							authenticationActor.send({
								type: "ACCESS_TOKEN_INVALID",
							}),
						);
					},
				}),
				Effect.catchAll(Effect.succeed),
			),

			login: (attributes: Login.RequestAttributes) => {
				return Effect.gen(function* () {
					if (!store.snapshot.matches("loggedOut")) {
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
						setStore(
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
						onFailure: (error) => {
							if (error instanceof AlreadyLoggedInError) {
								return Effect.succeed(undefined);
							}

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
				if (!store.snapshot.matches("loggedIn")) {
					return;
				}

				setStore("session", Option.none());

				authenticationActor.send({
					type: "LOGOUT_ATTEMPT",
				});

				yield* httpClient.execute(
					apiRequest({
						method: "POST",
						url: "/navigator/logout",
					}),
				);
			}).pipe(
				Effect.tapBoth({
					onSuccess: () => {
						return Effect.succeed(
							authenticationActor.send({
								type: "LOGOUT_SUCCESS",
							}),
						);
					},
					onFailure: (error) => {
						if (error instanceof NotLoggedInError) {
							return Effect.succeed(undefined);
						}

						return Effect.succeed(
							authenticationActor.send({
								type: "LOGOUT_SUCCESS",
							}),
						);
					},
				}),
			),

			refresh,
		};
	}),
);

export { AuthenticationService, AuthenticationLive };
