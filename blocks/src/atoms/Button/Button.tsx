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
	/**
	 * Specifies the button's content.
	 */
	children: React.ReactNode;

	/**
	 * If enabled (`true`), wraps the `children` with ✦ sparkles ✦.
	 */
	sparkle?: boolean;

	/**
	 * If enabled (`true`), applies a glow effect to the button in dark mode.
	 */
	glow?: boolean;

	/**
	 * Defines the settings for a banner displayed behind the button when hovered.
	 */
	banner?: ButtonBannerProps;
} & React.ComponentPropsWithoutRef<"button">;

export const Button = (props: ButtonProps) => {
	const context = useContext(NuttyverseContext);
	const [isHovered, setIsHovered] = useState(false);

	const { children, sparkle, glow, banner, ...htmlButtonProps } = props;
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
				{...htmlButtonProps}
			>
				{sparkle && (isHovered ? "✧ " : "✦ ")}
				{children}
				{sparkle && (isHovered ? " ✧" : " ✦")}
			</button>

			{banner && (
				<ButtonBanner
					{...banner}
					themeClass={themeClass}
					isHovered={isHovered}
					glow={glow ?? false}
				/>
			)}
		</div>
	);
};

type ButtonBannerProps = {
	/**
	 * Specifies the button banner's content.
	 */
	children: React.ReactNode;
};

/**
 * These props are not part of the public API. They are implicitly passed
 * through from `Button` to `ButtonBanner`.
 */
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
