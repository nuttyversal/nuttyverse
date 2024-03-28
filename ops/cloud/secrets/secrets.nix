let
	versal = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIifhdP6vTWEGGvLgWK/93bTF8TGrlffo2o/V0krRbbP mail@nuttyver.se";
	cloud = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIERj1usJbWGs4w5mB3xetwWRiagZjYPc71PSg8gfjg7i root@nuttycloud";
in {
	"gitea-database-password.age" = {
		publicKeys = [ versal cloud ];
	};

	"gitea-actions-runner-token.age" = {
		publicKeys = [ versal cloud ];
	};

	"keycloak-database-password.age" = {
		publicKeys = [ versal cloud ];
	};

	"nutty-bot-environment.age" = {
		publicKeys = [ versal cloud ];
	};

	"redis-password.age" = {
		publicKeys = [ versal cloud ];
	};

	"vaultwarden-environment.age" = {
		publicKeys = [ versal cloud ];
	};
}
