import { useContext } from "solid-js";
import { ServiceContext } from "../context";

/**
 * A hook that provides access to the local storage service.
 */
const useLocalStorage = () => {
	const services = useContext(ServiceContext);

	if (!services) {
		throw new Error("Service context is not available.");
	}

	return services.localStorageService;
};

export { useLocalStorage };
