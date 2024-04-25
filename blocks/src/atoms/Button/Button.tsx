import { useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import classNames from "classnames";
import {
	bannerVariants,
	base,
	container,
	withNotAllowedCursor,
} from "./Button.css";

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
	 * Defines the settings for a banner displayed behind the button when hovered.
	 */
	banner?: ButtonBannerProps;
} & ComponentPropsWithoutRef<"button">;

export const Button = (props: ButtonProps) => {
	const { children, sparkle, banner, ...htmlButtonProps } = props;
	const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

	const buttonClassNames = classNames(base, {
		[withNotAllowedCursor]: htmlButtonProps.disabled,
	});

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

			{banner && <ButtonBanner {...banner} isHovered={isHovered} />}
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
	isHovered: boolean;
};

export const ButtonBanner = (
	props: ButtonBannerProps & ButtonBannerInternalProps,
) => {
	const bannerVariant = bannerVariants({
		state: props.isHovered ? "hovered" : "notHovered",
	});

	return <div className={bannerVariant}>{props.children}</div>;
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
