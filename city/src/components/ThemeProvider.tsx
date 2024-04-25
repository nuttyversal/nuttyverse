import type { ReactNode } from "react";
import { body, main } from "./Landing.css.ts";

type Props = {
	children: ReactNode;
};

export const ThemeProvider: React.FC<Props> = (props) => {
	return (
		<div className={body}>
			<main className={main}>{props.children}</main>
		</div>
	);
};
