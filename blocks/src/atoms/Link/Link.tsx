import { Text } from "../Text/Text";
import { link } from "./Link.css";

type Props = {
	children: React.ReactNode;
	href: string;
};

export const Link: React.FC<Props> = (props) => {
	return (
		<Text as="a" className={link} href={props.href}>
			{props.children}
		</Text>
	);
};
