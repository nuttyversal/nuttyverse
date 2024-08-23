import { Context } from "effect";
import { ParentComponent, createContext } from "solid-js";
import {
	ThemeService,
	createThemeService,
	createMockThemeService,
} from "./theme";
import {
	TransitionService,
	createTransitionService,
	createMockTransitionService,
} from "./transition";
import {
	LocalStorageService,
	createLocalStorageService,
	createMockLocalStorageService,
} from "./local-storage";

/**
 * An exhaustive list of service implementations that can be provided
 * to components in the application.
 */
type ServiceContextType = {
	localStorageService: Context.Tag.Service<LocalStorageService>;
	themeService: Context.Tag.Service<ThemeService>;
	transitionService: Context.Tag.Service<TransitionService>;
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
		localStorageService: createLocalStorageService(),
		themeService: createThemeService(),
		transitionService: createTransitionService(),
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
		localStorageService: createMockLocalStorageService(),
		themeService: createMockThemeService(),
		transitionService: createMockTransitionService(),
		...props.serviceOverrides,
	};

	return (
		<ServiceContext.Provider value={services}>
			{props.children}
		</ServiceContext.Provider>
	);
};

export { ServiceContext, ServiceProvider, MockServiceProvider };
