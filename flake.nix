{
	description = "Nuttyverse";

	inputs = {
		nixpkgs = {
			url = "github:NixOS/nixpkgs/nixos-unstable";
		};

		flake-utils = {
			url = "github:numtide/flake-utils";
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

		fish = {
			url = "./tools/fish";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		git = {
			url = "./tools/git";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		gpg = {
			url = "./tools/gpg";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		keyboards = {
			url = "./tools/keyboards";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		nvim = {
			url = "./tools/nvim";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		utils = {
			url = "./tools/utils";
			inputs.nixpkgs.follows = "nixpkgs";
		};
	};

	outputs = { self, flake-utils, nixpkgs, ... } @ inputs: {
		devShell = {
			aarch64-darwin = nixpkgs.legacyPackages.aarch64-darwin.mkShell {
				inputsFrom = [
					inputs.blocks.devShells.aarch64-darwin.default
					inputs.city.devShells.aarch64-darwin.default
					inputs.fonts.devShells.aarch64-darwin.default
					inputs.ops.devShells.aarch64-darwin.default
					inputs.fish.devShells.aarch64-darwin.default
					inputs.git.devShells.aarch64-darwin.default
					inputs.gpg.devShells.aarch64-darwin.default
					inputs.keyboards.devShells.aarch64-darwin.default
					inputs.nvim.devShells.aarch64-darwin.default
					inputs.utils.devShells.aarch64-darwin.default
				];
			};
		};
	};
}
