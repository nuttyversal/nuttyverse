import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import { MockServiceProvider } from "~/services/context";
import { Theme, mockThemeService } from "~/services/theme";
import { Chibi } from "./Chibi";

describe("Chibi component", () => {
	it("renders without crashing", () => {
		// Arrange.
		const { container } = render(() => (
			<MockServiceProvider>
				<Chibi />
			</MockServiceProvider>
		));

		// Assert.
		expect(container.querySelector("svg")).toBeTruthy();
	});

	it("toggles theme on mouse down", () => {
		// Arrange.
		const { getByRole } = render(() => (
			<MockServiceProvider>
				<Chibi />
			</MockServiceProvider>
		));

		const button = getByRole("button");

		// Act.
		fireEvent.mouseDown(button);

		// Assert.
		expect(mockThemeService.theme()).toBe(Theme.Dark);
	});

	it("toggles theme on click (for accessibility)", () => {
		// Arrange.
		const { getByRole } = render(() => (
			<MockServiceProvider>
				<Chibi />
			</MockServiceProvider>
		));

		const button = getByRole("button");

		// Act.
		fireEvent.click(button);

		// Assert.
		expect(mockThemeService.theme()).toBe(Theme.Dark);
	});

	it("has correct aria-label", () => {
		// Arrange.
		const { getByRole } = render(() => (
			<MockServiceProvider>
				<Chibi />
			</MockServiceProvider>
		));

		// Assert.
		const button = getByRole("button");
		expect(button).toHaveAttribute("aria-label", "Toggle theme");
	});

	it("toggles theme correctly when clicked multiple times", () => {
		// Arrange.
		const { getByRole } = render(() => (
			<MockServiceProvider>
				<Chibi />
			</MockServiceProvider>
		));

		const button = getByRole("button");

		// Act & Assert.
		expect(mockThemeService.theme()).toBe(Theme.Light);

		fireEvent.click(button);
		expect(mockThemeService.theme()).toBe(Theme.Dark);

		fireEvent.click(button);
		expect(mockThemeService.theme()).toBe(Theme.Light);
	});
});
