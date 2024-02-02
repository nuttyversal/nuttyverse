import { useState } from "react";
import { base } from "./Button.css";

type ButtonProps = {
	children: React.ReactNode;
	sparkle?: boolean;
} & React.ComponentPropsWithoutRef<"button">;

export const Button = (props: ButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const { children, ...buttonProps } = props;
	const classNames = [base].join(" ");

	if (props.sparkle) {
		const star = isHovered ? "✧" : "✦";
		return (
			<button
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={classNames}
				{...buttonProps}
			>
				{star} {children} {star}
			</button>
		);
	}

	return (
		<button
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={classNames}
			{...buttonProps}
		>
			{children}
		</button>
	);
};
