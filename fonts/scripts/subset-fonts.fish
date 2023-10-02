#!/usr/bin/env fish

set basic_latin "U+0020-007E"

pyftsubset \
	target/Nure12-VF.woff2 \
	--output-file=nure-foo.woff2 \
	--flavor=woff2 \
	--with-zopfli \
	--layout-features="" \
	--unicodes="$basic_latin"
