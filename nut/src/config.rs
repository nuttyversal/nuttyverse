use std::env;
use std::process;

/// Environment-based configuration.
pub struct Config {
	/// The URL of the Keycloak server.
	pub keycloak_url: String,

	/// The realm of the Keycloak server.
	pub keycloak_realm: String,

	/// The client ID of the Keycloak client.
	pub keycloak_client_id: String,

	/// The client secret of the Keycloak client.
	pub keycloak_client_secret: String,
}

impl Config {
	/// Loads the configuration from environment variables.
	pub fn load() -> Self {
		Config {
			keycloak_url: read_environment_variable("KEYCLOAK_URL"),
			keycloak_realm: read_environment_variable("KEYCLOAK_REALM"),
			keycloak_client_id: read_environment_variable("KEYCLOAK_CLIENT_ID"),
			keycloak_client_secret: read_environment_variable("KEYCLOAK_CLIENT_SECRET"),
		}
	}
}

/// Reads an environment variable or exits the process if it is not set.
fn read_environment_variable(name: &str) -> String {
	env::var(name).unwrap_or_else(|_| {
		eprintln!("{} must be set.", name);
		process::exit(1);
	})
}
