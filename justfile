#!/usr/bin/env -S just --justfile

switch:
	darwin-rebuild switch --flake .

deploy:
	nixos-rebuild switch \
		--fast \
		--use-remote-sudo \
		--flake .#nuttycloud \
		--build-host versal@nuttycloud \
		--target-host versal@nuttycloud
