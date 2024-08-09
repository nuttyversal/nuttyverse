import { Component } from "solid-js";
import { Chibi } from "./Chibi";
import { Logo } from "./Logo";
import styles from "./Header.module.scss";

type Props = {
	chibiClass?: string;
	logoClass?: string;
};

const Header: Component<Props> = (props) => {
	return (
		<header>
			<div class={styles.buttons}>
				<Logo class={props.logoClass} />
				<Chibi class={props.chibiClass} />
			</div>
			<div class={styles.divider} />
		</header>
	);
};

export { Header };
