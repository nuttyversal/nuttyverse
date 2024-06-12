import { atom } from "nanostores";

/**
 * A discriminated union of the possible tooltip content types and their
 * serializable representations.
 */
export type TooltipContent =
	| {
			type: "text";
			content: string;
	  }
	| {
			type: "element";
			element: JSX.Element;
	  };

/**
 * The currently active tooltip.
 */
export const $activeTooltip = atom<TooltipContent | null>(null);

/**
 * Whether the tooltip is currently visible. This is used to trigger animations.
 */
export const $isTooltipVisible = atom<boolean>(false);

/**
 * Show a tooltip with the given content.
 */
export function showTooltip(content: TooltipContent) {
	$activeTooltip.set(content);
	$isTooltipVisible.set(true);
}

/**
 * Hide the active tooltip.
 */
export function hideTooltip() {
	$isTooltipVisible.set(false);
}
