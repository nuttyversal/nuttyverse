import { render, screen } from "@testing-library/react";
import { Link } from "./Link";

describe("Link", () => {
	it("renders the link with children", async () => {
		// Arrange
		const linkContent = "Link";
		const href = "https://nuttyver.se";

		// Act
		render(<Link href={href}>{linkContent}</Link>);

		// Assert
		await screen.findByRole("link");
		expect(screen.getByRole("link")).toHaveTextContent(linkContent);
		expect(screen.getByRole("link")).toHaveAttribute("href", href);
	});

	it("renders the link in a new tab", async () => {
		// Arrange
		const linkContent = "Link";
		const href = "https://nuttyver.se";

		// Act
		render(
			<Link href={href} newTab>
				{linkContent}
			</Link>,
		);

		// Assert
		await screen.findByRole("link");
		expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
		expect(screen.getByRole("link")).toHaveAttribute("href", href);
	});
});
