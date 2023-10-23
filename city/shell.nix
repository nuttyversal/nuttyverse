let nixpkgs = import <nixpkgs> {};
in nixpkgs.stdenv.mkDerivation {
	name = "neocities-cli";

	buildInputs = with nixpkgs; [
		nodePackages.pnpm
		ruby
	];

	shellHook = ''
		export GEM_HOME="$PWD/.gem"
		export PATH="$GEM_HOME/bin:$PATH"
		${nixpkgs.ruby}/bin/gem install --no-user-install --install-dir $GEM_HOME neocities
	'';
}
