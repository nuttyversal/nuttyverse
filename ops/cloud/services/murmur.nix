{ pkgs, ... }:

{
	services = {
		murmur = {
			enable = true;
			welcometext = "Welcome to the Nuttyverse!";
			registerHostname = "mumble.nuttyverse.com";
			registerName = "Nuttyverse";
			bandwidth = 256000;
			port = 64738;
		};
	};

	networking = {
		firewall = {
			allowedTCPPorts = [ 64738 ];
			allowedUDPPorts = [ 64738 ];
		};
	};
}
