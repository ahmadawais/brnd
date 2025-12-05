# brnd

CLI to extract brand identity from any website using [Firecrawl](https://firecrawl.dev).

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

## License

MIT
