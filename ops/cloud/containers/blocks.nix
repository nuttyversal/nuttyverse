{ ... }:

{
	virtualisation = {
		oci-containers = {
			containers = {
				blocks = {
					image = "code.nuttyver.se/observable/blocks:latest";
					ports = [ "2565:80" ];
				};
			};
		};
	};

	services = {
		caddy = {
			virtualHosts = {
				"blocks.nuttyver.se" = {
					extraConfig = ''
						reverse_proxy :2565
					'';
				};
			};
		};
	};
}
