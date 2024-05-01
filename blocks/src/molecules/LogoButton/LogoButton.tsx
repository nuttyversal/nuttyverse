import classNames from "classnames";
import { Logo } from "~/atoms/Logo/Logo";
import { base } from "./LogoButton.css";

type LogoButtonProps = {
	className?: string;
	onClick?: () => void;
};

export const LogoButton: React.FC<LogoButtonProps> = (props) => {
	return (
		<a
			href="/"
			onClick={props.onClick}
			aria-label="Navigate to Singularity"
			className={classNames(props.className, base)}
		>
			<Logo className={props.className} />
		</a>
	);
};
