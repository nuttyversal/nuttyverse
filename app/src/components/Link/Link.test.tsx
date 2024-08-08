import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import { Link } from "./Link";

describe("Link Component", () => {
	beforeEach(() => {
		vi.stubGlobal("window", {
			...window,
			location: {
				...window.location,
				href: "http://localhost/",
			},
		});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it("renders correctly with basic props", () => {
		// Arrange.
		const { getByText } = render(() => (
			<Link href="https://example.com">Click me</Link>
		));

		// Act.
		const linkElement = getByText("Click me");

		// Assert.
		expect(linkElement.tagName).toBe("A");
		expect(linkElement).toHaveAttribute("href", "https://example.com");
	});

	it("opens in new tab when newTab prop is true", () => {
		// Arrange.
		const { getByText } = render(() => (
			<Link href="https://example.com" newTab={true}>
				New tab
			</Link>
		));

		// Act.
		const linkElement = getByText("New tab");

		// Assert.
		expect(linkElement).toHaveAttribute("target", "_blank");
		expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
	});

	it("attempts to navigate on mousedown for left click", () => {
		// Arrange.
		const { getByText } = render(() => (
			<Link href="https://example.com">Navigate</Link>
		));

		const linkElement = getByText("Navigate");

		// Act.
		fireEvent.mouseDown(linkElement, { button: 0 });

		// Assert.
		expect(window.location.href).toBe("https://example.com");
	});

	it("does not navigate on mousedown for right click", () => {
		// Arrange.
		const { getByText } = render(() => (
			<Link href="https://example.com">No navigate</Link>
		));

		const linkElement = getByText("No navigate");

		// Act.
		fireEvent.mouseDown(linkElement, { button: 2 });

		// Assert.
		expect(window.location.href).toBe("http://localhost/");
	});

	it("opens in new tab on mousedown when newTab is true", () => {
		// Arrange.
		const windowOpenMock = vi.fn();

		vi.stubGlobal("window", {
			...window,
			open: windowOpenMock,
		});

		const { getByText } = render(() => (
			<Link href="https://example.com" newTab={true}>
				New window
			</Link>
		));

		const linkElement = getByText("New window");

		// Act.
		fireEvent.mouseDown(linkElement, { button: 0 });

		// Assert.
		expect(windowOpenMock).toHaveBeenCalledWith(
			"https://example.com",
			"_blank",
			"noopener,noreferrer",
		);

		// Clean-up.
		vi.unstubAllGlobals();
	});

	it("preserves default behavior for keyboard navigation", () => {
		// Arrange.
		const { getByText } = render(() => (
			<Link href="https://example.com">Keyboard nav</Link>
		));

		const linkElement = getByText("Keyboard nav");
		const preventDefaultSpy = vi.fn();

		// Act.
		fireEvent.keyDown(linkElement, {
			key: "Enter",
			preventDefault: preventDefaultSpy,
		});

		// Assert.
		expect(preventDefaultSpy).not.toHaveBeenCalled();
	});
});
