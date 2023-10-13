{ ... }:

{
	networking = {
		hostName = "nuttycloud";
		hostId = "68889bed";
		useDHCP = false;

		interfaces = {
			main = {
				useDHCP = false;
			};

			vrack = {
				useDHCP = false;
			};
		};

		firewall = {
			enable = true;
		};

		nameservers = [
			"1.1.1.1"
			"8.8.8.8"
		];
	};

	systemd = {
		network = {
			enable = true;
	
			# The server is configured with two network devices:
			#	 • a public one that is connected to the internet
			#	 • a private one that is connected to the vRack (unused)
			links = {
				"10-main" = {
					matchConfig = {
						MACAddress = "a8:a1:59:c1:51:fa";
					};
	
					linkConfig = {
						Name = "main";
					};
				};
	
				"20-vrack" = {
					matchConfig = {
						MACAddress = "a8:a1:59:c1:51:fb";
					};
	
					linkConfig = {
						Name = "vrack";
					};
				};
			};
	
			networks = {
				main = {
					extraConfig = ''
						[Match]
						Name = main
	
						[Network]
						Address = 15.204.47.34/24
						Gateway = 15.204.47.254
						Address = 2604:2dc0:200:1f22::/64
						Gateway = 2604:2dc0:0200:1fff:00ff:00ff:00ff:00ff
	
						# Avoid getting stuck in a "routable (configuring)" state.
						# See https://github.com/systemd/systemd/issues/8686
						LinkLocalAddressing = no
	
						[Route]
						# The IPv6 gateway (still reachable on the link) exists is in a
						# different subnet than the IP address assigned to the server.
						# See https://serverfault.com/a/1069528
						Gateway = 2604:2dc0:0200:1fff:00ff:00ff:00ff:00ff
						GatewayOnLink = yes
					'';
				};
	
				vrack = {
					extraConfig = ''
						[Match]
						Name = vrack
	
						[Link]
						RequiredForOnline = no
	
						[Network]
						LinkLocalAddressing = no
					'';
				};
			};
		};

		services = {
			systemd-networkd = {
				serviceConfig = {
					# Debugging network issues on a remote server can be a big
					# pain, so let's make it a little easier with verbose logs.
					Environment = "SYSTEMD_LOG_LEVEL=debug";
				};
			};

			systemd-networkd-wait-online = {
				serviceConfig = {
					# Default timeout is 120 seconds.
					# Fail faster.
					TimeoutStartSec = 10;
				};
			};
		};
	};
}
