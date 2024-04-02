{
	description = "Nuttyverse Bot";

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
			in {
				devShells.default = pkgs.mkShell {
					buildInputs = with pkgs; [
						just
						nodePackages.pnpm
						nodejs
					];
				};
			}
		);
}
