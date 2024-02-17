{ ... }:

{
	virtualisation = {
		oci-containers = {
			containers = {
				font-force-field = {
					image = "code.nuttyver.se/observable/font-force-field:latest";

					ports = [
						"3668:3030"
					];

					volumes = [
						"/data/fonts:/fonts"
					];
				};
			};
		};
	};

	services = {
		caddy = {
			virtualHosts = {
				"fonts.nuttyver.se" = {
					extraConfig = ''
						reverse_proxy :3668
					'';
				};
			};
		};
	};
}
