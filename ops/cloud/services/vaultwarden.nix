{ ... }:

{
	services = {
		vaultwarden = {
			enable = true;

			# CREATE DATABASE vaultwarden;
			# CREATE USER vaultwarden WITH ENCRYPTED PASSWORD '<database-password>';
			# GRANT ALL ON DATABASE vaultwarden TO vaultwarden;
			# GRANT ALL PRIVILEGES ON DATABASE vaultwarden TO vaultwarden;
			dbBackend = "postgresql";

			# The database connection URL is stored in:
			environmentFile = "/run/secrets/vaultwarden-environment";

			config = {
				DATA_FOLDER = "/data/vaultwarden";
				DOMAIN = "https://vault.nuttyver.se";
				ROCKET_ADDRESS = "127.0.0.1";
				ROCKET_PORT = 9273;
				ROCKET_LOG = "critical";
				SIGNUPS_ALLOWED = true;
			};
		};

		caddy = {
			virtualHosts = {
				"vault.nuttyver.se" = {
					extraConfig = ''
						reverse_proxy :9273
					'';
				};
			};
		};
	};

	age = {
		secrets = {
			vaultwarden-environment = {
				file = ../secrets/vaultwarden-environment.age;
				path = "/run/secrets/vaultwarden-environment";
				owner = "vaultwarden";
				group = "vaultwarden";
				mode = "600";
			};
		};
	};
}
