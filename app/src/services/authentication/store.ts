import { Option } from "effect";
import { createStore } from "solid-js/store";
import { SnapshotFrom } from "xstate";
import { authenticationMachine } from "./machine";

/**
 * A session that represents the currently logged-in user.
 * It contains the username and the access token expiration date.
 */
type AuthenticationSession = {
	username: string;
	expiresAt: Date;
};

/**
 * The store that manages the authentication session.
 */
type AuthenticationStore = {
	/**
	 * The current authentication session.
	 */
	session: Option.Option<AuthenticationSession>;

	/**
	 * The current state of the authentication state machine.
	 */
	currentState: SnapshotFrom<typeof authenticationMachine> | null;
};

const createAuthenticationStore = () => {
	return createStore<AuthenticationStore>({
		session: Option.none(),
		currentState: null,
	});
};

export { AuthenticationSession, createAuthenticationStore };
