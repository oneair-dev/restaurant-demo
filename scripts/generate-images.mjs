/**
 * Downloads curated Unsplash stock photos for La Bella Roma.
 * Photos are free to use for demos; credit Unsplash & original photographers.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'images');
mkdirSync(OUT_DIR, { recursive: true });

const photos = [
  {
    filename: 'hero-bg.jpg',
    id: '1414235077428-338989a2e8c0',
    w: 1920, h: 1080,
    desc: 'Restaurant interior (hero background)',
  },
  {
    filename: 'tagliatelle-tartufo.jpg',
    id: '1574071318508-1cdbab80d002',
    w: 900, h: 900,
    desc: 'Tagliatelle / Italian pasta',
  },
  {
    filename: 'pizza-margherita.jpg',
    id: '1565299624946-b28f40a0ae38',
    w: 900, h: 900,
    desc: 'Pizza Margherita',
  },
  {
    filename: 'tiramisu.jpg',
    id: '1571877227200-a0d98ea607e9',
    w: 900, h: 900,
    desc: 'Tiramisu dessert',
  },
  {
    filename: 'gallery-ambiance.jpg',
    id: '1517244683847-7456b63c5969',
    w: 900, h: 680,
    desc: 'Restaurant ambiance',
  },
  {
    filename: 'gallery-wine-cellar.jpg',
    id: '1510626176961-4b57d4fbad03',
    w: 900, h: 680,
    desc: 'Wine cellar',
  },
  {
    filename: 'gallery-chef.jpg',
    id: '1556909114-f6e7ad7d3136',
    w: 900, h: 680,
    desc: 'Chef cooking',
  },
  {
    filename: 'gallery-dining-room.jpg',
    id: '1559339352-11d035aa65de',
    w: 900, h: 680,
    desc: 'Dining room / dessert scene',
  },
];

async function download(photo) {
  const url =
    `https://images.unsplash.com/photo-${photo.id}` +
    `?w=${photo.w}&h=${photo.h}&q=85&auto=format&fit=crop&crop=center`;

  console.log(`↓  ${photo.desc} (${photo.filename})…`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; restaurant-demo/1.0)',
    },
  });

  if (!res.ok) {
    console.error(`   ✗ HTTP ${res.status}`);
    return false;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const outPath = join(OUT_DIR, photo.filename);
  writeFileSync(outPath, buf);
  console.log(`   ✓ ${outPath} (${(buf.length / 1024).toFixed(0)} KB)`);
  return true;
}

let ok = 0, fail = 0;
for (const photo of photos) {
  const success = await download(photo);
  success ? ok++ : fail++;
  await new Promise(r => setTimeout(r, 400));
}

console.log(`\n✔ ${ok} downloaded, ${fail} failed — saved to public/images/`);
