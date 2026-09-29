import type { Metadata, Viewport } from 'next';
import { Header, Footer } from '@/components/Chrome';
import { QuoteProvider } from '@/components/QuoteContext';
import './globals.css';
import { assetUrl } from '@/lib/preview';
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://127.0.0.1:3001'),title:{default:'AGGCON — Powering What’s Next',template:'%s | AGGCON'},description:'Infrastructure equipment rental. Expert operators. A partner for what’s next. Explore AGGCON’s fleet and plan your next project.',robots:{index:false,follow:false},openGraph:{title:'AGGCON — Powering What’s Next',description:'Equipment. Expertise. A partner for your biggest ambitions.',images:[assetUrl('/images/hero-machinery.webp')]}};
export const viewport:Viewport={themeColor:'#171917',width:'device-width',initialScale:1};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" data-scroll-behavior="smooth"><body><QuoteProvider><a href="#main-content" className="skip-link">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/></QuoteProvider></body></html>;}
