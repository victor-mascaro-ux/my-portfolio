// Regenerates assets/cv/Victor-Mascaro-CV-EN.pdf and -PT.pdf from cv.html.
// Usage (from the repo root):
//   python3 -m http.server 8000 &      # serve the site locally
//   npx playwright@1.56.0 install chromium   # first time only
//   node scripts/build-cv.js
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const lang of ['en', 'pt']) {
    await page.goto(`http://localhost:8000/cv.html?lang=${lang}`);
    await page.evaluate(() => document.fonts.ready);
    const out = `assets/cv/Victor-Mascaro-CV-${lang.toUpperCase()}.pdf`;
    await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log('wrote', out);
  }
  await browser.close();
})();
