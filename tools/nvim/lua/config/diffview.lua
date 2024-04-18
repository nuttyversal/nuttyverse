vim.api.nvim_set_keymap("n", "<LEADER>dd", ":DiffviewOpen<CR>", { noremap = true })
vim.api.nvim_set_keymap("n", "<LEADER>dc", ":DiffviewClose<CR>", { noremap = true })

require("diffview").setup({
	use_icons = false,
	enhanced_diff_hl = true,

	signs = {
		fold_closed = "  ",
		fold_open = "  ",
		done = "✓ ",
	},
})
