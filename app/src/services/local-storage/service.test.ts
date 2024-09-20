import { describe, it, expect, beforeEach } from "vitest";
import { Effect, ManagedRuntime, Option } from "effect";
import {
	LocalStorageLive,
	LocalStorageService,
	LocalStorageTest,
} from "./service";

/**
 * Tests the local storage service against a service implementation.
 */
const testLocalStorage = (
	runtime: ManagedRuntime.ManagedRuntime<LocalStorageService, never>,
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
		const result = await runtime.runPromise(setAndGetItem);
		expect(result).toEqual(Option.some("bar"));
	});

	it("should set and remove an item", async () => {
		const result = await runtime.runPromise(setAndRemoveItem);
		expect(result).toEqual(Option.none());
	});
};

describe("LocalStorageService", () => {
	describe("localStorageService", () => {
		beforeEach(() => {
			localStorage.clear();
		});

		const runtime = ManagedRuntime.make(LocalStorageLive);
		testLocalStorage(runtime);
	});

	describe("mockLocalStorageService", () => {
		const runtime = ManagedRuntime.make(LocalStorageTest);
		testLocalStorage(runtime);
	});
});
