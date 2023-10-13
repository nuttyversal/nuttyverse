{ ... }:

{
	services = {
		openssh = {
			enable = true;

			# Send 💓 every 60 seconds to prevent timeouts.
			extraConfig = "ClientAliveInterval 60";
		};
	};

	networking = {
		firewall = {
			allowedTCPPorts = [ 22 ];
		};
	};
}
