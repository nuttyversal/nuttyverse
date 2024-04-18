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
const black = "#070707";

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #070707
 * ✦ Gray:       #070707
 * ✦ Background: #fcfcfc
 */
const gray = {
	gray1: "#f9f9f9",
	gray2: "#f5f5f5",
	gray3: "#ececec",
	gray4: "#e4e4e4",
	gray5: "#dddddd",
	gray6: "#d5d5d5",
	gray7: "#c9c9c9",
	gray8: "#b7b7b7",
	gray9: "#878787",
	gray10: "#7d7d7d",
	gray11: "#5f5f5f",
	gray12: "#1f1f1f",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #070707
 * ✦ Gray:       #070707
 * ✦ Background: #fcfcfc
 */
const grayA = {
	grayA1: "#00000003",
	grayA2: "#00000007",
	grayA3: "#00000010",
	grayA4: "#00000018",
	grayA5: "#0000001f",
	grayA6: "#00000027",
	grayA7: "#00000034",
	grayA8: "#00000046",
	grayA9: "#00000076",
	grayA10: "#00000081",
	grayA11: "#0000009f",
	grayA12: "#000000e0",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #070707
 * ✦ Gray:       #070707
 * ✦ Background: #fcfcfc
 */
const grayP3 = {
	gray1: "oklch(98.3% 0 0)",
	gray2: "oklch(97% 0 0)",
	gray3: "oklch(94.4% 0 0)",
	gray4: "oklch(91.9% 0 0)",
	gray5: "oklch(89.7% 0 0)",
	gray6: "oklch(87.2% 0 0)",
	gray7: "oklch(83.7% 0 0)",
	gray8: "oklch(77.8% 0 0)",
	gray9: "oklch(62.5% 0 0)",
	gray10: "oklch(59% 0 0)",
	gray11: "oklch(48.7% 0 0)",
	gray12: "oklch(24% 0 0)",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #070707
 * ✦ Gray:       #070707
 * ✦ Background: #fcfcfc
 */
const grayP3A = {
	grayA1: "color(display-p3 0 0 0 / 0.012)",
	grayA2: "color(display-p3 0 0 0 / 0.028)",
	grayA3: "color(display-p3 0 0 0 / 0.063)",
	grayA4: "color(display-p3 0 0 0 / 0.095)",
	grayA5: "color(display-p3 0 0 0 / 0.123)",
	grayA6: "color(display-p3 0 0 0 / 0.155)",
	grayA7: "color(display-p3 0 0 0 / 0.202)",
	grayA8: "color(display-p3 0 0 0 / 0.274)",
	grayA9: "color(display-p3 0 0 0 / 0.464)",
	grayA10: "color(display-p3 0 0 0 / 0.504)",
	grayA11: "color(display-p3 0 0 0 / 0.623)",
	grayA12: "color(display-p3 0 0 0 / 0.877)",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #fcfcfc
 * ✦ Gray:       #070707
 * ✦ Background: #070707
 */
const grayDark = {
	gray1: "#070707",
	gray2: "#171717",
	gray3: "#212121",
	gray4: "#292929",
	gray5: "#313131",
	gray6: "#3a3a3a",
	gray7: "#484848",
	gray8: "#606060",
	gray9: "#6d6d6d",
	gray10: "#7a7a7a",
	gray11: "#b3b3b3",
	gray12: "#eeeeee",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #fcfcfc
 * ✦ Gray:       #070707
 * ✦ Background: #070707
 */
const grayDarkA = {
	grayA1: "#00000000",
	grayA2: "#ffffff10",
	grayA3: "#ffffff1b",
	grayA4: "#ffffff23",
	grayA5: "#ffffff2b",
	grayA6: "#ffffff34",
	grayA7: "#ffffff43",
	grayA8: "#ffffff5c",
	grayA9: "#ffffff69",
	grayA10: "#ffffff76",
	grayA11: "#ffffffb1",
	grayA12: "#ffffffee",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #fcfcfc
 * ✦ Gray:       #070707
 * ✦ Background: #070707
 */
const grayDarkP3 = {
	gray1: "oklch(12.9% 0 0)",
	gray2: "oklch(20.5% 0 0)",
	gray3: "oklch(24.9% 0 0)",
	gray4: "oklch(28.1% 0 0)",
	gray5: "oklch(31.1% 0 0)",
	gray6: "oklch(34.8% 0 0)",
	gray7: "oklch(40% 0 0)",
	gray8: "oklch(49% 0 0)",
	gray9: "oklch(53.5% 0 0)",
	gray10: "oklch(58.1% 0 0)",
	gray11: "oklch(76.7% 0 0)",
	gray12: "oklch(94.8% 0 0)",
};

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #fcfcfc
 * ✦ Gray:       #070707
 * ✦ Background: #070707
 */
const grayDarkP3A = {
	grayA1: "color(display-p3 0 0 0 / 0)",
	grayA2: "color(display-p3 1 1 1 / 0.065)",
	grayA3: "color(display-p3 1 1 1 / 0.105)",
	grayA4: "color(display-p3 1 1 1 / 0.137)",
	grayA5: "color(display-p3 1 1 1 / 0.169)",
	grayA6: "color(display-p3 1 1 1 / 0.206)",
	grayA7: "color(display-p3 1 1 1 / 0.262)",
	grayA8: "color(display-p3 1 1 1 / 0.359)",
	grayA9: "color(display-p3 1 1 1 / 0.411)",
	grayA10: "color(display-p3 1 1 1 / 0.464)",
	grayA11: "color(display-p3 1 1 1 / 0.694)",
	grayA12: "color(display-p3 1 1 1 / 0.931)",
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
