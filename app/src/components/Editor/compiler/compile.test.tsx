import { Effect } from "effect";
import { Route } from "@solidjs/router";
import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { compileMarkdownJsx } from "./compile";
import { CompileError } from "./errors";
import { createSignal } from "solid-js";

describe("MDX compiler", () => {
	it("compiles MDX content into JSX", async () => {
		// Arrange.
		const [setSourceMap] = createSignal({});

		const content = `
			# Header

			This is a paragraph.
		`;

		// Act.
		const element = await Effect.runPromise(
			compileMarkdownJsx(content, setSourceMap),
		);

		const { container } = render(() => {
			return element;
		});

		// Assert.
		expect(container.querySelector("h1")).toBeInTheDocument();
		expect(container.querySelector("p")).toBeInTheDocument();
	});

	it("compiles code blocks into `CodeBlock` components", async () => {
		// Arrange.
		const [setSourceMap] = createSignal({});

		const content = `
			\`\`\`js
			console.log("Hello, world!");
			\`\`\`

			\`\`\`
			No language specified.
			\`\`\`
		`;

		// Act.
		const element = await Effect.runPromise(
			compileMarkdownJsx(content, setSourceMap),
		);

		const { container } = render(() => {
			return element;
		});

		// Assert.
		expect(container.querySelector("code")).toBeInTheDocument();
	});

	it("compiles math expressions with KaTeX", async () => {
		// Arrange.
		const [setSourceMap] = createSignal({});

		const content = `
			An inline example: $1 + 1 = 2$.

			A block example:
			$$
			\\frac{1}{2}
			$$
		`;

		// Act.
		const element = await Effect.runPromise(
			compileMarkdownJsx(content, setSourceMap),
		);

		const { container } = render(() => {
			return element;
		});

		// Assert.
		expect(container.querySelector(".katex")).toBeInTheDocument();
	});

	it("compiles links into `Link` components", async () => {
		// Arrange.
		const [setSourceMap] = createSignal({});

		const content = `
			[Absolute link](https://nuttyver.se)
			[Relative link](/about)
		`;

		// Act.
		const element = await Effect.runPromise(
			compileMarkdownJsx(content, setSourceMap),
		);

		const { findByText } = render(
			() => <Route path="/" component={() => element} />,
			{ location: "/" },
		);

		// Assert.
		const linkA = await findByText("Absolute link");
		expect(linkA).toHaveAttribute("href", "https://nuttyver.se");
		expect(linkA).toHaveAttribute("target", "_blank");

		const linkB = await findByText("Relative link");
		expect(linkB).toHaveAttribute("href", "/about");
		expect(linkB).not.toHaveAttribute("target", "_blank");
	});

	it("throws an error when compilation fails", async () => {
		// Arrange.
		const [setSourceMap] = createSignal({});

		const content = `
			This component is not defined in the registry:

			<BrokenComponent />
		`;

		// Act.
		const result = await Effect.runPromise(
			compileMarkdownJsx(content, setSourceMap).pipe(
				Effect.catchTag("CompileError", (error) => {
					return Effect.succeed(error);
				}),
			),
		);

		// Assert.
		expect(result).toBeInstanceOf(CompileError);
	});
});
