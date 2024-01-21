let nixpkgs = import <nixpkgs> {};
in nixpkgs.stdenv.mkDerivation {
	name = "nuttyverse-blocks";

	buildInputs = with nixpkgs; [
		just
		nodePackages.pnpm
		nodejs
	];
}
