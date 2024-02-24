import { FontSize } from "../../styles/themes/constants";
import { withDropCap, responsiveFontSize } from "./Text.css";

const DEFAULT_OPSZ = 18;
const DEFAULT_WDTH = 85;
const DEFAULT_WEIGHT = 400;
const DEFAULT_SIZE = "base";
const DEFAULT_COMPONENT = "p";

type TextProps<Component extends React.ElementType> = {
	children: React.ReactNode;
	as?: Component;
	size?: FontSize;
	opsz?: number;
	wdth?: number;
	weight?: number;
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
			inferredFontSize = Component as FontSize;
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
