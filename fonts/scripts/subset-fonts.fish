#!/usr/bin/env fish

set nure_dir_path "../unobservable/fonts/Nure1.2W/Variable font compressed"
set pragmata_dir_path "../unobservable/fonts/PragmataPro0.830W"
set pragmata_fraktur_dir_path "../unobservable/fonts/PragmataProFraktur1.2W"
set fsd_emoji_dir_path "../unobservable/fonts/FSD Emoji1.0W"

set basic_latin "U+0020-007E"
set emoticons "U+1F600-1F64F"

if not test -d horcruxes
	mkdir horcruxes
end

echo "Creating metasyntactical horcrux: nure-foo.woff2"
pyftsubset \
	$nure_dir_path/Nure12-VF.woff2 \
	--output-file=horcruxes/nure-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

echo "Creating metasyntactical horcrux: pragmatapro-foo.woff2"
pyftsubset \
	$pragmata_dir_path/PragmataProR_liga_0830.woff2 \
	--output-file=horcruxes/pragmatapro-liga-regular-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

echo "Creating metasyntactical horcrux: pragmatapro-liga-bold-foo.woff2"
pyftsubset \
	$pragmata_dir_path/PragmataProB_liga_0830.woff2 \
	--output-file=horcruxes/pragmatapro-liga-bold-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

echo "Creating metasyntactical horcrux: pragmatapro-liga-italic-foo.woff2"
pyftsubset \
	$pragmata_dir_path/PragmataProI_liga_0830.woff2 \
	--output-file=horcruxes/pragmatapro-liga-italic-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

echo "Creating metasyntactical horcrux: pragmatapro-liga-bold-italic-foo.woff2"
pyftsubset \
	$pragmata_dir_path/PragmataProZ_liga_0830.woff2 \
	--output-file=horcruxes/pragmatapro-liga-bold-italic-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

echo "Creating metasyntactical horcrux: pragmatapro-regular-foo.woff2"
pyftsubset \
	$pragmata_fraktur_dir_path/PragmataProFraktur.woff2 \
	--output-file=horcruxes/pragmatapro-fraktur-regular-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

echo "Creating metasyntactical horcrux: pragmatapro-bold-foo.woff2"
pyftsubset \
	$pragmata_fraktur_dir_path/PragmataProFrakturB.woff2 \
	--output-file=horcruxes/pragmatapro-fraktur-bold-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

echo "Creating metasyntactical horcrux: fsd-emoji-foo.woff2"
pyftsubset \
	$fsd_emoji_dir_path/fsd_emoji_1.0-webfont.woff2 \
	--output-file=horcruxes/fsd-emoji-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$emoticons"
