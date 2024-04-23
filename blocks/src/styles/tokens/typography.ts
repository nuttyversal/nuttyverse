// 残酷な天使のように... did you know that this opening begins with a minor third?
// The Nuttyverse uses typographic scales based on this pitch ratio (6:5) to bring
// a sense of harmony and rhythm to its visual design.
const minorThird = 1.2;

const deriveTypeScale = (base: number) => {
	return {
		teeny: base / minorThird ** 2 + "px",
		smol: base / minorThird + "px",
		base: base + "px",
		xl: base * minorThird + "px",
		"2xl": base * minorThird ** 2 + "px",
		"3xl": base * minorThird ** 3 + "px",
		"4xl": base * minorThird ** 4 + "px",
		"5xl": base * minorThird ** 5 + "px",
		"6xl": base * minorThird ** 6 + "px",
		"7xl": base * minorThird ** 7 + "px",
	} as const;
};

/**
 * A type scale based on the minor third musical interval with a base font size
 * of 16px. This is the default type scale used in the design system.
 */
export const typeScale = deriveTypeScale(16);

/**
 * A type scale based on the minor third musical interval with a base font size
 * of 14px. This is used when rendering text in narrower viewports.
 */
export const narrowTypeScale = deriveTypeScale(14);

/**
 * An experiment with a fluid type scale that uses rem units that automatically
 * scales with the base font size.
 */
export const experimentalTypeScale = {
	teeny: `calc(1rem / pow(${minorThird}, 2))`,
	smol: `calc(1rem / pow(${minorThird}, 1))`,
	base: `calc (1rem * pow(${minorThird}, 0))`,
	xl: `calc(1rem * pow(${minorThird}, 1))`,
	"2xl": `calc(1rem * pow(${minorThird}, 2))`,
	"3xl": `calc(1rem * pow(${minorThird}, 3))`,
	"4xl": `calc(1rem * pow(${minorThird}, 4))`,
	"5xl": `calc(1rem * pow(${minorThird}, 5))`,
	"6xl": `calc(1rem * pow(${minorThird}, 6))`,
	"7xl": `calc(1rem * pow(${minorThird}, 7))`,
};

/**
 * The names of the available font sizes in the design system.
 */
export type FontSize = keyof typeof typeScale;
