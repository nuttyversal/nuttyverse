import { setup } from "xstate";

/**
 * A state machine that manages transitions between views in the context
 * of a single-page application in a controlled and predictable manner.
 * It orchestrates animations using the FLIP technique.
 */
const transitionMachine = setup({
	types: {
		context: {} as {},
		events: {} as
			| { type: "INITIATE_MOUNT" }
			| { type: "INITIATE_VIEW_CHANGE" }
			| { type: "ROUTE_UPDATED" }
			| { type: "ANIMATION_COMPLETE" },
	},
}).createMachine({
	context: {},
	id: "transition",
	initial: "idle",
	states: {
		idle: {
			on: {
				INITIATE_MOUNT: {
					target: "mountingAnimation",
				},
				INITIATE_VIEW_CHANGE: {
					target: "viewChangeAnimation",
				},
			},
		},
		mountingAnimation: {
			on: {
				ANIMATION_COMPLETE: {
					target: "idle",
				},
			},
		},
		viewChangeAnimation: {
			initial: "captureFirstState",
			states: {
				captureFirstState: {
					on: {
						ROUTE_UPDATED: {
							target: "captureLastState",
						},
					},
				},
				captureLastState: {
					on: {
						ANIMATION_COMPLETE: {
							target: "#transition.idle",
						},
					},
				},
			},
		},
	},
});

export { transitionMachine };
