#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
  const projectRoot = process.cwd();
  const stickersDir = path.join(projectRoot, 'public', 'stickersdochat');
  const outputFile = path.join(projectRoot, 'public', 'stickersdochat.json');

  try {
    const entries = await fs.readdir(stickersDir, { withFileTypes: true });
    const urls = entries
      .filter((entry) => entry.isFile())
      .map((entry) => `https://static-store-dani.netlify.app/stickersdochat/${entry.name}`)
      .sort((a, b) => a.localeCompare(b));

    const json = JSON.stringify(urls, null, 2);
    await fs.writeFile(outputFile, json + '\n', 'utf8');
    console.log(`Wrote ${urls.length} URLs to ${path.relative(projectRoot, outputFile)}`);
  } catch (error) {
    console.error('Failed to generate stickers index:', error);
    process.exitCode = 1;
  }
}

main();


