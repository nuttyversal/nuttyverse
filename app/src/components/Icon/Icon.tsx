import { Component, JSX } from "solid-js";
import {
	IconName,
	IconPrefix,
	findIconDefinition,
	icon,
} from "@fortawesome/fontawesome-svg-core";
import styles from "./Icon.module.scss";
import "./library";

type Props = {
	/**
	 * The Font Awesome icon prefix (e.g., "fas", "fab", "far").
	 */
	prefix?: IconPrefix;

	/**
	 * The Font Awesome icon name (e.g., "sparkle", "user", "heart").
	 */
	name: IconName;

	class?: string | undefined;
	style?: JSX.CSSProperties | string;
};

const Icon: Component<Props> = (props) => {
	const prefix = props.prefix ?? "fas";
	const name = props.name;

	const classes = {
		[styles.icon]: true,
		[props.class ?? ""]: true,
	};

	// Query the library for the icon definition.
	const definition = findIconDefinition({ prefix, iconName: name });

	// If the icon is not found, render a bug.
	if (!definition) {
		const bug = findIconDefinition({ prefix: "fas", iconName: "bug" });
		const html = icon(bug).html.join("\n");
		return <i classList={classes} style={props.style} innerHTML={html} />;
	}

	// Render the icon.
	const html = icon(definition).html.join("\n");
	return <i classList={classes} style={props.style} innerHTML={html} />;
};

export { Icon };
