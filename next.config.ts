import type { NextConfig } from 'next';
import path from 'node:path';
const pages = process.env.NEXT_PUBLIC_STATIC_PREVIEW === 'true';
const config: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: pages ? path.resolve(process.cwd(), '..') : process.cwd() },
  ...(pages ? { output: 'export' as const, trailingSlash: true, basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', images: { unoptimized: true } } : {}),
  async headers() {
    if (pages) return [];
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' }
    ] }];
  }
};
export default config;
