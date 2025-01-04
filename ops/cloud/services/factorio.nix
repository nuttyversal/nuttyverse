{ pkgs, ... }:

{
	services = {
		factorio = {
			enable = true;
			game-name = "Nutty Factory";
			description = "Nutty Factory";

			# The configuration and map files will
			# be stored in /var/lib/factorio.
			stateDirName = "factorio";
			saveName = "nutty-factory";

			extraSettings = {
				admins = [ "nuttyversal" ];
			};
		};
	};

	networking = {
		firewall = {
			allowedTCPPorts = [ 34197 ];
			allowedUDPPorts = [ 34197 ];
		};
	};
}
