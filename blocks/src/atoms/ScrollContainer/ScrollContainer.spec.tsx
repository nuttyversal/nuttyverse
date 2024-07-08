import { render, screen } from "@testing-library/react";
import { ScrollContainer } from "./ScrollContainer";
import { ScrollGradient } from "./ScrollGradient";
import { ScrollGradientContainer } from "./ScrollGradientContainer";

describe("ScrollContainer", () => {
	it("renders the scroll container with children", async () => {
		// Arrange
		const children = "ScrollContainer content";

		// Act
		render(<ScrollContainer>{children}</ScrollContainer>);

		// Assert
		const container = await screen.findByTestId("scroll-container");
		expect(container).toHaveTextContent(children);
	});

	it("renders the scroll container with a gradient", async () => {
		// Arrange
		const children = "ScrollContainer content";

		// Act
		render(
			<ScrollGradientContainer>
				<ScrollGradient part="top" />
				<ScrollContainer>{children}</ScrollContainer>
				<ScrollGradient part="bottom" />
			</ScrollGradientContainer>,
		);

		// Assert
		const container = await screen.findByTestId("scroll-container");
		expect(container).toHaveTextContent(children);
		expect(screen.getByTestId("scroll-gradient-top")).toBeInTheDocument();
		expect(screen.getByTestId("scroll-gradient-bottom")).toBeInTheDocument();
	});
});
