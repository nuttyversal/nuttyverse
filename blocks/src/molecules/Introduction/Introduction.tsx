import { UnorderedList } from "~/atoms/List/UnorderedList";
import { ListItem } from "~/atoms/List/ListItem";
import { Link } from "~/atoms/Link/Link";
import { Text } from "~/atoms/Text/Text";
import { digitalColor, physicalColor } from "./Introduction.css";

export const Introduction = () => {
	const ahoy = (
		<Text as="span" wdth={120} weight={600}>
			Ahoy there, fellow navigator!
		</Text>
	);

	const physical = (
		<Text as="span" wdth={120} weight={600} className={physicalColor}>
			physical
		</Text>
	);

	const digital = (
		<Text as="span" wdth={120} weight={600} className={digitalColor}>
			digital
		</Text>
	);

	return (
		<section>
			<Text dropCap>
				{ahoy} Welcome to my internet expanse. You might notice a seeming
				emptiness, but do not fret. You've simply arrived early enough to
				witness the expansion of this universe.
			</Text>

			<Text>
				Just as the {physical} universe materialized from the Big Bang, this
				website will similarly unfold from this point. Emerging from this
				singularity will bloom a new {digital} universe! 😀
			</Text>
		</section>
	);
};
