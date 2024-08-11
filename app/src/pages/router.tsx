import { Route, Router } from "@solidjs/router";
import { ScrollLayout } from "~/components/ScrollLayout";
import { Editor } from "./Editor";
import { Singularity } from "./Singularity";

const NuttyverseRouter = () => {
	return (
		<Router root={ScrollLayout}>
			<Route path="/" component={Singularity} />
			<Route path="/editor" component={Editor} />
		</Router>
	);
};

export { NuttyverseRouter };
