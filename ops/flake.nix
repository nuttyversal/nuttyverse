{
	description = "Nuttyverse Ops";

	inputs = {
		nixpkgs = {
			url = "github:NixOS/nixpkgs/nixos-unstable";
		};

		nixos-generators = {
			# Pinning to revision because kexec is broken in the latest HEAD.
			# See https://github.com/nix-community/nixos-generators/issues/259.
			url = "github:nix-community/nixos-generators?rev=122dcc32cadf14c5015aa021fae8882c5058263a";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		agenix = {
			url = "github:ryantm/agenix";
			inputs.nixpkgs.follows = "nixpkgs";
		};
	};

	outputs = inputs @ { nixpkgs, nixos-generators, agenix, ... }: {
		nixosConfigurations.nuttycloud = nixpkgs.lib.nixosSystem {
			system = "x86_64-linux";

			modules = [
				./cloud/configuration.nix
				./cloud/configuration.hardware.nix
				agenix.nixosModules.agenix
			];

			specialArgs = {
				inherit inputs;
			};
		};

		packages.x86_64-linux.nuttycloud = nixos-generators.nixosGenerate {
			format = "kexec-bundle";
			pkgs = nixpkgs.legacyPackages.x86_64-linux;

			modules = [
				./cloud/configuration.nix
				./cloud/configuration.kexec.nix
			];

			specialArgs = {
				inherit inputs;
			};
		};	

		devShell = {
			aarch64-darwin = nixpkgs.legacyPackages.aarch64-darwin.mkShell {
				buildInputs = [ agenix.packages.aarch64-darwin.default ];
			};
		};
	};
}
