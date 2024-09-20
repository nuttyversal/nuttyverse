import {
	FetchHttpClient,
	HttpClient,
	HttpClientRequest,
} from "@effect/platform";
import { Effect } from "effect";
import { describe, it, expect } from "vitest";
import { createHttpRequest } from "./api";

const baseUrl = "http://localhost:4000/api";

describe("API utilities", () => {
	it.skip("can make an API request", async () => {
		const workflow = Effect.gen(function* () {
			const httpClient = yield* HttpClient.HttpClient;
			const httpRequest = createHttpRequest(baseUrl);

			const body = HttpClientRequest.bodyJson({
				data: {
					type: "navigator",
					attributes: {
						username: "test",
						password: "test",
					},
				},
			});

			const loginRequest = yield* httpRequest({
				method: "POST",
				url: "/navigator/token",
			}).pipe(body);

			return yield* httpClient.execute(loginRequest);
		});

		const workflowWithDependencies = workflow.pipe(
			Effect.scoped,
			Effect.provide(FetchHttpClient.layer),
		);

		const response = await Effect.runPromise(workflowWithDependencies);

		expect(response.status).toBe(401);
	});
});
