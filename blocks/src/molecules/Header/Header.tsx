import { Chibi } from "../../atoms/Chibi/Chibi";
import { Text } from "../../atoms/Text/Text";
import { chibi, container, divider, header } from "./Header.css";

export const Header = () => {
	return (
		<div>
			<div className={container}>
				<Text as="h1" className={header} wdth={50} weight={700}>
					Nuttyverse
				</Text>

				<Chibi className={chibi} />
			</div>

			<div className={divider} />
		</div>
	);
};
