import { createSignal } from "solid-js";

/**
 * A hook that implements John Carmack's "Act on press" UI design principle
 * while maintaining accessibility and compatibility with assistive technologies.
 *
 * This approach:
 *
 * 	1. Triggers the action on mousedown for improved responsiveness.
 * 	2. Cancels the subsequent click event to avoid double execution.
 * 	3. Preserves standard click behavior for keyboard navigation and screen readers.
 *
 * By returning both mousedown and click event handlers, this hook offers:
 *
 * 	✦ Enhanced responsiveness for pointer device users.
 * 	✦ Maintained accessibility for keyboard users and assistive technology.
 * 	✦ Compatibility with standard web interactions and expectations.
 *
 * The result is a more responsive UI that reduces user errors, feels
 * "crisper", and remains accessible to all users, as validated by
 * user studies in VR environments.
 *
 * @param callback Function to be executed on interaction.
 * @returns `handleMouseDown` and `handleClick` event handlers.
 * @see https://x.com/id_aa_carmack/status/1787850053912064005
 */
const useCarmackClick = (callback: (event: MouseEvent) => void) => {
	const [clickCancelled, setClickCancelled] = createSignal(false);

	// If the mousedown event is triggered, then the subsequent click event
	// should be cancelled. This is to prevent the callback from being called
	// twice when the user clicks the button.
	const handleMouseDown = (event: MouseEvent) => {
		if (event.button === 0) {
			setClickCancelled(true);
			callback(event);
		}
	};

	// If the click event is triggered, then the callback should be called
	// unless the click event has been cancelled.
	const handleClick = (event: MouseEvent) => {
		if (clickCancelled()) {
			setClickCancelled(false);
		} else {
			callback(event);
		}
	};

	return { handleMouseDown, handleClick };
};

export { useCarmackClick };
