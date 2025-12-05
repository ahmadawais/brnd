# brnd

CLI to extract brand identity from any website using [Firecrawl](https://firecrawl.dev).

[![DOWNLOADS](https://img.shields.io/npm/dt/brnd?style=for-the-badge&label=DOWNLOADS&colorA=191D20&colorB=268637)](https://www.npmjs.com/package/brnd) [![Learn Node.js CLI Automation](https://img.shields.io/badge/-NodeCLI.com%20%E2%86%92-gray.svg?style=for-the-badge&label=LEARN&colorA=191D20&colorB=268637)](https://nodecli.com/?utm_source=GitHubFOSS) [![Follow @_ahmadawais on X](https://img.shields.io/badge/FOLLOW%20@_ahmadawais%20%E2%86%92-gray.svg?style=for-the-badge&label=X&colorA=191D20&colorB=268637)](https://x.com/_ahmadawais/)

## Install

```bash
npm install -g brnd
```

## Setup

Create a `.env` file with your Firecrawl API key:

```bash
FIRECRAWL_API_KEY=fc-your-api-key
```

## Usage

```bash
brnd https://example.com
```

This creates `brands/example.com.md` with the full branding profile including:

- Color scheme & colors
- Fonts & typography
- Spacing & layout
- Logo & images
- UI components
- Brand personality

## Options

```bash
brnd -v, --version    Output version number
brnd -h, --help       Display help
```

## CLI Created By

This CLI was created by [CommandCode.ai](https://commandcode.ai) using [ahmadawais/cli](https://github.com/ahmadawais/cli) taste preferences.

## License

MIT © [Ahmad Awais](https://twitter.com/_ahmadawais)
