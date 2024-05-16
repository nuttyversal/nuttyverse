{
	description = "Spaceship Storage";

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
						# Used for development
						just

						# Python
						python3Full
						poetry
					];

					shellHook = ''
						# Setup Python
						export PIP_PREFIX=$(pwd)/_build/pip_packages
						export PYTHONPATH="$PIP_PREFIX/${pkgs.python3.sitePackages}:$PYTHONPATH"
						export PATH="$PIP_PREFIX/bin:$PATH"
						unset SOURCE_DATE_EPOCH
					'';
				};
			}
		);
}
