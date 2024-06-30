{
	description = "Music engraving";

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
					# [NOTE] Getting fontconfig errors on macOS. 
					# On darwin, install from Homebrew.
					lilypond = pkgs.lilypond;
				};

				devShells.default = pkgs.mkShell {
					buildInputs = pkgs.lib.attrsets.attrValues packages;
				};
			}
		);
}
