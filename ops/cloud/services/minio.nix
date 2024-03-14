{ pkgs, ... }:

{
	services = {
		minio = {
			enable = true;
			listenAddress = ":64646";
			consoleAddress = ":64647";
			dataDir = "/data/minio";
			configDir = "/data/minio/config";
			region = "us-west-1";
			rootCredentialsFile = "[TODO]";
		};

		caddy = {
			virtualHosts = {
				"minio.nuttyver.se" = {
					extraConfig = ''
						reverse_proxy :64646
					'';
				};
			};
		};
	};
}
