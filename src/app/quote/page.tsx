import { QuoteForm } from '@/components/QuoteForm';
export const metadata={title:'Plan your project',description:'Build your equipment shortlist and send a project rental enquiry to the AGGCON local preview.'};
export default function Page(){return <section className="quote-page container"><div className="page-intro"><h1>LET’S BUILD<br/><span>WHAT’S NEXT.</span></h1><p>A few details. A big step forward.<br/>Your rental journey starts here.</p></div><QuoteForm/></section>;}
