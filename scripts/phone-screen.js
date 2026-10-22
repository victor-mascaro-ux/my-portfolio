// Cuts a phone screenshot from the Knomee prototype down to its screen: no frame, just the screen with a
// phone's rounded corners, edge to edge (like a borderless display). That is how every phone picture here
// shows a phone.
// Input: the prototype's iPhone element at deviceScaleFactor 2, captured whole (560×1154; a 1280×663 window
// fits it): the screen sits 25px in on every side with ~68px corners. The cut drops the screen's
// anti-aliased outer pixel and rounds a hair more (70px), so no bezel shows in the corners.
// Output: 510×1104 WebP with transparent corners, in assets/img.
// Usage (from the repo root):
//   npx playwright@1.56.0 install chromium   # first time only
//   node scripts/phone-screen.js shot.png [more.png …]   # writes assets/img/<name>.webp
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const uri = (f) => 'data:image/' + (f.endsWith('.png') ? 'png' : 'webp') + ';base64,' + fs.readFileSync(f).toString('base64');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const f of process.argv.slice(2)) {
    const r = await page.evaluate(async (src) => {
      const i = new Image(); i.src = src; await i.decode();
      if (i.naturalWidth !== 560 || i.naturalHeight !== 1154) return { skip: i.naturalWidth + 'x' + i.naturalHeight };
      const W = 510, H = 1104;
      const c = document.createElement('canvas'); c.width = W; c.height = H;
      const x = c.getContext('2d'); x.imageSmoothingQuality = 'high';
      x.beginPath(); x.roundRect(0, 0, W, H, 70); x.clip();
      x.drawImage(i, 26, 26, 508, 1102, 0, 0, W, H);
      return { url: c.toDataURL('image/webp', 0.9) };
    }, uri(f));
    if (r.skip) { console.log('skipped', f + ':', r.skip, 'is not a 560×1154 capture'); continue; }
    const dest = path.join('assets/img', path.basename(f).replace(/\.(png|webp)$/, '') + '.webp');
    fs.writeFileSync(dest, Buffer.from(r.url.split(',')[1], 'base64'));
    console.log('wrote', dest);
  }
  await browser.close();
})();
