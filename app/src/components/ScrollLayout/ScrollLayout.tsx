import { ParentComponent, createEffect, onMount, useContext } from "solid-js";
import { useBeforeLeave, useIsRouting } from "@solidjs/router";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { ServiceContext } from "~/services/context";
import styles from "./ScrollLayout.module.scss";

const ScrollLayout: ParentComponent = (props) => {
	const services = useContext(ServiceContext);

	if (!services) {
		throw new Error("Service context is not available.");
	}

	const { transitionService } = services;

	let scrollContainer!: HTMLDivElement;
	let mainContainer!: HTMLElement;

	onMount(() => {
		transitionService.registerElement("scrollContainer", scrollContainer);
		transitionService.registerElement("mainContainer", mainContainer);
	});

	const isRouting = useIsRouting();

	useBeforeLeave(() => {
		transitionService.signalBeforeRouting();
	});

	createEffect(() => {
		if (!isRouting()) {
			transitionService.signalAfterRouting();
		}
	});

	return (
		<div class={styles.container}>
			<div ref={scrollContainer} id="scroll" class={styles.scroll}>
				<Header />
				<main ref={mainContainer} class={styles.main}>
					{props.children}
				</main>
				<Footer />
			</div>
		</div>
	);
};

export { ScrollLayout };
