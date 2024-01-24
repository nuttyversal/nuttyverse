{ config, pkgs, ... }:

{
	environment = {
		systemPackages = with pkgs; [
			tailscale
		];
	};

	services = {
		tailscale = {
			enable = true;
		};
	};

	networking.firewall = {
		allowedUDPPorts = [ config.services.tailscale.port ];

		# Strict reverse path filtering breaks Tailscale
		# exit node use and some subnet routing setups.
		checkReversePath = "loose";
	};

	systemd = {
		network = {
			wait-online = {
				# Link configuration check for this network interface is flaky.
				# Related: https://github.com/NixOS/nixpkgs/issues/180175
				ignoredInterfaces = [ "tailscale0" ];
			};
		};
	};
}
