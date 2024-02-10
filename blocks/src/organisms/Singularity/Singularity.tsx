import { Button } from "../../atoms/Button/Button";
import { Text } from "../../atoms/Text/Text";
import { Introduction } from "../../molecules/Introduction/Introduction";
import { Header } from "../../molecules/Header/Header";

export const Singularity = () => {
	return (
		<div>
			<Header />
			<Introduction />
			<ExploreInnerWorld />
		</div>
	);
};

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
