import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

// Isolated export: keep the local API and database out of the public Pages build.
const root = process.cwd();
const stage = path.join(root, '.pages-build');
const base = process.env.NEXT_PUBLIC_BASE_PATH || '/aggcon-website';
if (!/^\/[a-zA-Z0-9_-]+$/.test(base)) throw new Error('Expected a single GitHub Pages repository path.');
await rm(stage, { recursive: true, force: true });
await mkdir(stage, { recursive: true });
for (const file of ['src', 'public', 'package.json', 'package-lock.json', 'tsconfig.json', 'next-env.d.ts', 'next.config.ts']) {
  await cp(path.join(root, file), path.join(stage, file), { recursive: true, filter: source => !source.includes('/src/app/api') && !source.includes('/src/app/admin') && !source.endsWith('.png') });
}
const catalogue = await readFile(path.join(root, 'src/app/equipment/page.tsx'), 'utf8');
await writeFile(path.join(stage, 'src/app/equipment/page.tsx'), catalogue.replace(/export default async function Page[\s\S]+$/, 'export default function Page(){return <Fleet/>;}\n'));
const css = await readFile(path.join(stage, 'src/app/globals.css'), 'utf8');
await writeFile(path.join(stage, 'src/app/globals.css'), css.replaceAll("url('/fonts/", `url('${base}/fonts/`));
const result = spawnSync(process.execPath, [path.join(root, 'node_modules/next/dist/bin/next'), 'build'], { cwd: stage, stdio: 'inherit', env: { ...process.env, NEXT_PUBLIC_STATIC_PREVIEW: 'true', NEXT_PUBLIC_BASE_PATH: base, NEXT_PUBLIC_SITE_URL: `https://skullfire07.github.io${base}/` } });
if (result.status !== 0) process.exit(result.status || 1);
await rm(path.join(root, 'out'), { recursive: true, force: true });
await cp(path.join(stage, 'out'), path.join(root, 'out'), { recursive: true });
await writeFile(path.join(root, 'out/.nojekyll'), '');
console.log(`GitHub Pages export ready: ${path.join(root, 'out')}`);
