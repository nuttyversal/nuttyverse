{ lib, ... }:

{
	kexec = {
		# This prevents the rescue system from
		# automatically rebooting after one hour.
		autoReboot = false;
	};
}
