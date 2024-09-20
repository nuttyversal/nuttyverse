import { ParentComponent, createContext } from "solid-js";
import {
	NuttyverseRuntime,
	NuttyverseLiveRuntime,
	NuttyverseTestRuntime,
} from "./runtime";

/**
 * An exhaustive list of service implementations that can be provided
 * to components in the application.
 */
type ServiceContextType = {
	NuttyverseRuntime: NuttyverseRuntime;
};

/**
 * A context that provides services to components in the application.
 */
const ServiceContext = createContext<ServiceContextType>();

type Props = {
	serviceOverrides?: Partial<ServiceContextType>;
};

/**
 * A provider component that wraps the application and provides
 * production-level service implementations to components.
 */
const ServiceProvider: ParentComponent<Props> = (props) => {
	const services = {
		NuttyverseRuntime: NuttyverseLiveRuntime,
		...props.serviceOverrides,
	};

	return (
		<ServiceContext.Provider value={services}>
			{props.children}
		</ServiceContext.Provider>
	);
};

/**
 * A provider component that wraps the application and provides mock
 * service implementations to components. Intended for use in tests.
 */
const MockServiceProvider: ParentComponent<Props> = (props) => {
	const services = {
		NuttyverseRuntime: NuttyverseTestRuntime,
		...props.serviceOverrides,
	};

	return (
		<ServiceContext.Provider value={services}>
			{props.children}
		</ServiceContext.Provider>
	);
};

export { ServiceContext, ServiceProvider, MockServiceProvider };
