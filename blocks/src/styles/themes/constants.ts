// 残酷な天使のように... did you know that this opening begins with a minor third?
// The Nuttyverse uses typographic scales based on this pitch ratio (6:5) to bring
// a sense of harmony and rhythm to its visual design.
const minorThird = 1.2;

const deriveTypeScale = (base: number) => {
	return {
		teeny: base / minorThird ** 2,
		smol: base / minorThird,
		base,
		xl: base * minorThird,
		"2xl": base * minorThird ** 2,
		"3xl": base * minorThird ** 3,
		"4xl": base * minorThird ** 4,
		"5xl": base * minorThird ** 5,
		"6xl": base * minorThird ** 6,
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
