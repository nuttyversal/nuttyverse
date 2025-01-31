{ pkgs, ... }:

{
	services = {
		keycloak = {
			enable = true;

			settings = {
				hostname = "keycloak.nuttyver.se";
				http-port = 25625;
				# proxy = "edge";
			};

			database = {
				type = "postgresql";
				username = "keycloak";
				passwordFile = "/run/secrets/keycloak-database-password";
				createLocally = true;
			};
		};

		caddy = {
			virtualHosts = {
				"keycloak.nuttyver.se" = {
					extraConfig = ''
						reverse_proxy :25625
					'';
				};
			};
		};
	};

	age = {
		secrets = {
			keycloak-database-password = {
				file = ../secrets/keycloak-database-password.age;
				path = "/run/secrets/keycloak-database-password";
				owner = "root";
				group = "root";
				mode = "600";
			};
		};
	};
}
