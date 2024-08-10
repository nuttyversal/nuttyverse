{ ... }:

{
	users.users = {
		nutty = {
			isNormalUser = true;
			description = "nuttyversal";
			home = "/home/nutty";
			extraGroups = [ "wheel" ];

			# Authentication 🔒
			hashedPassword = "$y$j9T$aZQ4D8PrBpgUp2GbOqkjz1$M.ZAPYXWCsDjP3cly2no/J6FUfnhS9EbmlmTydBI4QD";
			openssh.authorizedKeys.keys = [
				"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIifhdP6vTWEGGvLgWK/93bTF8TGrlffo2o/V0krRbbP mail@nuttyver.se"
			];
		};
	};
}
