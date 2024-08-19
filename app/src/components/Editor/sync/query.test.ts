import { Effect } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ElementNotFoundError } from "./errors";
import { ElementBlock, EmptyBlock } from "./types";
import { elementBlock, emptyBlock, querySelector } from "./query";

describe("Editor DOM queries", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("querySelector", () => {
		it("queries and returns element", () => {
			// Arrange
			const mockElement = {} as Element;
			vi.spyOn(document, "querySelector").mockReturnValue(mockElement);

			// Act
			const result = Effect.runSync(querySelector(".test"));

			// Assert
			expect(result).toBe(mockElement);
			expect(document.querySelector).toHaveBeenCalled();
		});

		it("throws ElementNotFoundError when element is not found", () => {
			// Arrange
			vi.spyOn(document, "querySelector").mockReturnValue(null);

			// Act
			const result = Effect.runSync(
				querySelector(".test").pipe(
					Effect.catchTag("ElementNotFoundError", (error) => {
						return Effect.succeed(error);
					}),
				),
			);

			// Assert
			expect(result).toBeInstanceOf(ElementNotFoundError);
			expect(document.querySelector).toHaveBeenCalled;
		});
	});

	describe("elementBlock", () => {
		it("queries and returns element", () => {
			// Arrange
			const block: ElementBlock = {
				type: "element",
				start: 1,
				end: 5,
				selector: ".test-block",
			};

			const mockElement = {} as Element;
			vi.spyOn(document, "querySelector").mockReturnValue(mockElement);

			// Act
			const result = Effect.runSync(elementBlock(block));

			// Assert
			expect(result).toBe(mockElement);
			expect(document.querySelector).toHaveBeenCalledWith(".test-block");
		});
	});

	describe("emptyBlock", () => {
		it("queries and returns empty block", () => {
			// Arrange
			const block: EmptyBlock = {
				type: "empty",
				start: 4,
				end: 4,
				previous: {
					type: "element",
					start: 1,
					end: 3,
					selector: ".previous-block",
				},
				next: {
					type: "element",
					start: 5,
					end: 7,
					selector: ".next-block",
				},
			};

			const mockPreviousElement = {} as Element;
			const mockNextElement = {} as Element;

			vi.spyOn(document, "querySelector").mockImplementation((selector) => {
				if (selector === ".previous-block") {
					return mockPreviousElement;
				} else if (selector === ".next-block") {
					return mockNextElement;
				} else {
					return null;
				}
			});

			// Act
			const result = Effect.runSync(emptyBlock(block));

			// Assert
			expect(result.previous).toBe(mockPreviousElement);
			expect(result.next).toBe(mockNextElement);
			expect(document.querySelector).toHaveBeenCalledWith(".previous-block");
			expect(document.querySelector).toHaveBeenCalledWith(".next-block");
		});
	});
});
