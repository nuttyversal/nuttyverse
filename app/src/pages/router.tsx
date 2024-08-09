import { Route, Router } from "@solidjs/router";
import { ScrollLayout } from "~/components/ScrollLayout";
import { Singularity } from "./Singularity";

const NuttyverseRouter = () => {
	return (
		<Router root={ScrollLayout}>
			<Route path="/" component={Singularity} />
		</Router>
	);
};

export { NuttyverseRouter };
