#!/usr/bin/env fish

# [NOTE] Prefer to run this script with `pnpm watch` instead of running it
# directly because pnpm will gracefully handle SIGINT and SIGTERM signals and
# kill the child processes. If you do run this script directly, you might have
# to use the `reset` command to fix your broken TTY.

set script_dir_path (status dirname)
set output (realpath "$script_dir_path/../dist/style.css")
set target (realpath "$script_dir_path/../theme.css")

# 0. Build once to ensure $output exists.
if not test -f $output
	fish "$script_dir_path/build-theme.fish"
end

# 1. Build bundle to $output.
pnpx vite build --watch &

# 2. Copy $output to $target (where Obsidian looks).
ls $output | entr rsync -a $output $target &

# 3. Wait for SIGINT or SIGTERM.
wait
