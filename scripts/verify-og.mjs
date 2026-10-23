import fs from 'node:fs';
import path from 'node:path';

function getPngDimensions(buf) {
  if (buf.length >= 24 && buf.toString('ascii', 12, 16) === 'IHDR') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  return null;
}

function findHtml(dir, list = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) findHtml(full, list);
    else if (f.endsWith('.html')) list.push(full);
  }
  return list;
}

function extractMeta(content, nameOrProp) {
  const r1 = new RegExp(`<meta\\s+(?:property|name)=["']${nameOrProp}["']\\s+content=["']([^"']*)["']`, 'i');
  const r2 = new RegExp(`<meta\\s+content=["']([^"']*)["']\\s+(?:property|name)=["']${nameOrProp}["']`, 'i');
  const m = content.match(r1) || content.match(r2);
  return m ? m[1] : '';
}

const files = findHtml('out').sort();
console.log('| Page / Route | og:title | og:type | og:site_name | og:locale | og:image (file & size) | og:url | twitter:title | twitter:image |');
console.log('|---|---|---|---|---|---|---|---|---|');

for (const file of files) {
  const rel = path.relative('out', file);
  let route = '/' + rel.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  if (route === '/index') route = '/';
  if (route === '/404') continue;

  const content = fs.readFileSync(file, 'utf8');
  const ogTitle = extractMeta(content, 'og:title');
  const ogType = extractMeta(content, 'og:type');
  const ogSite = extractMeta(content, 'og:site_name');
  const ogLocale = extractMeta(content, 'og:locale');
  const ogImage = extractMeta(content, 'og:image');
  const ogUrl = extractMeta(content, 'og:url');
  const twTitle = extractMeta(content, 'twitter:title');
  const twImage = extractMeta(content, 'twitter:image');

  let imgStatus = 'MISSING';
  let fileName = '';
  if (ogImage) {
    fileName = path.basename(ogImage);
    const localPath = path.join('public', ogImage.replace('https://www.techiitfly.com/', ''));
    if (fs.existsSync(localPath)) {
      const buf = fs.readFileSync(localPath);
      const dims = getPngDimensions(buf);
      imgStatus = dims ? `${dims.width}×${dims.height}` : 'exists';
    } else {
      imgStatus = 'NOT FOUND';
    }
  }

  console.log(`| \`${route}\` | ${ogTitle} | \`${ogType}\` | \`${ogSite}\` | \`${ogLocale}\` | \`${fileName}\` (${imgStatus}) | \`${ogUrl}\` | ${twTitle} | \`${path.basename(twImage)}\` |`);
}
