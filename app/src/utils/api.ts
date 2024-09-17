import { Cookies, HttpClient, HttpClientRequest } from "@effect/platform";
import { Options } from "@effect/platform/HttpClientRequest";
import { Schema } from "@effect/schema";
import { Effect, Ref, pipe } from "effect";

/**
 * Represents a resource object in JSON:API.
 */
const ResourceObject = <A, I, R>(Attributes: Schema.Schema<A, I, R>) => {
	return Schema.Struct({
		/**
		 * A unique identifier for the resource object.
		 */
		id: Schema.String,

		/**
		 * Describes resource objects that share common attributes and relationships.
		 */
		type: Schema.String,

		/**
		 * Represents information about the resource object.
		 */
		attributes: Attributes,
	});
};

/**
 * Represents an error object in JSON:API.
 */
const ErrorObject = Schema.Struct({
	/**
	 * A unique identifier for this particular occurrence of the problem.
	 */
	id: Schema.Option(Schema.String),

	/**
	 * The HTTP status code applicable to this problem, expressed as a string value.
	 */
	status: Schema.Option(Schema.String),

	/**
	 * An application-specific error code, expressed as a string value.
	 */
	code: Schema.Option(Schema.String),

	/**
	 * A short, human-readable summary of the problem.
	 */
	title: Schema.Option(Schema.String),

	/**
	 * A human-readable explanation specific to this occurrence of the problem.
	 */
	detail: Schema.Option(Schema.String),
});

/**
 * Represents a document with a single resource object in JSON:API.
 */
const DocumentWithSingleResourceObject = <A, I, R>(
	Attributes: Schema.Schema<A, I, R>,
) => {
	return Schema.Struct({
		data: ResourceObject(Attributes),
	});
};

/**
 * Represents a document with multiple resource objects in JSON:API.
 */
const DocumentWithMultipleResourceObjects = <A, I, R>(
	Attributes: Schema.Schema<A, I, R>,
) => {
	return Schema.Struct({
		data: Schema.Array(ResourceObject(Attributes)),
	});
};

/**
 * Represents a document with errors in JSON:API.
 */
const DocumentWithErrors = Schema.Struct({
	errors: Schema.Array(ErrorObject),
});

/**
 * Represents a JSON:API document.
 */
const Document = <A, I, R>(Attributes: Schema.Schema<A, I, R>) => {
	return Schema.Union(
		DocumentWithSingleResourceObject(Attributes),
		DocumentWithMultipleResourceObjects(Attributes),
		DocumentWithErrors,
	);
};

/**
 * Constructs an HTTP client with a cookie jar.
 */
const createHttpClient = Effect.gen(function* () {
	const cookiesRef = yield* Ref.make(Cookies.empty);
	const httpClient = yield* HttpClient.HttpClient;

	return pipe(httpClient, HttpClient.withCookiesRef(cookiesRef));
});

/**
 * Constructs an HTTP request.
 */
const createHttpRequest =
	(baseUrl: string) =>
	({ url, method = "GET", urlParams = {} }: Options) => {
		return pipe(
			HttpClientRequest.get(baseUrl + url),
			HttpClientRequest.setMethod(method),
			HttpClientRequest.setUrlParams(urlParams),
			HttpClientRequest.acceptJson,
		);
	};

export {
	ResourceObject,
	ErrorObject,
	DocumentWithSingleResourceObject,
	DocumentWithMultipleResourceObjects,
	DocumentWithErrors,
	Document,
	createHttpClient,
	createHttpRequest,
};
