#!/usr/bin/env fish

set nure_dir_path "../unobservable/fonts/Nure1.2W/Variable font compressed"
set pragmata_dir_path "../unobservable/fonts/PragmataPro0.830W"
set pragmata_fraktur_dir_path "../unobservable/fonts/PragmataProFraktur1.2W"
set fsd_emoji_dir_path "../unobservable/fonts/FSD Emoji1.0W"

set basic_latin "U+0020-007E"
set emoticons "U+1F600-1F64F"
set warning_sign "U+26A0"

if not test -d horcruxes
	mkdir horcruxes
end

echo "Creating horcrux: nure.woff2"
pyftsubset \
	$nure_dir_path/Nure12-VF.woff2 \
	--output-file=horcruxes/nure.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="calt,kern,smcp,c2sc" \
	--unicodes="$basic_latin"

echo "Creating horcrux: pragmatapro-liga-regular.woff2"
pyftsubset \
	$pragmata_dir_path/PragmataProR_liga_0830.woff2 \
	--output-file=horcruxes/pragmatapro-liga-regular.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="calt" \
	--unicodes="$basic_latin, $warning_sign"

echo "Creating horcrux: pragmatapro-liga-bold.woff2"
pyftsubset \
	$pragmata_dir_path/PragmataProB_liga_0830.woff2 \
	--output-file=horcruxes/pragmatapro-liga-bold.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="calt" \
	--unicodes="$basic_latin"

echo "Creating horcrux: pragmatapro-liga-italic.woff2"
pyftsubset \
	$pragmata_dir_path/PragmataProI_liga_0830.woff2 \
	--output-file=horcruxes/pragmatapro-liga-italic.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="calt" \
	--unicodes="$basic_latin"

echo "Creating horcrux: pragmatapro-liga-bold-italic.woff2"
pyftsubset \
	$pragmata_dir_path/PragmataProZ_liga_0830.woff2 \
	--output-file=horcruxes/pragmatapro-liga-bold-italic.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="calt" \
	--unicodes="$basic_latin"

echo "Creating horcrux: pragmatapro-fraktur-regular.woff2"
pyftsubset \
	$pragmata_fraktur_dir_path/PragmataProFraktur.woff2 \
	--output-file=horcruxes/pragmatapro-fraktur-regular.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

echo "Creating horcrux: pragmatapro-fraktur-bold.woff2"
pyftsubset \
	$pragmata_fraktur_dir_path/PragmataProFrakturB.woff2 \
	--output-file=horcruxes/pragmatapro-fraktur-bold.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

echo "Creating horcrux: fsd-emoji.woff2"
pyftsubset \
	$fsd_emoji_dir_path/fsd_emoji_1.0-webfont.woff2 \
	--output-file=horcruxes/fsd-emoji.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$emoticons"
