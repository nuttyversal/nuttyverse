import { setup } from "xstate";

/**
 * A state machine that manages the authentication state of the application.
 */
const authenticationMachine = setup({
	types: {
		context: {} as {},
		events: {} as
			| { type: "ACCESS_TOKEN_VALID" }
			| { type: "ACCESS_TOKEN_INVALID" }
			| { type: "LOGIN_ATTEMPT" }
			| { type: "LOGIN_SUCCESS" }
			| { type: "LOGIN_FAILURE" }
			| { type: "LOGOUT_ATTEMPT" }
			| { type: "LOGOUT_SUCCESS" }
			| { type: "REFRESH_ATTEMPT" }
			| { type: "REFRESH_SUCCESS" }
			| { type: "REFRESH_FAILURE" }
			| { type: "REFRESH_FAILURE_WITH_LOGOUT" },
	},
}).createMachine({
	context: {},
	id: "authentication",
	initial: "initialization",
	states: {
		initialization: {
			initial: "checkingToken",
			states: {
				checkingToken: {
					on: {
						ACCESS_TOKEN_VALID: {
							target: "#authentication.loggedIn.idle",
						},
						ACCESS_TOKEN_INVALID: {
							target: "#authentication.loggedOut.idle",
						},
					},
				},
			},
		},
		loggedOut: {
			initial: "idle",
			states: {
				idle: {
					on: {
						LOGIN_ATTEMPT: {
							target: "loggingIn",
						},
					},
				},
				loggingIn: {
					on: {
						LOGIN_SUCCESS: {
							target: "#authentication.loggedIn.idle",
						},
						LOGIN_FAILURE: {
							target: "idle",
						},
					},
				},
			},
		},
		loggedIn: {
			initial: "idle",
			states: {
				idle: {
					on: {
						REFRESH_ATTEMPT: {
							target: "refreshingToken",
						},
						LOGOUT_ATTEMPT: {
							target: "loggingOut",
						},
					},
				},
				refreshingToken: {
					on: {
						REFRESH_SUCCESS: {
							target: "idle",
						},
						REFRESH_FAILURE: {
							target: "idle",
						},
						REFRESH_FAILURE_WITH_LOGOUT: {
							target: "#authentication.loggedOut.idle",
						},
					},
				},
				loggingOut: {
					on: {
						LOGOUT_SUCCESS: {
							target: "#authentication.loggedOut.idle",
						},
					},
				},
			},
		},
	},
});

export { authenticationMachine };
