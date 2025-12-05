#!/usr/bin/env node

// src/index.ts
import "dotenv/config";
import { program } from "commander";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { homedir } from "os";
import Firecrawl from "@mendable/firecrawl-js";
import ora from "ora";
import * as p from "@clack/prompts";
import clipboard from "clipboardy";
var __dirname = dirname(fileURLToPath(import.meta.url));
var pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf-8"));
var banner = `
 _                     _ 
| |__  _ __ _ __   __| |
| '_ \\| '__| '_ \\ / _\` |
| |_) | |  | | | | (_| |
|_.__/|_|  |_| |_|\\__,_|
`;
var configDir = join(homedir(), ".config", "brnd");
var configFile = join(configDir, "config.json");
function getStoredKey() {
  if (existsSync(configFile)) {
    const config = JSON.parse(readFileSync(configFile, "utf-8"));
    return config.apiKey || null;
  }
  return null;
}
function saveKey(apiKey) {
  mkdirSync(configDir, { recursive: true });
  writeFileSync(configFile, JSON.stringify({ apiKey }, null, 2));
}
function getApiKey(optionKey) {
  return optionKey || process.env.FIRECRAWL_API_KEY || getStoredKey();
}
program.name("brnd").description("Extract brand identity from any website").version(pkg.version, "-v, --version");
program.command("login").description("Save Firecrawl API key to config").action(async () => {
  console.log(banner);
  p.intro("Firecrawl Login");
  const key = await p.text({
    message: "Enter your Firecrawl API key:",
    placeholder: "fc-...",
    validate: (value) => {
      if (!value) return "API key is required";
      if (!value.startsWith("fc-")) return "API key should start with fc-";
    }
  });
  if (p.isCancel(key)) {
    p.cancel("Login cancelled");
    process.exit(0);
  }
  saveKey(key);
  p.outro(`API key saved to ${configFile}`);
});
program.argument("[url]", "URL to extract branding from").option("-k, --key <key>", "Firecrawl API key").option("-c, --clipboard", "Copy output to clipboard instead of file").action(async (url, options) => {
  console.log(banner);
  let targetUrl = url;
  if (!targetUrl) {
    p.intro("Brand Extractor");
    const urlInput = await p.text({
      message: "Enter website URL:",
      placeholder: "https://example.com",
      validate: (value) => {
        if (!value) return "URL is required";
        try {
          new URL(value);
        } catch {
          return "Invalid URL";
        }
      }
    });
    if (p.isCancel(urlInput)) {
      p.cancel("Cancelled");
      process.exit(0);
    }
    targetUrl = urlInput;
  }
  let apiKey = getApiKey(options.key);
  if (!apiKey) {
    const keyInput = await p.text({
      message: "Enter your Firecrawl API key:",
      placeholder: "fc-...",
      validate: (value) => {
        if (!value) return "API key is required";
      }
    });
    if (p.isCancel(keyInput)) {
      p.cancel("Cancelled");
      process.exit(0);
    }
    apiKey = keyInput;
    const shouldSave = await p.confirm({
      message: "Save API key for future use?"
    });
    if (shouldSave && !p.isCancel(shouldSave)) {
      saveKey(apiKey);
    }
  }
  const firecrawl = new Firecrawl({ apiKey });
  const spinner = ora("Fetching branding...").start();
  const startTime = Date.now();
  try {
    const result = await firecrawl.scrape(targetUrl, {
      formats: ["branding"]
    });
    const elapsed = ((Date.now() - startTime) / 1e3).toFixed(2);
    spinner.succeed(`Branding fetched in ${elapsed}s`);
    const hostname = new URL(targetUrl).hostname;
    const branding = result.branding || {};
    const content = `# ${hostname}

\`\`\`json
${JSON.stringify(branding, null, 2)}
\`\`\`
`;
    if (options.clipboard) {
      await clipboard.write(content);
      console.log("Branding copied to clipboard");
    } else {
      mkdirSync("brands", { recursive: true });
      const filename = `brands/${hostname}.md`;
      writeFileSync(filename, content);
      console.log(`Branding saved to ${filename}`);
    }
  } catch (error) {
    spinner.fail("Failed to fetch branding");
    console.error(error);
    process.exit(1);
  }
});
program.parse();
