let nixpkgs = import <nixpkgs> {};
in nixpkgs.stdenv.mkDerivation {
	name = "font-force-field";

	buildInputs = with nixpkgs; [
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
		export PYTHONPATH="$PIP_PREFIX/${nixpkgs.python3.sitePackages}:$PYTHONPATH"
		export PATH="$PIP_PREFIX/bin:$PATH"
		unset SOURCE_DATE_EPOCH
	'';

	# Used to pin the version of the Rust compiler.
	RUSTC_VERSION = nixpkgs.lib.readFile ./rust-toolchain;
}
