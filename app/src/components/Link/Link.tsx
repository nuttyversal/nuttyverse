import { A, useNavigate } from "@solidjs/router";
import { createSignal, ParentComponent } from "solid-js";
import { Icon } from "~/components/Icon";
import styles from "./Link.module.scss";

type Props = {
	/**
	 * The target URL of the link.
	 */
	href: string;

	/**
	 * If enabled (`true`), opens the link in a new tab.
	 */
	newTab?: boolean;

	/**
	 * If enabled (`true`), applies hover styles to the link.
	 */
	hover?: boolean;

	/**
	 * Additional CSS class(es) to apply to the link.
	 */
	class?: string;
};

const Link: ParentComponent<Props> = (props) => {
	const navigate = useNavigate();

	const [preventDefault, setPreventDefault] = createSignal(false);

	const onClickCancelable = (event: MouseEvent) => {
		if (preventDefault()) {
			event.preventDefault();
		}
	};

	// Carmack's "Act on press" UI design principle.
	// Experimental. This might make users angry.
	const navigateImmediately = (event: MouseEvent) => {
		if (event.button === 0) {
			if (props.newTab) {
				window.open(props.href, "_blank", "noopener,noreferrer");
			} else {
				navigate(props.href);
			}
		}

		// Prevent the click event from firing.
		// This is to avoid double navigations.
		setPreventDefault(true);
	};

	const classes = {
		[props.class ?? ""]: true,
		["with-hover-styles"]: props.hover ?? true,
	};

	return (
		<A
			href={props.href}
			target={props.newTab ? "_blank" : ""}
			rel={props.newTab ? "noopener noreferrer" : ""}
			onClick={onClickCancelable}
			onMouseDown={navigateImmediately}
			classList={classes}
		>
			{props.children}
			{props.newTab && (
				<Icon class={styles.icon} name="arrow-up-right-from-square" />
			)}
		</A>
	);
};

export { Link };
