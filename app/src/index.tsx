import { render } from "solid-js/web";

const root = document.getElementById("root");

if (!root) {
	throw new Error("Root element not found.");
}

render(() => <div>Nuttyverse</div>, root);
