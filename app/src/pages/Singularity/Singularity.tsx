import { Link } from "components/Link";
import styles from "./Singularity.module.scss";

const Singularity = () => {
	const link = <Link href="/editor">this point</Link>;

	return (
		<div class={styles.container}>
			<p class="with-drop-cap">
				<b>Ahoy there, fellow navigator!</b> Welcome to my internet expanse.
				You might notice a seeming emptiness, but do not fret. You've simply
				arrived early enough to witness the expansion of this universe.
			</p>

			<p>
				Just as the physical universe materialized from the Big Bang, this
				website will similarly unfold from {link}. Emerging from this
				singularity will bloom a new digital universe! 😀
			</p>
		</div>
	);
};

export { Singularity };
