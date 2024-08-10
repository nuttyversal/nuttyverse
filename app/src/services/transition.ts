import { Context, Effect, Fiber } from "effect";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { createStore } from "solid-js/store";
import { Actor, StateValue, createActor, createMachine } from "xstate";
import scrollLayoutClasses from "~/components/ScrollLayout/ScrollLayout.module.scss";

gsap.registerPlugin(Flip);

class TransitionService extends Context.Tag("TransitionService")<
	TransitionService,
	{
		readonly registerElement: (
			name: keyof TransitionElements,
			element: HTMLElement | HTMLElement[],
		) => void;

		readonly signalBeforeRouting: () => void;
		readonly signalAfterRouting: () => void;
	}
>() {}

type TransitionElements = {
	scrollContainer: HTMLElement | null;
	mainContainer: HTMLElement | null;
	logoButton: HTMLElement[] | null;
	chibiButton: HTMLElement | null;
};

type TransitionStore = {
	/**
	 * References to the HTML elements that are involved in the transitions.
	 */
	elements: TransitionElements;

	/**
	 * The state machine that manages transition states.
	 */
	stateMachine: Actor<typeof transitionMachine>;

	/**
	 * The previous state of the state machine.
	 */
	previousState: StateValue | null;

	/**
	 * The initial state of the flip animation for view transitions.
	 */
	initialFlipState: Flip.FlipState | null;

	/**
	 * A fiber that represents the currently running transition effect.
	 */
	currentTransition: Fiber.Fiber<void, unknown> | null;
};

const transitionMachine = createMachine({
	id: "transition",
	initial: "idle",
	states: {
		idle: {
			on: {
				START_MOUNT: "mountTransition",
				START_ROUTING: "viewChangeTransition",
			},
		},
		mountTransition: {
			on: {
				COMPLETE_TRANSITION: "idle",
			},
		},
		viewChangeTransition: {
			initial: "beforeRouting",
			states: {
				beforeRouting: {
					on: {
						COMPLETE_ROUTING: "afterRouting",
					},
				},
				afterRouting: {
					on: {
						COMPLETE_TRANSITION: "#transition.idle",
					},
				},
			},
		},
	},
});

