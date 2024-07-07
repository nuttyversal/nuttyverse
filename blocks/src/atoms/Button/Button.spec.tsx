import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

const buttonContent = <div>Button</div>;
const bannerContent = { children: "Banner" };

describe("Button", () => {
	it("renders the button with children", async () => {
		// Arrange
		render(<Button>{buttonContent}</Button>);

		// Act
		await screen.findByRole("button");

		// Assert
		expect(screen.getByRole("button")).toHaveTextContent("Button");
	});

	it("renders the button with sparkles", async () => {
		// Arrange
		render(<Button sparkle>{buttonContent}</Button>);

		// Act
		await screen.findByRole("button");

		// Assert
		expect(screen.getByRole("button")).toHaveTextContent("✦ Button ✦");
	});

	it("renders the button with sparkles (hovered)", async () => {
		// Arrange
		render(<Button sparkle>{buttonContent}</Button>);

		// Act
		(await screen.findByRole("button")).focus();

		// Assert
		waitFor(() => {
			expect(screen.getByRole("button")).toHaveTextContent("✧ Button ✧");
		});
	});

	it("renders the button with a banner", async () => {
		// Arrange
		render(<Button banner={bannerContent}>{buttonContent}</Button>);

		// Act
		await screen.findByRole("button");

		// Assert
		expect(screen.getByRole("button")).toHaveTextContent("Button");
		expect(screen.getByText("Banner")).toBeInTheDocument();
	});
});
