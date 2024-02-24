import { createContext } from "react";

type NuttyverseTheme = "light" | "dark";

export const NuttyverseContext = createContext<NuttyverseTheme>("light");