const transitionService: Context.Tag.Service<TransitionService> = (() => {
	const [store, setStore] = createStore<TransitionStore>({
		elements: {
			scrollContainer: null,
			mainContainer: null,
			logoButton: null,
			chibiButton: null,
		},
		stateMachine: createActor(transitionMachine),
		previousState: null,
		initialFlipState: null,
		currentTransition: null,
	});

	/**
	 * Registers an element with the transition service and applies
	 * initial styles in preparation for transitions.
	 */
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
				gsap.set(letter, { opacity: 0 });
			});
		}

		// Side effect: Hide chibi initially.
		if (name === "chibiButton" && !Array.isArray(element)) {
			gsap.set(element, { opacity: 0 });
		}

		// Precondition: Check if all elements are registered.
		const isReady = Object.values(store.elements).every(
			(element) => element !== null,
		);

		if (isReady) {
			store.stateMachine.send({ type: "START_MOUNT" });
			console.log("All elements registered.");
		}
	};

	/**
	 * Signals the transition service that routing is about to begin.
	 */
	const signalBeforeRouting = () => {
		store.stateMachine.send({ type: "START_ROUTING" });
	};

	/**
	 * Signals the transition service that routing has completed.
	 */
	const signalAfterRouting = () => {
		store.stateMachine.send({ type: "COMPLETE_ROUTING" });
	};

	/**
	 * An effect that animates the "unrolling" of a scroll container.
	 * This unrolls the scroll in the horizontal direction.
	 */
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

	/**
	 * An effect that animates the "unrolling" of a main container.
	 * This unrolls the main content in the vertical direction.
	 */
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
				console.log("Killing timelines.");
				timeline.kill();
			});
		};

		return Effect.acquireRelease(acquire, release);
	};

	/**
	 * An effect that animates the logo button with a staggered fade-in effect.
	 */
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
				console.log("Killing timelines.");
				timeline.kill();
			});
		};

		return Effect.acquireRelease(acquire, release);
	};

	/**
	 * An effect that animates the chibi button with a fade-in effect.
	 */
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
					duration: 0.4,
					opacity: 0,
					y: 8,
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
				console.log("Killing timelines.");
				timeline.kill();
			});
		};

		return Effect.acquireRelease(acquire, release);
	};

	/**
	 * An effect that animates the view transition with a FLIP animation.
	 */
	const animateViewTransition = (mainContainer: HTMLElement) => {
		const acquire = Effect.tryPromise({
			try: async () => {
				if (!store.initialFlipState) {
					throw new Error("Initial flip state is missing.");
				}

				const flipTimeline = Flip.from(store.initialFlipState, {
					duration: 0.5,
				});

				const contentFadeTimeline = gsap.to(mainContainer, {
					delay: 0.2,
					duration: 0.5,
					opacity: 1,
				});

				return await Promise.all([flipTimeline, contentFadeTimeline]);
			},
			catch: (error) => {
				console.error(`Failed to animate view transition: ${error}.`);
				return Effect.fail(error);
			},
		});

		const release = (timelines: Omit<gsap.core.Timeline, "then">[]) => {
			return Effect.sync(() => {
				console.log("Killing timelines.");
				timelines.forEach((timeline) => timeline.kill());
			});
		};

		return Effect.acquireRelease(acquire, release);
	};

	store.stateMachine.start();

	store.stateMachine.subscribe((state) => {
		// Ignore state changes that are not transitions.
		if (JSON.stringify(state.value) === JSON.stringify(store.previousState)) {
			return;
		} else {
			setStore("previousState", state.value);
		}

		if (store.currentTransition) {
			// Cancel any running transitions.
			console.log("Transition cancelled.");
			Effect.runFork(Effect.interruptWith(store.currentTransition.id()));
			setStore("currentTransition", null);
		}

		if (state.value === "mountTransition") {
			// Query elements from the store.
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

			console.log("Transition started.");

			Effect.runPromise(Effect.fromFiber(fiber)).then(() => {
				console.log("Transition completed.");

				// Clean up the fiber when the effect completes.
				setStore("currentTransition", null);

				// Send a completion event to the state machine.
				store.stateMachine.send({ type: "COMPLETE_TRANSITION" });
			});
		}

		if (state.matches("viewChangeTransition.beforeRouting")) {
			// Query elements from the store.
			const scrollContainer = store.elements.scrollContainer!;
			const mainContainer = store.elements.mainContainer!;

			// Capture initial state.
			setStore(
				"initialFlipState",
				Flip.getState([scrollContainer, mainContainer]),
			);

			// Hide the main content.
			gsap.set(mainContainer, { opacity: 0 });
		}

		if (state.matches("viewChangeTransition.afterRouting")) {
			// Query elements from the store.
			const mainContainer = store.elements.mainContainer!;

			// Orchestrate the timelines into a single effect.
			const timelineEffect = Effect.scoped(
				Effect.gen(function* () {
					yield* animateViewTransition(mainContainer);
				}),
			);

			// Fork the effect and store the fiber.
			const fiber = Effect.runFork(timelineEffect);
			setStore("currentTransition", fiber);

			console.log("Transition started.");

			Effect.runPromise(Effect.fromFiber(fiber)).then(() => {
				console.log("Transition completed.");

				// Clean up the fiber when the effect completes.
				setStore("currentTransition", null);

				// Send a completion event to the state machine.
				store.stateMachine.send({ type: "COMPLETE_TRANSITION" });
			});
		}
	});

	return {
		registerElement,
		signalBeforeRouting,
		signalAfterRouting,
	};
})();

const mockTransitionService: Context.Tag.Service<TransitionService> = {
	registerElement: () => {
		/* Do nothing. */
	},
	signalBeforeRouting: () => {
		/* Do nothing. */
	},
	signalAfterRouting: () => {
		/* Do nothing. */
	},
};

export { TransitionService, transitionService, mockTransitionService };
