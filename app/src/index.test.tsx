import { Effect } from "effect";
import { render } from "@solidjs/testing-library";
import { beforeEach, describe, expect, it } from "vitest";
import { NuttyverseLiveRuntime } from "~/services/layers";
import { getRootElement, main } from "./index";

describe("Application startup", () => {
	it("renders without crashing", async () => {
		render(() => (
			<div id="root">
				<div id="loading" />
			</div>
		));

		await NuttyverseLiveRuntime.runPromise(main);
	});

	describe("getRootElement", () => {
		beforeEach(() => {
			document.body.innerHTML = "";
		});

		it("returns the root element", async () => {
			render(() => <div id="root"></div>);
			const rootElement = await Effect.runPromise(getRootElement);
			expect(rootElement).not.toBe(null);
		});

		it("throws an error if the root element is not found", async () => {
			// Arrange.
			const rootElementOrError = Effect.runSync(
				getRootElement.pipe(Effect.catchAll(Effect.succeed)),
			);

			// Assert.
			expect(rootElementOrError).toBeInstanceOf(Error);
		});
	});
});
