import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { equal, isAdmin, sameOrigin, sessionToken } from '@/lib/auth';
import { database } from '@/lib/db';
export const runtime = 'nodejs';
const attempts = new Map<string, { count: number; reset: number }>();
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  const address = request.headers.get('x-forwarded-for') || 'local';
  let rate = attempts.get(address);
  if (!rate || rate.reset < Date.now()) { rate = { count: 0, reset: Date.now() + 15*60*1000 }; attempts.set(address, rate); }
  if (rate.count >= 8) return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });
  rate.count++;
  const data = await request.json().catch(() => null);
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) return NextResponse.json({ error: 'Set the admin credentials in .env.local first.' }, { status: 503 });
  if (typeof data?.password !== 'string' || !equal(data.password, process.env.ADMIN_PASSWORD)) return NextResponse.json({ error: 'That passphrase is incorrect.' }, { status: 401 });
  rate.count = 0;
  (await cookies()).set('aggcon_admin', sessionToken(), { httpOnly: true, sameSite: 'strict', secure: process.env.ADMIN_SECURE_COOKIE === 'true', path: '/', maxAge: 8*60*60 });
  return NextResponse.json({ ok: true });
}
export async function GET() { if (!await isAdmin()) return NextResponse.json({ error: 'Please sign in.' }, { status: 401 }); const enquiries = database().prepare('SELECT * FROM enquiries ORDER BY created_at DESC').all(); return NextResponse.json({ enquiries }, { headers: { 'Cache-Control': 'no-store' } }); }
export async function PATCH(request: Request) {
  if (!sameOrigin(request) || !await isAdmin()) return NextResponse.json({ error: 'Please sign in.' }, { status: 401 });
  const d = await request.json().catch(() => null);
  if (!d || typeof d.id !== 'string' || !['New','In review','Contacted','Closed'].includes(d.status)) return NextResponse.json({ error: 'Invalid update.' }, { status: 400 });
  const result = database().prepare('UPDATE enquiries SET status = ? WHERE id = ?').run(d.status, d.id);
  if (!result.changes) return NextResponse.json({ error: 'Enquiry not found.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
export async function DELETE(request: Request) { if (!sameOrigin(request)) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 }); (await cookies()).delete('aggcon_admin'); return NextResponse.json({ ok: true }); }
