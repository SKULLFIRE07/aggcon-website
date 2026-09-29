import { Fleet } from '@/components/Fleet';
export const metadata={title:'Explore the fleet',description:'Find foundation, lifting, concrete, road construction, earthmoving and material handling machinery in AGGCON’s equipment fleet.'};
export default async function Page({searchParams}:{searchParams:Promise<{category?:string}>}){const {category}=await searchParams;return <Fleet initialCategory={category||'all'}/>;}
