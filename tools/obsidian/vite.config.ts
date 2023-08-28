import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		minify: false,
		lib: {
			entry: path.resolve(__dirname, 'src/main.scss'),
			name: 'Nutty Obsidian Theme',
			fileName: 'nutty-obsidian-theme',
		},
	},
});
