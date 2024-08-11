import mdx from "@mdx-js/rollup";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		solidPlugin(),
		tsconfigPaths(),
		mdx({
			jsxImportSource: "solid-jsx",
			providerImportSource: "solid-mdx",
		}),
	],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
});
