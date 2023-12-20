import { globalFontFace, globalStyle } from '@vanilla-extract/css';

globalFontFace('Nure', {
	src: [
		'url("https://fonts.nuttyver.se/nure-foo.woff2") format("woff2")',
	].join(', '),
});

globalStyle('*', {
	fontFamily: 'Nure',
	fontVariationSettings: '"opsz" 18, "wdth" 85',
});
