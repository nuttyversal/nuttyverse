/**
 * An error that is thrown when MDX fails to compile.
 */
class CompileError extends Error {
	readonly _tag = "CompileError";
}

/**
 * An error that is thrown when KaTeX fails to render.
 */
class KaTeXRenderError extends Error {
	readonly _tag = "KaTeXRenderError";

	constructor(expression: string) {
		super(`Failed to render KaTeX expression: ${expression}`);
	}
}

export { CompileError, KaTeXRenderError };
