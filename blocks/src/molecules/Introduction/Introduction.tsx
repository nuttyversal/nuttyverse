import { Text } from "../../atoms/Text/Text";

export const Introduction = () => {
	const ahoy = (
		<Text as="span" wdth={120} weight={600}>
			Ahoy there, fellow navigator!
		</Text>
	);

	const physical = (
		<Text as="span" wdth={120} weight={600} style={{ color: "#3E8857" }}>
			physical
		</Text>
	);

	const digital = (
		<Text as="span" wdth={120} weight={600} style={{ color: "#7F7CED" }}>
			digital
		</Text>
	);

	return (
		<section style={{ marginTop: "1.5em", marginBottom: "1.5em" }}>
			<Text dropCap>
				{ahoy} Welcome to my internet expanse. You might notice a seeming
				emptiness, but do not fret. You've simply arrived early enough to
				witness the expansion of this universe.
			</Text>

			<Text>
				Just as the {physical} universe materialized from the Big Bang, this
				website will similarly unfold from this point. Emerging from this
				singularity will bloom a new {digital} universe.
			</Text>
		</section>
	);
};
