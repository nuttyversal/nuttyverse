import { describe, it, expect, beforeEach } from "vitest";
import { Context, Effect, Option } from "effect";
import {
	LocalStorageService,
	createLocalStorageService,
	createMockLocalStorageService,
} from "./service";

/**
 * Runs an effect with the specified service implementation.
 */
const runWithService = (
	program: Effect.Effect<unknown, unknown, LocalStorageService>,
	service: Context.Tag.Service<LocalStorageService>,
) => {
	return Effect.runPromise(
		Effect.provideService(program, LocalStorageService, service),
	);
};

/**
 * Tests the local storage service against a service implementation.
 */
const testLocalStorage = (
	service: Context.Tag.Service<LocalStorageService>,
) => {
	const setAndGetItem = Effect.gen(function* () {
		const localStorage = yield* LocalStorageService;
		yield* localStorage.setItem("foo", "bar");
		return yield* localStorage.getItem("foo");
	});

	const setAndRemoveItem = Effect.gen(function* () {
		const localStorage = yield* LocalStorageService;
		yield* localStorage.setItem("foo", "bar");
		yield* localStorage.removeItem("foo");
		return yield* localStorage.getItem("foo");
	});

	it("should set and get an item", async () => {
		const result = await runWithService(setAndGetItem, service);
		expect(result).toEqual(Option.some("bar"));
	});

	it("should set and remove an item", async () => {
		const result = await runWithService(setAndRemoveItem, service);
		expect(result).toEqual(Option.none());
	});
};

describe("LocalStorageService", () => {
	describe("localStorageService", () => {
		beforeEach(() => {
			localStorage.clear();
		});

		testLocalStorage(createLocalStorageService());
	});

	describe("mockLocalStorageService", () => {
		testLocalStorage(createMockLocalStorageService());
	});
});
