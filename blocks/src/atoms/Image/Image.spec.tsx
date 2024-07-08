import { render, screen, waitFor } from "@testing-library/react";
import { Image } from "./Image";
import { withGaussianBlur, withPixelatedRendering } from "./Image.css";

const src = "https://nuttyver.se/image.jpg";
const previewSrc = "https://nuttyver.se/image-preview.jpg";

describe("Image", () => {
	it("renders the image with the correct source", async () => {
		// Arrange
		render(<Image src={src} />);

		// Act
		await screen.findByRole("img");

		// Assert
		expect(screen.getByRole("img")).toHaveAttribute("src", src);
	});

	it("renders the preview image while main image is loading", async () => {
		// Mock the Image constructor to simulate image loading.
		// See https://stackoverflow.com/questions/57092154/
		type ImageConstructor = new (
			width?: number | undefined,
			height?: number | undefined,
		) => HTMLImageElement;

		global.Image = class {
			onload: () => void;

			constructor() {
				this.onload = jest.fn();

				setTimeout(() => {
					this.onload();
				}, 50);
			}
		} as unknown as ImageConstructor;

		// Arrange
		render(<Image src={src} previewSrc={previewSrc} />);

		// Act
		await screen.findByRole("img");

		// Assert
		await waitFor(() => {
			expect(screen.getByRole("img")).toHaveAttribute("src", previewSrc);
			expect(screen.getByRole("img")).toHaveClass(withGaussianBlur);
		});

		await waitFor(() => {
			expect(screen.getByRole("img")).toHaveAttribute("src", src);
			expect(screen.getByRole("img")).not.toHaveClass(withGaussianBlur);
		});
	});

	it("renders the image with pixelated rendering", async () => {
		// Arrange
		render(<Image src={src} pixelated />);

		// Act
		await screen.findByRole("img");

		// Assert
		expect(screen.getByRole("img")).toHaveClass(withPixelatedRendering);
	});
});
