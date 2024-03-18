import { useContext, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import classNames from "classnames";
import {
	bannerVariants,
	base,
	container,
	darkMode,
	lightMode,
	withGlow,
} from "./Button.css";
import { NuttyverseContext } from "../../styles/themes/context";

type ButtonProps = {
	/**
	 * Specifies the button's content.
	 */
	children: ReactNode;

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
} & ComponentPropsWithoutRef<"button">;

export const Button = (props: ButtonProps) => {
	const context = useContext(NuttyverseContext);
	const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

	const { children, sparkle, glow, banner, ...htmlButtonProps } = props;
	const themeClass = context.theme === "light" ? lightMode : darkMode;
	const buttonClassNames = classNames(base, themeClass, { [withGlow]: glow });

	return (
		<div className={container}>
			<button
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={buttonClassNames}
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
	const bannerVariant = bannerVariants({
		state: props.isHovered ? "hovered" : "notHovered",
	});

	const bannerClassNames = classNames(props.themeClass, bannerVariant, {
		[withGlow]: props.glow,
	});

	return <div className={bannerClassNames}>{props.children}</div>;
};

/**
 * A custom hook that returns the hover state and event handlers.
 *
 * @returns An object containing the hover state and event handlers.
 */
function useHover() {
	const [isHovered, setIsHovered] = useState(false);
	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	return { isHovered, handleMouseEnter, handleMouseLeave };
}
