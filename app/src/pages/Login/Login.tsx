import { Effect, Option } from "effect";
import { createStore } from "solid-js/store";
import { useCarmackClick } from "~/components/hooks";
import { AuthenticationService } from "~/services/authentication";
import { useRuntime } from "~/services/context";
import styles from "./Login.module.scss";

const Login = () => {
	const { NuttyverseRuntime } = useRuntime();

	const [fields, setFields] = createStore({
		username: "",
		password: "",
	});

	const store = NuttyverseRuntime.runSync(
		Effect.gen(function* () {
			return (yield* AuthenticationService).store;
		}),
	);

	const loginEffect = Effect.gen(function* () {
		const authenticationService = yield* AuthenticationService;
		return yield* authenticationService.login(fields);
	}).pipe(Effect.scoped);

	const logoutEffect = Effect.gen(function* () {
		const authenticationService = yield* AuthenticationService;
		return yield* authenticationService.logout;
	}).pipe(Effect.scoped);

	const onLogin = async () => {
		await NuttyverseRuntime.runPromise(loginEffect);
	};

	const onLogout = async () => {
		await NuttyverseRuntime.runPromise(logoutEffect);
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
					placeholder="navigator"
					required
				/>
			</div>

			<div class={styles.field}>
				<label for="password">Password</label>
				<input
					type="password"
					onInput={(e) => setFields("password", e.target.value)}
					placeholder="alohomora"
					required
				/>
			</div>

			{Option.isSome(store.currentState)
				? store.currentState.value.value
				: null}

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
