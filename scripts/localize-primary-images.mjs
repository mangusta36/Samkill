import fs from "node:fs/promises";
import { spawn } from "node:child_process";
import os from "node:os";
import path from "node:path";
import snapshot from "../data/catalog-snapshot.json" with { type: "json" };

const outputDir = path.resolve("public/catalog");
await fs.mkdir(outputDir, { recursive: true });

const run = (command, args) => new Promise((resolve, reject) => {
  const child = spawn(command, args, { stdio: "inherit" });
  child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} stopte met code ${code}`)));
});

for (const [index, product] of snapshot.products.entries()) {
  const output = path.join(outputDir, `${product.handle}.webp`);
  try { await fs.access(output); continue; } catch {}
  const image = product.images[0];
  if (!image) continue;
  const response = await fetch(image.src, { headers: { "User-Agent": "SamkillLocalAssetAudit/1.0" } });
  if (!response.ok) throw new Error(`${product.handle}: afbeelding HTTP ${response.status}`);
  const temporary = path.join(os.tmpdir(), `samkill-${product.handle}-${Date.now()}`);
  await fs.writeFile(temporary, Buffer.from(await response.arrayBuffer()));
  await run("magick", [temporary, "-auto-orient", "-resize", "900x1100>", "-quality", "82", output]);
  await fs.unlink(temporary);
  console.log(`${index + 1}/${snapshot.products.length} ${product.handle}`);
}
