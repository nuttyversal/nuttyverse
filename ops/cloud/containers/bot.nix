{ ... }:

{
	virtualisation = {
		oci-containers = {
			containers = {
				bot = {
					image = "code.nuttyver.se/observable/bot:latest";
					ports = [ "6268:3000" ];
					environmentFiles = [ "/run/secrets/nutty-bot-environment" ];
					extraOptions = [ "--network=host" ];
				};
			};
		};
	};

	services = {
		caddy = {
			virtualHosts = {
				"bot.nuttyver.se" = {
					extraConfig = ''
						reverse_proxy :6268
					'';
				};
			};
		};
	};

	age = {
		secrets = {
			nutty-bot-environment = {
				file = ../secrets/nutty-bot-environment.age;
				path = "/run/secrets/nutty-bot-environment";
				owner = "root";
				group = "root";
				mode = "600";
			};
		};
	};
}
