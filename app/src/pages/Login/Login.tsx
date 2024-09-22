import { differenceInSeconds } from "date-fns";
import { Effect, Option } from "effect";
import { createStore } from "solid-js/store";
import { createSignal, onCleanup } from "solid-js";
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

	const authenticationService = NuttyverseRuntime.runSync(
		Effect.gen(function* () {
			return yield* AuthenticationService;
		}),
	);

	const { store } = authenticationService;

	const [timeLeft, setTimeLeft] = createSignal("");

	const formatTimeLeft = (totalSeconds: number) => {
		if (totalSeconds <= 0) return "Expired";
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes}m ${seconds}s`;
	};

	const updateTimeLeft = () => {
		if (Option.isSome(store.session)) {
			const expiresAt = new Date(store.session.value.expiresAt);
			const now = new Date();
			const secondsLeft = differenceInSeconds(expiresAt, now);

			setTimeLeft(formatTimeLeft(secondsLeft));
		}
	};

	updateTimeLeft();
	const intervalId = setInterval(updateTimeLeft, 100);
	onCleanup(() => clearInterval(intervalId));

	const loginEffect = Effect.gen(function* () {
		const authenticationService = yield* AuthenticationService;
		return yield* authenticationService.login(fields);
	}).pipe(Effect.scoped);

	const logoutEffect = Effect.gen(function* () {
		const authenticationService = yield* AuthenticationService;
		return yield* authenticationService.logout;
	}).pipe(Effect.scoped);

	const refreshEffect = Effect.gen(function* () {
		const authenticationService = yield* AuthenticationService;
		return yield* authenticationService.refresh;
	}).pipe(Effect.scoped);

	const handleLogin = () => NuttyverseRuntime.runPromise(loginEffect);
	const handleLogout = () => NuttyverseRuntime.runPromise(logoutEffect);
	const handleRefresh = () => NuttyverseRuntime.runPromise(refreshEffect);

	const {
		handleMouseDown: handleLoginMouseDown,
		handleClick: handleLoginClick,
	} = useCarmackClick(handleLogin);

	const {
		handleMouseDown: handleLogoutMouseDown,
		handleClick: handleLogoutClick,
	} = useCarmackClick(handleLogout);

	const {
		handleMouseDown: handleRefreshMouseDown,
		handleClick: handleRefreshClick,
	} = useCarmackClick(handleRefresh);

	return (
		<div class={styles.container}>
			{!authenticationService.isLoggedIn() && (
				<>
					<div class={styles.field}>
						<label for="username">Username</label>
						<input
							id="username"
							type="text"
							onInput={(e) => setFields("username", e.target.value)}
							value={fields.username}
							placeholder="navigator"
							required
						/>
					</div>

					<div class={styles.field}>
						<label for="password">Password</label>
						<input
							type="password"
							onInput={(e) => setFields("password", e.target.value)}
							value={fields.password}
							placeholder="alohomora"
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
				</>
			)}

			{authenticationService.isLoggedIn() &&
				Option.isSome(store.session) && (
					<>
						<ul>
							<li>
								Ahoy there, <code>{store.session.value.username}</code>!
							</li>

							<li>Your access token expires in {timeLeft()}.</li>
						</ul>

						<button
							class={styles.button}
							onMouseDown={handleRefreshMouseDown}
							onClick={handleRefreshClick}
						>
							Refresh
						</button>

						<button
							class={styles.button}
							onMouseDown={handleLogoutMouseDown}
							onClick={handleLogoutClick}
						>
							Logout
						</button>
					</>
				)}

			<p>
				State machine: <code>{JSON.stringify(store.snapshot.value)}</code>
			</p>
		</div>
	);
};

export { Login };
