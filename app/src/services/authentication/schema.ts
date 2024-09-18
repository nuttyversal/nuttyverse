import { Schema } from "@effect/schema";
import {
	DocumentWithErrors,
	documentWithSingleResourceObject,
	DocumentWithSingleResourceObject,
} from "~/utils/api";

const LoginCredentials = Schema.Struct({
	username: Schema.String,
	password: Schema.String,
});

const ValidAccessTokenStatus = Schema.Struct({
	is_valid: Schema.Literal(true),
	expires_at: Schema.Number,
	username: Schema.String,
});

const InvalidAccessTokenStatus = Schema.Struct({
	is_valid: Schema.Literal(false),
});

const AccessTokenStatus = Schema.Union(
	ValidAccessTokenStatus,
	InvalidAccessTokenStatus,
);

const LoginResponseBody = Schema.Union(
	DocumentWithSingleResourceObject(AccessTokenStatus),
	DocumentWithErrors,
);

const Login = {
	RequestAttributes: LoginCredentials,

	RequestBody: DocumentWithSingleResourceObject(LoginCredentials),

	requestBody: (attributes: Login.RequestAttributes) => {
		return documentWithSingleResourceObject({
			type: "navigator",
			attributes,
		});
	},

	ResponseAttributes: AccessTokenStatus,

	ResponseBody: LoginResponseBody,

	decodeResponseBody: Schema.decodeUnknown(LoginResponseBody),
};

namespace Login {
	export type RequestAttributes = Schema.Schema.Type<typeof LoginCredentials>;

	export type RequestBody = Schema.Schema.Type<typeof Login.RequestBody>;

	export type ResponseAttributes = Schema.Schema.Type<
		typeof AccessTokenStatus
	>;

	export type ResponseBody = Schema.Schema.Type<typeof Login.ResponseBody>;
}

export { Login };
