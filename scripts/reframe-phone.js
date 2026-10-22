// Gives a phone screenshot from the Knomee prototype the portfolio's frame: its screen, under the one shared
// phone frame (assets/img/phone-frame.webp: a plain grey rim with the screen cut out). Every phone picture
// wears that same frame, so none can come out with a black ring, a dark edge or squared corners.
// Input: the prototype's iPhone element at deviceScaleFactor 2, captured whole (560×1154): the screen sits
// 25px in on every side with 61px corners.
// Usage (from the repo root):
//   npx playwright@1.56.0 install chromium   # first time only
//   node scripts/reframe-phone.js shot.png [more.png …]   # writes assets/img/<name>.webp
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const FRAME = 'assets/img/phone-frame.webp';
(async () => {
  const uri = (f) => 'data:image/' + (f.endsWith('.png') ? 'png' : 'webp') + ';base64,' + fs.readFileSync(f).toString('base64');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const f of process.argv.slice(2)) {
    const r = await page.evaluate(async ({ frame, src }) => {
      const load = (s) => { const i = new Image(); i.src = s; return i.decode().then(() => i); };
      const [fr, ph] = await Promise.all([load(frame), load(src)]);
      if (ph.naturalWidth !== fr.naturalWidth || ph.naturalHeight !== fr.naturalHeight) return { skip: ph.naturalWidth + 'x' + ph.naturalHeight };
      const c = document.createElement('canvas'); c.width = fr.naturalWidth; c.height = fr.naturalHeight;
      const x = c.getContext('2d');
      // the screen, a hair larger than the opening, so the frame's edge lies over it with nothing between
      x.save(); x.beginPath(); x.roundRect(24, 24, c.width - 48, c.height - 48, 62); x.clip(); x.drawImage(ph, 0, 0); x.restore();
      x.drawImage(fr, 0, 0);
      return { url: c.toDataURL('image/webp', 0.9) };
    }, { frame: uri(FRAME), src: uri(f) });
    if (r.skip) { console.log('skipped', f + ':', r.skip, 'is not a 560×1154 capture'); continue; }
    const dest = path.join('assets/img', path.basename(f).replace(/\.(png|webp)$/, '') + '.webp');
    fs.writeFileSync(dest, Buffer.from(r.url.split(',')[1], 'base64'));
    console.log('wrote', dest);
  }
  await browser.close();
})();
