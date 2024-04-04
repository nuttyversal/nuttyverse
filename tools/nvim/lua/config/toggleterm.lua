local toggleterm = require('toggleterm')
local terminals = require('toggleterm.terminal')

toggleterm.setup {
	hide_numbers = true,
	shade_terminals = true,
	start_in_insert = true,
	persist_size = true,
	direction = 'horizontal',
	close_on_exit = true,
	size = function()
		return vim.o.columns
	end,
}

local function toggle(i)
	return function()
		local this = terminals.get(i)
		if this ~= nil and this:is_open() then
			this:close()
			return
		end

		local all = terminals.get_all(false)

		for _, t in ipairs(all) do
			if t.id ~= i then
				t:close()
			end
		end

		toggleterm.toggle(i)
	end
end

vim.keymap.set({ 'n', 't' }, '<C-t>', toggle(1), {})

for i = 1, 10, 1 do
	vim.keymap.set({ 'n', 't' }, '<C-s>' .. (i % 10), toggle(i), {})
end
