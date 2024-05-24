import { atom } from "nanostores";
import { MasonryContentBlock, WithPosition } from "./layout";

/**
 * Is the lightbox open? 💡
 */
export const $isLightboxOpen = atom<boolean>(false);

/**
 * Open the lightbox.
 */
export function openLightbox() {
	$isLightboxOpen.set(true);
}

/**
 * Close the lightbox.
 */
export function closeLightbox() {
	$isLightboxOpen.set(false);
}

/**
 * The currently selected anchor block.
 */
export const $anchor = atom<
	(MasonryContentBlock<WithPosition> & WithPosition) | null
>(null);

/**
 * A flag that can be set to trigger a scroll to the anchor block.
 */
export const $scrollToAnchor = atom<boolean>(false);

/**
 * Set the anchor content block.
 */
export function setAnchor(
	block: (MasonryContentBlock<WithPosition> & WithPosition) | null,
	scrollTo = false,
) {
	$anchor.set(block);
	$scrollToAnchor.set(scrollTo);
}

/**
 * Clear the scroll-to-anchor flag.
 */
export function clearScrollToAnchor() {
	$scrollToAnchor.set(false);
}

/**
 * Updates the anchor to the next content block.
 */
export function goNext() {
	const anchor = $anchor.get();

	if (!anchor) {
		return;
	}

	const next = anchor.next;

	if (next) {
		setAnchor(next, true);
	}
}

/**
 * Updates the anchor to the previous content block.
 */
export function goPrevious() {
	const anchor = $anchor.get();

	if (!anchor) {
		return;
	}

	const previous = anchor.previous;

	if (previous) {
		setAnchor(previous, true);
	}
}

/**
 * A flag that can be set to ignore a scroll event once.
 */
export const $preventNextScroll = atom<boolean>(false);

/**
 * Set the flag to prevent scroll events from being processed.
 */
export function setPreventNextScroll() {
	$preventNextScroll.set(true);
}

/**
 * Clear the flag to allow scroll events to be processed.
 */
export function clearPreventNextScroll() {
	$preventNextScroll.set(false);
}

/**
 * A flag that can be set to ignore all scroll events until unset.
 */
export const $scrollLock = atom<boolean>(false);

/**
 * Set the flag to prevent all scroll events from being processed.
 */
export function setScrollLock() {
	$scrollLock.set(true);
}

/**
 * Clear the flag to allow scroll events to be processed.
 */
export function clearScrollLock() {
	$scrollLock.set(false);
}
