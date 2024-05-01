import { Button } from "~/atoms/Button";
import { Text } from "~/atoms/Text";
import { underConstruction } from "./ExploreInnerWorld.css";

const UnderConstruction: React.FC = () => {
	return (
		<Text size="smol" className={underConstruction} marginless>
			[ERROR] Still under construction! ⚠️
		</Text>
	);
};

export const ExploreInnerWorld: React.FC = () => {
	return (
		<Text as="span" style={{ color: "inherit" }}>
			<Button sparkle banner={{ children: <UnderConstruction /> }}>
				Explore my inner world
			</Button>
		</Text>
	);
};
