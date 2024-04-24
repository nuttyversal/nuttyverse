import { spacing } from "~/styles/tokens/spacing";
import { Button } from "~/atoms/Button";
import { Text } from "~/atoms/Text";
import { Introduction } from "~/molecules/Introduction";
import { Header } from "~/organisms/Header";

export const Singularity = () => {
	return (
		<div>
			<Header />

			<div
				style={{
					paddingLeft: spacing[4],
					paddingRight: spacing[4],
				}}
			>
				<Introduction />
				<ExploreInnerWorld />
			</div>
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
		<Text as="span" style={{ color: "inherit" }}>
			<Button sparkle banner={{ children: <UnderConstruction /> }}>
				Explore my inner world
			</Button>
		</Text>
	);
};
