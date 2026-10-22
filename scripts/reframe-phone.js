// Gives a phone screenshot from the Knomee prototype the portfolio's frame: a plain grey rim running
// straight into the screen. The prototype's rim has a thin black ring inside it, bright lines along it
// and an outer edge that darkens to black at the bottom corners; all of that read as stray strokes.
// So every pixel of the rim takes the rim's mid-tone straight outward from it: the grey keeps its
// light and shade around the phone, but is one tone across. The screen is left as it is.
// Input: the prototype's framed phone, 560×1154 (its iPhone element at deviceScaleFactor 2), transparent outside the body.
// The frame's curves share corner centres 87px in from each corner: the rim's mid-tone is 77px from
// them, the old black ring started ~73px out, and the screen's edge is 61px out.
// Usage (from the repo root):
//   npx playwright@1.56.0 install chromium   # first time only
//   node scripts/reframe-phone.js shot.png [more.png …]   # writes assets/img/<name>.webp
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const f of process.argv.slice(2)) {
    const mime = f.endsWith('.png') ? 'image/png' : 'image/webp';
    const src = 'data:' + mime + ';base64,' + fs.readFileSync(f).toString('base64');
    const r = await page.evaluate(async (src) => {
      const img = new Image(); img.src = src; await img.decode();
      const W = img.naturalWidth, H = img.naturalHeight;
      const c = document.createElement('canvas'); c.width = W; c.height = H;
      const x = c.getContext('2d'); x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, W, H), px = d.data;
      const at = (i, j) => (j * W + i) * 4;
      if (W !== 560 || H !== 1154 || px[3] !== 0 || px[at(8, H >> 1) + 3] !== 255) return { skip: W + 'x' + H + ', not a framed phone' };
      const was = new Uint8ClampedArray(px);
      const C = 87, SCREEN = 61, RING = 73.5, TONE = 77;   // distances from the corner centres
      const along = (cx, cy, dx, dy, dist, r) => at(Math.round(cx + dx / dist * r - 0.5), Math.round(cy + dy / dist * r - 0.5));
      for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
        const o = at(i, j);
        const cx = Math.min(Math.max(i + 0.5, C), W - C), cy = Math.min(Math.max(j + 0.5, C), H - C);
        const dx = i + 0.5 - cx, dy = j + 0.5 - cy, dist = Math.hypot(dx, dy);
        if (dist < SCREEN - 1 || was[o + 3] === 0) continue;
        // the rim's mid-tone straight outward, and the screen just inside (clear of the old black ring)
        const s = along(cx, cy, dx, dy, dist, TONE), n = along(cx, cy, dx, dy, dist, SCREEN - 2.5);
        const a = Math.min(1, Math.max(0, dist - (SCREEN - 0.5)));   // only the screen's edge blends
        for (let k = 0; k < 3; k++) px[o + k] = was[s + k] * a + was[n + k] * (1 - a);
        if (dist < RING) px[o + 3] = 255;   // the outer edge keeps its own soft alpha
      }
      x.putImageData(d, 0, 0);
      return { url: c.toDataURL('image/webp', 0.9) };
    }, src);
    if (r.skip) { console.log('skipped', f + ':', r.skip); continue; }
    const dest = path.join('assets/img', path.basename(f).replace(/\.(png|webp)$/, '') + '.webp');
    fs.writeFileSync(dest, Buffer.from(r.url.split(',')[1], 'base64'));
    console.log('wrote', dest);
  }
  await browser.close();
})();
