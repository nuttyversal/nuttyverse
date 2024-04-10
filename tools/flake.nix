{
	description = "Nuttyverse tooling";

	inputs = {
		nixpkgs = {
			url = "github:NixOS/nixpkgs/nixos-unstable";
		};

		flake-utils = {
			url = "github:numtide/flake-utils";
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

	outputs = inputs @ { self, flake-utils, nixpkgs, ... }:
		flake-utils.lib.eachDefaultSystem (system:
			let
				pkgs = import nixpkgs {
					inherit system;
				};
			in {
				devShells.default = pkgs.mkShell {
					inputsFrom = [
						inputs.fish.devShells.${system}.default
						inputs.git.devShells.${system}.default
						inputs.gpg.devShells.${system}.default
						inputs.keyboards.devShells.${system}.default
						inputs.nvim.devShells.${system}.default
						inputs.tmux.devShells.${system}.default
						inputs.utils.devShells.${system}.default
					];
				};
			}
		);
}
