{ config, lib, pkgs, ... }:

{
	imports = [
		# System Configuration
		./system/docker.nix
		./system/ssh.nix
		./system/users.nix

		# Container Configuration
		./containers/pi-hole.nix
	];

	boot = {
		loader = {
			# Use the extlinux boot loader.
			# NixOS wants to enable GRUB by default.
			grub = {
				enable = false;
			};

			# Enables the generation of /boot/extlinux/extlinux.conf.
			generic-extlinux-compatible = {
				enable = true;
			};
		};
	};

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

	security = {
		sudo = {
			wheelNeedsPassword = false;
		};
	};

	# This looks like something that should be updated. Don't do it!
	# https://nixos.wiki/wiki/FAQ/When_do_I_update_stateVersion
	system.stateVersion = "24.05"; # Did you read the comment?
}

