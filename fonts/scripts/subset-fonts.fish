#!/usr/bin/env fish

set basic_latin "U+0020-007E"

pyftsubset \
	target/Nure12-VF.woff2 \
	--output-file=nure-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

pyftsubset \
	target/PragmataProR_liga_0830.woff2 \
	--output-file=pragmatapro-liga-regular-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

pyftsubset \
	target/PragmataProB_liga_0830.woff2 \
	--output-file=pragmatapro-liga-bold-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

pyftsubset \
	target/PragmataProI_liga_0830.woff2 \
	--output-file=pragmatapro-liga-italic-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

pyftsubset \
	target/PragmataProZ_liga_0830.woff2 \
	--output-file=pragmatapro-liga-bold-italic-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

pyftsubset \
	target/PragmataProFraktur.woff2 \
	--output-file=pragmatapro-fraktur-regular-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

pyftsubset \
	target/PragmataProFrakturB.woff2 \
	--output-file=pragmatapro-fraktur-bold-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"

pyftsubset \
	target/fsd_emoji_1.0-webfont.woff2 \
	--output-file=fsd-emoji-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes=""
