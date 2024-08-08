import { ParentComponent } from "solid-js";

type Props = {
	/**
	 * The target URL of the link.
	 */
	href: string;

	/**
	 * If enabled (`true`), opens the link in a new tab.
	 */
	newTab?: boolean;
};

const Link: ParentComponent<Props> = (props) => {
	// Carmack's "Act on press" UI design principle.
	// Experimental. This might make users angry.
	const navigateImmediately = (event: MouseEvent) => {
		if (event.button === 0) {
			if (props.newTab) {
				window.open(props.href, "_blank", "noopener,noreferrer");
			} else {
				window.location.href = props.href;
			}
		}
	};

	return (
		<a
			href={props.href}
			target={props.newTab ? "_blank" : undefined}
			rel={props.newTab ? "noopener noreferrer" : undefined}
			onMouseDown={navigateImmediately}
		>
			{props.children}
		</a>
	);
};

export { Link };
