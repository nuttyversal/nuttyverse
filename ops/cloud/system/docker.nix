{ ... }:

{
	virtualisation = {
		docker = {
			enable = true;
		};

		oci-containers = {
			backend = "docker";

			containers = {
				watchtower = {
					image = "containrrr/watchtower";
					volumes = [ "/var/run/docker.sock:/var/run/docker.sock" ];
				};
			};
		};
	};

	users = {
		extraGroups = {
			docker = {
				members = [ "versal" ];
			};
		};
	};
}
