{ pkgs, ... }:

{
	services = {
		minio = {
			enable = true;
			listenAddress = ":64646";
			consoleAddress = ":64647";
			dataDir = [ "/data/minio/data" ];
			configDir = "/data/minio/config";
			region = "us-west-1";
			rootCredentialsFile = "/run/secrets/minio-credentials";
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

	age = {
		secrets = {
			minio-credentials = {
				file = ../secrets/minio-credentials.age;
				path = "/run/secrets/minio-credentials";
				owner = "root";
				group = "root";
				mode = "600";
			};
		};
	};
}
