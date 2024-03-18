import { createContext } from "react";

type NuttyverseTheme = "light" | "dark";

type NuttyverseContextProps = {
	theme: NuttyverseTheme;
	setTheme: (theme: NuttyverseTheme) => void;
	toggleTheme: () => void;
};

export const NuttyverseContext = createContext<NuttyverseContextProps>({
	theme: "light",
	setTheme: () => {},
	toggleTheme: () => {},
});
