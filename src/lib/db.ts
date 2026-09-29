import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
type GlobalDB = typeof globalThis & { aggconDB?: DatabaseSync };
export function database() {
  const g = globalThis as GlobalDB;
  if (!g.aggconDB) {
    const folder = process.env.AGGCON_DATA_DIR || path.join(process.cwd(), 'data');
    mkdirSync(folder, { recursive: true });
    g.aggconDB = new DatabaseSync(path.join(folder, 'aggcon.sqlite'));
    g.aggconDB.exec(`PRAGMA journal_mode = WAL; CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY, created_at TEXT NOT NULL, kind TEXT NOT NULL,
      name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL,
      company TEXT NOT NULL, location TEXT NOT NULL, start_date TEXT NOT NULL,
      duration TEXT NOT NULL, message TEXT NOT NULL, items TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'New'
    );`);
  }
  return g.aggconDB;
}
