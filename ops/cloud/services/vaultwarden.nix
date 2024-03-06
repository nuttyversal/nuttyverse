{ ... }:

{
	services = {
		vaultwarden = {
			enable = true;
			dbBackend = "postgresql";
			backupDir = "/data/vaultwarden/backups";

			config = {
				DATA_FOLDER = "/data/vaultwarden";
				DOMAIN = "vault.nuttyver.se";
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
}
