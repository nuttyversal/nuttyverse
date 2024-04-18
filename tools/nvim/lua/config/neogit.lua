vim.api.nvim_set_keymap("n", "<LEADER>gg", ":Neogit<CR>", { noremap = true })

require("neogit").setup({
	graph_style = "unicode",

	signs = {
		-- { CLOSED, OPENED }
		hunk = { "", "" },
		item = { " ", " " },
		section = { " ", " " },
	},

	integrations = {
		telescope = true,
		diffview = true,
	},
})
