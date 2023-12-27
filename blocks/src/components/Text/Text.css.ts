import { globalFontFace, globalStyle } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

globalFontFace('Nure', {
	src: [
		'url("https://fonts.nuttyver.se/nure-foo.woff2") format("woff2")',
	].join(', '),
});

globalStyle('*', {
	fontFamily: 'Nure',
	fontVariationSettings: `"opsz" 18, "wdth" 85`,
	lineHeight: 1.5,
});

const typographicProperties = defineProperties({
	properties: {
		// Minor third (6:5)
		fontSize: {
			smol: 13.33,
			body: 16,
			h6: 19.2,
			h5: 23.04,
			h4: 27.648,
			h3: 33.1776,
			h2: 39.81312,
			h1: 47.775744,
		}
	}
});

export const sprinkles = createSprinkles(typographicProperties);

export const text = recipe({
	variants: {
		size: {
			smol: sprinkles({ fontSize: 'smol' }),
			body: sprinkles({ fontSize: 'body' }),
			h6: sprinkles({ fontSize: 'h6' }),
			h5: sprinkles({ fontSize: 'h5' }),
			h4: sprinkles({ fontSize: 'h4' }),
			h3: sprinkles({ fontSize: 'h3' }),
			h2: sprinkles({ fontSize: 'h2' }),
			h1: sprinkles({ fontSize: 'h1' }),
		},
	},
	defaultVariants: {
		size: 'body',
	},
});

export type TextVariants = RecipeVariants<typeof text>;
