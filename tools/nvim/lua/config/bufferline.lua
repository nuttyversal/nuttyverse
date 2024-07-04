vim.opt.termguicolors = true

require("bufferline").setup({
	options = {
		mode = "tabs",
		separator_style = "thin",

		offsets = {
			{
				filetype = "NvimTree",
				text = "File Explorer",
				text_align = "left",
				separator = true,
			},
		},
	},
})
