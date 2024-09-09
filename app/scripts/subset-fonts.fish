#!/usr/bin/env fish

set git_root (git rev-parse --show-toplevel)
set script_dir_path (dirname (status --current-filename))
set fonts_dir_path "$script_dir_path/../public/fonts"

set nure_dir_path "$git_root/unobservable/fonts/Nure1.2W/Variable font compressed"
set pragmata_dir_path "$git_root/unobservable/fonts/PragmataPro0.830W"
set pragmata_fraktur_dir_path "$git_root/unobservable/fonts/PragmataProFraktur1.2W"
set fsd_emoji_dir_path "$git_root/unobservable/fonts/FSD Emoji1.0W"

set basic_latin "U+0020-007E"
set astrological_signs "U+2648-2653"
set emoticons "U+1F600-1F64F"

if not test -d $fonts_dir_path
	mkdir -p $fonts_dir_path
end

echo "Creating fragment: nure.woff2"
pyftsubset \
	"$nure_dir_path/Nure12-VF.woff2" \
	--output-file="$fonts_dir_path/nure.woff2" \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="calt,kern,smcp,c2sc" \
	--unicodes="$basic_latin"

echo "Creating fragment: pragmatapro-liga-regular.woff2"
pyftsubset \
	"$pragmata_dir_path/PragmataProR_liga_0830.woff2" \
	--output-file="$fonts_dir_path/pragmatapro-liga-regular.woff2" \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="calt" \
	--unicodes="$basic_latin"

echo "Creating fragment: pragmatapro-liga-bold.woff2"
pyftsubset \
	"$pragmata_dir_path/PragmataProB_liga_0830.woff2" \
	--output-file="$fonts_dir_path/pragmatapro-liga-bold.woff2" \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="calt" \
	--unicodes="$basic_latin"

echo "Creating fragment: pragmatapro-liga-italic.woff2"
pyftsubset \
	"$pragmata_dir_path/PragmataProI_liga_0830.woff2" \
	--output-file="$fonts_dir_path/pragmatapro-liga-italic.woff2" \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="calt" \
	--unicodes="$basic_latin"

echo "Creating fragment: pragmatapro-liga-bold-italic.woff2"
pyftsubset \
	"$pragmata_dir_path/PragmataProZ_liga_0830.woff2" \
	--output-file="$fonts_dir_path/pragmatapro-liga-bold-italic.woff2" \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="calt,ss06" \
	--unicodes="$basic_latin"

echo "Creating fragment: pragmatapro-fraktur-regular.woff2"
pyftsubset \
	"$pragmata_fraktur_dir_path/PragmataProFraktur.woff2" \
	--output-file="$fonts_dir_path/pragmatapro-fraktur-regular.woff2" \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

echo "Creating fragment: pragmatapro-fraktur-bold.woff2"
pyftsubset \
	"$pragmata_fraktur_dir_path/PragmataProFrakturB.woff2" \
	--output-file="$fonts_dir_path/pragmatapro-fraktur-bold.woff2" \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

echo "Creating fragment: fsd-emoji.woff2"
pyftsubset \
	"$fsd_emoji_dir_path/fsd_emoji_1.0-webfont.woff2" \
	--output-file="$fonts_dir_path/fsd-emoji.woff2" \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$emoticons, $astrological_signs"
