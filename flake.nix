{
	description = "Nuttyverse";

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

		blocks = {
			url = "./blocks";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		bot = {
			url = "./bot";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		city = {
			url = "./city";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		fonts = {
			url = "./fonts";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		ops = {
			url = "./ops";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		tools = {
			url = "./tools";
			inputs.nixpkgs.follows = "nixpkgs";
		};
	};

	outputs = inputs @ { self, nix-darwin, nixos-generators, nixpkgs, agenix, ... }: {
		darwinConfigurations.nuttybook = nix-darwin.lib.darwinSystem {
			modules = [
				./ops/book/configuration.nix
			];

			specialArgs = {
				inherit inputs;
			};
		};

		nixosConfigurations.nuttycloud = nixpkgs.lib.nixosSystem {
			system = "x86_64-linux";

			modules = [
				./ops/cloud/configuration.nix
				./ops/cloud/configuration.hardware.nix
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
				./ops/cloud/configuration.nix
				./ops/cloud/configuration.kexec.nix
			];

			specialArgs = {
				inherit inputs;
			};
		};	

		devShell = {
			aarch64-darwin = nixpkgs.legacyPackages.aarch64-darwin.mkShell {
				inputsFrom = [
					inputs.blocks.devShells.aarch64-darwin.default
					inputs.city.devShells.aarch64-darwin.default
					inputs.fonts.devShells.aarch64-darwin.default
					inputs.ops.devShells.aarch64-darwin.default
					inputs.tools.devShells.aarch64-darwin.default
				];
			};
		};
	};
}
