import { setup } from "xstate";

/**
 * A state machine that manages the authentication state of the application.
 */
const authenticationMachine = setup({
	types: {
		context: {} as {},
		events: {} as
			| { type: "LOGIN_ATTEMPT" }
			| { type: "LOGIN_SUCCESS" }
			| { type: "LOGIN_FAILURE" }
			| { type: "LOGOUT_ATTEMPT" }
			| { type: "LOGOUT_SUCCESS" }
			| { type: "LOGOUT_FAILURE" },
	},
}).createMachine({
	context: {},
	id: "authentication",
	initial: "loggedOut",
	states: {
		loggedOut: {
			on: {
				LOGIN_ATTEMPT: {
					target: "loggingIn",
				},
			},
		},
		loggingIn: {
			on: {
				LOGIN_SUCCESS: {
					target: "loggedIn",
				},
				LOGIN_FAILURE: {
					target: "loggedOut",
				},
			},
		},
		loggedIn: {
			on: {
				LOGOUT_ATTEMPT: {
					target: "loggingOut",
				},
			},
		},
		loggingOut: {
			on: {
				LOGOUT_SUCCESS: {
					target: "loggedOut",
				},
				LOGOUT_FAILURE: {
					target: "loggedIn",
				},
			},
		},
	},
});

export { authenticationMachine };
