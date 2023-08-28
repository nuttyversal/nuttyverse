#!/usr/bin/env fish

set script_dir_path (status dirname)
set output (realpath "$script_dir_path/../dist/style.css")
set target (realpath "$script_dir_path/../theme.css")

# 1. Build bundle to $output.
pnpx vite build

# 2. Copy $output to $target (where Obsidian looks).
rsync -a $output $target
