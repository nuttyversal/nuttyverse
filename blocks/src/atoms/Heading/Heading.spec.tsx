import { render } from "@testing-library/react";
import { ComponentProps } from "react";
import { Heading } from "./Heading";

const headingContent = "Heading";

describe("Heading", () => {
	it("should render the heading content with the correct level", () => {
		const levels = ["h2", "h3", "h4", "h5", "h6"] as const;

		levels.forEach((h) => {
			// Arrange
			render(<Heading type={h}>{headingContent}</Heading>);

			// Assert
			const headings = document.getElementsByTagName(h);
			expect(headings).toHaveLength(1);
			expect(headings[0]).toHaveTextContent(headingContent);
		});
	});

	it("should throw an error if the type is 'h1'", () => {
		// Arrange
		const spy = jest.spyOn(console, "error");
		spy.mockImplementation(() => {});

		// Act
		const renderError = () => {
			const h1 = "h1" as ComponentProps<typeof Heading>["type"];
			render(<Heading type={h1}>{headingContent}</Heading>);
		};

		// Assert
		expect(renderError).toThrow();
	});
});
