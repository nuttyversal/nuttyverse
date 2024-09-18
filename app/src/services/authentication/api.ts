import { Schema } from "@effect/schema";
import { pipe } from "effect";
import {
	documentWithSingleResourceObject,
	DocumentWithSingleResourceObject,
	ResourceObject,
} from "~/utils/api";

const LoginRequestAttributes = Schema.Struct({
	username: Schema.String,
	password: Schema.String,
});

type LoginRequestAttributes = Schema.Schema.Type<typeof LoginRequestAttributes>;

const LoginRequestBody = DocumentWithSingleResourceObject(
	LoginRequestAttributes,
);

const loginRequestBody = (attributes: LoginRequestAttributes) => {
	const resourceObject: ResourceObject<LoginRequestAttributes> = {
		type: "navigator",
		attributes,
	};

	return pipe(resourceObject, documentWithSingleResourceObject);
};

export { LoginRequestAttributes, LoginRequestBody, loginRequestBody };
