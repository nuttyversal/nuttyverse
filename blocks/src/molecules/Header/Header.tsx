import { useContext } from "react";
import { NuttyverseContext } from "~/styles/themes/context";
import { spacing } from "~/styles/tokens/spacing";
import { Logo } from "~/atoms/Logo";
import { ChibiButton } from "~/molecules/ChibiButton";
import { MessageOfTheDay } from "~/molecules/MessageOfTheDay";
import { chibi, container } from "./Header.css";

export const Header = () => {
	const context = useContext(NuttyverseContext);

	return (
		<div>
			<div className={container}>
				<Logo style={{ marginBottom: `-${spacing.px}` }} />
				<ChibiButton className={chibi} onClick={context.toggleTheme} />
			</div>

			<MessageOfTheDay />
		</div>
	);
};
