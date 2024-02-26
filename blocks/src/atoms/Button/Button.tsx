import { useContext, useState } from "react";
import {
	bannerVariants,
	base,
	container,
	darkMode,
	lightMode,
	withGlow,
} from "./Button.css";
import { NuttyverseContext } from "../../styles/themes/Context";

type ButtonProps = {
	children: React.ReactNode;
	banner?: ButtonBannerProps;
	sparkle?: boolean | any;
	glow?: boolean | any;
} & React.ComponentPropsWithoutRef<"button">;

export const Button = (props: ButtonProps) => {
	const context = useContext(NuttyverseContext);
	const [isHovered, setIsHovered] = useState(false);

	const { children, sparkle, glow, ...buttonProps } = props;
	const themeClass = context.theme === "light" ? lightMode : darkMode;
	const classNames = [base, themeClass, glow ? withGlow : undefined]
		.filter((x) => x !== undefined)
		.join(" ");

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
					glow={glow}
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
	glow: boolean;
};

export const ButtonBanner = (
	props: ButtonBannerProps & ButtonBannerInternalProps,
) => {
	const bannerState = props.isHovered
		? ("hovered" as const)
		: ("notHovered" as const);

	const bannerVariant = bannerVariants({ state: bannerState });

	const classNames = [
		props.themeClass,
		props.glow ? withGlow : null,
		bannerVariant,
	]
		.filter((x) => x !== null)
		.join(" ");

	return <div className={classNames}>{props.children}</div>;
};
