import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
function key() { if (!process.env.ADMIN_SESSION_SECRET) throw new Error('ADMIN_SESSION_SECRET is not configured'); return process.env.ADMIN_SESSION_SECRET; }
export function equal(a: string, b: string) { const x = Buffer.from(a); const y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); }
export function sessionToken() { const payload = String(Date.now() + 8 * 60 * 60 * 1000); return `${payload}.${createHmac('sha256', key()).update(payload).digest('hex')}`; }
export async function isAdmin() {
  const value = (await cookies()).get('aggcon_admin')?.value;
  if (!value || !process.env.ADMIN_SESSION_SECRET) return false;
  const [expires, signature] = value.split('.');
  return Number(expires) > Date.now() && !!signature && equal(signature, createHmac('sha256', key()).update(expires).digest('hex'));
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try { const expected = new URL(request.url); const actual = new URL(origin); return actual.origin === expected.origin || (actual.host === request.headers.get('host') && actual.protocol === expected.protocol); }
  catch { return false; }
}
