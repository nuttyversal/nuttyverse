/**
 * An error that is thrown when the editor container element is not
 * bound to a ref during the initialization of the editor.
 */
class EditorRefNotBoundError extends Error {
	readonly _tag = "EditorRefNotBoundError";

	constructor() {
		super(
			"Editor container ref not bound. " +
				"Ensure that the container signal is assigned to a ref.",
		);
	}
}

export { EditorRefNotBoundError };
