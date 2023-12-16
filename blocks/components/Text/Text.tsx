import React from 'react'

type TextProps = {
	children: React.ReactNode;
};

export const Text: React.FC<TextProps> = ({ children, ...props }) => {
	return <div>Nuttyverse Blocks</div>;
};
