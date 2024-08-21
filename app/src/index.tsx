import { Effect, Option } from "effect";
import { render } from "solid-js/web";
import { NuttyverseRouter } from "~/pages/router";
import { ServiceProvider } from "~/services/context";
import "~/styles/index.scss";

/**
 * An effect that queries the root element of the application.
 * This is the element where the application will be rendered.
 *
 * @returns The root element of the application.
 */
const getRootElement = Effect.sync(() =>
	Option.fromNullable(document.getElementById("root")),
).pipe(
	Effect.flatMap((maybeRoot) =>
		Option.match(maybeRoot, {
			onNone: () => Effect.fail(new Error("Root element not found.")),
			onSome: Effect.succeed,
		}),
	),
);

/**
 * An effect that renders the application to the root element.
 * This effect is dependent on the root element being available.
 */
const renderApplication = (root: HTMLElement) => {
	return Effect.try({
		try: () => {
			return render(
				() => (
					<ServiceProvider>
						<NuttyverseRouter />
					</ServiceProvider>
				),
				root,
			);
		},
		catch: (error) => {
			return new Error(`Failed to render application: ${error}.`);
		},
	});
};

/**
 * The main effect that serves as the entry point for the application.
 * This effect queries the root element and mounts the application to it.
 */
const main = Effect.flatMap(getRootElement, renderApplication);

// Run the main effect and log any errors to the console.
// @ts-expect-error import.meta is available.
if (import.meta.env.MODE !== "test") {
	Effect.runPromise(main).catch((error) =>
		console.error(`Application failed to start: ${error}.`),
	);
}

export { getRootElement, renderApplication, main };
