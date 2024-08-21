import { Component } from "solid-js";
import { Chibi } from "./Chibi";
import { Logo } from "./Logo";
import styles from "./Header.module.scss";

const Header: Component = () => {
	return (
		<header data-testid="header">
			<div class={styles.buttons}>
				<Logo />
				<Chibi />
			</div>
			<div class={styles.divider} />
		</header>
	);
};

export { Header };
