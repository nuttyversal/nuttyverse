/**
 * An error that is thrown when an element is not found in the DOM.
 */
class ElementNotFoundError extends Error {
	readonly _tag = "ElementNotFoundError";

	constructor(selector: string) {
		super(`Element not found for selector: ${selector}`);
	}
}

export { ElementNotFoundError };
