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
				padding: "0 1em",
				fontFamily: "PragmataPro Liga, monospace",
				margin: "0.3em",
				color: "inherit",
			}}
		>
			[ERROR] Still under construction! ⚠️
		</Text>
	);
};

export const ExploreInnerWorld = () => {
	return (
		<Button glow sparkle banner={{ children: <UnderConstruction /> }}>
			<Text as="span" style={{ color: "inherit" }}>
				Explore my inner world
			</Text>
		</Button>
	);
};
