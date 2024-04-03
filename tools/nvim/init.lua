--
-- Persistence
--

vim.o.hidden = true
vim.o.confirm = true
vim.o.autowrite = true
vim.o.autowriteall = true
vim.o.autoread = true

-- TODO Add autocmds for triggering autoread when switching buffers and
-- focusing windows (https://stackoverflow.com/a/20418591).

if vim.fn.has('persistent_undo') then
	local cachedir = os.getenv('XDG_CACHE_HOME')
	if cachedir == nil or cachedir == '' then
		cachedir = vim.fn.expand('~/.cache')
	end

	local undodir = cachedir .. '/nvim/undodir'
	if vim.fn.isdirectory(undodir) == 0 then
		vim.fn.mkdir(undodir, 'p')
	end

	vim.o.undodir = undodir
	vim.o.undofile = true
end

-- With persistent undo trees, autowriting, and version control, there
-- is no need for all those annoying backup and swap files.

vim.o.backup = false
vim.o.writebackup = false
vim.bo.swapfile = false

--
-- Whitespace Management
--

vim.o.listchars = "tab:▸ ,space:·"
vim.o.smarttab = true
vim.o.expandtab = true
vim.o.shiftwidth = 3
vim.o.tabstop = 3

--
-- Searching
--

vim.o.magic = true
vim.o.incsearch = true
vim.o.hlsearch = true
vim.o.ignorecase = true
vim.o.smartcase = true

--
-- Usability
--

vim.o.clipboard = 'unnamedplus'
vim.o.completeopt = 'menuone,noselect'
vim.o.startofline = false
vim.o.wrap = false
vim.o.timeout = false
vim.o.ttimeout = true
vim.o.ttimeoutlen = 10
vim.o.updatetime = 100
vim.o.inccommand = 'split'
vim.o.scrolloff = 5
vim.o.sidescroll = 1
vim.o.backspace = 'indent,eol,start'
vim.o.mouse = 'a'

--
-- Appearance
--

vim.cmd("colorscheme lunaperche")
vim.wo.cursorline = true
vim.wo.number = true
vim.wo.foldcolumn = "1"
vim.o.termguicolors = true

--
-- Mappings
--

vim.g.mapleader = " "

-- Did you forget to open the file with `sudo`?
vim.api.nvim_set_keymap('c', 'w!!', 'w !sudo tee % >/dev/null', { noremap = true })

-- Split navigation
vim.api.nvim_set_keymap('n', '<LEADER>tm', '<C-w><C-h>', { noremap = true })
vim.api.nvim_set_keymap('n', '<LEADER>tn', '<C-w><C-j>', { noremap = true })
vim.api.nvim_set_keymap('n', '<LEADER>te', '<C-w><C-k>', { noremap = true })
vim.api.nvim_set_keymap('n', '<LEADER>ti', '<C-w><C-l>', { noremap = true })

-- Toggle line wrapping
vim.api.nvim_set_keymap('n', '<LEADER>tl', ':set wrap!<CR>', { noremap = true })

-- Toggle whitespace visibility
vim.api.nvim_set_keymap('n', '<LEADER>tw', ':set list!<CR>', { noremap = true })

-- Toggle paste mode
vim.api.nvim_set_keymap('n', '<LEADER>tp', ':set paste!<CR>', { noremap = true })

-- Clear search highlighting
vim.api.nvim_set_keymap('n', '//', ':noh<CR>', { noremap = true })

-- Save file
vim.api.nvim_set_keymap('n', '<LEADER>w', ':w<CR>', {noremap = true, silent = true})

--
-- Plugin manager
--

local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
	vim.fn.system({
		"git",
		"clone",
		"--filter=blob:none",
		"https://github.com/folke/lazy.nvim.git",
		"--branch=stable", -- latest stable release
		lazypath,
	})
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup("plugins")

--
-- Configuration modules
--

require('config.telescope')
require('config.toggleterm')
