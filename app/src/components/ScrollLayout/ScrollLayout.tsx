import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ParentComponent, createSignal, onMount } from "solid-js";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import styles from "./ScrollLayout.module.scss";

gsap.registerPlugin(Flip);

const ScrollLayout: ParentComponent = (props) => {
	const [scrollClasses, setScrollClasses] = createSignal({
		[styles.scroll]: true,
		[styles.rolled]: true,
	});

	const [mainClasses, setMainClasses] = createSignal({
		[styles.main]: true,
		[styles.rolled]: true,
	});

	onMount(async () => {
		const scrollState = Flip.getState("#scroll");

		setScrollClasses((classes) => ({
			...classes,
			[styles.rolled]: false,
		}));

		await Flip.from(scrollState, {
			transform: "scaleX(100%)",
			ease: "power1.out",
			duration: 0.5,
		});

		const mainState = Flip.getState("main", {
			props: "opacity",
		});

		setMainClasses((classes) => ({
			...classes,
			[styles.rolled]: false,
		}));

		await Flip.from(mainState, {
			ease: "power1.inOut",
			duration: 0.8,
		});
	});

	return (
		<div class={styles.container}>
			<div id="scroll" classList={scrollClasses()}>
				<Header />
				<main classList={mainClasses()}>{props.children}</main>
				<Footer />
			</div>
		</div>
	);
};

export { ScrollLayout };
