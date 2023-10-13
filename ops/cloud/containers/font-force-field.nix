{ ... }:

{
	virtualisation = {
		oci-containers = {
			containers = {
				font-force-field = {
					image = "localhost/nuttyverse/font-force-field";

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
