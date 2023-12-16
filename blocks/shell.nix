let nixpkgs = import <nixpkgs> {};
in nixpkgs.stdenv.mkDerivation {
	name = "nuttyverse-blocks";

	buildInputs = with nixpkgs; [
		nodePackages.pnpm
		nodejs
	];
}
