import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { CodeBlock } from "./CodeBlock";

describe("CodeBlock component", () => {
	it("renders without crashing", async () => {
		// Arrange.
		const { findByText } = render(() => (
			<CodeBlock
				code={"console.log('test');"}
				language="typescript"
				class="code-block"
			/>
		));

		// Assert.
		const codeBlock = await findByText("console");
		expect(codeBlock).toBeInTheDocument();
	});

	it("handles unsupported languages gracefully", async () => {
		// Arrange.
		const { findByText } = render(() => (
			<CodeBlock code={"[->+<]"} language={"brainfuck" as any} />
		));

		// Assert.
		const codeBlock = await findByText("[->+<]");
		expect(codeBlock).toBeInTheDocument();
	});
});
