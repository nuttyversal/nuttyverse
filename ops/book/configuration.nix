{ config, pkgs, ... }:

{
	environment = {
		darwinConfig = "$HOME/Code/nuttyverse/ops/book/configuration.nix";

		# List packages installed in system profile. To search by name, run:
		# $ nix-env -qaP | grep wget
		systemPackages = [ ];
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
