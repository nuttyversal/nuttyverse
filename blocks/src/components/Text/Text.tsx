import React from 'react'
import './Text.css'
import { TextVariants, text } from './Text.css';

type TextProps = {
	children: React.ReactNode;
	size?: NonNullable<TextVariants>['size'];
};

export const Text: React.FC<TextProps> = (props) => {
	return <div className={text({ size: props.size })}>{props.children}</div>;
};
