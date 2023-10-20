{ pkgs, ... }:

{
	services.postgresql = {
		enable = true;
		enableTCPIP = true;
		package = pkgs.postgresql_15;
		dataDir = "/data/postgresql";

		authentication = ''
			# type database user address      method
			host   all      all  127.0.0.1/32 scram-sha-256
			host   all      all  ::1/128      scram-sha-256
		'';
	};
}
