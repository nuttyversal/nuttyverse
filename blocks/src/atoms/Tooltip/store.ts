import { ReactNode } from "react";
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
			element: ReactNode;
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
 * Update the active tooltip content.
 */
export function updateTooltip(content: TooltipContent) {
	$activeTooltip.set(content);
}

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
