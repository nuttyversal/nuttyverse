local treesitter = require("nvim-treesitter.configs")

vim.cmd([[
	augroup filetypedetect
		autocmd! BufRead,BufNewFile justfile setfiletype just
	augroup END
]])

treesitter.setup({
	modules = {},
	ensure_installed = {
		"just",
	},
	ignore_install = {},
	sync_install = false,
	auto_install = true,
	highlight = {
		enable = true,
	},
})
