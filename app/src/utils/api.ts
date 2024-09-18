import { FetchHttpClient, HttpClientRequest } from "@effect/platform";
import { Options } from "@effect/platform/HttpClientRequest";
import { Schema } from "@effect/schema";
import { Layer, pipe } from "effect";

const customFetchLayer = FetchHttpClient.layer.pipe(
	Layer.provide(
		Layer.succeed(FetchHttpClient.RequestInit, {
			credentials: "include",
		}),
	),
);

/**
 * Represents a resource object in JSON:API.
 */
const ResourceObject = <Type, Encoded, Context>(
	Attributes: Schema.Schema<Type, Encoded, Context>,
) => {
	return Schema.Struct({
		/**
		 * A unique identifier for the resource object.
		 */
		id: Schema.optional(Schema.String),

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

type ResourceObject<Type, Encoded = Type, Context = never> = Schema.Schema.Type<
	ReturnType<typeof ResourceObject<Type, Encoded, Context>>
>;

/**
 * Represents an error object in JSON:API.
 */
const ErrorObject = Schema.Struct({
	/**
	 * A unique identifier for this particular occurrence of the problem.
	 */
	id: Schema.optional(Schema.String),

	/**
	 * The HTTP status code applicable to this problem, expressed as a string value.
	 */
	status: Schema.optional(Schema.String),

	/**
	 * An application-specific error code, expressed as a string value.
	 */
	code: Schema.optional(Schema.String),

	/**
	 * A short, human-readable summary of the problem.
	 */
	title: Schema.optional(Schema.String),

	/**
	 * A human-readable explanation specific to this occurrence of the problem.
	 */
	detail: Schema.optional(Schema.String),
});

/**
 * Represents a document with a single resource object in JSON:API.
 */
const DocumentWithSingleResourceObject = <Type, Encoded, Context>(
	Attributes: Schema.Schema<Type, Encoded, Context>,
) => {
	return Schema.Struct({
		data: ResourceObject(Attributes),
	});
};

type DocumentWithSingleResourceObject<
	Type,
	Encoded = Type,
	Context = never,
> = Schema.Schema.Type<
	ReturnType<typeof DocumentWithSingleResourceObject<Type, Encoded, Context>>
>;

/**
 * Constructs a `DocumentWithSingleResourceObject`.
 */
const documentWithSingleResourceObject = <Type, Encoded, Context>(
	resourceObject: ResourceObject<Type, Encoded, Context>,
): DocumentWithSingleResourceObject<Type, Encoded, Context> => ({
	data: resourceObject,
});

/**
 * Represents a document with multiple resource objects in JSON:API.
 */
const DocumentWithMultipleResourceObjects = <Type, Encoded, Context>(
	Attributes: Schema.Schema<Type, Encoded, Context>,
) => {
	return Schema.Struct({
		data: Schema.Array(ResourceObject(Attributes)),
	});
};

type DocumentWithMultipleResourceObjects<
	Type,
	Encoded = Type,
	Context = never,
> = Schema.Schema.Type<
	ReturnType<
		typeof DocumentWithMultipleResourceObjects<Type, Encoded, Context>
	>
>;

/**
 * Constructs a `DocumentWithMultipleResourceObjects`.
 */
const documentWithMultipleResourceObjects = <Type, Encoded, Context>(
	resourceObjects: ResourceObject<Type, Encoded, Context>[],
): DocumentWithMultipleResourceObjects<Type, Encoded, Context> => ({
	data: resourceObjects,
});

/**
 * Represents a document with errors in JSON:API.
 */
const DocumentWithErrors = Schema.Struct({
	errors: Schema.Array(ErrorObject),
});

/**
 * Represents a JSON:API document.
 */
const Document = <Type, Encoded, Context>(
	Attributes: Schema.Schema<Type, Encoded, Context>,
) => {
	return Schema.Union(
		DocumentWithSingleResourceObject(Attributes),
		DocumentWithMultipleResourceObjects(Attributes),
		DocumentWithErrors,
	);
};

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
	customFetchLayer,
	ResourceObject,
	ErrorObject,
	DocumentWithSingleResourceObject,
	documentWithSingleResourceObject,
	DocumentWithMultipleResourceObjects,
	documentWithMultipleResourceObjects,
	DocumentWithErrors,
	Document,
	createHttpRequest,
};
