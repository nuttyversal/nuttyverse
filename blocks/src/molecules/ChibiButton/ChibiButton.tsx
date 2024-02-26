import { Chibi } from "../../atoms/Chibi/Chibi";
import { base } from "./ChibiButton.css";

type ChibiButtonProps = {
	className?: string;
	onClick: () => void;
};

export const ChibiButton: React.FC<ChibiButtonProps> = (props) => {
	return (
		<button
			onClick={props.onClick}
			className={[props.className, base].join(" ")}
		>
			<Chibi className={props.className} />
		</button>
	);
};
