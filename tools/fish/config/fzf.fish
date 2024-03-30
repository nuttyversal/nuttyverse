if type -q fd
	set -gx FZF_DEFAULT_COMMAND "fd --hidden --follow --exclude '.git' --exclude 'node_modules'"
	set -gx FZF_CTRL_T_COMMAND "$FZF_DEFAULT_COMMAND"
	set -gx FZF_ALT_C_COMMAND "$FZF_DEFAULT_COMMAND --type d"

	abbr --add cdf "fzf-cd-widget"
else
	abbr --erase cdf
end

if type -q bat
	if type -q eza
		set PREVIEW_FILE "bat --color=always {} 2>/dev/null"
		set PREVIEW_DIRECTORY "exa --tree {} 2>/dev/null"
		set PREVIEW_NONE "echo Nothing to preview."

		set -gx FZF_DEFAULT_OPTS "
			--multi
			--preview-window=:hidden
			--preview '$PREVIEW_FILE; or $PREVIEW_DIRECTORY; or $PREVIEW_NONE'
			--bind '?:toggle-preview'
		"
	end
end
