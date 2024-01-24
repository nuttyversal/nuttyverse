{ pkgs, ... }:

{
	services = {
		redis = {
			servers = {
				nuttyverse = {
					enable = true;
					port = 6379;
					bind = null;

					# Prefer connecting to Redis over the Tailscale network if
					# connecting from an external IP address (non-loopback).
					openFirewall = false;
					requirePassFile = "/run/secrets/redis-password";
				};
			};
		};
	};

	age = {
		secrets = {
			redis-password = {
				file = ../secrets/redis-password.age;
				path = "/run/secrets/redis-password";
				owner = "root";
				group = "root";
				mode = "600";
			};
		};
	};
}
