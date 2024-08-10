{ config, ... }:

{
	virtualisation = {
		oci-containers = {
			containers = {
				pi-hole = {
					image = "pihole/pihole:latest";

					ports = [
						"53:53/tcp"
						"53:53/udp"
						"80:80/tcp"
					];

					volumes = [
						"/etc/pihole:/etc/pihole"
						"/etc/dnsmasq.d:/etc/dnsmasq.d"
					];

					environment = {
						TZ = config.time.timeZone;
						WEB_PORT = "80";

						# Find randomly generated password:
						# $ docker logs pihole | grep random
					};
				};
			};
		};
	};
}
