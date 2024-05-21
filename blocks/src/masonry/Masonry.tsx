import { CSSProperties } from "react";

type MasonryProps = {
	/**
	 * Additional class names to apply to the masonry container.
	 */
	className?: string;

	/**
	 * Additional styles to apply to the masonry container.
	 */
	style?: CSSProperties;
};

export const Masonry: React.FC<MasonryProps> = (props) => {
	return (
		<div className={props.className} style={props.style}>
			Masonry
		</div>
	);
};
