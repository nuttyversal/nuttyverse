import React from "react"
import { Text } from "./Text/Text"

export const Test = () => {
	return (
		<section style={{ width: "425px" }}>
			<Text dropCap>
				Ahoy there, fellow navigator! Welcome to my internet expanse.
				You might notice a seeming emptiness, but do not fret. You've
				simply arrived early enough to witness the expansion of this
				universe.
			</Text>

			<Text>
				Just as the <Text as="span" wdth={115} weight={350} style={{
					color: '#3E8857'
				}}> physical</Text> universe materialized from
				the Big Bang, this website will similarly unfold from this
				point.  Emerging from this singularity will bloom a new <Text
					as="span" wdth={115} weight={350} style={{
						color: '#7F7CED'
					}}>digital</Text> universe.
			</Text>
		</section>
	);
}
