import { Editor as EditorComponent } from "~/components/Editor";
import styles from "./Editor.module.scss";

const Editor = () => {
	return (
		<div class={styles.container}>
			<EditorComponent />
		</div>
	);
};

export { Editor };
