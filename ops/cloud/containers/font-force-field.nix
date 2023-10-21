{ ... }:

{
	virtualisation = {
		oci-containers = {
			containers = {
				font-force-field = {
					image = "code.nuttyver.se/observable/font-force-field:latest";

					ports = [
						"3668:3030"
					];

					volumes = [
						"/data/fonts:/fonts"
					];

					environment = {
						FONT_DIRECTORY = "/fonts";
					};
				};
			};
		};
	};
}
