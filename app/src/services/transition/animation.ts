import { Effect } from "effect";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import scrollLayoutClasses from "~/components/ScrollLayout/ScrollLayout.module.scss";
import { setTransitionStore } from "./store";

gsap.registerPlugin(Flip);

/**
 * Creates a scoped resource that wraps a `gsap.core.Timeline`.
 * If the effect is interrupted, the timeline is killed.
 */
const createTimelineResource = (
	timeline: () => Promise<Omit<gsap.core.Timeline, "then">>,
) => {
	const acquire = Effect.tryPromise(timeline);

	const release = (timeline: Omit<gsap.core.Timeline, "then">) => {
		return Effect.sync(() => timeline.kill());
	};

	return Effect.acquireRelease(acquire, release);
};

/**
 * An object of effects that set up the initial state for transition
 * elements involved in the mounting transition.
 */
const initialize = {
	scrollContainer: (scrollContainer: HTMLElement) => {
		scrollContainer.classList.add(scrollLayoutClasses.rolled);
	},
	mainContainer: (mainContainer: HTMLElement) => {
		mainContainer.classList.add(scrollLayoutClasses.rolled);
	},
	logoButton: (logoButton: HTMLElement) => {
		logoButton.querySelectorAll(".letter").forEach((letter) => {
			gsap.set(letter, { opacity: 0 });
		});
	},
	chibiButton: (chibiButton: HTMLElement) => {
		gsap.set(chibiButton, { opacity: 0 });
	},
};

/**
 * An object of effects that animate the transition elements when
 * mounting animation is initiated. All elements are "unrolled"
 * (much like a scroll!).
 */
const mounting = {
	unrollScrollContainer: (scrollContainer: HTMLElement) => {
		return createTimelineResource(async () => {
			// Capture initial state.
			const scrollContainerState = Flip.getState(scrollContainer);

			// Remove the rolled class to "unroll" the scroll.
			scrollContainer.classList.remove(scrollLayoutClasses.rolled);

			// Animate the "unrolling" of the scroll.
			const scrollTimeline = Flip.from(scrollContainerState, {
				transform: "scaleX(100%)",
				ease: "power1.out",
				duration: 0.5,
			});

			return await scrollTimeline;
		});
	},
	unrollMainContainer: (mainContainer: HTMLElement) => {
		return createTimelineResource(async () => {
			// Capture initial state.
			const mainContainerState = Flip.getState(mainContainer);

			// Remove the rolled class to "unroll" the main content.
			mainContainer.classList.remove(scrollLayoutClasses.rolled);

			// Animate the "unrolling" of the main content.
			const mainTimeline = Flip.from(mainContainerState, {
				props: "opacity",
				ease: "power1.inOut",
				duration: 0.8,
				delay: 0.5,
			});

			await mainTimeline;

			gsap.set(mainContainer, { opacity: 1 });

			return await mainTimeline;
		});
	},
	unrollLogoButton: (logoButton: HTMLElement) => {
		return createTimelineResource(async () => {
			// Query the letters in the logo button.
			const logoLetters = logoButton.querySelectorAll(".letter");

			// Set target state.
			logoLetters.forEach((letter) => {
				gsap.set(letter, { opacity: 1 });
			});

			// Tween to target state.
			const logoTimeline = gsap.from(logoLetters, {
				ease: "sine",
				duration: 0.4,
				delay: 0.5,
				opacity: 0,
				stagger: 0.05,
				y: 8,
			});

			return await logoTimeline;
		});
	},
	unrollChibiButton: (chibiButton: HTMLElement) => {
		return createTimelineResource(async () => {
			// This timeline runs in parallel with the logo timeline.
			// The chibi should appear after the logo letters appear.
			const chibiTimeline = gsap.timeline({
				delay: 1,
			});

			// Set target state.
			gsap.set(chibiButton, { opacity: 1 });

			// Tween to target state.
			chibiTimeline.from(chibiButton, {
				ease: "sine",
				duration: 0.4,
				opacity: 0,
				y: 8,
			});

			return await chibiTimeline;
		});
	},
};

/**
 * An object of effects that animate the transition elements when
 * routing animation is initiated.
 */
const routing = {
	captureFlipState: (
		scrollContainer: HTMLElement,
		mainContainer: HTMLElement,
	) => {
		return Effect.sync(() => {
			setTransitionStore(
				"initialFlipState",
				Flip.getState([scrollContainer, mainContainer]),
			);
		});
	},
	hideMainContainer: (mainContainer: HTMLElement) => {
		return Effect.sync(() => {
			gsap.set(mainContainer, { opacity: 0 });
		});
	},
	showMainContainer: (mainContainer: HTMLElement) => {
		return createTimelineResource(async () => {
			return await gsap.to(mainContainer, {
				delay: 0.2,
				duration: 0.3,
				opacity: 1,
			});
		});
	},
	playFlipAnimation: (flipState: Flip.FlipState) => {
		return createTimelineResource(async () => {
			return await Flip.from(flipState, {
				duration: 0.5,
			});
		});
	},
};

export { initialize, mounting, routing };
