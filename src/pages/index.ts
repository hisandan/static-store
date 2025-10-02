import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const GET: APIRoute = async () => {
  const stickersDir = path.join(process.cwd(), 'public', 'stickersdochat');
  try {
    const entries = await fs.readdir(stickersDir, { withFileTypes: true });
    const urls = entries
      .filter((entry) => entry.isFile())
      .map((entry) => `https://static-store-dani.netlify.app/stickersdochat/${entry.name}`)
      .sort((a, b) => a.localeCompare(b));

    return new Response(JSON.stringify(urls), {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: 'Failed to read stickers directory', message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }
};


