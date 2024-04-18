require("conform").setup({
	formatters_by_ft = {
		lua = { "stylua" },
		python = { "isort", "black" },
		typescript = { "prettierd" },
		typescriptreact = { "prettierd" },
		javascript = { "prettierd" },
		javascriptreact = { "prettierd" },
		json = { "prettierd" },
		jsonc = { "prettierd" },
		html = { "prettierd" },
		css = { "prettierd" },
	},

	format_on_save = {
		lsp_fallback = true,
		timeout_ms = 500,
	},
})
