import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";
import { grid } from "./ImageGrid.css";

type ImageGridProps = {
	/**
	 * List of grid items to render.
	 */
	children: ReactNode;

	/**
	 * Additional class names to apply to the image grid.
	 */
	className?: string;

	/**
	 * Additional styles to apply to the image grid.
	 */
	style?: CSSProperties;
};

export const ImageGrid: React.FC<ImageGridProps> = (props) => {
	return (
		<div className={classNames([grid, props.className])} style={props.style}>
			{props.children}
		</div>
	);
};
