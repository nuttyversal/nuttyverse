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
	in rec {
		apps = {
			aarch64-darwin = {
				default = {
					type = "app";
					program = "${kmonadPackage}/bin/kmonad";
				};
			};
		};

		packages = {
			# [HACK] For evaluating on nuttycloud.
			x86_64-linux = { };

			aarch64-darwin = {
				kmonad = kmonadPackage;
			};
		};

		devShells = {
			aarch64-darwin = {
				default = nixpkgs.legacyPackages.aarch64-darwin.mkShell {
					buildInputs = nixpkgs.lib.attrsets.attrValues packages.aarch64-darwin;
				};
			};
		};
	};
}
