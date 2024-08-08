import { ParentComponent } from "solid-js";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import styles from "./ScrollLayout.module.scss";

const ScrollLayout: ParentComponent = (props) => {
	return (
		<div class={styles.container}>
			<div class={styles.content}>
				<Header />
				<main class={styles.main}>{props.children}</main>
				<Footer />
			</div>
		</div>
	);
};

export { ScrollLayout };
