export const staticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === 'true';
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export function assetUrl(path: string) { return `${basePath}${path}`; }
