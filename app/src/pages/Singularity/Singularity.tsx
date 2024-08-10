import { Link } from "components/Link";
import styles from "./Singularity.module.scss";

const Singularity = () => {
	return (
		<div class={styles.container}>
			<p class="with-drop-cap">
				Ahoy there, fellow navigator! Welcome to my internet expanse. You
				might notice a seeming emptiness, but do not fret. You've simply
				arrived early enough to witness the expansion of this universe.
			</p>

			<p>
				Just as the physical universe materialized from the Big Bang, this
				website will similarly unfold from this point. Emerging from this
				singularity will bloom a new digital universe! 😀
			</p>

			<p>
				Go to experiment <Link href="/experiment">here</Link>.
			</p>
		</div>
	);
};

export { Singularity };
