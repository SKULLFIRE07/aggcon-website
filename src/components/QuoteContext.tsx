'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { equipment } from '@/lib/data';
type Item = { id: string; quantity: number };
type QuoteState = { items: Item[]; add: (id:string) => void; remove: (id:string) => void; quantity: (id:string,n:number) => void; clear: () => void; ready:boolean };
const Context = createContext<QuoteState | null>(null);
export function QuoteProvider({children}:{children:ReactNode}) {
  const [items,setItems]=useState<Item[]>([]); const [ready,setReady]=useState(false); const [toast,setToast]=useState('');
  useEffect(()=>{ try { const saved=JSON.parse(localStorage.getItem('aggcon-quote') || '[]'); if(Array.isArray(saved)) setItems(saved.filter(i=>equipment.some(e=>e.id===i?.id)&&Number.isInteger(i.quantity)&&i.quantity>0&&i.quantity<=100)); } catch {} setReady(true); },[]);
  useEffect(()=>{ if(ready) localStorage.setItem('aggcon-quote',JSON.stringify(items)); },[items,ready]);
  useEffect(()=>{ if(!toast)return; const t=setTimeout(()=>setToast(''),3200); return()=>clearTimeout(t); },[toast]);
  const add=(id:string)=>{ if(!equipment.some(e=>e.id===id)) return; setItems(old=>old.some(i=>i.id===id)?old: [...old,{id,quantity:1}]); setToast(`${equipment.find(e=>e.id===id)!.name} added to your quote list`); };
  return <Context.Provider value={{items,add,remove:id=>setItems(old=>old.filter(i=>i.id!==id)),quantity:(id,n)=>setItems(old=>old.map(i=>i.id===id?{...i,quantity:Math.max(1,Math.min(100,n))}:i)),clear:()=>setItems([]),ready}}>{children}<div className={`toast ${toast?'show':''}`} role="status">{toast}</div></Context.Provider>;
}
export function useQuote(){const c=useContext(Context);if(!c)throw new Error('QuoteProvider missing');return c;}
