import classNames from "classnames";
import { CSSProperties, ComponentProps, ReactNode, forwardRef } from "react";
import { container } from "./ScrollContainer.css";

type ScrollContainerProps = {
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
} & ComponentProps<"div">;

export const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(
	(props, ref) => {
		const { className, style, ...rest } = props;

		return (
			<div
				ref={ref}
				className={classNames([container, className])}
				style={style}
				{...rest}
			>
				{props.children}
			</div>
		);
	},
);
