{ lib, pkgs, ... }:

{
	services = {
		mastodon = {
			enable = true;
			user = "mastodon";
			group = "mastodon";
			localDomain = "toots.nuttyver.se";
			webPort = 55001;

			# Number of CPU cores minus one.
			streamingProcesses = 23;

			extraConfig = {
				SINGLE_USER_MODE = "true";
			};

			smtp = {
				fromAddress = "bot@nuttyver.se";
			};
		};

		caddy = {
			virtualHosts = {
				"toots.nuttyver.se" = {
					extraConfig = ''
						handle_path /system/* {
							file_server * {
								root /var/lib/mastodon/public-system
							}
						}

						handle /api/v1/streaming/* {
							reverse_proxy unix//run/mastodon-streaming/streaming.socket
						}

						route * {
							file_server * {
								root ${pkgs.mastodon}/public
								pass_thru
							}

							reverse_proxy * unix//run/mastodon-web/web.socket
						}

						handle_errors {
							root * ${pkgs.mastodon}/public
							rewrite 500.html
							file_server
						}

						encode gzip

						header /* {
							Strict-Transport-Security "max-age=31536000;"
						}

						header /emoji/* Cache-Control "public, max-age=31536000, immutable"
						header /packs/* Cache-Control "public, max-age=31536000, immutable"
						header /system/accounts/avatars/* Cache-Control "public, max-age=31536000, immutable"
						header /system/media_attachments/files/* Cache-Control "public, max-age=31536000, immutable"
					'';
				};
			};
		};
	};

	users = {
		users = {
			caddy = {
				# Caddy requires file and socket access.
				extraGroups = [ "mastodon" ];
			};
		};
	};

	systemd = {
		services = {
			caddy = {
				serviceConfig = {
					ReadWriteDirectories = lib.mkForce [
						"/var/lib/caddy"
						"/run/mastodon-web"
					];
				};
			};
		};
	};
}
