import { Effect } from "effect";
import { describe, it } from "vitest";
import { main } from "./index";
import { render } from "@solidjs/testing-library";

describe("Application startup", () => {
	it("renders without crashing", async () => {
		render(() => <div id="root"></div>);
		await Effect.runPromise(main);
	});
});
