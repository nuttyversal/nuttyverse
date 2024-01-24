{ pkgs, ... }:

{
	services = {
		redis = {
			servers = {
				nuttyverse = {
					enable = true;
					port = 6379;
					bind = null;
				};
			};
		};
	};
}
