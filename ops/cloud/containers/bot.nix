{ ... }:

{
	virtualisation = {
		oci-containers = {
			containers = {
				bot = {
					image = "code.nuttyver.se/observable/bot:latest";
					ports = [ "6268:3000" ];
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
}
