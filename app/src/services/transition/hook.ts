import { Effect } from "effect";
import { useBeforeLeave, useIsRouting } from "@solidjs/router";
import { createEffect } from "solid-js";
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

	useBeforeLeave(() => {
		NuttyverseRuntime.runSync(
			Effect.gen(function* () {
				const transitionService = yield* TransitionService;
				transitionService.signalBeforeRouting();
			}),
		);
	});

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
