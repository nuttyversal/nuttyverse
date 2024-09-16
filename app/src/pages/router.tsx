import { Route, Router } from "@solidjs/router";
import { ScrollLayout } from "~/components/ScrollLayout";
import { Editor } from "./Editor";
import { Login } from "./Login";
import { Singularity } from "./Singularity";

const NuttyverseRouter = () => {
	return (
		<Router root={ScrollLayout}>
			<Route path="/" component={Singularity} />
			<Route path="/login" component={Login} />
			<Route path="/editor" component={Editor} />
		</Router>
	);
};

export { NuttyverseRouter };
