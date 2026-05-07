import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'public', 'og-image.jpg');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.goto('http://127.0.0.1:3000/og-preview.html', { waitUntil: 'networkidle0' });

// Wait for fonts + images
await new Promise(r => setTimeout(r, 2000));

await page.screenshot({
  path: outPath,
  type: 'jpeg',
  quality: 95,
  clip: { x: 0, y: 0, width: 1200, height: 630 }
});

await browser.close();
console.log('✓ OG image saved to', outPath);
