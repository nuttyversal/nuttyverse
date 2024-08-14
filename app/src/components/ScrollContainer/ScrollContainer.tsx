import gsap from "gsap";
import { JSX, onMount, ParentComponent } from "solid-js";
import styles from "./ScrollContainer.module.scss";

type Props = {
	class?: string | undefined;
	style?: JSX.CSSProperties | string;
};

const ScrollContainer: ParentComponent<Props> = (props) => {
	let container!: HTMLDivElement;
	let gradientTop!: HTMLDivElement;
	let gradientBottom!: HTMLDivElement;

	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = container;

		// Calculate the opacity of the fade gradient overlay.
		const topDistance = scrollTop;
		const bottomDistance = scrollHeight - scrollTop - clientHeight;

		const gradientOpacity = {
			top: Math.min(topDistance / 69, 1),
			bottom: Math.min(bottomDistance / 69, 1),
		};

		// Transition the fade gradient overlay.
		gsap.to(gradientTop, {
			opacity: gradientOpacity.top,
			duration: 0.2,
			ease: "none",
		});

		gsap.to(gradientBottom, {
			opacity: gradientOpacity.bottom,
			duration: 0.2,
			ease: "none",
		});
	};

	onMount(() => {
		// Initialize.
		handleScroll();

		// Handle updates.
		container.addEventListener("scroll", handleScroll);

		// Clean up.
		return () => container.removeEventListener("scroll", handleScroll);
	});

	const outerContainerClasses = [styles["outer-container"], props.class]
		.filter(Boolean)
		.join(" ");

	return (
		<div class={outerContainerClasses}>
			<div
				ref={gradientTop}
				class={styles["gradient-overlay"] + " " + styles.top}
			/>
			<div ref={container} class={styles["inner-container"]}>
				{props.children}
			</div>
			<div
				ref={gradientBottom}
				class={styles["gradient-overlay"] + " " + styles.bottom}
			/>
		</div>
	);
};

export { ScrollContainer };
