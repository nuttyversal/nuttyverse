{ ... }:

{
	virtualisation = {
		docker = {
			enable = true;
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
