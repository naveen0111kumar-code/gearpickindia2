import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, 'spreadsheet', 'products');
const OUTPUT_DIR = path.join(ROOT, 'pinterest', 'output');

const STYLE_VARIATIONS = [
  { id: 'deal-alert', hook: 'Limited-Time Deal', cta: 'Tap to Check Today\'s Price' },
  { id: 'feature-focus', hook: 'Why Smart Buyers Pick This', cta: 'Compare Features Now' },
  { id: 'problem-solution', hook: 'Upgrade Your Setup Fast', cta: 'See If It Fits Your Budget' },
];

function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }

function readInputFile() {
  if (!fs.existsSync(INPUT_DIR)) {
    throw new Error(`Input directory not found: ${INPUT_DIR}. Add products as CSV or JSON inside spreadsheet/products.`);
  }
  const files = fs.readdirSync(INPUT_DIR).filter(f => /\.(csv|json)$/i.test(f));
  if (!files.length) throw new Error('No CSV or JSON found in spreadsheet/products.');
  const file = files[0];
  const full = path.join(INPUT_DIR, file);
  const raw = fs.readFileSync(full, 'utf8');
  return { file, rows: file.endsWith('.json') ? parseJson(raw) : parseCsv(raw) };
}

function parseJson(raw) {
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) throw new Error('JSON must be an array of product objects.');
  return data;
}

function parseCsv(raw) {
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const headers = lines.shift().split(',').map(s => s.trim());
  return lines.map(line => {
    const cols = line.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h] = (cols[i] || '').trim());
    return obj;
  });
}

function hashtagsFor(product) {
  const base = ['#AmazonFinds', '#TechDeals', '#AffiliateFinds', '#GadgetLover', '#PinterestIndia'];
  const titleWords = (product.title || '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).slice(0, 2);
  const dyn = titleWords.map(w => `#${w.charAt(0).toUpperCase()}${w.slice(1)}Tech`);
  return [...new Set([...base, ...dyn])].slice(0, 8);
}

function titleVariants(p) {
  return [
    `${p.title}: Best Price Pick for 2026`,
    `${p.title} Review + Deal Snapshot`,
    `Should You Buy ${p.title}? Quick Breakdown`,
  ];
}

function seoDescription(p, style) {
  return `${style.hook}: ${p.title} at ${p.price || 'great'} value. ${p.description || 'Top-rated affiliate pick for your setup.'} Includes pricing, benefits, and quick buying tips for Indian shoppers.`;
}

function buildRecord(product, style) {
  const tags = hashtagsFor(product);
  return {
    product_title: product.title,
    image: product.image,
    price: product.price,
    affiliate_link: product.affiliate_link || product.affiliateLink || '',
    pin_style: style.id,
    pin_title_options: titleVariants(product),
    pin_description: seoDescription(product, style),
    hashtags: tags,
    call_to_action: style.cta,
    pin_layout: '1000x1500',
    design_style: 'Modern tech affiliate, gradient overlays, bold typography'
  };
}

function escapeXml(v = '') { return String(v).replace(/[<>&"]/g, m => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[m])); }

function createSvgAsset(record, idx) {
  const safeTitle = escapeXml(record.product_title);
  const safePrice = escapeXml(record.price || 'Check Price');
  const safeCta = escapeXml(record.call_to_action);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1500" viewBox="0 0 1000 1500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120c3d"/>
      <stop offset="100%" stop-color="#00b9ff"/>
    </linearGradient>
  </defs>
  <rect width="1000" height="1500" fill="url(#bg)"/>
  <rect x="60" y="60" width="880" height="1380" rx="42" fill="#0b1226" fill-opacity="0.74" stroke="#66e3ff"/>
  <text x="100" y="170" fill="#66e3ff" font-size="36" font-family="Inter,Arial,sans-serif">GEARPICK INDIA</text>
  <foreignObject x="100" y="230" width="800" height="520">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Inter,Arial,sans-serif;color:white;font-size:64px;font-weight:800;line-height:1.1;">${safeTitle}</div>
  </foreignObject>
  <rect x="100" y="840" width="800" height="360" rx="24" fill="#111" fill-opacity="0.52"/>
  <text x="130" y="920" fill="#fff" font-size="46" font-family="Inter,Arial,sans-serif">${safePrice}</text>
  <text x="130" y="980" fill="#a0f0ff" font-size="28" font-family="Inter,Arial,sans-serif">${record.pin_style.toUpperCase()}</text>
  <rect x="100" y="1270" width="800" height="110" rx="55" fill="#e60023"/>
  <text x="500" y="1340" text-anchor="middle" fill="#fff" font-size="38" font-family="Inter,Arial,sans-serif" font-weight="700">${safeCta}</text>
</svg>`;
}

function validateRow(r) {
  const req = ['title','image','price','affiliate_link','description'];
  return req.every(k => (r[k] ?? r[k.replace('_','')] ?? '').toString().trim().length);
}

function run() {
  ensureDir(OUTPUT_DIR);
  const { file, rows } = readInputFile();
  const valid = rows.filter(validateRow);
  const records = [];
  valid.forEach((p) => STYLE_VARIATIONS.forEach(style => records.push(buildRecord(p, style))));

  fs.writeFileSync(path.join(OUTPUT_DIR, 'pinterest-content.json'), JSON.stringify(records, null, 2));

  const md = [
    '# Pinterest Content Pack',
    `Source: spreadsheet/products/${file}`,
    '',
    ...records.slice(0, 30).map((r, i) => `## ${i+1}. ${r.product_title} (${r.pin_style})\n- Titles: ${r.pin_title_options.join(' | ')}\n- Description: ${r.pin_description}\n- Hashtags: ${r.hashtags.join(' ')}\n- CTA: ${r.call_to_action}\n- Link: ${r.affiliate_link}\n`)
  ].join('\n');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'pinterest-content.md'), md);

  records.forEach((r, i) => fs.writeFileSync(path.join(OUTPUT_DIR, `pin-${String(i+1).padStart(3, '0')}.svg`), createSvgAsset(r, i)));

  console.log(`Generated ${records.length} pin variants from ${valid.length} products.`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

run();
