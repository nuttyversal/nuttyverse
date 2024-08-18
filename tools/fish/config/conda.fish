# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
if test -f /opt/homebrew/anaconda3/bin/conda
	eval /opt/homebrew/anaconda3/bin/conda "shell.fish" "hook" $argv | source
else
	if test -f "/opt/homebrew/anaconda3/etc/fish/conf.d/conda.fish"
		. "/opt/homebrew/anaconda3/etc/fish/conf.d/conda.fish"
	else
		set -x PATH "/opt/homebrew/anaconda3/bin" $PATH
	end
end
# <<< conda initialize <<<
