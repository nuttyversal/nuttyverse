import { Context, Effect, Fiber } from "effect";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { createStore } from "solid-js/store";
import { Actor, createActor, createMachine } from "xstate";
import scrollLayoutClasses from "~/components/ScrollLayout/ScrollLayout.module.scss";

gsap.registerPlugin(Flip);

class TransitionService extends Context.Tag("TransitionService")<
	TransitionService,
	{
		readonly registerElement: (
			name: keyof TransitionElements,
			element: HTMLElement | HTMLElement[],
		) => void;
	}
>() {}

type TransitionElements = {
	scrollContainer: HTMLElement | null;
	mainContainer: HTMLElement | null;
	logoButton: HTMLElement[] | null;
	chibiButton: HTMLElement | null;
};

type TransitionStore = {
	elements: TransitionElements;
	stateMachine: Actor<typeof transitionMachine>;
	currentTransition: Fiber.Fiber<void, unknown> | null;
};

const transitionMachine = createMachine({
	id: "transition",
	initial: "idle",
	states: {
		idle: {
			on: {
				MOUNT: "mountTransition",
				VIEW_CHANGE: "viewChangeTransition",
			},
		},
		mountTransition: {
			on: {
				VIEW_CHANGE: "viewChangeTransition",
				COMPLETE: "idle",
			},
		},
		viewChangeTransition: {
			on: {
				COMPLETE: "idle",
			},
		},
	},
});

