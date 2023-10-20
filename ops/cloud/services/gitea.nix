{ ... }:

{
	services = {
		gitea = {
			enable = true;
			appName = "Nuttyverse";
			user = "gitea";
			group = "gitea";
			stateDir = "/data/gitea";

			database = {
				type = "postgres";
				user = "gitea";
				name = "gitea";
				passwordFile = "/run/secrets/gitea-database-password";

				# If there are permission issues, run:
				# =# ALTER DATABASE gitea OWNER TO gitea;
				createDatabase = true;
			};

			dump = {
				enable = true;
				type = "tar.zst";
			};

			settings = {
				log = {
					LEVEL = "Error";
				};

				service = {
					DISABLE_REGISTRATION = true;
				};

				server = {
					DOMAIN = "code.nuttyver.se";
					ROOT_URL = "https://code.nuttyver.se/";
					HTTP_ADDR = "127.0.0.1";
					HTTP_PORT = 44832;
				};

				session = {
					COOKIE_SECURE = true;
				};

				other = {
					SHOW_FOOTER_VERSION = false;
				};
			};
		};
	};

	age = {
		secrets = {
			gitea-database-password = {
				file = ../secrets/gitea-database-password.age;
				path = "/run/secrets/gitea-database-password";
				owner = "gitea";
				group = "gitea";
				mode = "600";
			};
		};
	};
}
