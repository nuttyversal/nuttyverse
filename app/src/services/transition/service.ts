import { Context, Effect } from "effect";
import { Accessor, createMemo } from "solid-js";
import { SnapshotFrom } from "xstate";
import { initialize, mounting, routing } from "./animation";
import { transitionMachine } from "./state-machine";
import {
	TransitionElements,
	setTransitionStore,
	transitionStore,
} from "./store";

/**
 * A service that manages transitions between views in the application.
 * This service orchestrates the animations that occur when the application
 * is mounted or when the user navigates between views.
 */
class TransitionService extends Context.Tag("TransitionService")<
	TransitionService,
	{
		/**
		 * Registers an element with the transition service and sets
		 * initial CSS styles in preparation for the mounting transition.
		 */
		readonly registerElement: (
			name: keyof TransitionElements,
			element: HTMLElement,
		) => void;

		/**
		 * A signal that represents the current state of the transition service.
		 * Components can subscribe to this signal to react to state changes.
		 */
		readonly transitionState: Accessor<SnapshotFrom<
			typeof transitionMachine
		> | null>;

		/**
		 * Signals to the transition service that routing is about to begin.
		 * To be invoked by the service component before routing occurs.
		 */
		readonly signalBeforeRouting: () => void;

		/**
		 * Signals to the transition service that routing has completed.
		 * To be invoked by the service component after routing completes.
		 */
		readonly signalAfterRouting: () => void;
	}
>() {}

function registerElement(name: keyof TransitionElements, element: HTMLElement) {
	setTransitionStore({
		...transitionStore,
		elements: {
			...transitionStore.elements,
			[name]: element,
		},
	});

	initialize[name](element);

	const isInitialized = Object.values(transitionStore.elements).every(
		(element) => element !== null,
	);

	if (isInitialized) {
		transitionStore.stateMachine.send({
			type: "INITIATE_MOUNT",
		});
	}
}

async function runMountingAnimation() {
	// Query elements from the store.
	const scrollContainer = transitionStore.elements.scrollContainer!;
	const mainContainer = transitionStore.elements.mainContainer!;
	const logoButton = transitionStore.elements.logoButton!;
	const chibiButton = transitionStore.elements.chibiButton!;

	// Orchestrates the mounting animation.
	const masterTimeline = Effect.scoped(
		Effect.all(
			[
				mounting.unrollScrollContainer(scrollContainer),
				mounting.unrollMainContainer(mainContainer),
				mounting.unrollLogoButton(logoButton),
				mounting.unrollChibiButton(chibiButton),
			],
			{
				concurrency: 4,
			},
		),
	);

	return Effect.runPromise(masterTimeline).then(() => {
		transitionStore.stateMachine.send({
			type: "ANIMATION_COMPLETE",
		});
	});
}

function captureFlipState() {
	// Query elements from the store.
	const scrollContainer = transitionStore.elements.scrollContainer!;
	const mainContainer = transitionStore.elements.mainContainer!;

	// Capture initial state.
	const masterTimeline = Effect.scoped(
		Effect.all(
			[
				routing.captureFlipState(scrollContainer, mainContainer),
				routing.hideMainContainer(mainContainer),
			],
			{
				concurrency: 2,
			},
		),
	);

	return Effect.runSync(masterTimeline);
}

async function runRoutingAnimation() {
	const mainContainer = transitionStore.elements.mainContainer!;
	const flipState = transitionStore.initialFlipState!;

	// Orchestrates the routing animation.
	const masterTimeline = Effect.scoped(
		Effect.all(
			[
				routing.playFlipAnimation(flipState),
				routing.showMainContainer(mainContainer),
			],
			{
				concurrency: 2,
			},
		),
	);

	return Effect.runPromise(masterTimeline).then(() => {
		transitionStore.stateMachine.send({
			type: "ANIMATION_COMPLETE",
		});
	});
}

function createTransitionService(): Context.Tag.Service<TransitionService> {
	transitionStore.stateMachine.start();

	transitionStore.stateMachine.subscribe((snapshot) => {
		if (
			JSON.stringify(snapshot) ===
			JSON.stringify(transitionStore.currentState)
		) {
			// No-op if state hasn't changed.
			return;
		}

		// Update the current state.
		setTransitionStore({
			...transitionStore,
			currentState: snapshot,
		});

		if (snapshot.value === "mountingAnimation") {
			runMountingAnimation();
		}

		if (snapshot.matches({ viewChangeAnimation: "captureFirstState" })) {
			captureFlipState();
		}

		if (snapshot.matches({ viewChangeAnimation: "captureLastState" })) {
			runRoutingAnimation();
		}
	});

	const transitionState = createMemo(() => {
		return transitionStore.currentState;
	});

	const signalBeforeRouting = () => {
		transitionStore.stateMachine.send({
			type: "INITIATE_VIEW_CHANGE",
		});
	};

	const signalAfterRouting = () => {
		transitionStore.stateMachine.send({
			type: "ROUTE_UPDATED",
		});
	};

	return {
		registerElement,
		transitionState,
		signalBeforeRouting,
		signalAfterRouting,
	};
}

function createMockTransitionService(): Context.Tag.Service<TransitionService> {
	const transitionState = createMemo<SnapshotFrom<
		typeof transitionMachine
	> | null>(() => null);

	const registerElement = () => {
		// No-op.
	};

	const signalBeforeRouting = () => {
		// No-op.
	};

	const signalAfterRouting = () => {
		// No-op.
	};

	return {
		registerElement,
		transitionState,
		signalBeforeRouting,
		signalAfterRouting,
	};
}

export {
	TransitionService,
	createTransitionService,
	createMockTransitionService,
};
