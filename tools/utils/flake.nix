{
	description = "Useful tools";

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
					bat = pkgs.bat;
					difftastic = pkgs.difftastic;
					duf = pkgs.duf;
					dust = pkgs.dust;
					entr = pkgs.entr;
					eza = pkgs.eza;
					fd = pkgs.fd;
					fzf = pkgs.fzf;
					glances = pkgs.glances;
					jq = pkgs.jq;
					just = pkgs.just;
					ripgrep = pkgs.ripgrep;
					sd = pkgs.sd;
					tldr = pkgs.tldr;

					# Node.js
					eslint = pkgs.nodePackages.eslint;
					nodejs = pkgs.nodejs;
					pnpm = pkgs.nodePackages.pnpm;
					prettier = pkgs.nodePackages.prettier;
					ts-node = pkgs.nodePackages.ts-node;
					typescript = pkgs.nodePackages.typescript;
				};

				devShells.default = pkgs.mkShell {
					buildInputs = pkgs.lib.attrsets.attrValues packages;
				};
			}
		);
}
