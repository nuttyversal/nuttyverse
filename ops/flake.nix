{
	description = "Nuttyverse Ops";

	inputs = {
		nixpkgs = {
			url = "github:NixOS/nixpkgs/nixos-unstable";
		};

		nix-darwin = {
			url = "github:LnL7/nix-darwin";
			inputs.nixpkgs.follows = "nixpkgs";
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

	outputs = inputs @ { nixpkgs, nix-darwin, nixos-generators, agenix, ... }: {
		darwinConfigurations.nuttybook = nix-darwin.lib.darwinSystem {
			modules = [
				./book/configuration.nix
			];
		};

		nixosConfigurations.nuttycloud = nixpkgs.lib.nixosSystem {
			system = "x86_64-linux";

			modules = [
				./cloud/configuration.nix
				./cloud/configuration.hardware.nix
				agenix.nixosModules.default
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

		devShells = {
			aarch64-darwin = {
				default = nixpkgs.legacyPackages.aarch64-darwin.mkShell {
					buildInputs = [ agenix.packages.aarch64-darwin.default ];
				};
			};
		};
	};
}
