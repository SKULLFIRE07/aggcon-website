import { notFound } from 'next/navigation';
import { IndustriesPage,CompanyPage,InvestorsPage,ContactPage,SustainabilityPage,NewsPage,BuyPage,PrivacyPage } from '@/components/InfoPages';
const pages:Record<string,{title:string;component:React.ComponentType}>={industries:{title:'Industry solutions',component:IndustriesPage},company:{title:'Our company',component:CompanyPage},investors:{title:'Investor relations',component:InvestorsPage},contact:{title:'Let’s talk',component:ContactPage},sustainability:{title:'Progress with purpose',component:SustainabilityPage},news:{title:'News & recognition',component:NewsPage},buy:{title:'Used equipment',component:BuyPage},privacy:{title:'Privacy notice',component:PrivacyPage}};
export function generateStaticParams(){return Object.keys(pages).map(section=>({section}));}
export async function generateMetadata({params}:{params:Promise<{section:string}>}){const {section}=await params;return {title:pages[section]?.title||'Page not found'};}
export default async function Page({params}:{params:Promise<{section:string}>}){const {section}=await params;const page=pages[section];if(!page)notFound();const Component=page.component;return <Component/>;}
