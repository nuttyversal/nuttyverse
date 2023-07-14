let nixpkgs = import <nixpkgs> {};
in nixpkgs.stdenv.mkDerivation {
	name = "nuttyverse-space";

	buildInputs = with nixpkgs; [
		rustup
	];

	shellHook = ''
		export PATH=$PATH:''${CARGO_HOME:-~/.cargo}/bin
		export PATH=$PATH:''${RUSTUP_HOME:-~/.rustup}/toolchains/$RUSTC_VERSION-x86_64-unknown-linux-gnu/bin/
	'';

	# Used to pin the version of the Rust compiler.
	RUSTC_VERSION = nixpkgs.lib.readFile ./rust-toolchain;
}
