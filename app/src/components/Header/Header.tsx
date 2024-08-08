import { Component } from "solid-js";
import { themeService } from "~/services/theme";
import { Chibi } from "./Chibi";
import { Logo } from "./Logo";
import styles from "./Header.module.scss";

const Header: Component = () => {
	return (
		<header class={styles.header}>
			<Logo />
			<Chibi themeService={themeService} />
		</header>
	);
};

export { Header };
