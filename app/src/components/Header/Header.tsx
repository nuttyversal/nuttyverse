import { Component } from "solid-js";
import { Chibi } from "./Chibi";
import { Logo } from "./Logo";
import styles from "./Header.module.scss";

const Header: Component = () => {
	return (
		<header class={styles.header}>
			<Logo />
			<Chibi />
		</header>
	);
};

export { Header };
