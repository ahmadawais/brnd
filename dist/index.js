#!/usr/bin/env node

// src/index.ts
import "dotenv/config";
import { program } from "commander";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Firecrawl from "@mendable/firecrawl-js";
import ora from "ora";
var __dirname = dirname(fileURLToPath(import.meta.url));
var pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf-8"));
var banner = `
 _                     _ 
| |__  _ __ _ __   __| |
| '_ \\| '__| '_ \\ / _\` |
| |_) | |  | | | | (_| |
|_.__/|_|  |_| |_|\\__,_|
`;
program.name("brnd").description("Scrape branding info from websites").argument("<url>", "URL to scrape branding from").option("-v, --version", "output version number").action(async (url) => {
  console.log(banner);
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) {
    console.error("Error: FIRECRAWL_API_KEY not found in environment");
    process.exit(1);
  }
  const firecrawl = new Firecrawl({ apiKey });
  const spinner = ora("Fetching branding...").start();
  const startTime = Date.now();
  try {
    const result = await firecrawl.scrape(url, {
      formats: ["branding"]
    });
    const elapsed = ((Date.now() - startTime) / 1e3).toFixed(2);
    spinner.succeed(`Branding fetched in ${elapsed}s`);
    const hostname = new URL(url).hostname;
    mkdirSync("brands", { recursive: true });
    const filename = `brands/${hostname}.md`;
    const branding = result.branding || {};
    const content = `# ${hostname}

\`\`\`json
${JSON.stringify(branding, null, 2)}
\`\`\`
`;
    writeFileSync(filename, content);
    console.log(`Branding saved to ${filename}`);
  } catch (error) {
    spinner.fail("Failed to fetch branding");
    console.error(error);
    process.exit(1);
  }
});
program.on("option:version", () => {
  console.log(pkg.version);
  process.exit(0);
});
program.parse();
