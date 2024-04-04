require("catppuccin").setup({
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
		mocha = {
			base = "#000000",
			mantle = "#000000",
			crust = "#000000",
		},
	},

	integrations = {
		telescope = {
			enabled = true,
		}
	},
})

vim.cmd.colorscheme "catppuccin"
