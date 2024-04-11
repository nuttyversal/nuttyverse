{
	description = "Fish tooling";

	inputs = {
		nixpkgs = {
			url = "github:NixOS/nixpkgs/nixos-unstable";
		};

		flake-utils = {
			url = "github:numtide/flake-utils";
		};
	};

	outputs = { self, flake-utils, nixpkgs }:
		flake-utils.lib.eachDefaultSystem (system:
			let
				pkgs = import nixpkgs {
					inherit system;
				};
			in rec {
				packages = {
					fish = pkgs.fish;
				};

				devShells.default = pkgs.mkShell {
					buildInputs = pkgs.lib.attrsets.attrValues packages;
				};
			}
		);
}
