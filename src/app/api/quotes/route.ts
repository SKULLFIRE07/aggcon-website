import { NextResponse } from 'next/server';
import { z } from 'zod';
import { randomBytes } from 'node:crypto';
import { database } from '@/lib/db';
import { equipment } from '@/lib/data';
import { sameOrigin } from '@/lib/auth';
export const runtime = 'nodejs';
const schema = z.object({
  kind: z.enum(['quote', 'contact']).default('quote'),
  name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  email: z.email('Please enter a valid email address.').max(200),
  phone: z.string().trim().regex(/^[+\d\s()-]{7,24}$/, 'Please enter a valid phone number.'),
  company: z.string().trim().min(2, 'Please enter your company name.').max(200),
  location: z.string().trim().min(2, 'Please enter the project location.').max(200),
  startDate: z.string().max(20).default(''),
  duration: z.string().max(100).default('To be discussed'),
  message: z.string().trim().max(4000).default(''),
  website: z.string().max(0).optional(),
  consent: z.literal(true, { error: 'Please agree to the enquiry privacy notice.' }),
  items: z.array(z.object({ id: z.string().max(80), quantity: z.number().int().min(1).max(100) })).max(30).default([])
});
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Please submit this enquiry from the website.' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 20000) return NextResponse.json({ error: 'Your enquiry is too long.' }, { status: 413 });
  let body: unknown;
  try { const raw = await request.text(); if (raw.length > 20000) return NextResponse.json({ error: 'Your enquiry is too long.' }, { status: 413 }); body = JSON.parse(raw); }
  catch { return NextResponse.json({ error: 'We could not read your enquiry. Please try again.' }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const d = parsed.data;
  if (d.items.some(i => !equipment.some(e => e.id === i.id))) return NextResponse.json({ error: 'One selected machine is no longer in the catalogue. Please update your shortlist.' }, { status: 400 });
  if (d.startDate && (!/^\d{4}-\d{2}-\d{2}$/.test(d.startDate) || isNaN(Date.parse(d.startDate)) || d.startDate < new Date().toISOString().slice(0,10))) return NextResponse.json({ error: 'Please choose a valid project start date today or later.' }, { status: 400 });
  try {
    const db = database();
    const recent = db.prepare('SELECT COUNT(*) AS count FROM enquiries WHERE email = ? AND created_at > ?').get(d.email.toLowerCase(), new Date(Date.now() - 60*60*1000).toISOString()) as { count: number };
    if (recent.count >= 5) return NextResponse.json({ error: 'You have sent several enquiries recently. Please call us or try again later.' }, { status: 429 });
    const id = `AG-${new Date().getFullYear()}-${randomBytes(4).toString('hex').toUpperCase()}`;
    const items = d.items.map(i => ({ ...i, name: equipment.find(e => e.id === i.id)!.name }));
    db.prepare('INSERT INTO enquiries (id,created_at,kind,name,email,phone,company,location,start_date,duration,message,items) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').run(id,new Date().toISOString(),d.kind,d.name,d.email.toLowerCase(),d.phone,d.company,d.location,d.startDate,d.duration,d.message,JSON.stringify(items));
    return NextResponse.json({ id, message: 'Your enquiry has been saved.' }, { status: 201 });
  } catch { return NextResponse.json({ error: 'We could not save your enquiry. Your details are still here; please try again.' }, { status: 503 }); }
}
