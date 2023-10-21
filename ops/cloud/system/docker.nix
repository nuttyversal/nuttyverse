{ ... }:

{
	virtualisation = {
		docker = {
			enable = true;
		};

		oci-containers = {
			backend = "docker";
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
