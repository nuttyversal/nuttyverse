import { ReactNode, useContext } from "react";
import classNames from "classnames";
import { FontSize } from "~/styles/tokens/typography";
import {
	withDropCap,
	responsiveFontSize,
	lightMode,
	darkMode,
	base,
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
} & React.ComponentPropsWithoutRef<Component>;

export const Text = <Component extends React.ElementType>(
	props: TextProps<Component>,
) => {
	const {
		as,
		size,
		opsz,
		wdth,
		weight,
		dropCap,
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

	// Animate all text properties except font size, which, in my opinion, feels
	// sluggish when resizing the viewport with fluid typography.
	const transition = "all 0.2s ease-out; font-size 0";

	const textStyles = {
		margin,
		fontVariationSettings,
		fontWeight,
		transition,
		...polymorphicProps.style,
	};

	const textClassNames = classNames(
		base,
		responsiveFontSize[fontSize],
		polymorphicProps.className,
		{ [withDropCap]: dropCap },
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
