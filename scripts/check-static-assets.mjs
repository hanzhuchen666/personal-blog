import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

async function filesIn(path) {
  const entries = await readdir(path, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => {
    const file = join(path, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  }))).flat();
}
const files = await filesIn("dist");
const sizes = await Promise.all(files.map(async path => ({ path, size: (await stat(path)).size })));
const tooLarge = sizes.filter(file => file.size > 25 * 1024 * 1024);
if (files.length > 20000 || tooLarge.length) {
  console.error("Cloudflare static asset limits exceeded", { count: files.length, tooLarge });
  process.exit(1);
}
const largest = sizes.reduce((a, b) => a.size > b.size ? a : b);
console.log(`Static assets checked: ${files.length}/20000 files; largest ${largest.size}/26214400 bytes (${largest.path}).`);
