import { randomBytes } from 'node:crypto';
import { access, writeFile } from 'node:fs/promises';
try { await access('.env.local'); console.log('Existing local credentials preserved in .env.local.'); }
catch { await writeFile('.env.local',`ADMIN_PASSWORD=${randomBytes(18).toString('base64url')}\nADMIN_SESSION_SECRET=${randomBytes(32).toString('hex')}\nADMIN_SECURE_COOKIE=false\n`,{mode:0o600});console.log('Local credentials created in .env.local. Open that file to view the admin passphrase.'); }
