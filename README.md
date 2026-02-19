# nldates.nvim

Natural language dates for Neovim. Parse date strings like "next Friday", "tomorrow", or "2 weeks ago" into formatted dates.

## Features

- Parse natural language dates using [chrono-node](https://github.com/wanasit/chrono-node)
- Format dates with [moment.js](https://momentjs.com/)
- Visual mode integration - select text and transform in place

## Requirements

- Neovim >= 0.9.0
- Node.js >= 18
- npm

Run `:checkhealth provider` in Neovim to verify your Node provider is working.

## Installation

### Lazy.nvim

```lua
return {
   "obsidian-nvim/nldates.nvim",
   build = "cd rplugin/node/nldates; npm install",
}
```

### Manual npm Installation

```bash
cd ~/.local/share/nvim/lazy/nldates.nvim/rplugin/node/nldates
npm install
```

Restart Neovim after installation.

## Node Provider Setup

1. Install Node.js >= 18
2. Install the neovim npm package: `npm install -g neovim`
3. Run `:checkhealth provider` in Neovim to verify

## Usage

Select a date string in visual mode and run:

```vim
:'<,'>lua require("nldates").parse()
```

### Keybinding

```lua
vim.keymap.set("v", "gd", function()
   require("nldates").parse()
end, { silent = true })
```

Select `next friday` and press `gd` → becomes `2025-02-21`

### Advanced Callback

```lua
vim.keymap.set("v", "gdf", function()
   require("nldates").parse({
      format = "YYYY-MM-DD",
      callback = function(result)
         return "📅 " .. result
      end,
   })
end, { silent = true })
```

## API

### require("nldates").parse(opts?)

Parses the visual selection as a natural language date and replaces it.

**Options:**

- `format` (string): Output format. Default: `"YYYY-MM-DD"`
- `callback` (function): Transform the result before insertion

**Errors:** Throws `"can not do multiline"` if selection spans multiple lines.

## Format Tokens

Moment.js tokens: `YYYY` (2025), `MM` (02), `DD` (21), `MMMM` (February), `dddd` (Friday), `HH:mm` (14:30)

See https://momentjs.com/docs/#/displaying/format/ for full reference.

## Supported Date Formats

- Relative: "tomorrow", "next week", "2 days ago"
- Specific: "January 15th", "2025-01-15"
- Day names: "next friday", "last monday"
- Time: "at 3pm", "tomorrow morning"
