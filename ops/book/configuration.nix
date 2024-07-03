{ inputs, pkgs, ... }:

{
	environment = {
		darwinConfig = "$HOME/Code/nuttyverse/ops/book/configuration.nix";

		systemPackages = pkgs.lib.attrsets.attrValues inputs.tools.packages.aarch64-darwin ++ [
			# Used for remote deployments.
			pkgs.nixos-rebuild
		];
	};

	nixpkgs = {
		hostPlatform = "aarch64-darwin";
	};

	programs = {
		fish = {
			# Enabling fish via Nix instead of Homebrew will initialize the Nix
			# configuration environment, which will include the packages in the
			# system profile.
			enable = true;
		};
	};

	services = {
		nix-daemon = {
			enable = true;
		};
	};

	system = {
		# Used for backwards compatibility, please read the changelog before changing.
		# $ darwin-rebuild changelog
		stateVersion = 4;
	};
}
