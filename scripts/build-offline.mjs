import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
async function files(dir) { const output=[]; for (const file of await readdir(dir,{withFileTypes:true})) { const path=`${dir}/${file.name}`; if (file.isDirectory()) output.push(...await files(path)); else if (file.name!=='sw.js') output.push(path); } return output; }
const paths = await files('dist');
const contents = await Promise.all(paths.map(path=>readFile(path)));
const version = createHash('sha256').update(Buffer.concat(contents)).update(await readFile(new URL(import.meta.url))).digest('hex').slice(0,12);
const urls = paths.map(path=>'/'+path.slice(5));
await writeFile('dist/sw.js', `const CACHE='de-che-${version}';
const ASSETS=${JSON.stringify(['/',...urls])};
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('de-che-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{if(event.data==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api/'))return;
 if(event.request.mode==='navigate'){event.respondWith(caches.open(CACHE).then(cache=>cache.match('/index.html',{ignoreVary:true})).then(cached=>cached||fetch(event.request)));return;}
 event.respondWith(caches.open(CACHE).then(cache=>cache.match(event.request,{ignoreVary:true})).then(cached=>cached||fetch(event.request)));
});
`);
const bytes = contents.reduce((sum,buffer)=>sum+gzipSync(buffer).length,0);
console.log(`Cache ngoại tuyến: ${urls.length} tài nguyên; khoảng ${Math.round(bytes/1024)} KB sau gzip.`);
