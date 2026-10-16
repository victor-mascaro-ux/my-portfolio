# Victor Mascaro · Portfolio

A bilingual (EN / PT-BR) portfolio for a UX/UI designer with a background in game design.
Exploring the page fills an XP bar and unlocks a few achievements in the quest log.

Static HTML, CSS and JavaScript. No framework, no build step, no trackers.

## Publish on GitHub Pages

The site lives in the repository `victor-mascaro-ux/my-portfolio` and is served at
**https://victor-mascaro-ux.github.io/my-portfolio/**.

1. Push this folder to the `main` branch (the repo root must contain `index.html`).
2. In the repo: **Settings → Pages → Build and deployment → Deploy from a branch →
   `main` / `/ (root)`**.
3. Wait a minute or two, then open the URL above.

The share image (`og:image`, `og:url` in `index.html`), the `site` variable in
`cv.html` and the absolute paths in `404.html` all point at `/my-portfolio/`. If the
repository is renamed, update those and rebuild the CV PDFs.

## Where things live

| Path | What it is |
| --- | --- |
| `index.html` | Page structure. English text is the default; `data-i18n` keys swap it. |
| `assets/js/content.js` | **All the words**, in English and Portuguese: case studies, experience, skills, achievements. Edit here. |
| `assets/js/app.js` | Behaviour: language, theme, case-study sheet, XP / quest log, animations. |
| `assets/css/main.css` | Design tokens (top of file) and all styles. Both themes are defined as tokens. |
| `assets/img/` | Screenshots and art (WebP). |
| `assets/cv/` | CV PDFs, generated from `cv.html`. |
| `cv.html` | Printable one-page CV (`cv.html?lang=pt` for Portuguese). |
| `scripts/build-cv.js` | Regenerates the CV PDFs with Playwright. |
| `404.html` | “Quest not found” page. |

## Editing content

* **Text:** change it in `content.js`, in both `en` and `pt`.
* **A new case study:** add an object to `CONTENT.cases` (copy an existing one).
  `group` places it (`knomee`, `games`, `earlier`), `layout` sizes the card
  (`lg`, `md`, `lg-wide`, `sm`). Each `move` can show `img` (with `kind`:
  `phones`, `wide`, `pair`, `game`, `square`), a `compare` before/after pair, or
  a `film` strip.
* **CV:** edit `content.js` (experience, skills) or `cv.html` (summary, results),
  then run `scripts/build-cv.js`.

## Before you share it

* There are no percentages on the site. Every number is something countable
  (screens, pull requests, games). Keep it that way unless a number is measured.
* Knomee screenshots show demo personas and the white-label “Acme” brand only.
  No real client data, customer names or partner logos are included. Keep it
  that way when adding screenshots.
* The case studies link to the live Knomee prototypes on GitHub Pages. Review
  those prototypes for real data before sharing the portfolio widely.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
