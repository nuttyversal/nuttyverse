{ ... }:

{
	users.users = {
		versal = {
			isNormalUser = true;
			description = "nuttyversal";
			home = "/home/versal";
			extraGroups = [ "wheel" ];

			openssh.authorizedKeys.keys = [
				"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIifhdP6vTWEGGvLgWK/93bTF8TGrlffo2o/V0krRbbP mail@nuttyver.se"
			];
		};
	};
}
