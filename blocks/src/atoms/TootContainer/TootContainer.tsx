import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";
import { container, tailContainer, tailPath } from "./TootContainer.css";

type TootContainerProps = {
	/**
	 * Specifies the text's content.
	 */
	children: ReactNode;

	/**
	 * Additional class names to apply to the scroll container.
	 */
	className?: string;

	/**
	 * Additional styles to apply to the scroll container.
	 */
	style?: CSSProperties;
};

export const TootContainer: React.FC<TootContainerProps> = (props) => {
	return (
		<div
			className={classNames([container, props.className])}
			style={props.style}
		>
			<TootTail />
			{props.children}
		</div>
	);
};

const TootTail: React.FC = () => {
	return (
		<svg
			height="20px"
			viewBox="0 0 21 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={tailContainer}
		>
			<path
				d="M2.00011 4C0.253088 3.03473 -0.120189 1.00727 2.00015 1.00003L17 0.999999C18.349 0.995388 20.9695 0.776985 20.5 2V14.5C20.0306 15.723 18.1115 15.1141 17 14.5L2.00011 4Z"
				className={tailPath}
			/>
		</svg>
	);
};
