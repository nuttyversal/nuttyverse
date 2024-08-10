import { A, useNavigate } from "@solidjs/router";
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

	/**
	 * Additional CSS class(es) to apply to the link.
	 */
	class?: string;
};

const Link: ParentComponent<Props> = (props) => {
	const navigate = useNavigate();

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
	};

	// [HACK] <A> cannot be used in tests, so we need to use <a> instead.
	// @ts-expect-error import.meta is available.
	if (import.meta.env.MODE === "test") {
		return (
			<a
				href={props.href}
				target={props.newTab ? "_blank" : undefined}
				rel={props.newTab ? "noopener noreferrer" : undefined}
				onMouseDown={navigateImmediately}
				class={props.class}
			>
				{props.children}
			</a>
		);
	}

	return (
		<A
			href={props.href}
			target={props.newTab ? "_blank" : undefined}
			rel={props.newTab ? "noopener noreferrer" : undefined}
			onMouseDown={navigateImmediately}
			class={props.class}
		>
			{props.children}
		</A>
	);
};

export { Link };
