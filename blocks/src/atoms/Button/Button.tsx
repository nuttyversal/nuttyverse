import { useContext, useState } from "react";
import {
	bannerVariants,
	base,
	container,
	darkMode,
	lightMode,
} from "./Button.css";
import { NuttyverseContext } from "../../styles/themes/Context";

type ButtonProps = {
	children: React.ReactNode;
	banner?: ButtonBannerProps;
	sparkle?: boolean | any;
} & React.ComponentPropsWithoutRef<"button">;

export const Button = (props: ButtonProps) => {
	const theme = useContext(NuttyverseContext);
	const [isHovered, setIsHovered] = useState(false);

	const themeClass = theme === "light" ? lightMode : darkMode;
	const classNames = [base, themeClass].join(" ");

	const { children, sparkle, ...buttonProps } = props;

	return (
		<div className={container}>
			<button
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={classNames}
				{...buttonProps}
			>
				{sparkle && (isHovered ? "✧ " : "✦ ")}
				{children}
				{sparkle && (isHovered ? " ✧" : " ✦")}
			</button>

			{props.banner && (
				<ButtonBanner
					{...props.banner}
					themeClass={themeClass}
					isHovered={isHovered}
				/>
			)}
		</div>
	);
};

type ButtonBannerProps = {
	children: React.ReactNode;
	background?: string;
};

type ButtonBannerInternalProps = {
	themeClass: string;
	isHovered: boolean;
};

export const ButtonBanner = (
	props: ButtonBannerProps & ButtonBannerInternalProps,
) => {
	const bannerState = props.isHovered
		? ("hovered" as const)
		: ("notHovered" as const);

	const bannerVariant = bannerVariants({ state: bannerState });
	const classNames = [props.themeClass, bannerVariant].join(" ");

	return <div className={classNames}>{props.children}</div>;
};
