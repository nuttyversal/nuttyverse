import { Effect } from "effect";
import { createStore } from "solid-js/store";
import { useCarmackClick } from "~/components/hooks";
import { useAuthentication } from "~/services/authentication";
import { HttpService, useHttp } from "~/services/http";
import styles from "./Login.module.scss";
import { customFetchLayer } from "~/utils/api";

const Login = () => {
	const [fields, setFields] = createStore({
		username: "",
		password: "",
	});

	const authenticationService = useAuthentication();
	const httpService = useHttp();

	const loginEffect = Effect.gen(function* () {
		yield* authenticationService.login(fields);
	}).pipe(
		Effect.scoped,
		Effect.provide(customFetchLayer),
		Effect.provideService(HttpService, httpService),
	);

	const logoutEffect = Effect.gen(function* () {
		yield* authenticationService.logout();
	}).pipe(
		Effect.scoped,
		Effect.provide(customFetchLayer),
		Effect.provideService(HttpService, httpService),
	);

	const onLogin = async () => {
		await Effect.runPromise(loginEffect);
		console.log("Logged in.");
	};

	const onLogout = async () => {
		await Effect.runPromise(logoutEffect);
		console.log("Logged out.");
	};

	const {
		handleMouseDown: handleLoginMouseDown,
		handleClick: handleLoginClick,
	} = useCarmackClick(onLogin);

	const {
		handleMouseDown: handleLogoutMouseDown,
		handleClick: handleLogoutClick,
	} = useCarmackClick(onLogout);

	return (
		<div class={styles.container}>
			<div class={styles.field}>
				<label for="username">Username</label>
				<input
					id="username"
					type="text"
					onInput={(e) => setFields("username", e.target.value)}
					required
				/>
			</div>

			<div class={styles.field}>
				<label for="password">Password</label>
				<input
					type="password"
					onInput={(e) => setFields("password", e.target.value)}
					required
				/>
			</div>

			<button
				class={styles.button}
				onMouseDown={handleLoginMouseDown}
				onClick={handleLoginClick}
			>
				Login
			</button>

			<button
				class={styles.button}
				onMouseDown={handleLogoutMouseDown}
				onClick={handleLogoutClick}
			>
				Logout
			</button>
		</div>
	);
};

export { Login };
