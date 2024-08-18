import { Ref } from "solid-js";

/**
 * Returns a function that will call all functions in the order they
 * were chained with the same arguments.
 */
function chain<Args extends [] | any[]>(callbacks: {
	[Symbol.iterator](): IterableIterator<((...args: Args) => any) | undefined>;
}): (...args: Args) => void {
	return (...args: Args) => {
		for (const callback of callbacks) callback && callback(...args);
	};
}

/**
 * Sometimes, it can be useful to merge multiple refs into a single ref.
 * For example, when a component uses a ref internally, but also wants
 * to accept forwarded refs from parent components.
 */
function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): (el: T) => void {
	return chain(refs.filter((r) => r !== undefined) as ((el: T) => void)[]);
}

export { mergeRefs };
