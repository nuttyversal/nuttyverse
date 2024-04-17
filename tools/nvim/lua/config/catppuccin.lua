require("catppuccin").setup({
	background = {
		light = "latte",
		dark = "mocha",
	},

	term_colors = true,
	transparent_background = false,

	styles = {
		comments = {},
		conditionals = {},
		loops = {},
		functions = {},
		keywords = {},
		strings = {},
		variables = {},
		numbers = {},
		booleans = {},
		properties = {},
		types = {},
	},

	color_overrides = {
		latte = {
			base = "#ffffff",
			mantle = "#ffffff",
			crust = "#ffffff",
		},

		mocha = {
			base = "#000000",
			mantle = "#000000",
			crust = "#000000",
		},
	},

	integrations = {
		gitsigns = true,
		nvimtree = true,
		telescope = true,
		mason = true,
	},
})

vim.cmd.colorscheme "catppuccin"
