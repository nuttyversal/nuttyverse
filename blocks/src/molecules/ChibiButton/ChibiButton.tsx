import classNames from "classnames";
import { Chibi } from "~/atoms/Chibi/Chibi";
import { base } from "./ChibiButton.css";

type ChibiButtonProps = {
	className?: string;
	onClick: () => void;
};

export const ChibiButton: React.FC<ChibiButtonProps> = (props) => {
	return (
		<button
			onClick={props.onClick}
			className={classNames(props.className, base)}
		>
			<Chibi className={props.className} />
		</button>
	);
};
