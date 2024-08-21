import { describe, it, expect, vi } from "vitest";
import { Route } from "@solidjs/router";
import { render, fireEvent } from "@solidjs/testing-library";
import { Link } from "./Link";

describe("Link component", () => {
	it("renders correctly with basic props", async () => {
		// Arrange.
		const App = () => <Link href="https://example.com">Click me</Link>;

		const { findByText } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		// Assert.
		const linkElement = await findByText("Click me");
		expect(linkElement.tagName).toBe("A");
		expect(linkElement).toHaveAttribute("href", "https://example.com");
	});

	it("opens in new tab when newTab prop is true", async () => {
		// Arrange.
		window.open = vi.fn();

		const App = () => (
			<Link href="https://example.com" newTab>
				New tab
			</Link>
		);

		const { findByText } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		// Act.
		const linkElement = await findByText("New tab");
		fireEvent.mouseDown(linkElement, { button: 0 });

		// Assert.
		expect(linkElement).toHaveAttribute("target", "_blank");
		expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
		expect(window.open).toHaveBeenCalledWith(
			"https://example.com",
			"_blank",
			"noopener,noreferrer",
		);
	});

	it("navigates immediately on left button mousedown", async () => {
		// Arrange.
		const AppA = () => <Link href="/b">Go to B</Link>;
		const AppB = () => <div>In B</div>;

		const { findByText } = render(
			() => (
				<>
					<Route path="/a" component={AppA} />
					<Route path="/b" component={AppB} />
				</>
			),
			{ location: "/a" },
		);

		// Act.
		const linkElement = await findByText("Go to B");
		fireEvent.mouseDown(linkElement, { button: 0 });

		// Assert.
		const b = await findByText("In B");
		expect(b).toBeInTheDocument();
	});

	it("does not navigate on mousedown for right click", async () => {
		// Arrange.
		const AppA = () => <Link href="/b">Go to B</Link>;
		const AppB = () => <div>In B</div>;

		const { findByText } = render(
			() => (
				<>
					<Route path="/a" component={AppA} />
					<Route path="/b" component={AppB} />
				</>
			),
			{ location: "/a" },
		);

		// Act.
		const linkElement = await findByText("Go to B");
		fireEvent.mouseDown(linkElement, { button: 1 });

		// Assert.
		const b = await findByText("Go to B");
		expect(b).toBeInTheDocument();
	});
});
