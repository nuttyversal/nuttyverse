import gsap from "gsap";
import { JSX, ParentComponent, Ref, createEffect, onMount } from "solid-js";
import { useTransition } from "~/services/transition";
import { mergeRefs } from "~/utils/solid";
import styles from "./ScrollContainer.module.scss";

type Props = {
	class?: string | undefined;
	style?: JSX.CSSProperties | string;
	ref?: Ref<HTMLDivElement>;
};

const ScrollContainer: ParentComponent<Props> = (props) => {
	let container!: HTMLDivElement;
	let gradientTop!: HTMLDivElement;
	let gradientBottom!: HTMLDivElement;

	const { transitionState } = useTransition();

	const updateGradient = () => {
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
		updateGradient();

		// Handle updates.
		container.addEventListener("scroll", updateGradient);

		// Clean up.
		return () => container.removeEventListener("scroll", updateGradient);
	});

	createEffect(() => {
		// Wait until transition animations are complete.
		if (transitionState()?.value === "idle") {
			updateGradient();
		}
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
			<div
				ref={mergeRefs(props.ref, (e) => (container = e))}
				class={styles["inner-container"] + " " + "nv-scroller"}
			>
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
