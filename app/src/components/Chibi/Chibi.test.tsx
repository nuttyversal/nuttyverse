import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import { Chibi } from "./Chibi";
import { Theme, mockThemeService } from "~/services/theme";

describe("Chibi component", () => {
	it("renders without crashing", () => {
		// Arrange.
		const { container } = render(() => (
			<Chibi themeService={mockThemeService} />
		));

		// Assert.
		expect(container.querySelector("svg")).toBeTruthy();
	});

	it("applies custom className and style", () => {
		// Arrange.
		const customClass = "custom-class";
		const customStyle = { color: "rgb(255, 0, 0)" };

		const { container } = render(() => (
			<Chibi
				themeService={mockThemeService}
				className={customClass}
				style={customStyle}
			/>
		));

		// Assert.
		const svg = container.querySelector("svg");
		expect(svg).toHaveClass(customClass);
		expect(svg).toHaveStyle(customStyle);
	});

	it("toggles theme on mouse down", () => {
		// Arrange.
		const { getByRole } = render(() => (
			<Chibi themeService={mockThemeService} />
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
			<Chibi themeService={mockThemeService} />
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
			<Chibi themeService={mockThemeService} />
		));

		// Assert.
		const button = getByRole("button");
		expect(button).toHaveAttribute("aria-label", "Toggle theme");
	});

	it("toggles theme correctly when clicked multiple times", () => {
		// Arrange.
		const { getByRole } = render(() => (
			<Chibi themeService={mockThemeService} />
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
