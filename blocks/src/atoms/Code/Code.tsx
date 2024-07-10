import { inlineCode } from "./Code.css";

type CodeProps = {
	/**
	 * Specifies the code's content.
	 */
	children: string;
};

export const Code: React.FC<CodeProps> = (props) => {
	return <code className={inlineCode}>{props.children}</code>;
};
