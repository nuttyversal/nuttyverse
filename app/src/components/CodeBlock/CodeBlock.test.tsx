import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { CodeBlock } from "./CodeBlock";

describe("CodeBlock component", () => {
	it("renders without crashing", () => {
		// Arrange.
		const { container } = render(() => (
			<CodeBlock
				code={"console.log('test');"}
				language="typescript"
				class="code-block"
			/>
		));

		// Assert.
		expect(container.querySelector(".code-block")).toBeTruthy();
	});
});
