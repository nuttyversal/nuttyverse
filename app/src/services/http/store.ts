import { HttpClient } from "@effect/platform";
import { HttpClientError } from "@effect/platform/HttpClientError";
import { Option } from "effect";
import { Scope } from "effect/Scope";
import { createStore } from "solid-js/store";

type HttpStore = {
	/**
	 * The HTTP client that is used to make API requests.
	 */
	client: Option.Option<
		HttpClient.HttpClient.WithResponse<HttpClientError, Scope>
	>;
};

const createHttpStore = () => {
	return createStore<HttpStore>({
		client: Option.none(),
	});
};

export { HttpStore, createHttpStore };
