'use client';
export default function ErrorPage({reset}:{error:Error;reset:()=>void}){return <section className="not-found container"><h1>LET’S TRY<br/>THAT AGAIN.</h1><p>We couldn’t load this page. Please try again.</p><button className="button button-orange" onClick={reset}>Reload this page</button></section>;}
