import { Layer, ManagedRuntime, pipe } from "effect";
import { FetchHttpClient } from "@effect/platform";
import { AuthenticationLive } from "./authentication";
import { ConfigTest } from "./config";
import { LocalStorageLive, LocalStorageTest } from "./local-storage";
import { ThemeLive, ThemeTest } from "./theme";
import { TransitionLive, TransitionTest } from "./transition";

type NuttyverseRuntime = typeof NuttyverseLiveRuntime;

const NuttyverseLiveRuntime = ManagedRuntime.make(
	pipe(
		AuthenticationLive,
		Layer.provideMerge(ConfigTest),
		Layer.provideMerge(LocalStorageLive),
		Layer.provideMerge(ThemeLive),
		Layer.provideMerge(TransitionLive),
		Layer.provideMerge(
			FetchHttpClient.layer.pipe(
				Layer.provide(
					Layer.succeed(FetchHttpClient.RequestInit, {
						credentials: "include",
					}),
				),
			),
		),
	),
);

const NuttyverseTestRuntime: NuttyverseRuntime = ManagedRuntime.make(
	pipe(
		AuthenticationLive,
		Layer.provideMerge(ConfigTest),
		Layer.provideMerge(LocalStorageTest),
		Layer.provideMerge(ThemeTest),
		Layer.provideMerge(TransitionTest),
		Layer.provideMerge(
			FetchHttpClient.layer.pipe(
				Layer.provide(
					Layer.succeed(FetchHttpClient.RequestInit, {
						credentials: "include",
					}),
				),
			),
		),
	),
);

export { NuttyverseRuntime, NuttyverseLiveRuntime, NuttyverseTestRuntime };
