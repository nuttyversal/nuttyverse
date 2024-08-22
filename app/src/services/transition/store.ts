import { createStore } from "solid-js/store";
import { Actor, SnapshotFrom, createActor } from "xstate";
import { transitionMachine } from "./state-machine";

type TransitionElements = {
	/**
	 * The scroll container that opens up like a scroll.
	 * Unrolled in the horizontal direction.
	 */
	scrollContainer: HTMLElement | null;

	/**
	 * The main content inside the scroll container.
	 * Unrolled in the vertical direction.
	 */
	mainContainer: HTMLElement | null;

	/**
	 * The Nuttyverse logo button.
	 * Enters after the scroll is unrolled.
	 */
	logoButton: HTMLElement | null;

	/**
	 * The Nutty ("nuttyversal") chibi button.
	 * Enters after the scroll is unrolled.
	 */
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
	 * The current state of the state machine.
	 */
	currentState: SnapshotFrom<typeof transitionMachine> | null;

	/**
	 * The initial state of the flip animation for view transitions.
	 */
	initialFlipState: Flip.FlipState | null;
};

const [transitionStore, setTransitionStore] = createStore<TransitionStore>({
	elements: {
		scrollContainer: null,
		mainContainer: null,
		logoButton: null,
		chibiButton: null,
	},
	stateMachine: createActor(transitionMachine),
	currentState: null,
	initialFlipState: null,
});

export {
	TransitionElements,
	TransitionStore,
	transitionStore,
	setTransitionStore,
};
