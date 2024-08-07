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
				<button onMouseDown={toggleTheme}>Toggle theme</button>
			</div>
		</div>
	);
};

export { Experiment };
