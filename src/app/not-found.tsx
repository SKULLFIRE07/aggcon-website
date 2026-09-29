import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function NotFound(){return <section className="not-found container"><span>404</span><h1>LET’S GET YOU<br/>BACK ON TRACK.</h1><p>This page isn’t here. Your next project still is.</p><Link href="/equipment" className="button button-orange">Explore our fleet <ArrowUpRight size={19}/></Link><Link href="/" className="inline-link">Return home <ArrowUpRight size={19}/></Link></section>;}
