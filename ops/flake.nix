{
	description = "Nuttyverse Ops";

	inputs = {
		nixpkgs = {
			url = "github:NixOS/nixpkgs/nixos-unstable";
		};

		agenix = {
			url = "github:ryantm/agenix";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		flake-utils = {
			url = "github:numtide/flake-utils";
		};
	};

	outputs = inputs @ { nixpkgs, flake-utils, agenix, ... }:
		flake-utils.lib.eachDefaultSystem (system:
			let
				pkgs = import nixpkgs {
					inherit system;
				};
			in {
				devShells.default = pkgs.mkShell {
					buildInputs = [
						agenix.packages.${system}.default
					];
				};
			}
		);
}
