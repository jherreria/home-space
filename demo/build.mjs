import { copyFile, mkdir, rm } from 'node:fs/promises';

// Resolve from this script so either repository root works in Vercel.
const output = new URL('./dist/', import.meta.url);
const files = ['index.html', 'app.js', 'assets.js', 'data.js', 'styles.css', 'details.css'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all(files.map(file => copyFile(new URL(file, import.meta.url), new URL(file, output))));
console.log(`Built Home Space: ${files.length} static files in demo/dist`);
