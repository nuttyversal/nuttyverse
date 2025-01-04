{ ... }:

{
	virtualisation = {
		oci-containers = {
			containers = {
				factorio = {
					image = "factoriotools/factorio:latest";

					environment = {
						GENERATE_NEW_SAVE = "false";
						LOAD_LATEST_SAVE = "true";
						SAVE_NAME = "nutty-factory";
					};

					volumes = [
						"/data/factorio:/factorio"
					];

					ports = [
						"27015:27015/tcp"
						"34197:34197/udp"
					];
				};
			};
		};
	};

	networking = {
		firewall = {
			allowedTCPPorts = [ 27015 ];
			allowedUDPPorts = [ 34197 ];
		};
	};
}
