import { ReactNode, useContext } from "react";
import classNames from "classnames";
import { NuttyverseContext } from "~/styles/themes/context";
import { FontSize } from "~/styles/themes/constants";
import {
	withDropCap,
	responsiveFontSize,
	lightMode,
	darkMode,
	base,
	withGlow,
} from "./Text.css";

const DEFAULT_OPSZ = 18;
const DEFAULT_WDTH = 85;
const DEFAULT_WEIGHT = 400;
const DEFAULT_SIZE = "base";
const DEFAULT_COMPONENT = "p";

type TextProps<Component extends React.ElementType> = {
	/**
	 * Specifies the text's content.
	 */
	children: ReactNode;

	/**
	 * Specifies the HTML element to render.
	 */
	as?: Component;

	/**
	 * Specifies the text's font size.
	 */
	size?: FontSize;

	/**
	 * Specifies the text's font optical size (only for variable fonts).
	 */
	opsz?: number;

	/**
	 * Specifies the text's font width (only for variable fonts).
	 */
	wdth?: number;

	/**
	 * Specifies the text's font weight.
	 */
	weight?: number;

	/**
	 * If enabled (`true`), applies a drop cap effect to the text.
	 */
	dropCap?: boolean;

	/**
	 * If enabled (`true`), applies a glow effect to the text in dark mode.
	 */
	glow?: boolean;
} & React.ComponentPropsWithoutRef<Component>;

export const Text = <Component extends React.ElementType>(
	props: TextProps<Component>,
) => {
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;

	const {
		as,
		size,
		opsz,
		wdth,
		weight,
		dropCap,
		glow,
		children,
		...polymorphicProps
	} = props;

	const Component = as ?? DEFAULT_COMPONENT;
	let inferredFontSize: FontSize | undefined;

	if (!props.size && typeof Component === "string") {
		if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(Component)) {
			inferredFontSize = (
				{
					h1: "6xl",
					h2: "5xl",
					h3: "4xl",
					h4: "3xl",
					h5: "2xl",
					h6: "xl",
				} as const
			)[Component as string];
		} else {
			inferredFontSize = DEFAULT_SIZE;
		}
	}

	// Consistent rem-based margin.
	const margin = "1.2rem 0";

	const fontOpsz = opsz ?? DEFAULT_OPSZ;
	const fontWdth = wdth ?? DEFAULT_WDTH;
	const fontVariationSettings = `"opsz" ${fontOpsz}, "wdth" ${fontWdth}`;
	const fontWeight = weight ?? DEFAULT_WEIGHT;
	const fontSize = size ?? inferredFontSize ?? DEFAULT_SIZE;
	const transition = "all 0.2s ease-out";

	const textStyles = {
		margin,
		fontVariationSettings,
		fontWeight,
		transition,
		...polymorphicProps.style,
	};

	const textClassNames = classNames(
		base,
		themeClass,
		responsiveFontSize[fontSize],
		polymorphicProps.className,
		{
			[withGlow]: glow,
			[withDropCap]: dropCap,
		},
	);

	return (
		<Component
			{...polymorphicProps}
			style={textStyles}
			className={textClassNames}
		>
			{children}
		</Component>
	);
};
