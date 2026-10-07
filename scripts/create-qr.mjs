import QRCode from 'qrcode';
import { mkdir, writeFile } from 'node:fs/promises';
const raw = process.argv[2];
if (!raw) { console.error('Cách dùng: pnpm qr https://dia-chi-production.vercel.app'); process.exit(1); }
const url = new URL(raw);
if (url.protocol!=='https:') { console.error('QR lớp học cần một URL HTTPS công khai đã kiểm tra.'); process.exit(1); }
await mkdir('docs/qr',{recursive:true});
await QRCode.toFile('docs/qr/de-che-doc-quyen.png',url.href,{width:1000,margin:4,errorCorrectionLevel:'M',color:{dark:'#272c29',light:'#ffffff'}});
await writeFile('docs/qr/de-che-doc-quyen.svg',await QRCode.toString(url.href,{type:'svg',margin:4,errorCorrectionLevel:'M'}));
await writeFile('docs/qr/url.txt',url.href+'\n');
console.log('Đã tạo QR PNG/SVG trong docs/qr cho '+url.href);
