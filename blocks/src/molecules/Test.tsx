import { Button } from "../atoms/Button/Button";
import { Text } from "../atoms/Text/Text";

export const Test = () => {
	const physical = (
		<Text as="span" wdth={115} weight={350} style={{ color: "#3E8857" }}>
			physical
		</Text>
	);

	const digital = (
		<Text as="span" wdth={115} weight={350} style={{ color: "#7F7CED" }}>
			digital
		</Text>
	);

	return (
		<section style={{ width: "425px" }}>
			<Text dropCap>
				Ahoy there, fellow navigator! Welcome to my internet expanse. You
				might notice a seeming emptiness, but do not fret. You've simply
				arrived early enough to witness the expansion of this universe.
			</Text>

			<Text>
				Just as the {physical} universe materialized from the Big Bang, this
				website will similarly unfold from this point. Emerging from this
				singularity will bloom a new {digital} universe.
			</Text>

			<Button onClick={() => alert("Hello, world!")} sparkle>
				Explore my inner world
			</Button>
		</section>
	);
};
