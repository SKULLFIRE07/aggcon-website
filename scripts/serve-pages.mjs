import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('out'), base='/aggcon-website';
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.svg':'image/svg+xml','.ttf':'font/ttf','.txt':'text/plain'};
createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(!pathname.startsWith(base+'/')){res.writeHead(302,{Location:base+'/'});res.end();return;}let file=path.resolve(root,'.'+pathname.slice(base.length));if(!file.startsWith(root+path.sep)&&file!==root)throw Error('Invalid path');const entry=await stat(file);if(entry.isDirectory())file=path.join(file,'index.html');const body=await readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(path.join(root,'404.html')));}}).listen(3002,'127.0.0.1',()=>console.log('Static preview: http://127.0.0.1:3002/aggcon-website/'));
