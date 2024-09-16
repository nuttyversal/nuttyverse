import { describe, it, expect } from "vitest";
import { Route } from "@solidjs/router";
import { render } from "@solidjs/testing-library";
import { ScrollLayout } from "~/components/ScrollLayout";
import { ServiceProvider } from "~/services/context";
import { Login } from "./Login";

describe("Login page", () => {
	it("renders without crashing", async () => {
		// Arrange.
		const App = () => (
			<ServiceProvider>
				<ScrollLayout>
					<Login />
				</ScrollLayout>
			</ServiceProvider>
		);

		const { findByText } = render(
			() => <Route path="/login" component={App} />,
			{ location: "/login" },
		);

		// Assert.
		expect(await findByText("Username")).toBeInTheDocument();
		expect(await findByText("Password")).toBeInTheDocument();
	});
});
