{
	description = "Nuttyverse tooling";

	inputs = {
		nixpkgs = {
			url = "github:NixOS/nixpkgs/nixos-unstable";
		};

		fish = {
			url = "./fish";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		git = {
			url = "./git";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		gpg = {
			url = "./gpg";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		keyboards = {
			url = "./keyboards";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		nvim = {
			url = "./nvim";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		tmux = {
			url = "./tmux";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		utils = {
			url = "./utils";
			inputs.nixpkgs.follows = "nixpkgs";
		};
	};

	outputs = { self, nixpkgs, ... } @ inputs: {
		devShell = {
			aarch64-darwin = nixpkgs.legacyPackages.aarch64-darwin.mkShell {
				inputsFrom = [
					inputs.fish.devShells.aarch64-darwin.default
					inputs.git.devShells.aarch64-darwin.default
					inputs.gpg.devShells.aarch64-darwin.default
					inputs.keyboards.devShells.aarch64-darwin.default
					inputs.nvim.devShells.aarch64-darwin.default
					inputs.tmux.devShells.aarch64-darwin.default
					inputs.utils.devShells.aarch64-darwin.default
				];
			};
		};
	};
}
