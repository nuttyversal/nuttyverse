import { useContext } from "solid-js";
import { ServiceContext } from "../context";

/**
 * A hook that provides access to the authentication service.
 */
const useAuthentication = () => {
	const services = useContext(ServiceContext);

	if (!services) {
		throw new Error("Service context is not available.");
	}

	return services.authenticationService;
};

export { useAuthentication };
