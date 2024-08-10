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

					environment = {
						# Check for new updates every minute.
						WATCHTOWER_POLL_INTERVAL = "60";
					};
				};
			};
		};
	};

	users = {
		extraGroups = {
			docker = {
				members = [ "nutty" ];
			};
		};
	};
}
