/* Design system page (design-system/index.html).
   Theme and language toggles, the table of contents, and the live specimens.
   Every value shown is read from main.css at runtime, so the page can't drift
   from the site. Works on its own: app.js isn't loaded on this page. */
(function () {
  'use strict';
  var root = document.documentElement;
  var C = window.CONTENT || { ui: { en: {}, pt: {} }, achievements: [] };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var lang = (root.getAttribute('lang') || 'en').indexOf('pt') === 0 ? 'pt' : 'en';
  function t(key) { var ui = C.ui || {}, v = (ui[lang] || {})[key]; return v === undefined ? ((ui.en || {})[key] || key) : v; }

  /* ---------- tokens: names, groups and usage notes (values are read from the CSS) ---------- */
  var TOKENS = [
    ['surfaces', 'paper', 'Page background, under the dot grid. Also the browser theme colour.'],
    ['surfaces', 'paper-2', 'Secondary ground: small badges on cards, quiet wells.'],
    ['surfaces', 'surface', 'Cards, hero tabs, tool buttons, ghost button hover.'],
    ['surfaces', 'surface-2', 'Chip fill and image wells behind case-card media.'],
    ['surfaces', 'line', 'Default 1px borders on cards, tools, chips.'],
    ['surfaces', 'line-2', 'Stronger borders: ghost buttons, hovered cards, the dashed underline track.'],
    ['surfaces', 'dot', 'The 24px dot grid painted on the page background.'],
    ['surfaces', 'frost', 'Header glass background.'],
    ['surfaces', 'frost-strong', 'Mobile menu background (stronger glass).'],
    ['text', 'ink', 'Primary text and the logo name.'],
    ['text', 'ink-2', 'Secondary text: ledes, card taglines, chip text.'],
    ['text', 'muted', 'Labels, eyebrows, nav links, captions.'],
    ['accent', 'accent', 'Action and selection: primary buttons, links, the focus ring, the logo frame.'],
    ['accent', 'accent-ink', 'Text and icons on accent.'],
    ['accent', 'accent-soft', 'Metric chip fill; soft accent wells.'],
    ['accent', 'card-hi', 'Designer card highlight (replaces gold inside the card); primary buttons in the contact band.'],
    ['accent', 'card-hi-ink', 'Text on card-hi.'],
    ['gold', 'gold', 'Reward and progress only: XP bar, eyebrow diamond, underline fill.'],
    ['gold', 'gold-ink', 'Gold-family text on paper: level number, the Read case link.'],
    ['gold', 'gold-soft', 'Soft gold wells.'],
    ['gold', 'on-gold', 'Text on gold fills (level badge).'],
    ['gold', 'note', 'Text selection background and sticky notes.'],
    ['gold', 'note-edge', 'Edge of sticky notes.'],
    ['gold', 'note-ink', 'Text on note.'],
    ['gold', 'good-dot', 'Available status dot. A state colour: keep it small.'],
    ['deep', 'blue-deep', 'Deep bands: designer card, contact section, next-case band.'],
    ['deep', 'blue-deep-2', 'Highlight side of deep-blue gradients.'],
    ['deep', 'on-blue', 'Text on blue-deep.'],
    ['deep', 'on-blue-2', 'Secondary text and labels on blue-deep.'],
    ['deep', 'on-blue-line', 'Dashed dividers inside the designer card.'],
    ['tones', 'tone-night', 'Case-card cover tone: night.'],
    ['tones', 'tone-deep', 'Case-card cover tone: deep.'],
    ['tones', 'tone-deep-2', 'Case-card cover tone: deep, lit side.'],
    ['tones', 'tone-blue', 'Case-card cover tone: blue.'],
    ['tones', 'tone-pale', 'Case-card cover tone: pale.'],
    ['bands', 'band-1', 'Section band 1 (blue).'],
    ['bands', 'band-2', 'Section band 2 (warm).'],
    ['bands', 'band-3', 'Section band 3 (neutral).'],
    ['bands', 'band-4', 'Section band 4 (sky).'],
    ['effects', 'glow', 'Pointer glow on hovered case cards.'],
    ['effects', 'scrim', 'Overlay behind sheets and the lightbox.'],
    ['effects', 'toast-bg', 'Toast background (XP and achievement toasts).'],
    ['effects', 'toast-fg', 'Toast text.'],
    ['effects', 'logo-bg', 'Background behind employer logos in the career path and timeline.']
  ];
  var NAMES = TOKENS.map(function (x) { return x[1]; });
  // text pairs whose contrast is shown on the swatch of the foreground colour and in the Accessibility table
  var PAIRS = [['ink', 'paper'], ['ink-2', 'paper'], ['muted', 'paper'], ['muted', 'surface'], ['accent', 'paper'], ['accent-ink', 'accent'],
    ['gold-ink', 'paper'], ['on-gold', 'gold'], ['on-blue', 'blue-deep'], ['on-blue-2', 'blue-deep'], ['card-hi-ink', 'card-hi'], ['toast-fg', 'toast-bg'], ['note-ink', 'note']];

  // read every token in one theme by switching the root for a moment (no paint happens in between)
  function readTheme(theme, names) {
    var prev = root.getAttribute('data-theme');
    root.setAttribute('data-theme', theme);
    var cs = getComputedStyle(root), o = {};
    names.forEach(function (n) { o[n] = cs.getPropertyValue('--' + n).trim(); });
    if (prev === null) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', prev);
    return o;
  }
  var VALUES = { light: readTheme('light', NAMES), dark: readTheme('dark', NAMES) };

  // a theme scope: an element that renders as one theme, whatever the page's theme is
  function scope(el, theme, names) {
    (names || NAMES).forEach(function (n) { el.style.setProperty('--' + n, VALUES[theme][n]); });
  }
  $$('.ds-scope[data-theme]').forEach(function (el) { scope(el, el.getAttribute('data-theme')); });

  /* ---------- colour maths for contrast ---------- */
  function rgb(v) {
    v = String(v).trim();
    var m = /^#([0-9a-f]{3,8})$/i.exec(v);
    if (m) { var h = m[1]; if (h.length <= 4) h = h.split('').map(function (c) { return c + c; }).join(''); return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); }); }
    m = /rgba?\(([^)]+)\)/i.exec(v);
    return m ? m[1].split(',').slice(0, 3).map(function (x) { return parseFloat(x); }) : null;
  }
  function lum(c) { var a = c.map(function (x) { x /= 255; return x <= .03928 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4); }); return .2126 * a[0] + .7152 * a[1] + .0722 * a[2]; }
  function ratio(fg, bg) { var a = rgb(fg), b = rgb(bg); if (!a || !b) return null; var l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05); }
  function fmtRatio(r) { return r == null ? '–' : (Math.round(r * 10) / 10).toFixed(1) + ':1'; }

  /* ---------- copy + announce ---------- */
  var status = $('#dsStatus'), toasts = $('#toasts');
  function announce(msg) {
    if (status) { status.textContent = ''; setTimeout(function () { status.textContent = msg; }, 30); }
    if (!toasts) return;
    var el = document.createElement('div'); el.className = 'toast toast-plain'; el.textContent = msg;
    toasts.appendChild(el); if (toasts.children.length > 2) toasts.children[0].remove();
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 400); }, 2200);
  }
  function copy(text, label) {
    var done = function () { announce(t('ds.copied') + ': ' + (label || text)); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} ta.remove(); done();
    }
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (b) { copy(b.getAttribute('data-copy'), b.getAttribute('data-copy-label')); return; }
    b = e.target.closest('[data-copy-svg]');
    if (b) { var svg = $('svg', b.closest('.ds-icon')); copy(cleanSvg(svg), b.getAttribute('data-copy-svg')); return; }
    b = e.target.closest('[data-copy-code]');
    if (b) { var pre = $('code', b.closest('.ds-code-body')); copy(pre.textContent, b.getAttribute('data-copy-code')); }
  });
  function cleanSvg(svg) { var c = svg.cloneNode(true); c.removeAttribute('class'); c.setAttribute('aria-hidden', 'true'); return c.outerHTML; }

  /* ---------- colour section ---------- */
  var swatches = $('#dsSwatches');
  if (swatches) {
    var groups = {}, order = [];
    TOKENS.forEach(function (x) { if (!groups[x[0]]) { groups[x[0]] = []; order.push(x[0]); } groups[x[0]].push(x); });
    swatches.innerHTML = order.map(function (g) {
      return '<div class="ds-swatch-group"><h3 class="ds-h3" data-i18n="ds.color.' + g + '">' + t('ds.color.' + g) + '</h3><div class="ds-swatches">' +
        groups[g].map(function (x) {
          var n = x[1], L = VALUES.light[n], D = VALUES.dark[n];
          var pairs = PAIRS.filter(function (p) { return p[0] === n; }).map(function (p) {
            var rl = ratio(L, VALUES.light[p[1]]), rd = ratio(D, VALUES.dark[p[1]]);
            return '<span class="ds-ratio' + (Math.min(rl || 0, rd || 0) < 4.5 ? ' is-low' : '') + '" title="--' + n + ' on --' + p[1] + ' (light · dark)">on --' + p[1] + ' ' + fmtRatio(rl) + ' · ' + fmtRatio(rd) + '</span>';
          }).join('');
          return '<article class="ds-swatch">' +
            '<div class="ds-chips" aria-hidden="true"><span class="ds-chip" data-theme="light" data-token="' + n + '"><span class="ds-chip-tag">L</span></span><span class="ds-chip" data-theme="dark" data-token="' + n + '"><span class="ds-chip-tag">D</span></span></div>' +
            '<div class="ds-swatch-body"><h4 class="ds-token">--' + n + '</h4>' +
            '<p class="ds-values"><span><span data-i18n="ds.light">' + t('ds.light') + '</span> <b>' + L + '</b></span><span><span data-i18n="ds.dark">' + t('ds.dark') + '</span> <b>' + D + '</b></span></p>' +
            '<p class="ds-usage">' + x[2] + '</p>' + (pairs ? '<p class="ds-contrast">' + pairs + '</p>' : '') +
            '<button class="btn btn-ghost btn-small" type="button" data-copy="var(--' + n + ')"><span data-i18n="ds.copy">' + t('ds.copy') + '</span><span class="sr-only"> var(--' + n + ')</span></button></div></article>';
        }).join('') + '</div></div>';
    }).join('');
    // each chip is its own theme scope: it carries that theme's value of the token, and its paper behind it
    $$('.ds-chip', swatches).forEach(function (c) {
      var n = c.getAttribute('data-token'), th = c.getAttribute('data-theme');
      scope(c, th, [n, 'paper', 'ink']); c.style.setProperty('--ds-c', 'var(--' + n + ')');
      $('.ds-chip-tag', c).style.cssText = '';
    });
  }

  /* ---------- contrast table (Accessibility) ---------- */
  var ct = $('#dsContrast');
  if (ct) {
    ct.innerHTML = PAIRS.map(function (p) {
      var rl = ratio(VALUES.light[p[0]], VALUES.light[p[1]]), rd = ratio(VALUES.dark[p[0]], VALUES.dark[p[1]]);
      var pass = function (r) { return r == null ? '–' : r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA large' : 'Fail'; };
      return '<tr><td><code>--' + p[0] + '</code> on <code>--' + p[1] + '</code></td><td>' + fmtRatio(rl) + ' <span class="ds-note">' + pass(rl) + '</span></td><td>' + fmtRatio(rd) + ' <span class="ds-note">' + pass(rd) + '</span></td></tr>';
    }).join('');
  }

  /* ---------- live token values (type, space, radius, shadow, motion) ---------- */
  function fillValues() {
    var cs = getComputedStyle(root);
    $$('[data-var]').forEach(function (el) { el.textContent = cs.getPropertyValue('--' + el.getAttribute('data-var')).trim(); });
    $$('[data-px]').forEach(function (el) {
      var probe = $(el.getAttribute('data-px')); if (probe) el.textContent = Math.round(parseFloat(getComputedStyle(probe).fontSize) * 10) / 10 + 'px';
    });
    $$('[data-size]').forEach(function (el) {
      var probe = document.createElement('div'); probe.style.cssText = 'position:absolute;visibility:hidden;width:var(--' + el.getAttribute('data-size') + ')';
      document.body.appendChild(probe); el.textContent = Math.round(probe.getBoundingClientRect().width) + 'px'; probe.remove();
    });
  }
  // a stage or table that scrolls sideways can be reached and scrolled with the keyboard
  function scrollables() {
    $$('.ds-stage, .ds-table-wrap').forEach(function (el) {
      if (el.scrollWidth > el.clientWidth + 1) el.setAttribute('tabindex', '0'); else el.removeAttribute('tabindex');
    });
  }
  fillValues(); scrollables();
  var rz; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { fillValues(); scrollables(); }, 150); });

  // easing curves drawn from the cubic-bezier() values in main.css
  $$('.ds-curve[data-ease]').forEach(function (fig) {
    var v = getComputedStyle(root).getPropertyValue('--' + fig.getAttribute('data-ease')).trim(), m = /cubic-bezier\(([^)]+)\)/.exec(v);
    if (!m) return;
    var p = m[1].split(',').map(parseFloat), W = 200, H = 140, pad = 20, X = function (x) { return pad + x * (W - 2 * pad); }, Y = function (y) { return H - pad - y * (H - 2 * pad - 20); };
    $('svg', fig).innerHTML = '<path class="ds-axis" d="M' + X(0) + ' ' + Y(0) + 'H' + X(1) + 'M' + X(0) + ' ' + Y(0) + 'V' + (pad - 10) + '" fill="none" stroke-width="1"/>' +
      '<path d="M' + X(0) + ' ' + Y(0) + 'C' + X(p[0]) + ' ' + Y(p[1]) + ' ' + X(p[2]) + ' ' + Y(p[3]) + ' ' + X(1) + ' ' + Y(1) + '" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>';
  });

  /* ---------- motion demos ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-replay]'); if (!b) return;
    var what = b.getAttribute('data-replay'), stage = b.closest('.ds-card');
    if (what === 'lift') {
      var tab = $('.hero-tab', stage); tab.classList.remove('is-lifted'); void tab.offsetWidth; tab.classList.add('is-lifted');
      setTimeout(function () { tab.classList.remove('is-lifted'); }, 1400);
    } else if (what === 'underline') {
      var u = $('.xp-underline', stage); u.style.animation = 'none'; void u.offsetWidth; u.style.animation = 'xpfill 1.2s .1s var(--ease-out) forwards';
    } else if (what === 'toast') {
      var box = $('.toasts', stage); box.innerHTML = '';
      var el = document.createElement('div'); el.className = 'toast toast-plain'; el.textContent = t('ds.motion.toastText'); box.appendChild(el);
    }
  });

  /* ---------- component code: generated from the live preview, so the two never differ ---------- */
  var INLINE = /^(a|abbr|b|br|button|circle|code|defs|em|g|i|img|input|kbd|label|line|mark|path|polygon|polyline|rect|s|small|span|strong|sub|sup|svg|time|u|use|ellipse|clippath|lineargradient|stop)$/i;
  function leaf(el) { return el.tagName.toLowerCase() === 'svg' || $$('*', el).every(function (d) { return INLINE.test(d.tagName); }) && INLINE.test(el.tagName); }
  function pretty(node, depth) {
    var pad = new Array(depth + 1).join('  '), out = '';
    Array.prototype.forEach.call(node.childNodes, function (n) {
      if (n.nodeType === 3) { var tx = n.nodeValue.replace(/\s+/g, ' ').trim(); if (tx) out += pad + tx + '\n'; return; }
      if (n.nodeType !== 1) return;
      if (leaf(n)) { out += pad + n.outerHTML.replace(/\s+/g, ' ').replace(/> </g, '><') + '\n'; return; }
      var shell = n.cloneNode(false).outerHTML, close = '</' + n.tagName.toLowerCase() + '>';
      out += pad + shell.slice(0, shell.length - close.length) + '\n' + pretty(n, depth + 1) + pad + close + '\n';
    });
    return out;
  }
  function stripDs(el) {
    $$('[data-ds-level]', el).forEach(function (h) { h.removeAttribute('aria-level'); h.removeAttribute('data-ds-level'); });
    // a previewed h1 is shown as a div so the page keeps one h1; the code gets the real tag back
    $$('[data-ds-tag]', el).forEach(function (d) {
      var real = document.createElement(d.getAttribute('data-ds-tag'));
      Array.prototype.forEach.call(d.attributes, function (a) { if (!/^(role|data-ds-tag)$/.test(a.name)) real.setAttribute(a.name, a.value); });
      while (d.firstChild) real.appendChild(d.firstChild);
      d.parentNode.replaceChild(real, d);
    });
    $$('[data-ds-rm]', el).forEach(function (n) { n.getAttribute('data-ds-rm').split(' ').forEach(function (a) { n.removeAttribute(a); }); n.removeAttribute('data-ds-rm'); });
    // the stage's own layout wrappers aren't part of the component
    $$('[data-ds-unwrap]', el).forEach(function (w) { while (w.firstChild) w.parentNode.insertBefore(w.firstChild, w); w.remove(); });
    $$('[data-ds-label]', el).forEach(function (n) { n.setAttribute('aria-label', n.getAttribute('data-ds-label')); n.removeAttribute('data-ds-label'); });
    $$('[loading]', el).forEach(function (i) { i.removeAttribute('loading'); });
    return el;
  }
  $$('.ds-code').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open || d.getAttribute('data-filled')) return;
      var stage = $('.ds-stage', d.closest('.ds-comp')), clone = stripDs(stage.cloneNode(true));
      $('code', d).textContent = pretty(clone, 0).replace(/\n$/, '');
      d.setAttribute('data-filled', '1');
    });
  });

  /* ---------- table of contents: scrollspy ---------- */
  var tocLinks = $$('.ds-toc a'), byId = {};
  tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  function setCurrent(id) {
    tocLinks.forEach(function (a) { if (a === byId[id]) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    var a = byId[id], ol = a && a.parentNode.parentNode;
    if (ol && ol.scrollWidth > ol.clientWidth) ol.scrollTo({ left: a.offsetLeft - ol.clientWidth / 2 + a.offsetWidth / 2, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setCurrent(en.target.id); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    $$('.ds-section[id]').forEach(function (s) { io.observe(s); });
  }
  if (tocLinks[0]) setCurrent(tocLinks[0].getAttribute('href').slice(1));

  /* ---------- header: theme, language, menu, scrolled state ---------- */
  function currentTheme() { var a = root.getAttribute('data-theme'); return a || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
  function updateThemeLabel() { var b = $('#themeBtn'); if (b) b.setAttribute('aria-label', currentTheme() === 'dark' ? t('hud.themeLight') : t('hud.themeDark')); }
  var themeBtn = $('#themeBtn');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    var apply = function () { root.setAttribute('data-theme', next); store.set('vm-theme', next); updateThemeLabel(); };
    var r = this.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    if (document.startViewTransition && !reduceMotion.matches) {
      var vt = document.startViewTransition(apply), rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      vt.ready.then(function () {
        root.animate({ clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + rad + 'px at ' + x + 'px ' + y + 'px)'] },
          { duration: 700, easing: 'cubic-bezier(.16, 1, .3, 1)', pseudoElement: '::view-transition-new(root)' });
      }).catch(function () {});
    } else apply();
  });
  function applyI18n() {
    root.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
    $$('[data-i18n]').forEach(function (el) { var v = t(el.getAttribute('data-i18n')); if (typeof v === 'string') el.textContent = v; });
    document.title = t('ds.meta.title');
    var code = $('#langCode'); if (code) code.textContent = t('hud.langShort');
    var lb = $('#langBtn'); if (lb) lb.setAttribute('aria-label', t('hud.lang'));
    var mb = $('#menuBtn'); if (mb) mb.setAttribute('aria-label', t('nav.menu'));
    var br = $('#hud .brand'); if (br) br.setAttribute('aria-label', t('ds.brandHome'));
    var toc = $('.ds-toc'); if (toc) toc.setAttribute('aria-label', t('ds.toc'));
    if (toasts) toasts.setAttribute('aria-label', t('ds.notifications'));
    updateThemeLabel();
  }
  var langBtn = $('#langBtn');
  if (langBtn) langBtn.addEventListener('click', function () {
    lang = lang === 'en' ? 'pt' : 'en'; store.set('vm-lang', lang); applyI18n();
    if (!reduceMotion.matches) { this.classList.remove('is-flipping'); void this.offsetWidth; this.classList.add('is-flipping'); }
  });
  var menuBtn = $('#menuBtn'), mobileNav = $('#mobileNav');
  function setMenu(open) { if (!menuBtn || !mobileNav) return; mobileNav.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); }
  if (menuBtn) menuBtn.addEventListener('click', function () { setMenu(mobileNav.hidden); });
  if (mobileNav) mobileNav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mobileNav && !mobileNav.hidden) { setMenu(false); menuBtn.focus(); } });
  var hud = $('#hud');
  var onScroll = function () { if (hud) hud.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  applyI18n();

  /* ---------- the "Blueprint" mission: visiting this page completes it ---------- */
  (function () {
    var a = (C.achievements || []).filter(function (x) { return x.id === 'blueprint'; })[0]; if (!a) return;
    var done = {}; try { done = JSON.parse(store.get('vm-ach', '{}')) || {}; } catch (e) {}
    if (done.blueprint) return;
    done.blueprint = Date.now(); store.set('vm-ach', JSON.stringify(done));
    if (store.get('vm-game', 'on') === 'off' || !toasts) return;
    var el = document.createElement('div'); el.className = 'toast';
    el.innerHTML = '<span class="medal" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg></span>' +
      '<span><span class="toast-k"></span><span class="toast-t"></span></span>';
    $('.toast-k', el).textContent = t('quest.unlocked');
    $('.toast-t', el).textContent = (a.t[lang] || a.t.en) + '  +' + a.xp + ' XP';
    setTimeout(function () { toasts.appendChild(el); setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 400); }, 3400); }, 900);
  })();
})();
