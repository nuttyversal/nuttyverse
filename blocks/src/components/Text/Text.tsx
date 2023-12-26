import React from 'react'
import './Text.css'
import { TextVariants, text } from './Text.css';

const DEFAULT_OPSZ = 18;
const DEFAULT_WDTH = 85;
const DEFAULT_WEIGHT = 400;

export function createFontVariationSettings({ opsz, wdth }: { opsz: number, wdth: number }) {
	return `"opsz" ${opsz}, "wdth" ${wdth}`;
}

type TextProps = {
	children: React.ReactNode;
	size?: NonNullable<TextVariants>['size'];
	opsz?: number;
	wdth?: number;
	weight?: number;
};

export const Text: React.FC<TextProps> = (props) => {
	const fontVariationSettings = createFontVariationSettings({
		opsz: props.opsz ?? DEFAULT_OPSZ,
		wdth: props.wdth ?? DEFAULT_WDTH,
	});

	const fontWeight = props.weight ?? DEFAULT_WEIGHT;
	const transition = 'all 0.2s ease-out';

	return (
		<div
			style={{ fontVariationSettings, fontWeight, transition }}
			className={text({ size: props.size })}
		>
			{props.children}
		</div>
	);
};