const transitionService: Context.Tag.Service<TransitionService> = (() => {
	const stateMachine = createActor(transitionMachine);

	const [store, setStore] = createStore<TransitionStore>({
		elements: {
			scrollContainer: null,
			mainContainer: null,
			logoButton: null,
			chibiButton: null,
		},
		stateMachine,
		currentTransition: null,
	});

	const registerElement = (
		name: keyof TransitionElements,
		element: HTMLElement | HTMLElement[],
	) => {
		setStore({
			...store,
			elements: {
				...store.elements,
				[name]: element,
			},
		});

		// Side effect: Apply rolled class to hide element.
		if (name === "scrollContainer" && !Array.isArray(element)) {
			element.classList.add(scrollLayoutClasses.rolled);
		}

		// Side effect: Apply rolled class to hide element.
		if (name === "mainContainer" && !Array.isArray(element)) {
			element.classList.add(scrollLayoutClasses.rolled);
		}

		// Side effect: Hide logo letters initially.
		if (name === "logoButton" && Array.isArray(element)) {
			element.forEach((letter) => {
				letter.style.opacity = "0";
			});
		}

		// Side effect: Hide chibi initially.
		if (name === "chibiButton" && !Array.isArray(element)) {
			element.style.opacity = "0";
		}

		const isReady = Object.values(store.elements).every(
			(element) => element !== null,
		);

		if (isReady) {
			stateMachine.send({ type: "MOUNT" });
			console.log("All elements registered.");
		}
	};

	const unrollScrollContainer = (scrollContainer: HTMLElement) => {
		const acquire = Effect.tryPromise({
			try: async () => {
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
			},
			catch: (error) => {
				console.error(`Failed to unroll scroll container: ${error}.`);
				return Effect.fail(error);
			},
		});

		const release = (timeline: Omit<gsap.core.Timeline, "then">) => {
			return Effect.sync(() => {
				timeline.kill();
			});
		};

		return Effect.acquireRelease(acquire, release);
	};

	const unrollMainContainer = (mainContainer: HTMLElement) => {
		const acquire = Effect.tryPromise({
			try: async () => {
				// Capture initial state.
				const mainContainerState = Flip.getState(mainContainer);

				// Remove the rolled class to "unroll" the main content.
				mainContainer.classList.remove(scrollLayoutClasses.rolled);

				// Animate the "unrolling" of the main content.
				const mainTimeline = Flip.from(mainContainerState, {
					props: "opacity",
					ease: "power1.inOut",
					duration: 0.8,
				});

				return await mainTimeline;
			},
			catch: (error) => {
				console.error(`Failed to unroll main content: ${error}.`);
				return Effect.fail(error);
			},
		});

		const release = (timeline: Omit<gsap.core.Timeline, "then">) => {
			return Effect.sync(() => {
				timeline.kill();
			});
		};

		return Effect.acquireRelease(acquire, release);
	};

	const animateLogoButton = (logoLetters: HTMLElement[]) => {
		const acquire = Effect.tryPromise({
			try: async () => {
				const logoTimeline = gsap.timeline();

				// Set target state.
				logoLetters.forEach((letter) => {
					letter.style.opacity = "1";
				});

				// Tween from initial state to target state.
				logoTimeline.from(logoLetters, {
					ease: "sine",
					duration: 0.4,
					opacity: 0,
					stagger: 0.05,
					y: 8,
				});

				return await logoTimeline;
			},
			catch: (error) => {
				console.error(`Failed to animate logo letters: ${error}.`);
				return Effect.fail(error);
			},
		});

		const release = (timeline: Omit<gsap.core.Timeline, "then">) => {
			return Effect.sync(() => {
				timeline.kill();
			});
		};

		return Effect.acquireRelease(acquire, release);
	};

	const animateChibiButton = (chibi: HTMLElement) => {
		const acquire = Effect.tryPromise({
			try: async () => {
				const chibiTimeline = gsap.timeline({
					// This timeline runs in parallel with the logo timeline.
					// The chibi should appear when the last letters are visible.
					delay: 0.5,
				});

				// Set target state.
				chibi.style.opacity = "1";

				// Tween from initial state to target state.
				chibiTimeline.from(chibi, {
					ease: "sine",
					duration: 0.3,
					opacity: 0,
				});

				return await chibiTimeline;
			},
			catch: (error) => {
				console.error(`Failed to animate chibi: ${error}.`);
				return Effect.fail(error);
			},
		});

		const release = (timeline: Omit<gsap.core.Timeline, "then">) => {
			return Effect.sync(() => {
				timeline.kill();
			});
		};

		return Effect.acquireRelease(acquire, release);
	};

	stateMachine.start();

	stateMachine.subscribe((state) => {
		if (store.currentTransition) {
			// Cancel any running transitions.
			console.log("Transition cancelled.");
			Effect.runFork(Effect.interruptWith(store.currentTransition.id()));
		}

		if (state.value === "mountTransition") {
			// Query the elements from the store.
			const scrollContainer = store.elements.scrollContainer!;
			const mainContainer = store.elements.mainContainer!;
			const logoButton = store.elements.logoButton!;
			const chibiButton = store.elements.chibiButton!;

			// Orchestrate the timelines into a single effect.
			const phaseOne = unrollScrollContainer(scrollContainer);
			const phaseTwo = Effect.all(
				[
					unrollMainContainer(mainContainer),
					Effect.all(
						[
							animateLogoButton(logoButton),
							animateChibiButton(chibiButton),
						],
						{ concurrency: 2 },
					),
				],
				{ concurrency: 2 },
			);

			const timelineEffect = Effect.scoped(
				Effect.gen(function* () {
					yield* phaseOne;
					yield* phaseTwo;
				}),
			);

			// Fork the effect and store the fiber.
			const fiber = Effect.runFork(timelineEffect);
			setStore("currentTransition", fiber);

			Effect.runPromise(Effect.fromFiber(fiber)).then(() => {
				console.log("Transition completed.");

				// Clean up the fiber when the effect completes.
				setStore("currentTransition", null);

				// Send a completion event to the state machine.
				stateMachine.send({ type: "COMPLETE" });
			});
		}
	});

	return {
		registerElement,
	};
})();

const mockTransitionService: Context.Tag.Service<TransitionService> = {
	registerElement: () => {
		// Do nothing.
	},
};

export { TransitionService, transitionService, mockTransitionService };
