{ pkgs, ... }:

{
	services = {
		plex = {
			enable = true;
			openFirewall = false;
			dataDir = "/data/plex";
		};

		caddy = {
			virtualHosts = {
				"plex.nuttyver.se" = {
					extraConfig = ''
						reverse_proxy :32400
					'';
				};
			};
		};
	};
}
