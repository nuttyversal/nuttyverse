import { Route, Router } from "@solidjs/router";
import { Singularity } from "./Singularity";

const NuttyverseRouter = () => {
	return (
		<Router>
			<Route path="/" component={Singularity} />
		</Router>
	);
};

export { NuttyverseRouter };
