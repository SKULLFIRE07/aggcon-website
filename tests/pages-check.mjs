import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const base=process.env.PAGES_PREVIEW_URL||'http://127.0.0.1:3002/aggcon-website';
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();page.setDefaultTimeout(12000);
const errors=[],failures=[],apiCalls=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)failures.push(r.url());});
page.on('request',r=>{if(r.url().includes('/api/'))apiCalls.push(r.url());});
const review='.impeccable/review';await mkdir(review,{recursive:true});
async function load(route){const r=await page.goto(base+route);expect(r.status()).toBe(200);await page.locator('h1').first().waitFor();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();}
async function shot(name){await page.evaluate(async()=>{await document.fonts.ready;for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));scrollTo(0,0);});expect(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0))).toBeTruthy();await page.screenshot({path:review+'/'+name+'.png',fullPage:true,animations:'disabled'});}
try{
  await load('/');await shot('desktop');await page.screenshot({path:review+'/desktop-hero.png',animations:'disabled'});
  await page.setViewportSize({width:390,height:844});await shot('mobile');await page.screenshot({path:review+'/mobile-hero.png',animations:'disabled'});
  await page.getByRole('button',{name:'Open navigation'}).click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Equipment'}).click();await expect(page.locator('.machine-card')).toHaveCount(24);await shot('mobile-fleet');
  await load('/equipment/?category=handling');await expect(page.locator('.machine-card')).toHaveCount(4);
  await page.setViewportSize({width:1440,height:1000});
  await load('/equipment/jcb-3dx/');await page.getByRole('button',{name:'Add JCB 3DX to quote'}).click();
  await load('/quote/');await expect(page.locator('.quote-machine')).toHaveCount(1);
  await page.getByRole('button',{name:'Project details',exact:true}).click();await page.locator('input[name=location]').fill('Faridabad');
  await page.getByRole('button',{name:'Your details',exact:true}).click();
  for(const [name,value] of Object.entries({name:'Preview QA',company:'Preview Test Company',email:'qa@preview.example',phone:'9000000000'}))await page.locator('input[name='+name+']').fill(value);
  await page.locator('input[name=consent]').check();await page.getByRole('button',{name:'Prepare enquiry'}).click();await expect(page.locator('.quote-success')).toBeVisible();
  await expect(page.getByRole('link',{name:'Review email draft'})).toHaveAttribute('href',/^mailto:info@aggconequipments.in\?/);
  const d=page.waitForEvent('download');await page.getByRole('button',{name:'Download enquiry'}).click();expect((await d).suggestedFilename()).toMatch(/^aggcon-enquiry-DRAFT-/);
  for(const r of ['/projects/','/projects/atal-setu/','/projects/hyderabad-metro/','/projects/ganga-river-bridge/','/company/','/industries/','/investors/','/sustainability/','/news/','/buy/','/contact/','/privacy/'])await load(r);
  await expect(page.locator('main')).toContainText('No information is sent to AGGCON automatically.');
  await page.emulateMedia({reducedMotion:'no-preference'});await load('/');await page.evaluate(()=>scrollTo(0,180));await page.waitForFunction(()=>Number(document.querySelector('.hero').style.getPropertyValue('--hero-scale'))>1.03);
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.evaluate(()=>scrollTo(0,180));expect(await page.locator('.hero').evaluate(el=>el.style.getPropertyValue('--hero-scale'))).toBe('');
  expect(errors).toEqual([]);expect(failures).toEqual([]);expect(apiCalls).toEqual([]);
  await writeFile(review+'/pages-check.json',JSON.stringify({base,passed:true,errors,failedRequests:failures,apiCalls,checks:['Desktop and mobile assets','All 24 machines','Category query on direct reload','Shortlist','Hosted enquiry draft','Download','Privacy','Main public routes','Scroll framing with reduced-motion fallback']},null,2));
  console.log(JSON.stringify({passed:true,base,errors,failedRequests:failures,apiCalls},null,2));
}finally{await browser.close();}
