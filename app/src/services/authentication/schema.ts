import { Schema } from "@effect/schema";
import {
	DocumentWithErrors,
	documentWithSingleResourceObject,
	DocumentWithSingleResourceObject,
} from "~/utils/api";

/**
 * Represents the two pieces of information required to log in.
 */
const LoginCredentials = Schema.Struct({
	username: Schema.String,
	password: Schema.String,
});

/**
 * Represents the status of an access token. Used to keep track of how long the
 * access token is valid for and who it is that is logged in. It does not contain
 * the actual access token since that is stored in an HTTP-only cookie where it
 * is not accessible to JavaScript.
 */
const ValidAccessTokenStatus = Schema.Struct({
	is_valid: Schema.Literal(true),
	expires_at: Schema.Number,
	username: Schema.String,
});

/**
 * Represents the status of an invalid access token. When the access token is
 * invalid, any requests that require authentication will return a 401 status.
 */
const InvalidAccessTokenStatus = Schema.Struct({
	is_valid: Schema.Literal(false),
});

/**
 * Represents the status of an access token. It can either be valid or invalid.
 */
const AccessTokenStatus = Schema.Union(
	ValidAccessTokenStatus,
	InvalidAccessTokenStatus,
);

/**
 * Represents the response body for a login request.
 */
const LoginResponseBody = Schema.Union(
	DocumentWithSingleResourceObject(AccessTokenStatus),
	DocumentWithErrors,
);

const Login = {
	/**
	 * The payload attributes for a login request.
	 */
	RequestAttributes: LoginCredentials,

	/**
	 * The payload body for a login request.
	 */
	RequestBody: DocumentWithSingleResourceObject(LoginCredentials),

	/**
	 * Constructs a login request body.
	 */
	requestBody: (attributes: Login.RequestAttributes) => {
		return documentWithSingleResourceObject({
			type: "navigator",
			attributes,
		});
	},

	/**
	 * The payload attributes included in a login response.
	 */
	ResponseAttributes: AccessTokenStatus,

	/**
	 * The payload body for a login response.
	 */
	ResponseBody: LoginResponseBody,

	/**
	 * Decodes the response body for a login request.
	 */
	decodeResponseBody: Schema.decodeUnknown(LoginResponseBody),
};

namespace Login {
	/**
	 * The payload attributes for a login request.
	 */
	export type RequestAttributes = Schema.Schema.Type<typeof LoginCredentials>;

	/**
	 * The payload body for a login request.
	 */
	export type RequestBody = Schema.Schema.Type<typeof Login.RequestBody>;

	/**
	 * The payload attributes included in a login response.
	 */
	export type ResponseAttributes = Schema.Schema.Type<
		typeof AccessTokenStatus
	>;

	/**
	 * The payload body for a login response.
	 */
	export type ResponseBody = Schema.Schema.Type<typeof Login.ResponseBody>;
}

export { Login };
