/**
 * An error that is thrown when a login operation is attempted while the user
 * is already logged in. The user must log out before logging in again.
 */
class AlreadyLoggedInError extends Error {
	readonly _tag = "AlreadyLoggedInError";
}

/**
 * An error that is thrown when a logout operation is attempted while the user
 * is already logged out. The user must log in before logging out.
 */
class NotLoggedInError extends Error {
	readonly _tag = "NotLoggedInError";
}

/**
 * An error that is thrown when a token refresh operation fails.
 */
class TokenRefreshError extends Error {
	readonly _tag = "TokenRefreshError";
}

/**
 * An error that is thrown when a login operation fails.
 */
class LoginError extends Error {
	readonly _tag = "LoginError";
}

export {
	AlreadyLoggedInError,
	NotLoggedInError,
	TokenRefreshError,
	LoginError,
};
