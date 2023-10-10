{ config, lib, pkgs, modulesPath, ... }:

{
	imports = [
		(modulesPath + "/installer/scan/not-detected.nix")
	];

	boot.initrd.availableKernelModules = [ "xhci_pci" "ahci" "nvme" "usbhid" ];
	boot.initrd.kernelModules = [ ];
	boot.kernelModules = [ "kvm-amd" ];
	boot.extraModulePackages = [ ];

	fileSystems."/" = {
		device = "rpool";
		fsType = "zfs";
	};

	fileSystems."/boot" = {
		device = "bpool";
		fsType = "zfs";
	};

	fileSystems."/nix" = {
		device = "rpool/nix";
		fsType = "zfs";
	};

	fileSystems."/boot/ESP0" = {
		device = "/dev/disk/by-uuid/B4B7-2AFA";
		fsType = "vfat";
	};

	fileSystems."/boot/ESP1" = {
		device = "/dev/disk/by-uuid/B4B7-6D82";
		fsType = "vfat";
	};

	fileSystems."/home" = {
		device = "rpool/home";
		fsType = "zfs";
	};

	fileSystems."/data" = {
		device = "rpool/data";
		fsType = "zfs";
	};

	swapDevices = [
		{ device = "/dev/disk/by-uuid/32176b77-bf3f-49f3-9504-d80298ea95e7"; }
		{ device = "/dev/disk/by-uuid/59f68369-a59a-4b9f-8bc8-973d4fb8228f"; }
	];

	# Enables DHCP on each ethernet and wireless interface. In case of scripted networking
	# (the default) this is the recommended approach. When using systemd-networkd it's
	# still possible to use this option, but it's recommended to use it in conjunction
	# with explicit per-interface declarations with `networking.interfaces.<interface>.useDHCP`.
	networking.useDHCP = lib.mkDefault true;

	nixpkgs.hostPlatform = lib.mkDefault "x86_64-linux";
	hardware.cpu.amd.updateMicrocode = lib.mkDefault config.hardware.enableRedistributableFirmware;
}
