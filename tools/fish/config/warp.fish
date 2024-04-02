# Under the hood, this snippet prints a Device Control String (DCS) to be read
# by Warp, signaling that a subshell session has started and is ready to be
# "Warpified." In turn, Warp executes a setup script in the session that
# enables the full suite of Warp features like blocks, completions, and the
# input editor.
abbr warpify "printf '\eP\$f{\"hook\": \"SourcedRcFileForWarp\", \"value\": { \"shell\": \"fish\"}}\x9c'"
