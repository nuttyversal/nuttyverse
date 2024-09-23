import { Effect } from "effect";
import { useBeforeLeave, useIsRouting } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useRuntime } from "../context";
import { TransitionService } from "./service";

const useTransition = () => {
	const { NuttyverseRuntime } = useRuntime();

	const isRouting = useIsRouting();

	const registerElement = NuttyverseRuntime.runSync(
		Effect.gen(function* () {
			const transitionService = yield* TransitionService;
			return transitionService.registerElement;
		}),
	);

	const transitionState = NuttyverseRuntime.runSync(
		Effect.gen(function* () {
			const transitionService = yield* TransitionService;
			return transitionService.transitionState;
		}),
	);

	const onBeforeLeave = () => {
		NuttyverseRuntime.runSync(
			Effect.gen(function* () {
				const transitionService = yield* TransitionService;
				transitionService.signalBeforeRouting();
			}),
		);
	};

	// This hook misses some browser events …
	useBeforeLeave(onBeforeLeave);

	// … so we'll also subscribe to popstate events.
	window.addEventListener("popstate", onBeforeLeave);
	onCleanup(() => window.removeEventListener("popstate", onBeforeLeave));

	createEffect(() => {
		if (!isRouting()) {
			NuttyverseRuntime.runSync(
				Effect.gen(function* () {
					const transitionService = yield* TransitionService;
					transitionService.signalAfterRouting();
				}),
			);
		}
	});

	return {
		registerElement,
		transitionState,
	};
};

export { useTransition };
