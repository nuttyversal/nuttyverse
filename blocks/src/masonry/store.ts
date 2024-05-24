import { atom } from "nanostores";
import { MasonryContentBlock, WithPosition } from "./layout";

/**
 * Is the lightbox open? 💡
 */
export const $isLightboxOpen = atom<boolean>(false);

/**
 * The currently selected anchor block.
 */
export const $anchor = atom<
	(MasonryContentBlock<WithPosition> & WithPosition) | null
>(null);

/**
 * Set the anchor content block.
 */
export function setAnchor(
	block: (MasonryContentBlock<WithPosition> & WithPosition) | null,
) {
	$anchor.set(block);
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
		setAnchor(next);
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
		setAnchor(previous);
	}
}

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
