/**
 * Not pure black (#000), but still quite dark.
 */
export const black = "#070707" as const;

/**
 * An off-white, but still quite white.
 */
export const white = "#fcfcfc" as const;

/**
 * Generated as a custom palette with the following parameters:
 *
 * ✦ Accent:     #070707
 * ✦ Gray:       #070707
 * ✦ Background: #fcfcfc
 */
export const gray = {
	light: {
		"01": "#f9f9f9",
		"02": "#f5f5f5",
		"03": "#ececec",
		"04": "#e4e4e4",
		"05": "#dddddd",
		"06": "#d5d5d5",
		"07": "#c9c9c9",
		"08": "#b7b7b7",
		"09": "#878787",
		"10": "#7d7d7d",
		"11": "#5f5f5f",
		"12": "#1f1f1f",
	},
	lightAlpha: {
		"01": "#00000003",
		"02": "#00000007",
		"03": "#00000010",
		"04": "#00000018",
		"05": "#0000001f",
		"06": "#00000027",
		"07": "#00000034",
		"08": "#00000046",
		"09": "#00000076",
		"10": "#00000081",
		"11": "#0000009f",
		"12": "#000000e0",
	},
	dark: {
		"01": "#070707",
		"02": "#171717",
		"03": "#212121",
		"04": "#292929",
		"05": "#313131",
		"06": "#3a3a3a",
		"07": "#484848",
		"08": "#606060",
		"09": "#6d6d6d",
		"10": "#7a7a7a",
		"11": "#b3b3b3",
		"12": "#eeeeee",
	},
	darkAlpha: {
		"01": "#00000000",
		"02": "#ffffff10",
		"03": "#ffffff1b",
		"04": "#ffffff23",
		"05": "#ffffff2b",
		"06": "#ffffff34",
		"07": "#ffffff43",
		"08": "#ffffff5c",
		"09": "#ffffff69",
		"10": "#ffffff76",
		"11": "#ffffffb1",
		"12": "#ffffffee",
	},
	p3: {
		light: {
			"01": "oklch(98.3% 0 0)",
			"02": "oklch(97% 0 0)",
			"03": "oklch(94.4% 0 0)",
			"04": "oklch(91.9% 0 0)",
			"05": "oklch(89.7% 0 0)",
			"06": "oklch(87.2% 0 0)",
			"07": "oklch(83.7% 0 0)",
			"08": "oklch(77.8% 0 0)",
			"09": "oklch(62.5% 0 0)",
			"10": "oklch(59% 0 0)",
			"11": "oklch(48.7% 0 0)",
			"12": "oklch(24% 0 0)",
		},
		lightAlpha: {
			"01": "color(display-p3 0 0 0 / 0.012)",
			"02": "color(display-p3 0 0 0 / 0.028)",
			"03": "color(display-p3 0 0 0 / 0.063)",
			"04": "color(display-p3 0 0 0 / 0.095)",
			"05": "color(display-p3 0 0 0 / 0.123)",
			"06": "color(display-p3 0 0 0 / 0.155)",
			"07": "color(display-p3 0 0 0 / 0.202)",
			"08": "color(display-p3 0 0 0 / 0.274)",
			"09": "color(display-p3 0 0 0 / 0.464)",
			"10": "color(display-p3 0 0 0 / 0.504)",
			"11": "color(display-p3 0 0 0 / 0.623)",
			"12": "color(display-p3 0 0 0 / 0.877)",
		},
		dark: {
			"01": "oklch(12.9% 0 0)",
			"02": "oklch(20.5% 0 0)",
			"03": "oklch(24.9% 0 0)",
			"04": "oklch(28.1% 0 0)",
			"05": "oklch(31.1% 0 0)",
			"06": "oklch(34.8% 0 0)",
			"07": "oklch(40% 0 0)",
			"08": "oklch(49% 0 0)",
			"09": "oklch(53.5% 0 0)",
			"10": "oklch(58.1% 0 0)",
			"11": "oklch(76.7% 0 0)",
			"12": "oklch(94.8% 0 0)",
		},
		darkAlpha: {
			"01": "color(display-p3 0 0 0 / 0)",
			"02": "color(display-p3 1 1 1 / 0.065)",
			"03": "color(display-p3 1 1 1 / 0.105)",
			"04": "color(display-p3 1 1 1 / 0.137)",
			"05": "color(display-p3 1 1 1 / 0.169)",
			"06": "color(display-p3 1 1 1 / 0.206)",
			"07": "color(display-p3 1 1 1 / 0.262)",
			"08": "color(display-p3 1 1 1 / 0.359)",
			"09": "color(display-p3 1 1 1 / 0.411)",
			"10": "color(display-p3 1 1 1 / 0.464)",
			"11": "color(display-p3 1 1 1 / 0.694)",
			"12": "color(display-p3 1 1 1 / 0.931)",
		},
	},
} as const;

console.log(gray);
