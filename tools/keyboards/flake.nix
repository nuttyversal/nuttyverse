{
	description = "Nutty Keyboards";

	inputs = {
		kmonad = {
			url = "git+https://github.com/kmonad/kmonad?submodules=1&dir=nix";
		};
	};

	outputs = { self, nixpkgs, kmonad }: let
		kmonadPackage = kmonad.packages.aarch64-darwin.kmonad;
		config = nixpkgs.legacyPackages.x86_64-linux.writeText (builtins.readFile ./macos.kbd);
	in {
		apps = {
			aarch64-darwin = {
				default = {
					type = "app";
					program = "${kmonadPackage}/bin/kmonad";
				};
			};
		};

		devShell = {
			aarch64-darwin = nixpkgs.legacyPackages.aarch64-darwin.mkShell {
				buildInputs = [ kmonadPackage ];
			};
		};
	};
}
