import { describe, it, expect } from "vitest";
import { render, fireEvent, waitFor } from "@solidjs/testing-library";
import { MockServiceProvider } from "~/services/context";
import { Theme, createMockThemeService } from "~/services/theme";
import { Chibi } from "./Chibi";
import { Route } from "@solidjs/router";

describe("Chibi component", () => {
	it("throws an error when rendered outside of a service provider", () => {
		// Arrange & Assert.
		expect(() => render(() => <Chibi />)).toThrowError();
	});

	it("renders without crashing", async () => {
		// Arrange.
		const App = () => (
			<MockServiceProvider>
				<Chibi />
			</MockServiceProvider>
		);

		const { container } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		// Assert.
		await waitFor(() => {
			expect(container.querySelector("svg")).toBeTruthy();
		});
	});

	it("toggles theme on mouse down", async () => {
		// Arrange.
		const mockThemeService = createMockThemeService();
		const serviceOverrides = { themeService: mockThemeService };

		const App = () => (
			<MockServiceProvider serviceOverrides={serviceOverrides}>
				<Chibi />
			</MockServiceProvider>
		);

		const { findByRole } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		const button = await findByRole("button");

		// Act.
		fireEvent.mouseDown(button);

		// Assert.
		expect(mockThemeService.theme()).toBe(Theme.Dark);
	});

	it("toggles theme on click (for accessibility)", async () => {
		// Arrange.
		const mockThemeService = createMockThemeService();
		const serviceOverrides = { themeService: mockThemeService };

		const App = () => (
			<MockServiceProvider serviceOverrides={serviceOverrides}>
				<Chibi />
			</MockServiceProvider>
		);

		const { findByRole } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		const button = await findByRole("button");

		// Act.
		fireEvent.click(button);

		// Assert.
		expect(mockThemeService.theme()).toBe(Theme.Dark);
	});

	it("has correct aria-label", async () => {
		// Arrange.
		const App = () => (
			<MockServiceProvider>
				<Chibi />
			</MockServiceProvider>
		);

		const { findByRole } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		// Assert.
		const button = await findByRole("button");
		expect(button).toHaveAttribute("aria-label", "Toggle theme");
	});

	it("toggles theme correctly when clicked multiple times", async () => {
		// Arrange.
		const mockThemeService = createMockThemeService();
		const serviceOverrides = { themeService: mockThemeService };

		const App = () => (
			<MockServiceProvider serviceOverrides={serviceOverrides}>
				<Chibi />
			</MockServiceProvider>
		);

		const { findByRole } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		const button = await findByRole("button");

		// Act & Assert.
		expect(mockThemeService.theme()).toBe(Theme.Light);

		fireEvent.click(button);
		expect(mockThemeService.theme()).toBe(Theme.Dark);

		fireEvent.click(button);
		expect(mockThemeService.theme()).toBe(Theme.Light);
	});
});
