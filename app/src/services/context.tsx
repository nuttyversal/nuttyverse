import { Context } from "effect";
import { ParentComponent, createContext } from "solid-js";
import { mockThemeService, ThemeService, themeService } from "~/services/theme";

/**
 * An exhaustive list of service implementations that can be provided
 * to components in the application.
 */
type ServiceContextType = {
	themeService: Context.Tag.Service<ThemeService>;
};

/**
 * A context that provides services to components in the application.
 */
const ServiceContext = createContext<ServiceContextType>();

/**
 * A provider component that wraps the application and provides
 * production-level service implementations to components.
 */
const ServiceProvider: ParentComponent = (props) => {
	const services = {
		themeService,
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
const MockServiceProvider: ParentComponent = (props) => {
	const services = {
		themeService: mockThemeService,
	};

	return (
		<ServiceContext.Provider value={services}>
			{props.children}
		</ServiceContext.Provider>
	);
};

export { ServiceContext, ServiceProvider, MockServiceProvider };
