import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";
import { container } from "./QuoteBlock.css";

type QuoteBlockProps = {
	/**
	 * Specifies the blockquote's content.
	 */
	children: ReactNode;

	/**
	 * Specifies the URL to a cited source.
	 */
	citation?: string;

	/**
	 * Additional class names to apply to the blockquote element.
	 */
	className?: string;

	/**
	 * Additional styles to apply to the blockquote element.
	 */
	style?: CSSProperties;
};

export const QuoteBlock: React.FC<QuoteBlockProps> = (props) => {
	return (
		<blockquote
			className={classNames(container, props.className)}
			style={props.style}
			cite={props.citation}
		>
			{props.children}
		</blockquote>
	);
};
