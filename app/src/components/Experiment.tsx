import { Context } from "effect";
import { createSignal } from "solid-js";
import { ThemeService, useTheme } from "~/services/theme";
import { Link } from "~/components/Link/Link";
import styles from "./Experiment.module.scss";

type Props = {
	themeService: Context.Tag.Service<ThemeService>;
};

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
		if (event.button === 0) {
			if (clickCancelled()) {
				setClickCancelled(false);
			} else {
				callback(event);
			}
		}
	};

	return { handleMouseDown, handleClick };
};

const Experiment = (props: Props) => {
	const { toggleTheme } = useTheme(props.themeService);

	const {
		handleMouseDown: toggleThemeImmediately,
		handleClick: toggleThemeSlowly,
	} = useCarmackClick(toggleTheme);

	return (
		<div class={styles.container}>
			<div class={styles.content}>
				<p class="with-drop-cap">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
					imperdiet vitae lorem vitae malesuada. Maecenas id nisi risus.
					Morbi sed massa mattis, pulvinar orci quis, posuere quam. Etiam
					efficitur faucibus lacus aliquam sagittis. Vivamus quis augue
					vitae augue consectetur mollis. Ut sed elementum nisl.
				</p>

				<p>
					Sed mollis ac tortor eget dignissim. Nunc vitae gravida mauris,
					in suscipit libero. Duis porttitor mauris in enim pulvinar
					finibus. Sed viverra vel arcu et ornare. Suspendisse vitae
					pharetra dui. Praesent scelerisque, elit quis vestibulum
					sollicitudin, mauris nunc posuere libero, accumsan maximus nunc
					quam eu urna. Mauris eget urna lacus.
				</p>

				<p>
					Visit the{" "}
					<Link href="https://nuttyver.se" newTab>
						Nuttyverse
					</Link>{" "}
					website.
				</p>

				<button
					onMouseDown={toggleThemeImmediately}
					onClick={toggleThemeSlowly}
				>
					Toggle theme
				</button>
			</div>
		</div>
	);
};

export { Experiment };
