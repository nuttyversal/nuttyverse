import { fireEvent, render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { VimSpell } from "./VimSpell";

describe("VimSpell component", () => {
	it("renders without crashing", async () => {
		// Arrange.
		const { findByText, unmount } = render(() => <VimSpell spell="w" />);

		// Assert.
		expect(await findByText("next word")).toBeInTheDocument();

		// Clean up.
		unmount();
	});

	it("renders error message for unknown spell", async () => {
		// Arrange.
		const { findByText } = render(() => <VimSpell spell="abc" />);

		// Assert.
		expect(
			await findByText("This spell has not been documented."),
		).toBeInTheDocument();
	});

	it("tracks spell casting progress", async () => {
		// Arrange.
		const { findByText } = render(() => <VimSpell spell="w" />);

		// Act.
		fireEvent.keyDown(document, { key: "w" });

		// Assert.
		expect(await findByText("✨")).toBeInTheDocument();
	});

	it("tracks multi-key spell casting progress", async () => {
		// Arrange.
		const { findByText } = render(() => <VimSpell spell="gg" />);

		// Act.
		fireEvent.keyDown(document, { key: "g" });
		fireEvent.keyDown(document, { key: "g" });

		// Assert.
		expect(await findByText("✨")).toBeInTheDocument();
	});

	it("tracks modifier-key spell casting progress", async () => {
		// Arrange.
		const { findByText } = render(() => <VimSpell spell="Ctrl+d" />);

		// Act.
		const event = new KeyboardEvent("keydown", { key: "d", ctrlKey: true });
		document.dispatchEvent(event);

		// Assert.
		expect(await findByText("✨")).toBeInTheDocument();
	});

	it("tracks <Esc> spell casting progress", async () => {
		// Arrange.
		const { findByText } = render(() => <VimSpell spell="Esc" />);

		// Act.
		fireEvent.keyDown(document, { key: "Escape" });

		// Assert.
		expect(await findByText("✨")).toBeInTheDocument();
	});
});
