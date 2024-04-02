{
	description = "Nuttyverse City";

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
						ruby
					];

					shellHook = ''
						export GEM_HOME="$PWD/.gem"
						export PATH="$GEM_HOME/bin:$PATH"
						${pkgs.ruby}/bin/gem install --no-user-install --install-dir $GEM_HOME neocities
					'';
				};
			}
		);
}
