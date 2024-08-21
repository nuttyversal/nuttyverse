import { describe, it, expect } from "vitest";
import { Route } from "@solidjs/router";
import { render } from "@solidjs/testing-library";
import { ScrollLayout } from "~/components/ScrollLayout";
import { ServiceProvider } from "~/services/context";
import { Singularity } from "./Singularity";

describe("Singularity page", () => {
	it("renders without crashing", async () => {
		// Arrange.
		const App = () => (
			<ServiceProvider>
				<ScrollLayout>
					<Singularity />
				</ScrollLayout>
			</ServiceProvider>
		);

		const { findByText } = render(() => <Route path="/" component={App} />, {
			location: "/",
		});

		// Assert.
		expect(await findByText("this point")).toBeInTheDocument();
	});
});
