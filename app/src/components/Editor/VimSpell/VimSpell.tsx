import { Component } from "solid-js";
import { Icon } from "~/components/Icon";
import { spells } from "./spell-book";
import { useTracker } from "./spell-tracker";
import styles from "./VimSpell.module.scss";

type Props = {
	spell: string;
};

const VimSpell: Component<Props> = (props) => {
	let container!: HTMLSpanElement;
	let spell = <span>This spell has not been documented.</span>;

	if (props.spell in spells) {
		spell = spells[props.spell];
	}

	const { hasCasted } = useTracker(props.spell);

	const classList = () => ({
		[styles.container]: true,
		[styles.casted]: hasCasted(),
	});

	return (
		<>
			<span ref={container} classList={classList()}>
				{spell}
			</span>

			{hasCasted() && (
				<span>
					<Icon class={styles.icon} name="star" />
				</span>
			)}
		</>
	);
};

export { VimSpell };
