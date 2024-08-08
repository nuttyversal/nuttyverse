import { describe, it, expect, vi } from "vitest";
import { useCarmackClick } from "./use-carmack-click";

const enum MouseButton {
	Left = 0,
	Right = 1,
}

describe("useCarmackClick hook", () => {
	it("should return handleMouseDown and handleClick functions", () => {
		// Arrange.
		const callback = vi.fn();
		const { handleMouseDown, handleClick } = useCarmackClick(callback);

		// Assert.
		expect(typeof handleMouseDown).toBe("function");
		expect(typeof handleClick).toBe("function");
	});

	it("should call the callback on mousedown", () => {
		// Arrange.
		const callback = vi.fn();
		const { handleMouseDown } = useCarmackClick(callback);

		// Act.
		const event = new MouseEvent("mousedown", { button: MouseButton.Left });
		handleMouseDown(event);

		// Assert.
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(event);
	});

	it("should not call the callback on mousedown with non-left button", () => {
		// Arrange.
		const callback = vi.fn();
		const { handleMouseDown } = useCarmackClick(callback);

		// Act.
		handleMouseDown(
			new MouseEvent("mousedown", {
				button: MouseButton.Right,
			}),
		);

		// Assert.
		expect(callback).not.toHaveBeenCalled();
	});

	it("should not call the callback on click after mousedown", () => {
		// Arrange.
		const callback = vi.fn();
		const { handleMouseDown, handleClick } = useCarmackClick(callback);

		// Act: This mousedown should trigger the callback.
		const mousedownEvent = new MouseEvent("mousedown", {
			button: MouseButton.Left,
		});

		handleMouseDown(mousedownEvent);

		// Act: This click should have been cancelled.
		const clickEvent = new MouseEvent("click", {
			button: MouseButton.Left,
		});

		handleClick(clickEvent);

		// Assert.
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(mousedownEvent);
	});

	it("should call the callback on click if no mousedown occurred", () => {
		// Arrange.
		const callback = vi.fn();
		const { handleClick } = useCarmackClick(callback);

		// Act.
		const event = new MouseEvent("click", {
			button: MouseButton.Left,
		});

		handleClick(event);

		// Assert
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(event);
	});

	it("should call the callback on click with non-left button", () => {
		// Arrange.
		const callback = vi.fn();
		const { handleClick } = useCarmackClick(callback);

		// Act.
		const event = new MouseEvent("click", { button: MouseButton.Right });
		handleClick(event);

		// Assert.
		expect(callback).toHaveBeenCalled();
	});

	it("should allow a click after a mousedown-click cycle", () => {
		// Arrange.
		const callback = vi.fn();
		const { handleMouseDown, handleClick } = useCarmackClick(callback);

		// Act: This mousedown should trigger the callback.
		handleMouseDown(
			new MouseEvent("mousedown", {
				button: MouseButton.Left,
			}),
		);

		// Act: This click should have been cancelled.
		handleClick(
			new MouseEvent("click", {
				button: MouseButton.Left,
			}),
		);

		// Act: This click should trigger the callback.
		const secondClickEvent = new MouseEvent("click", {
			button: MouseButton.Left,
		});

		handleClick(secondClickEvent);

		// Assert.
		expect(callback).toHaveBeenCalledTimes(2);
		expect(callback).toHaveBeenLastCalledWith(secondClickEvent);
	});
});
