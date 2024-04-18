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
 * The names of the available font sizes in the design system.
 */
export type FontSize = keyof typeof typeScale;

/**
 * Background color for light mode.
 */
const white = "#fcfcfc";

/**
 * Background color for dark mode.
 */
const black = "#111111";

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #111111
 * ✦ Gray:       #111111
 * ✦ Background: #fcfcfc
 */
const gray = {
	gray1: "#fcfcfc",
	gray2: "#f9f9f9",
	gray3: "#f0f0f0",
	gray4: "#e8e8e8",
	gray5: "#e1e1e1",
	gray6: "#d9d9d9",
	gray7: "#cecece",
	gray8: "#bbbbbb",
	gray9: "#8c8c8c",
	gray10: "#828282",
	gray11: "#636363",
	gray12: "#1f1f1f",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #111111
 * ✦ Gray:       #111111
 * ✦ Background: #fcfcfc
 */
const grayA = {
	grayA1: "#00000003",
	grayA2: "#00000006",
	grayA3: "#0000000f",
	grayA4: "#00000017",
	grayA5: "#0000001e",
	grayA6: "#00000026",
	grayA7: "#00000031",
	grayA8: "#00000044",
	grayA9: "#00000073",
	grayA10: "#0000007d",
	grayA11: "#0000009c",
	grayA12: "#000000e0",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #111111
 * ✦ Gray:       #111111
 * ✦ Background: #fcfcfc
 */
const grayP3 = {
	gray1: "oklch(99.2% 0 0)",
	gray2: "oklch(98.1% 0 0)",
	gray3: "oklch(95.5% 0 0)",
	gray4: "oklch(93.1% 0 0)",
	gray5: "oklch(90.9% 0 0)",
	gray6: "oklch(88.5% 0 0)",
	gray7: "oklch(85.1% 0 0)",
	gray8: "oklch(79.3% 0 0)",
	gray9: "oklch(64% 0 0)",
	gray10: "oklch(60.5% 0 0)",
	gray11: "oklch(50.1% 0 0)",
	gray12: "oklch(24% 0 0)",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #111111
 * ✦ Gray:       #111111
 * ✦ Background: #fcfcfc
 */
const grayP3A = {
	grayA1: "color(display-p3 0 0 0 / 0.012)",
	grayA2: "color(display-p3 0 0 0 / 0.024)",
	grayA3: "color(display-p3 0 0 0 / 0.059)",
	grayA4: "color(display-p3 0 0 0 / 0.09)",
	grayA5: "color(display-p3 0 0 0 / 0.118)",
	grayA6: "color(display-p3 0 0 0 / 0.149)",
	grayA7: "color(display-p3 0 0 0 / 0.192)",
	grayA8: "color(display-p3 0 0 0 / 0.267)",
	grayA9: "color(display-p3 0 0 0 / 0.451)",
	grayA10: "color(display-p3 0 0 0 / 0.49)",
	grayA11: "color(display-p3 0 0 0 / 0.612)",
	grayA12: "color(display-p3 0 0 0 / 0.878)",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #fcfcfc
 * ✦ Gray:       #111111
 * ✦ Background: #111111
 */
const grayDark = {
	gray1: "#111111",
	gray2: "#191919",
	gray3: "#222222",
	gray4: "#2a2a2a",
	gray5: "#313131",
	gray6: "#3a3a3a",
	gray7: "#484848",
	gray8: "#606060",
	gray9: "#6e6e6e",
	gray10: "#7b7b7b",
	gray11: "#b4b4b4",
	gray12: "#eeeeee",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #fcfcfc
 * ✦ Gray:       #111111
 * ✦ Background: #111111
 */
const grayDarkA = {
	grayA1: "#00000000",
	grayA2: "#ffffff09",
	grayA3: "#ffffff12",
	grayA4: "#ffffff1b",
	grayA5: "#ffffff22",
	grayA6: "#ffffff2c",
	grayA7: "#ffffff3b",
	grayA8: "#ffffff55",
	grayA9: "#ffffff64",
	grayA10: "#ffffff72",
	grayA11: "#ffffffaf",
	grayA12: "#ffffffed",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #fcfcfc
 * ✦ Gray:       #111111
 * ✦ Background: #111111
 */
const grayDarkP3 = {
	gray1: "oklch(17.8% 0 0)",
	gray2: "oklch(21.3% 0 0)",
	gray3: "oklch(25.4% 0 0)",
	gray4: "oklch(28.3% 0 0)",
	gray5: "oklch(31.3% 0 0)",
	gray6: "oklch(34.9% 0 0)",
	gray7: "oklch(40.2% 0 0)",
	gray8: "oklch(48.8% 0 0)",
	gray9: "oklch(53.8% 0 0)",
	gray10: "oklch(58.4% 0 0)",
	gray11: "oklch(77% 0 0)",
	gray12: "oklch(94.9% 0 0)",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #fcfcfc
 * ✦ Gray:       #111111
 * ✦ Background: #111111
 */
const grayDarkP3A = {
	grayA1: "color(display-p3 0 0 0 / 0)",
	grayA2: "color(display-p3 1 1 1 / 0.034)",
	grayA3: "color(display-p3 1 1 1 / 0.071)",
	grayA4: "color(display-p3 1 1 1 / 0.105)",
	grayA5: "color(display-p3 1 1 1 / 0.134)",
	grayA6: "color(display-p3 1 1 1 / 0.172)",
	grayA7: "color(display-p3 1 1 1 / 0.231)",
	grayA8: "color(display-p3 1 1 1 / 0.332)",
	grayA9: "color(display-p3 1 1 1 / 0.391)",
	grayA10: "color(display-p3 1 1 1 / 0.445)",
	grayA11: "color(display-p3 1 1 1 / 0.685)",
	grayA12: "color(display-p3 1 1 1 / 0.929)",
};

export const colors = {
	black,
	white,
	gray,
	grayA,
	grayP3,
	grayP3A,
	grayDark,
	grayDarkA,
	grayDarkP3,
	grayDarkP3A,
};
