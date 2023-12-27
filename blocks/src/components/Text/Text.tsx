import React from 'react'
import { TextVariants, text } from './Text.css';

const DEFAULT_OPSZ = 18;
const DEFAULT_WDTH = 85;
const DEFAULT_WEIGHT = 400;
const DEFAULT_SIZE = 'body';
const DEFAULT_COMPONENT = 'p';

type TextProps = {
	children: React.ReactNode;
	// [TODO] Strongly type the polymorphic "as" prop to make illegal states
	// unrepresentable. For example, "a" should only be allowed if "href" is
	// specified.
	as?: React.ElementType;
	size?: NonNullable<TextVariants>['size'];
	opsz?: number;
	wdth?: number;
	weight?: number;
};

export const Text: React.FC<TextProps> = (props) => {
	const Component = props.as ?? DEFAULT_COMPONENT;

	let inferredFontSize: NonNullable<TextVariants>['size'] | undefined;
	if (!props.size) {
		if (typeof Component === 'string') {
			inferredFontSize = {
				h1: 'h1',
				h2: 'h2',
				h3: 'h3',
				h4: 'h4',
				h5: 'h5',
				h6: 'h6',
				p: 'body',
			}[Component];
		}
	}

	const opsz = props.opsz ?? DEFAULT_OPSZ;
	const wdth = props.wdth ?? DEFAULT_WDTH;
	const fontVariationSettings = `"opsz" ${opsz}, "wdth" ${wdth}`;

	const fontWeight = props.weight ?? DEFAULT_WEIGHT;
	const fontSize = props.size ?? inferredFontSize ?? DEFAULT_SIZE;

	// [TODO] Should the transition be applied to all CSS properties?
	const transition = 'all 0.2s ease-out';

	return (
		<Component
			style={{ fontVariationSettings, fontWeight, transition }}
			className={text({ size: fontSize })}
		>
			{props.children}
		</Component>
	);
};
