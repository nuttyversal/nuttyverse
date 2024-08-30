import { createEffect, createSignal, on, onCleanup, onMount } from "solid-js";

/**
 * A hook that tracks the progress of a spell being cast.
 *
 * @param spell The spell to track.
 * @returns An object containing the spell's cast status.
 */
const useTracker = (spell: string) => {
	const [hasCasted, setHasCasted] = createSignal(false);
	const [castProgress, setCastProgress] = createSignal("");

	// Used to force reactive updates for repeated key presses.
	const [_, setTime] = createSignal(0);

	const [lastKeyPressed, setLastKeyPressed] = createSignal({
		value: "",
		isCtrl: false,
		time: 0,
	});

	const updateLastKeyPressed = (event: KeyboardEvent) => {
		setLastKeyPressed({
			value: event.key,
			isCtrl: event.ctrlKey,
			time: setTime((prev) => prev + 1),
		});
	};

	onMount(() => {
		document.addEventListener("keydown", updateLastKeyPressed, true);
	});

	onCleanup(() => {
		document.removeEventListener("keydown", updateLastKeyPressed, true);
	});

	createEffect(
		on(lastKeyPressed, (lastPressedKey) => {
			if (hasCasted()) {
				return;
			}

			// Evaluate special cases first.
			if (spell === "Esc" && lastPressedKey.value === "Escape") {
				setHasCasted(true);
				return;
			} else if (
				spell.startsWith("Ctrl+") &&
				lastPressedKey.isCtrl &&
				lastPressedKey.value === spell[spell.length - 1]
			) {
				setHasCasted(true);
				return;
			}

			if (castProgress() + lastPressedKey.value === spell) {
				setHasCasted(true);
			} else if (spell.startsWith(lastPressedKey.value)) {
				setCastProgress(lastPressedKey.value);
			} else {
				setCastProgress("");
			}
		}),
	);

	return {
		hasCasted,
	};
};

export { useTracker };
