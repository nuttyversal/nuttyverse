let nixpkgs = import <nixpkgs> {};
in nixpkgs.stdenv.mkDerivation {
	name = "nuttyverse-bot";

	buildInputs = with nixpkgs; [
		just
		nodePackages.pnpm
		nodejs
	];
}
