const OPEN=['/login','/login.html','/login.css'];
const enc=new TextEncoder();
function b64(a){return btoa(String.fromCharCode(...a)).replaceAll('+','-').replaceAll('/','_').replaceAll('=','')}
async function sign(v,s){const k=await crypto.subtle.importKey('raw',enc.encode(s),{name:'HMAC',hash:'SHA-256'},false,['sign']);return b64(new Uint8Array(await crypto.subtle.sign('HMAC',k,enc.encode(v))))}
async function valid(r,e){const m=(r.headers.get('Cookie')||'').match(/(?:^|;\s*)wedding_session=([^;]+)/);if(!m)return false;const [x,s]=m[1].split('.');return x&&s&&Number(x)>Date.now()&&s===await sign(x,e.SESSION_SECRET)}
export async function onRequest(c){const p=new URL(c.request.url).pathname;if(OPEN.includes(p))return c.next();if(!c.env.LOGIN_PASSWORD||!c.env.SESSION_SECRET)return new Response('Aggiungere LOGIN_PASSWORD e SESSION_SECRET nei secret di Cloudflare.',{status:503});return await valid(c.request,c.env)?c.next():Response.redirect(new URL('/login.html',c.request.url),302)}
