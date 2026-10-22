// Gives a phone screenshot from the Knomee prototype the portfolio's frame: the prototype's own grey
// rim, with the thin black ring between the rim and the screen taken out. Every pixel of that ring
// takes the rim's colour straight outward from it, so the grey (with its light and shade) runs right
// into the screen. The screen is left as it is.
// Input: the prototype's framed phone, 560×1154 (its iPhone element at deviceScaleFactor 2), transparent outside the body.
// The frame's curves share corner centres 87px in from each corner: the rim's outside is 87px from them,
// the black ring starts ~73px out, the screen's edge is 61px out.
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
      const C = 87, SCREEN = 61, RING = 73.5, SAMPLE = 77;   // distances from the corner centres
      for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
        const cx = Math.min(Math.max(i + 0.5, C), W - C), cy = Math.min(Math.max(j + 0.5, C), H - C);
        const dx = i + 0.5 - cx, dy = j + 0.5 - cy, dist = Math.hypot(dx, dy);
        if (dist < SCREEN - 1 || dist > RING + 1) continue;
        const s = at(Math.round(cx + dx / dist * SAMPLE - 0.5), Math.round(cy + dy / dist * SAMPLE - 0.5)), o = at(i, j);
        // soft edges: into the screen on the inside, into the rim on the outside
        const a = Math.min(1, Math.max(0, dist - (SCREEN - 0.5))) * Math.min(1, Math.max(0, RING + 0.5 - dist));
        for (let k = 0; k < 3; k++) px[o + k] = was[s + k] * a + was[o + k] * (1 - a);
        px[o + 3] = 255;
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
