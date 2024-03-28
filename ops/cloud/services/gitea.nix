{ lib, ... }:

let
	# Number of Gitea Action runners.
	runnerCount = 4;
in {
	services = {
		gitea = {
			enable = true;
			appName = "Nuttyverse";
			user = "gitea";
			group = "gitea";
			stateDir = "/data/gitea";

			database = {
				type = "postgres";
				user = "gitea";
				name = "gitea";
				passwordFile = "/run/secrets/gitea-database-password";

				# If there are permission issues, run:
				# =# ALTER DATABASE gitea OWNER TO gitea;
				createDatabase = true;
			};

			dump = {
				enable = true;
				type = "tar.zst";
			};

			settings = {
				actions = {
					# This can be removed after Gitea is upgraded to version
					# 1.21, which automatically sets this to true.
					ENABLED = true;
				};

				log = {
					LEVEL = "Error";
				};

				service = {
					DISABLE_REGISTRATION = true;
				};

				server = {
					DOMAIN = "code.nuttyver.se";
					ROOT_URL = "https://code.nuttyver.se/";
					LOCAL_ROOT_URL = "https://code.nuttyver.se/";
					HTTP_ADDR = "127.0.0.1";
					HTTP_PORT = 44832;
				};

				session = {
					COOKIE_SECURE = true;
				};

				other = {
					SHOW_FOOTER_VERSION = false;
				};
			};
		};

		gitea-actions-runner = {
			instances = 
				lib.genAttrs
					(builtins.genList builtins.toString runnerCount)
					(index: {
						enable = true;
						name = "runner-${index}";
						url = "https://code.nuttyver.se";
						tokenFile = "/run/secrets/gitea-actions-runner-${index}-token";

						settings = {
							container = {
								network = "host";
							};
						};

						labels = [
							"self-hosted"
							"nix:docker://nixpkgs/nix"
						];
					});
		};

		caddy = {
			virtualHosts = {
				"code.nuttyver.se" = {
					extraConfig = ''
						reverse_proxy :44832
					'';
				};
			};
		};
	};

	age = {
		secrets = {
			gitea-database-password = {
				file = ../secrets/gitea-database-password.age;
				path = "/run/secrets/gitea-database-password";
				owner = "gitea";
				group = "gitea";
				mode = "600";
			};

			gitea-actions-runner-0-token = {
				file = ../secrets/gitea-actions-runner-0-token.age;
				path = "/run/secrets/gitea-actions-runner-0-token";
				owner = "gitea";
				group = "gitea";
				mode = "600";
			};

			gitea-actions-runner-1-token = {
				file = ../secrets/gitea-actions-runner-1-token.age;
				path = "/run/secrets/gitea-actions-runner-1-token";
				owner = "gitea";
				group = "gitea";
				mode = "600";
			};

			gitea-actions-runner-2-token = {
				file = ../secrets/gitea-actions-runner-2-token.age;
				path = "/run/secrets/gitea-actions-runner-2-token";
				owner = "gitea";
				group = "gitea";
				mode = "600";
			};

			gitea-actions-runner-3-token = {
				file = ../secrets/gitea-actions-runner-3-token.age;
				path = "/run/secrets/gitea-actions-runner-3-token";
				owner = "gitea";
				group = "gitea";
				mode = "600";
			};
		};
	};
}
