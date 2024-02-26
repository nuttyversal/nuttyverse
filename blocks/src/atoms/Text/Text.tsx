import { useContext } from "react";
import {
	withDropCap,
	responsiveFontSize,
	lightMode,
	darkMode,
	base,
	withGlow,
} from "./Text.css";
import { NuttyverseContext } from "../../styles/themes/Context";
import { FontSize } from "../../styles/themes/constants";

const DEFAULT_OPSZ = 18;
const DEFAULT_WDTH = 85;
const DEFAULT_WEIGHT = 400;
const DEFAULT_SIZE = "base";
const DEFAULT_COMPONENT = "p";

type TextProps<Component extends React.ElementType> = {
	children: React.ReactNode;
	as?: Component;
	color?: string;
	size?: FontSize;
	opsz?: number;
	wdth?: number;
	weight?: number;
	dropCap?: boolean;
	glow?: boolean;
} & React.ComponentPropsWithoutRef<Component>;

export const Text = <Component extends React.ElementType>(
	props: TextProps<Component>,
) => {
	const context = useContext(NuttyverseContext);
	const themeClass = context.theme === "light" ? lightMode : darkMode;

	const {
		as,
		color,
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

	// [TODO] Should the transition be applied to all CSS properties?
	const transition = "all 0.2s ease-out";

	const classNames = [
		base,
		themeClass,
		glow ? withGlow : null,
		dropCap ? withDropCap : null,
		responsiveFontSize[fontSize],
		polymorphicProps.className,
	]
		.filter((x) => x !== null)
		.join(" ");

	return (
		<Component
			{...polymorphicProps}
			style={{
				margin,
				fontVariationSettings,
				fontWeight,
				transition,
				...polymorphicProps.style,
			}}
			className={classNames}
		>
			{children}
		</Component>
	);
};
