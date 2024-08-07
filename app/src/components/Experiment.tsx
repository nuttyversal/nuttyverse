import { Context } from "effect";
import { ThemeService, useTheme } from "~/services/theme";
import styles from "./Experiment.module.scss";

type Props = {
	themeService: Context.Tag.Service<ThemeService>;
};

const Experiment = (props: Props) => {
	const { toggleTheme } = useTheme(props.themeService);

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

				<button onMouseDown={toggleTheme}>Toggle theme</button>
			</div>
		</div>
	);
};

export { Experiment };
