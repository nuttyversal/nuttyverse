import { useState } from "react";
import { banner, base, container } from "./Button.css";

type ButtonProps = {
	children: React.ReactNode;
	banner?: ButtonBannerProps;
	sparkle?: boolean | any;
} & React.ComponentPropsWithoutRef<"button">;

export const Button = (props: ButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const { children, ...buttonProps } = props;
	const classNames = [base].join(" ");

	return (
		<div className={container}>
			<button
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={classNames}
				{...buttonProps}
			>
				{isHovered ? "✧ " : "✦ "}
				{children}
				{isHovered ? " ✧" : " ✦"}
			</button>

			{props.banner && (
				<ButtonBanner {...props.banner} isHovered={isHovered} />
			)}
		</div>
	);
};

type ButtonBannerProps = {
	children: React.ReactNode;
	background?: string;
};

type ButtonBannerInternalProps = {
	isHovered: boolean;
};

export const ButtonBanner = (
	props: ButtonBannerProps & ButtonBannerInternalProps,
) => {
	const bannerState = props.isHovered
		? ("hovered" as const)
		: ("notHovered" as const);

	const className = banner({ state: bannerState });

	return <div className={className}>{props.children}</div>;
};
