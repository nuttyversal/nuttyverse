import { ParentComponent, createContext, useContext } from "solid-js";
import {
	NuttyverseRuntime,
	NuttyverseLiveRuntime,
	NuttyverseTestRuntime,
} from "./runtime";

/**
 * The type of the runtime context. This context provides a managed runtime
 * to components in the application. The runtime is used to access services
 * and satisfy dependency requirements in effectful operations.
 */
type RuntimeContextType = {
	NuttyverseRuntime: NuttyverseRuntime;
};

/**
 * Provides a managed runtime to components in the application.
 */
const RuntimeContext = createContext<RuntimeContextType>();

/**
 * A provider component that wraps the application and provides
 * a production-level managed runtime to components.
 */
const RuntimeProvider: ParentComponent = (props) => {
	const services = {
		NuttyverseRuntime: NuttyverseLiveRuntime,
	};

	return (
		<RuntimeContext.Provider value={services}>
			{props.children}
		</RuntimeContext.Provider>
	);
};

/**
 * A provider component that wraps the application and provides a mock
 * managed runtime to components. Intended for use in tests.
 */
const RuntimeTestProvider: ParentComponent = (props) => {
	const services = {
		NuttyverseRuntime: NuttyverseTestRuntime,
	};

	return (
		<RuntimeContext.Provider value={services}>
			{props.children}
		</RuntimeContext.Provider>
	);
};

/**
 * A hook that provides access to the runtime context.
 */
const useRuntime = () => {
	const runtime = useContext(RuntimeContext);

	if (!runtime) {
		throw new Error("Runtime context is not available.");
	}

	return {
		NuttyverseRuntime: runtime.NuttyverseRuntime,
	};
};

export { RuntimeContext, RuntimeProvider, RuntimeTestProvider, useRuntime };
