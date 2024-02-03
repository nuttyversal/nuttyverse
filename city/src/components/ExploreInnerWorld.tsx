import { Button, Text } from "@nuttyverse/blocks";

export const UnderConstruction = () => {
	return (
		<Text
			size="smol"
			style={{
				color: "white",
				padding: "0 1em",
				fontFamily: "PragmataPro Liga, monospace",
				margin: "0.3em",
			}}
		>
			[ERROR] Still under construction! ⚠️
		</Text>
	);
};

export const ExploreInnerWorld = () => {
	return (
		<Button sparkle banner={{ children: <UnderConstruction /> }}>
			Explore my inner world
		</Button>
	);
};
