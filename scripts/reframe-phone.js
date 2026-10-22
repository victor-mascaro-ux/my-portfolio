// Gives a phone screenshot from the Knomee prototype the portfolio's plain frame: one solid dark bezel
// instead of the prototype's metal rim, with the screen left as it is.
// Input: the prototype's framed phone, 560×1154 (its iPhone element at deviceScaleFactor 2), transparent outside the body.
// Usage (from the repo root):
//   npx playwright@1.56.0 install chromium   # first time only
//   node scripts/reframe-phone.js shot.png [more.png …]   # writes assets/img/<name>.webp
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const FRAME = '#17161c', INSET = 25, R = 62;   // the screen sits 25px in on every side, its corners about 62px round
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const f of process.argv.slice(2)) {
    const mime = f.endsWith('.png') ? 'image/png' : 'image/webp';
    const src = 'data:' + mime + ';base64,' + fs.readFileSync(f).toString('base64');
    const r = await page.evaluate(async ({ src, FRAME, INSET, R }) => {
      const img = new Image(); img.src = src; await img.decode();
      const W = img.naturalWidth, H = img.naturalHeight;
      const probe = document.createElement('canvas'); probe.width = W; probe.height = H;
      const p = probe.getContext('2d'); p.drawImage(img, 0, 0);
      const a = (x, y) => p.getImageData(x, y, 1, 1).data[3];
      if (W !== 560 || H !== 1154 || a(0, 0) !== 0 || a(8, H / 2) !== 255) return { skip: W + 'x' + H + ', not a framed phone' };
      const c = document.createElement('canvas'); c.width = W; c.height = H;
      const x = c.getContext('2d');
      // the body: the original silhouette (keeps its smooth edge), in one colour
      x.drawImage(img, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = FRAME; x.fillRect(0, 0, W, H);
      // the screen, untouched
      x.globalCompositeOperation = 'source-over'; x.save();
      x.beginPath(); x.roundRect(INSET, INSET, W - INSET * 2, H - INSET * 2, R); x.clip();
      x.drawImage(img, 0, 0); x.restore();
      return { url: c.toDataURL('image/webp', 0.9) };
    }, { src, FRAME, INSET, R });
    if (r.skip) { console.log('skipped', f + ':', r.skip); continue; }
    const dest = path.join('assets/img', path.basename(f).replace(/\.(png|webp)$/, '') + '.webp');
    fs.writeFileSync(dest, Buffer.from(r.url.split(',')[1], 'base64'));
    console.log('wrote', dest);
  }
  await browser.close();
})();
