# brnd

CLI to extract brand identity from any website using [Firecrawl](https://firecrawl.dev).

[![DOWNLOADS](https://img.shields.io/npm/dt/brnd?style=for-the-badge&label=DOWNLOADS&colorA=191D20&colorB=268637)](https://www.npmjs.com/package/brnd) [![Learn Node.js CLI Automation](https://img.shields.io/badge/-NodeCLI.com%20%E2%86%92-gray.svg?style=for-the-badge&label=LEARN&colorA=191D20&colorB=268637)](https://nodecli.com/?utm_source=GitHubFOSS) [![Follow @_ahmadawais on X](https://img.shields.io/badge/FOLLOW%20@_ahmadawais%20%E2%86%92-gray.svg?style=for-the-badge&label=X&colorA=191D20&colorB=268637)](https://x.com/_ahmadawais/)

## Install

```bash
npm install -g brnd
```

## Usage

### Interactive Mode

Just run `brnd` and follow the prompts:

```bash
brnd
```

### Direct Mode

```bash
brnd https://example.com
```

### Login

Save your Firecrawl API key for future use:

```bash
brnd login
```

### Options

```bash
brnd <url> -k, --key <key>    Use specific API key
brnd <url> -c, --clipboard    Copy output to clipboard instead of file
brnd -v, --version            Output version number
brnd -h, --help               Display help
```

### Examples

```bash
# Extract branding and save to brands/example.com.md
brnd example.com

# Works with full URLs too
brnd https://example.com

# Extract branding with inline API key
brnd example.com -k fc-your-api-key

# Extract branding and copy to clipboard
brnd example.com -c

# Save API key globally
brnd login
```

## Output

Creates `brands/sitename.tld.md` with the full branding profile including:

- Color scheme & colors
- Fonts & typography
- Spacing & layout
- Logo & images
- UI components
- Brand personality

## API Key Priority

1. `-k, --key` flag
2. `FIRECRAWL_API_KEY` environment variable
3. Saved config (`~/.config/brnd/config.json`)

## CLI Created By

This CLI was created by [CommandCode.ai](https://commandcode.ai) using [ahmadawais/cli](https://github.com/ahmadawais/cli) taste preferences.

## License

MIT © [Ahmad Awais](https://twitter.com/_ahmadawais)
