{ inputs, config, lib, pkgs, ... }:

with lib;
{
	imports = [
		# System Configuration
		./system/docker.nix
		./system/networking.nix
		./system/ssh.nix
		./system/users.nix
		./system/zfs.nix

		# Service Configuration
		./services/caddy.nix
		./services/gitea.nix
		./services/keycloak.nix
		./services/postgresql.nix
		./services/redis.nix
		./services/tailscale.nix
		./services/vaultwarden.nix

		# Container Configuration
		./containers/blocks.nix
		./containers/bot.nix
		./containers/font-force-field.nix
	];

	time = {
		timeZone = "America/Phoenix";
	};

	nix = {
		package = pkgs.nixVersions.stable;
		extraOptions = "experimental-features = nix-command flakes";
	};

	nixpkgs = {
		config = {
			allowUnfree = true;
		};
	};

	# This looks like something that should be updated. Don't do it!
	# https://nixos.wiki/wiki/FAQ/When_do_I_update_stateVersion
	system.stateVersion = "23.05";
}
