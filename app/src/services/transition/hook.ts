import { useBeforeLeave, useIsRouting } from "@solidjs/router";
import { createEffect, useContext } from "solid-js";
import { ServiceContext } from "../context";

const useTransition = () => {
	const services = useContext(ServiceContext);

	if (!services) {
		throw new Error("Service context is not available.");
	}

	const { transitionService } = services;

	const isRouting = useIsRouting();

	useBeforeLeave(() => {
		transitionService.signalBeforeRouting();
	});

	createEffect(() => {
		if (!isRouting()) {
			transitionService.signalAfterRouting();
		}
	});

	return {
		registerElement: transitionService.registerElement,
		transitionState: transitionService.transitionState,
	};
};

export { useTransition };
