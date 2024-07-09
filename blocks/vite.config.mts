import mdx from "@mdx-js/rollup";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), vanillaExtractPlugin(), mdx(), tsconfigPaths()],
});
