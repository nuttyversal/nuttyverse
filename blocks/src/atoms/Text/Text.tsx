import { TextVariants, text, withDropCap } from "./Text.css";

const DEFAULT_OPSZ = 18;
const DEFAULT_WDTH = 85;
const DEFAULT_WEIGHT = 400;
const DEFAULT_SIZE = "body";
const DEFAULT_COMPONENT = "p";

type TextProps<Component extends React.ElementType> = {
	children: React.ReactNode;
	as?: Component;
	size?: NonNullable<TextVariants>["size"];
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
	let inferredFontSize: NonNullable<TextVariants>["size"];

	if (!props.size) {
		if (typeof Component === "string") {
			inferredFontSize = {
				h1: "h1",
				h2: "h2",
				h3: "h3",
				h4: "h4",
				h5: "h5",
				h6: "h6",
				p: "body",
			}[Component as keyof typeof inferredFontSize];
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
		text({ size: fontSize }),
		dropCap ? withDropCap : null,
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
