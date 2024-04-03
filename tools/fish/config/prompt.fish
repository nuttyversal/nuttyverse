function fish_prompt
	echo

	set_color blue
	echo [(whoami)@(hostname -s)]
	set_color normal

	nix_shell_prompt

	set_color green
	printf '%s' (prompt_pwd)
	set_color normal

	set_color blue
	printf ' :: '
	set_color normal
end

function nix_shell_prompt
	if not set --query IN_NIX_SHELL
		return
	end

	if test (string length 'λ') = 1
		set_color blue
		printf 'λ '
		set_color normal
	end

	set_color red
	if test $name = 'shell'
		# Print the package names.
		printf '{ %s }' (print_package_names $buildInputs)
	else
		# Print the derivation name.
		printf '%s' $name
	end
	set_color normal

	set_color blue
	printf ' -> '
	set_color normal
end

function print_package_names
	set pattern '(?<=/nix/store/[a-z0-9]{32}-).*(?=-[0-9\.]+)'
	set packages (echo $argv | string split ' ' | grep -oP $pattern | string join ' ')
	printf '%s' $packages
end
