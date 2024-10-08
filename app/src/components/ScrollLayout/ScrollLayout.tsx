import { ParentComponent, onMount } from "solid-js";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { useTransition } from "~/services/transition";
import styles from "./ScrollLayout.module.scss";
import { Stardrop } from "../Stardrop";

const ScrollLayout: ParentComponent = (props) => {
	let scrollContainer!: HTMLDivElement;
	let mainContainer!: HTMLElement;

	const { registerElement } = useTransition();

	onMount(() => {
		registerElement("scrollContainer", scrollContainer);
		registerElement("mainContainer", mainContainer);
	});

	return (
		<>
			<div class={styles.container}>
				<div ref={scrollContainer} id="scroll" class={styles.scroll}>
					<Header />
					<main ref={mainContainer} class={styles.main}>
						{props.children}
					</main>
					<Footer />
				</div>
			</div>
			<Stardrop />
		</>
	);
};

export { ScrollLayout };
