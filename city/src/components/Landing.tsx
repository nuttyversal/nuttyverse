import { Singularity } from "@nuttyverse/blocks";
import { ThemeProvider } from "./ThemeProvider.tsx";

export const Landing = () => {
	return (
		<ThemeProvider>
			<Singularity />
		</ThemeProvider>
	);
};
