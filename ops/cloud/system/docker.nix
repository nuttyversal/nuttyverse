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

	networking = {
		firewall = {
			# Allow Docker containers to access services running on the host
			# (e.g., Redis, PostgreSQL, etc.) without needing to expose them
			# to the outside world by opening ports.
			trustedInterfaces = [ "docker0" ];
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
