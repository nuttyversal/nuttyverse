local treesitter = require("nvim-treesitter.configs")

treesitter.setup({
	modules = { },
	ensure_installed = { },
	ignore_install = { },
	sync_install = false,
	auto_install = true,
	highlight = {
		enable = true
	}
})
