import { Text } from "~/atoms/Text";
import { footer, text } from "./Footer.css";

export const Footer = () => {
	return (
		<footer className={footer}>
			<Text className={text}>Nuttyverse &copy; 2023–2024</Text>
		</footer>
	);
};
