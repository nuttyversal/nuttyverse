import classNames from "classnames";
import { Logo } from "~/atoms/Logo";
import { Text } from "~/atoms/Text";
import { Tooltip } from "~/atoms/Tooltip";
import { base } from "./LogoButton.css";

type LogoButtonProps = {
	className?: string;
	onClick?: () => void;
};

export const LogoButton: React.FC<LogoButtonProps> = (props) => {
	const tooltipContent = {
		type: "element",
		element: (
			<>
				<Text as="span" size="smol" marginless>
					Navigate to the{" "}
				</Text>

				<Text as="span" size="smol" marginless weight={700} wdth={100}>
					Singularity
				</Text>
			</>
		),
	} as const;

	return (
		<a
			href="/"
			onClick={props.onClick}
			aria-label="Navigate to the Singularity"
			className={classNames(props.className, base)}
		>
			<Tooltip content={tooltipContent}>
				<Logo className={props.className} />
			</Tooltip>
		</a>
	);
};
