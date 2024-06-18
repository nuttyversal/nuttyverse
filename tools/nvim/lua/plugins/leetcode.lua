return {
	"kawre/leetcode.nvim",
	build = ":TSUpdate html",
	dependencies = {
		-- required
		"nvim-telescope/telescope.nvim",
		"nvim-lua/plenary.nvim",
		"MunifTanjim/nui.nvim",

		-- optional
		"nvim-treesitter/nvim-treesitter",
		"rcarriga/nvim-notify",
		"nvim-tree/nvim-web-devicons",
	},
	opts = {
		lang = "python3",
	},
}
