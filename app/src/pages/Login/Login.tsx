import styles from "./Login.module.scss";

const Login = () => {
	return (
		<div class={styles.container}>
			<div class={styles.field}>
				<label for="username">Username</label>
				<input id="username" type="text" />
			</div>

			<div class={styles.field}>
				<label for="password">Password</label>
				<input type="password" />
			</div>
		</div>
	);
};

export { Login };
