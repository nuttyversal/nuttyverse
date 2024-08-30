import { JSX } from "solid-js";

/**
 * A collection of documented spells that can be cast in Vim.
 * Each spell maps a key to a JSX element that describes the spell.
 */
const spells: Record<string, JSX.Element> = {
	h: (
		<>
			<code>h</code> moves the cursor <strong>left</strong>.
		</>
	),
	j: (
		<>
			<code>j</code> moves the cursor <strong>down</strong>.
		</>
	),
	k: (
		<>
			<code>k</code> moves the cursor <strong>up</strong>.
		</>
	),
	l: (
		<>
			<code>l</code> moves the cursor <strong>right</strong>.
		</>
	),
	w: (
		<>
			<code>w</code> moves the cursor to the <strong>beginning</strong> of
			the <strong>next word</strong>.
		</>
	),
	e: (
		<>
			<code>e</code> moves the cursor to the <strong>end</strong> of the{" "}
			<strong>next word</strong>.
		</>
	),
	b: (
		<>
			<code>b</code> moves the cursor to the <strong>beginning</strong> of
			the <strong>previous word</strong>.
		</>
	),
	"(": (
		<>
			<code>(</code> moves the cursor to the <strong>beginning</strong> of
			the <strong>previous sentence</strong>.
		</>
	),
	")": (
		<>
			<code>)</code> moves the cursor to the <strong>beginning</strong> of
			the <strong>next sentence</strong>.
		</>
	),
	"{": (
		<>
			<code>&#123;</code> moves the cursor to the <strong>beginning</strong>{" "}
			of the <strong>previous paragraph</strong>.
		</>
	),
	"}": (
		<>
			<code>&#125;</code> moves the cursor to the <strong>beginning</strong>{" "}
			of the <strong>next paragraph</strong>.
		</>
	),
	gg: (
		<>
			<code>gg</code> yeets the cursor to the <strong>beginning</strong> of
			the <strong>document</strong>.
		</>
	),
	G: (
		<>
			<code>G</code> yeets the cursor to the <strong>end</strong> of the{" "}
			<strong>document</strong>.
		</>
	),
	i: (
		<>
			<code>i</code> enters <code>INSERT</code> mode <strong>before</strong>{" "}
			the <strong>cursor</strong>.
		</>
	),
	a: (
		<>
			<code>a</code> enters <code>INSERT</code> mode <strong>after</strong>{" "}
			the <strong>cursor</strong>.
		</>
	),
	Esc: (
		<>
			<code>Esc</code> enters <code>NORMAL</code> mode.
		</>
	),
	"Ctrl+e": (
		<>
			<code>Ctrl+e</code> scrolls <strong>down one line</strong>.
		</>
	),
	"Ctrl+y": (
		<>
			<code>Ctrl+y</code> scrolls <strong>up one line</strong>.
		</>
	),
	"Ctrl+d": (
		<>
			<code>Ctrl+d</code> scrolls <strong>down ½ page</strong>.
		</>
	),
	"Ctrl+u": (
		<>
			<code>Ctrl+u</code> scrolls <strong>up ½ page</strong>.
		</>
	),
	"Ctrl+f": (
		<>
			<code>Ctrl+f</code> scrolls <strong>down one page</strong>.
		</>
	),
	"Ctrl+b": (
		<>
			<code>Ctrl+b</code> scrolls <strong>up one page</strong>.
		</>
	),
};

export { spells };
