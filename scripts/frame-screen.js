// Puts a bare phone screen under the one shared phone frame (assets/img/phone-frame.webp), so a before/after
// pair shares one frame and only the screen changes. The screen is trimmed 4px (screenshots often carry a
// 1–3px selection outline that would show along the frame) and fitted to the opening (510×1104 at 25,25,
// corners 61), which a 463×1000 or 369×800 capture fills to within a pixel.
// Usage (from the repo root):
//   npx playwright@1.56.0 install chromium   # first time only
//   node scripts/frame-screen.js screen.png [more.png …]   # writes assets/img/<name>.webp
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const FRAME = 'assets/img/phone-frame.webp';
(async () => {
  const uri = (f) => 'data:image/' + (f.endsWith('.png') ? 'png' : 'webp') + ';base64,' + fs.readFileSync(f).toString('base64');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const f of process.argv.slice(2)) {
    const url = await page.evaluate(async ({ frame, screen }) => {
      const load = (s) => { const i = new Image(); i.src = s; return i.decode().then(() => i); };
      const [fr, sc] = await Promise.all([load(frame), load(screen)]);
      const W = fr.naturalWidth, H = fr.naturalHeight, X = 24, Y = 24, SW = W - 48, SH = H - 48;
      const c = document.createElement('canvas'); c.width = W; c.height = H;
      const x = c.getContext('2d'); x.imageSmoothingQuality = 'high';
      x.save(); x.beginPath(); x.roundRect(X, Y, SW, SH, 62); x.clip();
      x.fillStyle = '#fff'; x.fillRect(X, Y, SW, SH);
      const T = 4, iw = sc.naturalWidth - T * 2, ih = sc.naturalHeight - T * 2;
      const k = Math.max(SW / iw, SH / ih), w = iw * k, h = ih * k;
      x.drawImage(sc, T, T, iw, ih, X + (SW - w) / 2, Y + (SH - h) / 2, w, h);
      x.restore();
      x.drawImage(fr, 0, 0);
      return c.toDataURL('image/webp', 0.9);
    }, { frame: uri(FRAME), screen: uri(f) });
    const dest = path.join('assets/img', path.basename(f).replace(/\.(png|webp)$/, '') + '.webp');
    fs.writeFileSync(dest, Buffer.from(url.split(',')[1], 'base64'));
    console.log('wrote', dest);
  }
  await browser.close();
})();
