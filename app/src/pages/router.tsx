import { Route, Router } from "@solidjs/router";
import { Experiment } from "~/components/Experiment";
import { ScrollLayout } from "~/components/ScrollLayout";
import { Singularity } from "./Singularity";

const NuttyverseRouter = () => {
	return (
		<Router root={ScrollLayout}>
			<Route path="/" component={Singularity} />
			<Route path="/experiment" component={Experiment} />
		</Router>
	);
};

export { NuttyverseRouter };
