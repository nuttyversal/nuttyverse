import { Option } from "effect";
import { createStore } from "solid-js/store";

/**
 * A session that represents the currently logged-in user.
 * It contains the username and the access token expiration date.
 */
type AuthenticationSession = {
	username: string;
	accessTokenExpiresAt: Date;
};

/**
 * The store that manages the authentication session.
 */
type AuthenticationStore = {
	session: Option.Option<AuthenticationSession>;
};

const createAuthenticationStore = () => {
	return createStore<AuthenticationStore>({
		session: Option.none(),
	});
};

export { AuthenticationSession, createAuthenticationStore };
