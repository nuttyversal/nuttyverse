if status is-interactive
	set config_dir (dirname (status -f))
	source $config_dir/config/abbr.fish
	source $config_dir/config/bat.fish
	source $config_dir/config/eza.fish
	source $config_dir/config/fzf.fish
	source $config_dir/config/gpg.fish
	source $config_dir/config/greeting.fish
	source $config_dir/config/prompt.fish
	source $config_dir/config/vim.fish
	source $config_dir/config/warp.fish
end
