{
   description = "Nuttyverse Font Force Field";

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
						fish
						just

						# Used for server dependencies
						libiconv
						rustup

						# Used for font subsetting
						python3
						python3.pkgs.fonttools
						python3.pkgs.brotli
					];

					shellHook = ''
						# Setup Rust
						export PATH=$PATH:''${CARGO_HOME:-~/.cargo}/bin
						export PATH=$PATH:''${RUSTUP_HOME:-~/.rustup}/toolchains/$RUSTC_VERSION-x86_64-unknown-linux-gnu/bin/

						# Setup Python
						export PIP_PREFIX=$(pwd)/_build/pip_packages
						export PYTHONPATH="$PIP_PREFIX/${pkgs.python3.sitePackages}:$PYTHONPATH"
						export PATH="$PIP_PREFIX/bin:$PATH"
						unset SOURCE_DATE_EPOCH
					'';

					# Used to pin the version of the Rust compiler.
					RUSTC_VERSION = pkgs.lib.readFile ./rust-toolchain;
				};
			}
		);
}
