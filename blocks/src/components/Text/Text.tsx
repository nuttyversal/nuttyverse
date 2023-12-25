import React from 'react'
import './Text.css'
import { TextVariants, text } from './Text.css';

export function createFontVariationSettings({ opsz, wdth }: { opsz: number, wdth: number }) {
	return `"opsz" ${opsz}, "wdth" ${wdth}`;
}

type TextProps = {
	children: React.ReactNode;
	size?: NonNullable<TextVariants>['size'];
	opsz: number;
	wdth: number;
	weight: number;
};

export const Text: React.FC<TextProps> = (props) => {
	const fontVariationSettings = createFontVariationSettings(props);
	const transition = 'all 0.2s ease-out';
	const fontWeight = props.weight;
	const className = text({ size: props.size });

	return <div style={{ fontVariationSettings, fontWeight, transition }} className={className}>{props.children}</div>;
};
