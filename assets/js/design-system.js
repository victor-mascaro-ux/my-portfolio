/* Design system tab (#system in index.html).
   The live specimens: swatches, contrast, type scale, spacing, easing curves, demos, icon and
   component code. Every value shown is read from main.css at runtime, so the tab can't drift
   from the site. app.js runs the tabs, theme, language and toasts; this file only adds the
   tab's own behaviour and defines no globals. */
(function () {
  'use strict';
  var tab = document.getElementById('system');
  if (!tab) return;
  var root = document.documentElement;
  var C = window.CONTENT || { ui: { en: {}, pt: {} } };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function lang() { return (root.getAttribute('lang') || 'en').indexOf('pt') === 0 ? 'pt' : 'en'; }
  function t(key) { var ui = C.ui || {}, v = (ui[lang()] || {})[key]; return v === undefined ? ((ui.en || {})[key] || key) : v; }

  /* ---------- tokens by group (values are read from the CSS; each one's usage note is ds.tok.<name> in content.js) ---------- */
  var TOKENS = [
    ['surfaces', ['paper', 'paper-2', 'surface', 'surface-2', 'line', 'line-2', 'dot', 'frost', 'frost-strong']],
    ['text', ['ink', 'ink-2', 'muted']],
    ['accent', ['accent', 'accent-ink', 'accent-soft', 'card-hi', 'card-hi-ink']],
    ['gold', ['gold', 'gold-ink', 'gold-soft', 'on-gold', 'note', 'note-edge', 'note-ink', 'good-dot']],
    ['deep', ['blue-deep', 'blue-deep-2', 'on-blue', 'on-blue-2', 'on-blue-line']],
    ['contact', ['contact-bg', 'contact-bg-2', 'contact-ink', 'contact-ink-2', 'contact-line', 'contact-cta', 'contact-cta-ink', 'contact-focus', 'contact-screen']],
    ['tones', ['tone-night', 'tone-deep', 'tone-deep-2', 'tone-blue', 'tone-pale']],
    ['bands', ['band-1', 'band-2', 'band-3', 'band-4']],
    ['effects', ['glow', 'scrim', 'toast-bg', 'toast-fg', 'logo-bg']]
  ];
  var NAMES = [].concat.apply([], TOKENS.map(function (g) { return g[1]; }));
  // text pairs whose contrast is shown on the foreground's swatch and in the Accessibility table
  var PAIRS = [['ink', 'paper'], ['ink-2', 'paper'], ['muted', 'paper'], ['muted', 'surface'], ['accent', 'paper'], ['accent-ink', 'accent'],
    ['gold-ink', 'paper'], ['on-gold', 'gold'], ['on-blue', 'blue-deep'], ['on-blue-2', 'blue-deep'], ['card-hi-ink', 'card-hi'], ['toast-fg', 'toast-bg'], ['note-ink', 'note'],
    ['contact-ink', 'contact-bg'], ['contact-ink-2', 'contact-bg'], ['contact-cta-ink', 'contact-cta']];

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
  function scope(el, theme, names) { (names || NAMES).forEach(function (n) { el.style.setProperty('--' + n, VALUES[theme][n]); }); }
  $$('.ds-scope[data-theme]', tab).forEach(function (el) { scope(el, el.getAttribute('data-theme')); });

  /* ---------- color maths for contrast ---------- */
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

  /* ---------- copy: the button says "Copied" for a moment, a toast shows it, the status region says it ---------- */
  var status = $('#dsStatus'), toasts = $('#toasts');
  function announce(msg) {
    if (status) { status.textContent = ''; setTimeout(function () { status.textContent = msg; }, 30); }
    if (!toasts) return;
    var el = document.createElement('div'); el.className = 'toast toast-plain'; el.setAttribute('aria-hidden', 'true'); el.textContent = msg;
    toasts.appendChild(el); if (toasts.children.length > 2) toasts.children[0].remove();
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 400); }, 2200);
  }
  function confirmButton(btn) {
    var label = $('span', btn); if (!label) return;
    var key = label.getAttribute('data-i18n') || btn._dsKey;
    btn._dsKey = key;
    btn.classList.remove('is-copied'); void btn.offsetWidth; btn.classList.add('is-copied');
    label.removeAttribute('data-i18n'); label.textContent = t('ds.copied');
    clearTimeout(btn._dsT);
    btn._dsT = setTimeout(function () { btn.classList.remove('is-copied'); if (key) { label.setAttribute('data-i18n', key); label.textContent = t(key); } }, 1600);
  }
  function copy(text, label, btn) {
    var done = function () { announce(t('ds.copied') + ': ' + (label || text)); if (btn) confirmButton(btn); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} ta.remove(); done();
    }
  }
  tab.addEventListener('click', function (e) {
    // previews are live for hover, focus and their own controls, but their links stay on this tab
    var a = e.target.closest('a[href]');
    if (a && a.closest('.ds-stage, .ds-demo-stage, .ds-focus-demo')) { e.preventDefault(); e.stopPropagation(); return; }
    var b = e.target.closest('[data-copy]');
    if (b) { copy(b.getAttribute('data-copy'), b.getAttribute('data-copy-label'), b); return; }
    b = e.target.closest('[data-copy-svg]');
    if (b) { var c = $('svg', b.closest('.ds-icon')).cloneNode(true); c.removeAttribute('class'); c.setAttribute('aria-hidden', 'true'); copy(c.outerHTML, b.getAttribute('data-copy-svg'), b); return; }
    b = e.target.closest('[data-copy-code]');
    if (b) copy($('code', b.closest('.ds-code-body')).textContent, b.getAttribute('data-copy-code'), b);
  });

  /* ---------- color section ---------- */
  var swatches = $('#dsSwatches');
  var ON = function () { return '<span data-i18n="ds.on">' + t('ds.on') + '</span>'; };
  if (swatches) {
    swatches.innerHTML = TOKENS.map(function (grp) {
      var g = grp[0];
      return '<div class="ds-swatch-group"><h4 class="ds-h3" data-i18n="ds.color.' + g + '">' + t('ds.color.' + g) + '</h4><div class="ds-swatches">' +
        grp[1].map(function (n) {
          var L = VALUES.light[n], D = VALUES.dark[n];
          var pairs = PAIRS.filter(function (p) { return p[0] === n; }).map(function (p) {
            var rl = ratio(L, VALUES.light[p[1]]), rd = ratio(D, VALUES.dark[p[1]]);
            return '<span class="ds-ratio' + (Math.min(rl || 0, rd || 0) < 4.5 ? ' is-low' : '') + '" title="--' + n + ' / --' + p[1] + ' (L · D)">' + ON() + ' --' + p[1] + ' ' + fmtRatio(rl) + ' · ' + fmtRatio(rd) + '</span>';
          }).join('');
          return '<article class="ds-swatch">' +
            '<div class="ds-chips" aria-hidden="true"><span class="ds-chip" data-theme="light" data-token="' + n + '"><span class="ds-chip-tag">L</span></span><span class="ds-chip" data-theme="dark" data-token="' + n + '"><span class="ds-chip-tag">D</span></span></div>' +
            '<div class="ds-swatch-body"><h5 class="ds-token">--' + n + '</h5>' +
            '<p class="ds-values"><span><span data-i18n="ds.light">' + t('ds.light') + '</span> <b>' + L + '</b></span><span><span data-i18n="ds.dark">' + t('ds.dark') + '</span> <b>' + D + '</b></span></p>' +
            '<p class="ds-usage" data-i18n="ds.tok.' + n + '">' + t('ds.tok.' + n) + '</p>' + (pairs ? '<p class="ds-contrast">' + pairs + '</p>' : '') +
            '<button class="btn btn-ghost btn-small" type="button" data-copy="var(--' + n + ')"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"/></svg><span data-i18n="ds.copy">' + t('ds.copy') + '</span><span class="sr-only"> var(--' + n + ')</span></button></div></article>';
        }).join('') + '</div></div>';
    }).join('');
    // each chip is its own theme scope: that theme's value of the token, with that theme's paper behind it
    $$('.ds-chip', swatches).forEach(function (c) {
      var n = c.getAttribute('data-token'); scope(c, c.getAttribute('data-theme'), [n, 'paper', 'ink']); c.style.setProperty('--ds-c', 'var(--' + n + ')');
    });
  }

  /* ---------- contrast table (Accessibility) ---------- */
  var ct = $('#dsContrast');
  if (ct) {
    ct.innerHTML = PAIRS.map(function (p) {
      var rl = ratio(VALUES.light[p[0]], VALUES.light[p[1]]), rd = ratio(VALUES.dark[p[0]], VALUES.dark[p[1]]);
      var word = function (k) { return '<span data-i18n="' + k + '">' + t(k) + '</span>'; };
      var pass = function (r) { return r == null ? '–' : r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? word('ds.aaLarge') : word('ds.fail'); };
      return '<tr><td><code>--' + p[0] + '</code> ' + ON() + ' <code>--' + p[1] + '</code></td><td>' + fmtRatio(rl) + ' <span class="ds-note">' + pass(rl) + '</span></td><td>' + fmtRatio(rd) + ' <span class="ds-note">' + pass(rd) + '</span></td></tr>';
    }).join('');
  }

  /* ---------- live values (type, space, radius, motion) and keyboard-reachable scroll areas ---------- */
  function fillValues() {
    var cs = getComputedStyle(root);
    $$('[data-var]', tab).forEach(function (el) { el.textContent = cs.getPropertyValue('--' + el.getAttribute('data-var')).trim(); });
    $$('[data-px]', tab).forEach(function (el) { var probe = $(el.getAttribute('data-px')); if (probe) el.textContent = Math.round(parseFloat(getComputedStyle(probe).fontSize) * 10) / 10 + 'px'; });
    $$('[data-size]', tab).forEach(function (el) {
      var probe = document.createElement('div'); probe.style.cssText = 'position:absolute;visibility:hidden;width:var(--' + el.getAttribute('data-size') + ')';
      document.body.appendChild(probe); el.textContent = Math.round(probe.getBoundingClientRect().width) + 'px'; probe.remove();
    });
  }
  // a stage or table that scrolls sideways can be reached and scrolled with the keyboard
  function scrollables() {
    $$('.ds-stage, .ds-table-wrap', tab).forEach(function (el) { if (el.scrollWidth > el.clientWidth + 1) el.setAttribute('tabindex', '0'); else el.removeAttribute('tabindex'); });
  }
  function refresh() { fillValues(); if (!tab.hidden) { scrollables(); moveMarker(); } }
  var rz; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(refresh, 150); });
  // the tab is hidden until it's opened, so measure again each time it's shown; a preview video stops when it's left
  new MutationObserver(function () {
    if (!tab.hidden) { refresh(); return; }
    $$('.film-video', tab).forEach(function (f) { try { f.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*'); } catch (e) {} });
  }).observe(tab, { attributes: true, attributeFilter: ['hidden'] });

  // easing curves drawn from the cubic-bezier() values in main.css; the ball under each one runs on that curve
  $$('.ds-curve[data-ease]', tab).forEach(function (fig) {
    var name = fig.getAttribute('data-ease'), v = getComputedStyle(root).getPropertyValue('--' + name).trim(), m = /cubic-bezier\(([^)]+)\)/.exec(v);
    fig.style.setProperty('--ds-ease', 'var(--' + name + ')');
    if (!m) return;
    var p = m[1].split(',').map(parseFloat), W = 200, H = 140, pad = 20, X = function (x) { return pad + x * (W - 2 * pad); }, Y = function (y) { return H - pad - y * (H - 2 * pad - 20); };
    $('svg', fig).innerHTML = '<path class="ds-axis" d="M' + X(0) + ' ' + Y(0) + 'H' + X(1) + 'M' + X(0) + ' ' + Y(0) + 'V' + (pad - 10) + '" fill="none" stroke-width="1"/>' +
      '<path class="ds-line" pathLength="1" d="M' + X(0) + ' ' + Y(0) + 'C' + X(p[0]) + ' ' + Y(p[1]) + ' ' + X(p[2]) + ' ' + Y(p[3]) + ' ' + X(1) + ' ' + Y(1) + '" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>';
  });
  // each curve draws itself, and the spacing bars grow, the first time they come into view
  var drawn = $$('.ds-curve, .ds-space', tab);
  if ('IntersectionObserver' in window) {
    var drawIO = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('is-drawn'); drawIO.unobserve(x.target); } }); }, { threshold: .3 });
    drawn.forEach(function (f) { drawIO.observe(f); });
  } else drawn.forEach(function (f) { f.classList.add('is-drawn'); });

  /* ---------- motion demos ---------- */
  tab.addEventListener('click', function (e) {
    var b = e.target.closest('[data-replay]'); if (!b) return;
    var what = b.getAttribute('data-replay'), card = b.closest('.ds-card');
    if (what === 'lift') {
      var ht = $('.hero-tab', card); ht.classList.remove('is-lifted'); void ht.offsetWidth; ht.classList.add('is-lifted');
      setTimeout(function () { ht.classList.remove('is-lifted'); }, 1400);
    } else if (what === 'underline') {
      var u = $('.xp-underline', card); u.style.animation = 'none'; void u.offsetWidth; u.style.animation = 'xpfill 1.2s .1s var(--ease-out) forwards';
    } else if (what === 'toast') {
      var box = $('.toasts', card); box.innerHTML = '';
      var el = document.createElement('div'); el.className = 'toast toast-plain'; el.textContent = t('ds.motion.toastText'); box.appendChild(el);
    }
  });

  /* ---------- component code: generated from the live preview, so the two never differ ---------- */
  var INLINE = /^(a|abbr|b|br|button|circle|code|defs|em|g|i|img|input|kbd|label|line|mark|path|polygon|polyline|rect|s|small|span|strong|sub|sup|svg|time|u|use|ellipse|clippath|lineargradient|stop)$/i;
  function leaf(el) { return el.tagName.toLowerCase() === 'svg' || ($$('*', el).every(function (d) { return INLINE.test(d.tagName); }) && INLINE.test(el.tagName)); }
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
    $$('[data-ds-label]', el).forEach(function (n) { n.setAttribute('aria-label', n.getAttribute('data-ds-label')); n.removeAttribute('data-ds-label'); });
    $$('[data-ds-rm]', el).forEach(function (n) { n.getAttribute('data-ds-rm').split(' ').forEach(function (a) { n.removeAttribute(a); }); n.removeAttribute('data-ds-rm'); });
    // the stage's own layout wrappers aren't part of the component
    $$('[data-ds-unwrap]', el).forEach(function (w) { while (w.firstChild) w.parentNode.insertBefore(w.firstChild, w); w.remove(); });
    // nor is the state the page adds while you watch: entrances, word splits, pointer effects, count-ups, a playing video
    $$('span.w', el).forEach(function (w) { w.replaceWith(document.createTextNode(w.textContent)); });
    $$('.film-video', el).forEach(function (f) { f.remove(); });
    $$('[class], [style]', el).forEach(function (n) {
      n.classList.remove('rv', 'in', 'enter', 'is-tilting', 'is-gliding', 'is-playing', 'swap');
      ['--rd', '--ed', '--wi', '--sx', '--sy', '--mx', '--my', '--rx', '--ry', '--hx', '--hy'].forEach(function (p) { n.style.removeProperty(p); });
      if (n.hasAttribute('class') && !n.getAttribute('class')) n.removeAttribute('class');
      if (n.hasAttribute('style') && !n.getAttribute('style')) n.removeAttribute('style');
    });
    $$('[data-count]', el).forEach(function (n) { n.removeAttribute('data-count'); });
    $$('[data-ds-live]', el).forEach(function (n) { n.removeAttribute('data-ds-live'); });
    $$('[loading]', el).forEach(function (i) { i.removeAttribute('loading'); });
    return el;
  }
  function fillCode(d) {
    var stage = $('.ds-stage', d.closest('.ds-comp')), clone = stripDs(stage.cloneNode(true));
    $('code', d).textContent = pretty(clone, 0).replace(/\n$/, '');
    d.setAttribute('data-filled', '1');
  }
  $$('.ds-code', tab).forEach(function (d) {
    d.addEventListener('toggle', function () { if (d.open && !d.getAttribute('data-filled')) fillCode(d); });
  });

  /* ---------- table of contents: scrollspy, with a marker that slides to the current section ---------- */
  var toc = $('.ds-toc', tab), tocList = $('.ds-toc ol', tab), tocLinks = $$('.ds-toc a', tab), byId = {}, current = null;
  tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  var marker = document.createElement('li'); marker.className = 'ds-toc-marker'; marker.setAttribute('aria-hidden', 'true');
  if (tocList) tocList.appendChild(marker);
  function moveMarker() {
    var a = byId[current]; if (!a || !tocList) return;
    var li = a.parentNode;
    marker.style.setProperty('--mt', li.offsetTop + 'px'); marker.style.setProperty('--mh', li.offsetHeight + 'px');
    marker.style.setProperty('--ml', li.offsetLeft + 'px'); marker.style.setProperty('--mw', li.offsetWidth + 'px');
    marker.classList.add('is-on');
  }
  function setCurrent(id) {
    current = id;
    tocLinks.forEach(function (a) { if (a === byId[id]) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    moveMarker();
    var a = byId[id];
    if (a && tocList.scrollWidth > tocList.clientWidth) tocList.scrollTo({ left: a.offsetLeft - tocList.clientWidth / 2 + a.offsetWidth / 2, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) { entries.forEach(function (en) { if (en.isIntersecting) setCurrent(en.target.id); }); }, { rootMargin: '-35% 0px -60% 0px' });
    $$('.ds-section[id]', tab).forEach(function (s) { spy.observe(s); });
  }
  if (tocLinks[0]) setCurrent(tocLinks[0].getAttribute('href').slice(1));
  refresh();

  // on a language switch app.js redraws the previews; the rail's label and any open code follow
  function relabel() { if (toc) toc.setAttribute('aria-label', t('ds.toc')); }
  relabel();
  new MutationObserver(function () {
    relabel();
    $$('.ds-code[data-filled]', tab).forEach(function (d) { if (d.open) fillCode(d); else d.removeAttribute('data-filled'); });
    refresh();
  }).observe(root, { attributes: true, attributeFilter: ['lang'] });
})();
