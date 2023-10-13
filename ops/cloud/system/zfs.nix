{ config, pkgs, ... }:

{
	environment = {
		systemPackages = [ pkgs.zfs ];
	};

	boot = {
		supportedFilesystems = [ "zfs" ];
		kernelPackages = config.boot.zfs.package.latestCompatibleLinuxPackages;

		loader = {
			grub = {
				enable = true;
				efiSupport = true;

				# Because the root ZFS filesystem is encrypted, separate boot
				# partitions are necessary to initiate the booting process.
				mirroredBoots = [
					{ devices = [ "nodev" ]; path = "/boot/ESP0"; }
					{ devices = [ "nodev" ]; path = "/boot/ESP1"; }
				];
			};

			efi = {
				canTouchEfiVariables = true;
				efiSysMountPoint = "/boot/EFI";
			};
		};
	};
}
