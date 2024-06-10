return {
	"NeogitOrg/neogit",
	dependencies = {
		"nvim-lua/plenary.nvim",
		"sindrets/diffview.nvim",
		"nvim-telescope/telescope.nvim",
	},
	-- [TODO] Pin to the last version that has full support for Neovim 0.9.
	-- After this point, Neovim 0.10 APIs were introduced. Currently waiting
	-- for Nixpkgs to update to Neovim 0.10.
	version = "v0.0.1",
}
