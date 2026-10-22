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
- **Palette “Viktory Night”, 60 · 30 · 10.** Ice / navy neutrals (60), neon blue (30: actions, the player card, card art, the Lab offer, and the contact band in the dark theme; Contact uses the page colours in the light theme via the `--contact-*` tokens), trophy gold (10: progress and highlights). No other hues except tiny semantic dots.
- **Motion on every tab.** The hero entrance is the big moment. Every other tab gets a short staggered entrance each time it opens (`enterTab` in app.js), content below the fold rises in on scroll, and the Process line, Education rings and career path draw again. Everything else responds to input. Scroll reveals move content, never hide it.
- **Both themes, always.** Colors are tokens at the top of `assets/css/main.css`:
  light values on `:root`, dark values repeated in the
  `prefers-color-scheme: dark` block and the `[data-theme="dark"]` block. Never
  use a literal color in a component rule.
- **Nothing is gated by the game layer.** XP and achievements are decoration;
  content and contact stay one click away. The game layer can be switched off.
- **Every change updates the Design system tab too** (`#system`): token notes, component summaries, previews and prose, in EN and PT, in the same commit. Its words are `ds.*` keys in `content.js` (between the "Design system tab's words" markers); live previews are the `SPECIMEN` builders in `app.js`; static previews are in `index.html`; the swatch list is in `design-system.js`.
- **Yellow is for highlights only** (XP, the underline, badges, the Next tile's outline, a highlighted number): never a band, background or large fill. New colours must come from the existing tokens.
- **One focus per block.** Text sits on the page, divided by space; only a block's main point gets a card. To stress words in a sentence, color them (`.hl` accent, `.hl-gold` for a number), one highlight per block, never underlined. A prototype's problem leads with its number, gold and two lines tall beside its sentence.
- **Every button has an icon**, before its label (copy, download, contact, play, reset, power…). Take it from the icon set; a new icon also goes into the Design system's icon gallery and its count. Put the label in a `<span>` so code that changes the text keeps the icon.
- **Respect reduced motion.** New animations need a `prefers-reduced-motion` path.
- **Plain writing.** First person, specific, no slogans or "lessons". Never add a number that can't be backed up.
- **Metrics need context.** Each number states what it measured and whether it
  was measured, projected or estimated (`kind` in content.js).

## Structure

- `content.js` → all words and data (cases, experience, skills, achievements).
- `app.js` → renderers + behaviour. Sections are labelled in comments.
- `main.css` → tokens, then components top to bottom in page order.
- Case studies open in a sheet (`#case-<id>` deep links).
- The **Lab** tab (`#lab`, right after Projects) lists my own prototypes from `CONTENT.lab` in `content.js`. Each card is the Projects card (`labCardHTML` in app.js), but it opens the prototype itself in a new tab instead of a sheet. Covers are compositions of real screens on a transparent background, so the card's tone shows through in both themes. Opening a prototype from a Lab card completes the Field test mission. The tab ends with the Lab offer (`.lab-offer`), a deep-blue invite to ask for a custom solution; its blueprint phone builds itself when it scrolls into view (`buildLabOffer` in app.js adds `is-ready`, then `is-building`). Every Lab card follows one template: the tagline states the problem with its number and source year, then what the prototype does about it; the chip gives the time to try it and how it runs (“About 3 min · guided”). On the prototype page itself, the problem leads with its number and the solution opens with “How might we…” (PT “Como poderíamos…”). The time is an estimate until a real run is timed, so it starts with “About”.
- The **Design system** tab (`#system` in `index.html`, between Skills and Contact; parts link as `#ds-color`, `#ds-c-button`…) documents the design language. Token values, contrast and the type scale are read from `main.css` at runtime; the component previews are static copies of the live markup (ids stripped, email as a placeholder), so refresh a preview by hand when its component changes. Its own styles and script are `design-system.css` and `design-system.js`; app.js runs the tab itself and wires the previews of the compare slider, the film and the designer card tilt. Links inside a preview don't navigate. Opening the tab completes the Blueprint quest.
- The CSS and JS links in `index.html` carry `?v=`; bump it whenever those files change, or a cached copy can pair a new page with old words (keys like `ds.ov.intro` on screen).
- The designer card appears twice: on Home (`#playerCard`, the one to edit) and in Contact (`#contactCard`), which `renderContactCard()` in app.js fills with a copy on every render.
- `assets/img/tools.svg` is a sprite of one-colour tool logos for Experience, one per brand (sources listed at its top: Simple Icons, CC0, plus a few marks from the brands' own sites). `toolLogos` in `content.js` maps each tool name to a symbol, or to `{ mono }` initials as a stopgap; a new tool needs an entry and its symbol in the sprite.
- `assets/brand/` holds the logo kit (see its README); the header shows the app icon, the designer card the primary logo.

## Checks before committing

1. Serve locally: `python3 -m http.server 8000`.
2. Desktop 1440px and phone 390px, light and dark, EN and PT.
3. Open each case study; Esc and the browser Back button both close it.
4. No horizontal scroll at 390px; no console errors.
5. Images: WebP, ≤1600px wide, `alt` text in both languages where possible.
6. If CV content changed, rebuild the PDFs (`scripts/build-cv.js`) and bump `cvVersion` in content.js (and the `?v=` on the CV links in index.html), so browsers fetch the new file instead of a saved copy.
