# CLAUDE.md — working on this portfolio

This repo is Victor Mascaro's portfolio, served as a static site on GitHub Pages
at https://victor-mascaro-ux.github.io/my-portfolio/.
Craft details matter as much as content.

## Rules

- **Never include customer PII.** No real client or prospect names, emails,
  photos, financial details, or customer/partner logos in text or screenshots.
  Knomee screenshots may show only the demo personas and the "Acme" white-label.
- **No frameworks, no build step.** Plain HTML, CSS and vanilla JS. Pages serves
  the repo root as-is.
- **Both languages, always.** Every string lives in `assets/js/content.js` with
  `en` and `pt` (Brazilian Portuguese). Never add copy only in one language.
  Portuguese runs ~20% longer; check layouts in both.
- **Palette “Viktory Night”, 60 · 30 · 10.** Ice / navy neutrals (60), neon blue (30: actions, the player card, card art, the contact band), trophy gold (10: progress and highlights). No other hues except tiny semantic dots.
- **Motion on every tab.** The hero entrance is the big moment. Every other tab gets a short staggered entrance each time it opens (`enterTab` in app.js), content below the fold rises in on scroll, and the Process line, Education rings and career path draw again. Everything else responds to input. Scroll reveals move content, never hide it.
- **Both themes, always.** Colors are tokens at the top of `assets/css/main.css`:
  light values on `:root`, dark values repeated in the
  `prefers-color-scheme: dark` block and the `[data-theme="dark"]` block. Never
  use a literal color in a component rule.
- **Nothing is gated by the game layer.** XP and achievements are decoration;
  content and contact stay one click away. The game layer can be switched off.
- **Respect reduced motion.** New animations need a `prefers-reduced-motion` path.
- **Plain writing.** First person, specific, no slogans or "lessons". Never add a number that can't be backed up.
- **Metrics need context.** Each number states what it measured and whether it
  was measured, projected or estimated (`kind` in content.js).

## Structure

- `content.js` → all words and data (cases, experience, skills, achievements).
- `app.js` → renderers + behaviour. Sections are labelled in comments.
- `main.css` → tokens, then components top to bottom in page order.
- Case studies open in a sheet (`#case-<id>` deep links).
- The **Design system** tab (`#system` in `index.html`, between Skills and Contact; parts link as `#ds-color`, `#ds-c-button`…) documents the design language. Token values, contrast and the type scale are read from `main.css` at runtime; the component previews are static copies of the live markup (ids stripped, email as a placeholder), so refresh a preview by hand when its component changes. Its own styles and script are `design-system.css` and `design-system.js`; app.js runs the tab itself and wires the previews of the compare slider, the film and the designer card tilt. Links inside a preview don't navigate. Opening the tab completes the Blueprint quest.
- `assets/brand/` holds the logo kit (see its README); the header shows the app icon, the designer card the primary logo.

## Checks before committing

1. Serve locally: `python3 -m http.server 8000`.
2. Desktop 1440px and phone 390px, light and dark, EN and PT.
3. Open each case study; Esc and the browser Back button both close it.
4. No horizontal scroll at 390px; no console errors.
5. Images: WebP, ≤1600px wide, `alt` text in both languages where possible.
6. If CV content changed, rebuild the PDFs (`scripts/build-cv.js`) and bump `cvVersion` in content.js (and the `?v=` on the CV links in index.html), so browsers fetch the new file instead of a saved copy.
