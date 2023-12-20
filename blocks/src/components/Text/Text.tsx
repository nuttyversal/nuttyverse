import React from 'react'
import './Text.css'

type TextProps = {
	children: React.ReactNode;
};

export const Text: React.FC<TextProps> = ({ children, ...props }) => {
	return <div>{children}</div>;
};
