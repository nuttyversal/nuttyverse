import { Schema } from "@effect/schema";
import {
	documentWithSingleResourceObject,
	DocumentWithSingleResourceObject,
} from "~/utils/api";

const LoginCredentials = Schema.Struct({
	username: Schema.String,
	password: Schema.String,
});

const Login = {
	RequestAttributes: LoginCredentials,

	RequestBody: DocumentWithSingleResourceObject(LoginCredentials),

	requestBody: (attributes: Login.RequestAttributes) => {
		return documentWithSingleResourceObject({
			type: "navigator",
			attributes,
		});
	},
};

namespace Login {
	export type RequestAttributes = Schema.Schema.Type<typeof LoginCredentials>;
}

export { Login };
