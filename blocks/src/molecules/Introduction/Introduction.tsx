import { useContext } from "react";
import { UnorderedList } from "../../atoms/List/UnorderedList";
import { ListItem } from "../../atoms/List/ListItem";
import { Link } from "../../atoms/Link/Link";
import { Text } from "../../atoms/Text/Text";
import { NuttyverseContext } from "../../styles/themes/Context";

export const Introduction = () => {
	const theme = useContext(NuttyverseContext);

	const ahoy = (
		<Text as="span" wdth={120} weight={600}>
			Ahoy there, fellow navigator!
		</Text>
	);

	const physical = (
		<Text
			as="span"
			wdth={120}
			weight={600}
			style={{ color: theme === "light" ? "#3e8857" : "lime" }}
		>
			physical
		</Text>
	);

	const digital = (
		<Text
			as="span"
			wdth={120}
			weight={600}
			style={{ color: theme === "light" ? "#7f7ced" : "yellow" }}
		>
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
				singularity will bloom a new {digital} universe! 😀
			</Text>

			<Text as="div">
				<UnorderedList>
					<ListItem>
						Follow me on{" "}
						<Link href="https://neocities.org/site/nuttyverse" newTab>
							Neocities
						</Link>{" "}
						for updates!
					</ListItem>
					<ListItem>
						Feel free to take a 👀 at the{" "}
						<Link href="https://github.com/nuttyversal/nuttyverse" newTab>
							source code
						</Link>
						.
					</ListItem>
				</UnorderedList>
			</Text>
		</section>
	);
};
