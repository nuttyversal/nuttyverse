import { Context, Effect, Layer, Option } from "effect";
import { UnknownException } from "effect/Cause";

/**
 * A service that provides access to the local storage API.
 */
class LocalStorageService extends Context.Tag("LocalStorageService")<
	LocalStorageService,
	{
		/**
		 * Retrieves the value of the specified key from local storage.
		 */
		readonly getItem: (
			key: string,
		) => Effect.Effect<Option.Option<string>, UnknownException>;

		/**
		 * Sets the value of the specified key in local storage.
		 */
		readonly setItem: (
			key: string,
			value: string,
		) => Effect.Effect<void, UnknownException>;

		/**
		 * Removes the value of the specified key from local storage.
		 */
		readonly removeItem: (
			key: string,
		) => Effect.Effect<void, UnknownException>;
	}
>() {}

const LocalStorageLive = Layer.effect(
	LocalStorageService,
	Effect.gen(function* () {
		const getItem = (key: string) => {
			return Effect.try(() => {
				return Option.fromNullable(localStorage.getItem(key));
			});
		};

		const setItem = (key: string, value: string) => {
			return Effect.try(() => {
				return localStorage.setItem(key, value);
			});
		};

		const removeItem = (key: string) => {
			return Effect.try(() => {
				return localStorage.removeItem(key);
			});
		};

		return {
			getItem,
			setItem,
			removeItem,
		};
	}),
);

const LocalStorageTest = Layer.effect(
	LocalStorageService,
	Effect.gen(function* () {
		const mockStorage: Record<string, string> = {};

		const getItem = (key: string) => {
			return Effect.try(() => {
				if (!mockStorage.hasOwnProperty(key)) {
					return Option.none();
				} else {
					return Option.some(mockStorage[key]);
				}
			});
		};

		const setItem = (key: string, value: string) => {
			return Effect.try(() => {
				mockStorage[key] = value;
			});
		};

		const removeItem = (key: string) => {
			return Effect.try(() => {
				delete mockStorage[key];
			});
		};

		return {
			getItem,
			setItem,
			removeItem,
		};
	}),
);

export { LocalStorageService, LocalStorageLive, LocalStorageTest };
