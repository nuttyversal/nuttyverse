import classNames from "classnames";
import { CSSProperties, ComponentProps, ReactNode, forwardRef } from "react";
import { scrollContainer } from "./ScrollContainer.css";

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
				ref={(node) => {
					if (ref) {
						if (typeof ref === "function") {
							ref(node);
						} else {
							ref.current = node;
						}
					}
				}}
				className={classNames([scrollContainer, className])}
				style={style}
				data-testid="scroll-container"
				{...rest}
			>
				{props.children}
			</div>
		);
	},
);
