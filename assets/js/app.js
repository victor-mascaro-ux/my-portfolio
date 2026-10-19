/* ==========================================================================
   Victor Mascaro — portfolio behaviour
   Sections: helpers · i18n · renderers · theme · HUD · player card ·
   case sheet · game layer (XP) · contact · motion · boot
   No dependencies. Content comes from content.js (window.CONTENT).
   ========================================================================== */
(function () {
  'use strict';
  var C = window.CONTENT;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ---------- storage (always optional) ---------- */
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    getJSON: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    setJSON: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  /* ---------- i18n ---------- */
  var lang = (root.getAttribute('lang') || 'en').indexOf('pt') === 0 ? 'pt' : 'en';
  function t(key) { var v = C.ui[lang][key]; return v === undefined ? (C.ui.en[key] || key) : v; }
  function L(v) { if (v == null) return ''; if (typeof v === 'string') return v; return v[lang] != null ? v[lang] : v.en; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  function applyI18n() {
    root.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
    $$('[data-i18n]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n'));
      if (typeof v === 'string') el.textContent = v;
    });
    document.title = t('meta.title');
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', t('meta.desc'));
    $('#langCode').textContent = t('hud.langShort');
    $('#langBtn').setAttribute('aria-label', t('hud.lang'));
    $('#menuBtn').setAttribute('aria-label', t('nav.menu'));
    $('#lbClose').setAttribute('aria-label', t('lightbox.close'));
    $('.hero-tabs').setAttribute('aria-label', t('hero.tabs'));
    markTabNext();
    var cv = C.person.cv[lang];
    ['#cardCv', '#expCv', '#contactCv'].forEach(function (s) { var a = $(s); if (a) a.setAttribute('href', cv); });
    $('#sheetPrev').setAttribute('aria-label', t('case.prev'));
    $('#sheetNext').setAttribute('aria-label', t('case.next'));
    $('#questClose').setAttribute('aria-label', t('quest.close'));
    $('#playerCard').setAttribute('aria-label', C.person.name + ', ' + t('card.class'));
    $('.pc-level').setAttribute('title', t('card.levelHint'));
    updateThemeLabel();
    splitHeroWords();
  }

  /* Wrap each hero word in a span so the entrance can stagger them. */
  function splitHeroWords() {
    var i = 0;
    $$('.hero-title [data-i18n]').forEach(function (span) {
      var parts = span.textContent.split(/(\s+)/);
      span.textContent = '';
      parts.forEach(function (w) {
        if (!w) return;
        if (/^\s+$/.test(w)) { span.appendChild(document.createTextNode(w)); return; }
        var el = document.createElement('span'); el.className = 'w'; el.style.setProperty('--wi', i++); el.textContent = w; span.appendChild(el);
      });
    });
  }

  /* ---------- icons ---------- */
  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>',
    ext: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/></svg>',
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>',
    mask: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6c3 1.5 13 1.5 16 0 0 7-3 12-8 12S4 13 4 6z"/><path d="M8.5 11h2M13.5 11h2"/></svg>'
  };
  var EMBLEM = {
    eye: '<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M60 14 108 100H12Z" fill="none" style="stroke:var(--note)" stroke-width="4" stroke-linejoin="round"/><path d="M34 72c14-16 38-16 52 0-14 16-38 16-52 0Z" style="fill:var(--note)"/><circle cx="60" cy="72" r="8" style="fill:var(--tone-night)"/><path d="M60 30v10M44 40l4 7M76 40l-4 7" style="stroke:var(--note)" stroke-width="3" stroke-linecap="round"/></svg>',
    plane: '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="44" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2" stroke-dasharray="4 7"/><path d="M58 22c4 0 6 5 6 10v18l30 16v8l-30-8v16l9 7v6l-15-4-15 4v-6l9-7V66l-30 8v-8l30-16V32c0-5 2-10 6-10Z" fill="#FFFFFF"/></svg>',
    dice: '<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="22" y="30" width="50" height="50" rx="10" transform="rotate(-12 47 55)" fill="#FFFFFF"/><g style="fill:var(--tone-deep)"><circle cx="36" cy="44" r="5"/><circle cx="50" cy="56" r="5"/><circle cx="62" cy="68" r="5"/></g><rect x="56" y="46" width="44" height="44" rx="9" transform="rotate(14 78 68)" style="fill:var(--note)"/><g style="fill:var(--note-ink)"><circle cx="70" cy="60" r="4.5"/><circle cx="86" cy="76" r="4.5"/></g></svg>'
  };

  /* ---------- renderers ---------- */
  function renderLoadout() {
    $('#loadout').innerHTML = C.loadout[lang].map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
  }

  function cardHTML(c, i) {
    var media = '';
    if (c.art === 'fan') {
      media = '<div class="cc-media"><img src="' + c.cover + '" alt="' + esc(L(c.coverAlt)) + '" loading="lazy" width="1100" height="1027"></div>';
    } else if (c.group === 'knomee' && c.cover) {
      media = '<div class="cc-media"><div class="shot"><img src="' + c.cover + '" alt="' + esc(L(c.coverAlt)) + '" loading="lazy" width="1600" height="1000"></div></div>';
    } else if (c.cover) {
      media = '<div class="cc-media cover"><img src="' + c.cover + '" alt="' + esc(L(c.coverAlt)) + '" loading="lazy"></div>';
    } else if (c.emblem) {
      media = '<div class="cc-media"><div class="emblem">' + EMBLEM[c.emblem] + '</div></div>';
    }
    return '<a class="case-card tone-' + c.tone + (c.art ? ' art-' + c.art : '') + '" href="#case-' + c.id + '" data-case="' + c.id + '" data-layout="' + c.layout + '">' +
      media +
      '<div class="cc-body">' +
        '<p class="cc-kicker label">' + esc(L(c.kicker)) + '</p>' +
        '<h4 class="cc-title">' + esc(L(c.title)) + '</h4>' +
        '<p class="cc-tagline">' + esc(L(c.tagline)) + '</p>' +
        '<div class="cc-foot">' +
          (c.chip ? '<span class="chip-metric">' + esc(L(c.chip)) + '</span>' : '') +
          '<span class="cc-read">' + esc(c.group === 'knomee' ? t('work.read') : t('work.open')) + ' · ' + c.minutes + ' ' + esc(t('work.min')) + ICON.arrow + '</span>' +
        '</div>' +
      '</div></a>';
  }

  function renderWork() {
    var g = { knomee: [], gamification: [], games: [] };
    C.cases.forEach(function (c, i) { g[c.group].push(cardHTML(c, i)); });
    $('#gridKnomee').innerHTML = g.knomee.join('');
    $('#gridGamification').innerHTML = g.gamification.join('');
    $('#gridGames').innerHTML = g.games.join('');
    $('#sideList').innerHTML = C.side.map(function (s) {
      var tag = s.url ? 'a href="' + esc(s.url) + '" target="_blank" rel="noopener"' : 'div';
      return '<li><' + tag + ' class="side-card">' +
        (s.img ? '<span class="side-media' + (s.fit === 'contain' ? ' is-contain' : '') + '"><img src="' + s.img + '" alt="" loading="lazy"></span>' : '') +
        '<span class="side-text"><strong>' + esc(s.t) + (s.url ? ICON.ext : '') + '</strong><span>' + esc(L(s.d)) + '</span></span>' +
        '</' + (s.url ? 'a' : 'div') + '></li>';
    }).join('');
  }

  function renderProcess() {
    $('#processList').innerHTML = C.process.map(function (p, i) {
      return '<li><span class="step-node" aria-hidden="true">0' + (i + 1) + '</span>' +
        '<h3 class="step-title">' + esc(L(p.title)) + '</h3>' +
        '<p class="step-body">' + esc(L(p.body)) + '</p>' +
        '<p class="step-proof"><b>' + esc(t('process.example')) + '</b>' + esc(L(p.proof)) + '</p></li>';
    }).join('');
  }

  function renderTimeline() {
    $('#timeline').innerHTML = C.experience.map(function (x) {
      return '<li><span class="tl-when">' + esc(L(x.when)) + '</span>' +
        '<div><h3 class="tl-org">' + esc(x.org) + '</h3><p class="tl-role">' + esc(L(x.role)) + '</p><p class="tl-where">' + esc(L(x.where)) + '</p></div>' +
        '<ul class="tl-points">' + x.points[lang].map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></li>';
    }).join('');
  }

  var selectedSkill = 'gamedesign';
  var inspectedSkills = {};
  function renderTree() {
    var branches = ['foundation', 'behavior', 'strategy'];
    var html = '<span class="tree-root" aria-hidden="true">' + ICON.spark.replace('<svg', '<svg width="14" height="14" style="fill:none;stroke:currentColor;stroke-width:2"') + ' Start · 2015</span>';
    branches.forEach(function (b) {
      html += '<div class="branch" role="group" aria-label="' + esc(L(C.branches[b])) + '"><p class="branch-label label">' + esc(L(C.branches[b])) + '</p>';
      C.skills.filter(function (s) { return s.branch === b; }).forEach(function (s) {
        var icon = s.branch === 'foundation' ? ICON.star : s.branch === 'behavior' ? ICON.mask : ICON.book;
        if (s.id === 'theatre') icon = ICON.mask;
        if (s.id === 'gamification') icon = ICON.spark;
        html += '<button type="button" class="node' + (s.status === 'progress' ? ' is-progress' : '') + '" data-skill="' + s.id + '" aria-pressed="' + (s.id === selectedSkill) + '">' +
          '<span class="node-ring" aria-hidden="true">' + icon + '</span>' +
          '<span><span class="node-name">' + esc(L(s.name)) + '</span><span class="node-kind">' + esc(typeof s.when === 'string' ? s.when : L(s.when)) + ' · ' + esc(s.status === 'done' ? t('skills.done') : t('skills.progress')) + '</span></span></button>';
      });
      html += '</div>';
    });
    $('#tree').innerHTML = html;
    renderSkillDetail();
    $('#courseList').innerHTML = C.courses.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('');
  }
  function renderSkillDetail() {
    var s = C.skills.filter(function (x) { return x.id === selectedSkill; })[0];
    if (!s) { $('#treeDetail').innerHTML = '<p>' + esc(t('skills.select')) + '</p>'; return; }
    var when = typeof s.when === 'string' ? s.when : L(s.when);
    var grade = s.grade ? (typeof s.grade === 'string' ? s.grade : L(s.grade)) : null;
    $('#treeDetail').innerHTML =
      '<span class="td-status' + (s.status === 'progress' ? ' is-progress' : '') + '">' + esc(s.status === 'done' ? t('skills.done') : t('skills.progress')) + '</span>' +
      '<h3 class="td-name">' + esc(L(s.name)) + '</h3>' +
      '<p class="td-kind">' + esc(L(s.kind)) + '</p>' +
      '<p class="td-meta"><span><b>' + esc(when) + '</b></span>' + (grade ? '<span>' + esc(t('skills.grade')) + ' <b>' + esc(grade) + '</b></span>' : '') + '</p>' +
      '<div class="td-block"><p class="label">' + esc(t('skills.core')) + '</p><ul class="chips">' + s.core[lang].map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' +
      (s.extra ? '<p class="td-extra">' + esc(s.extra[lang].join(' · ')) + '</p>' : '');
  }

  function renderPatch() {
    $('#patchList').innerHTML = t('footer.patch.items').map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
  }

  function renderAll() {
    renderLoadout(); renderWork(); renderProcess(); renderTimeline(); renderTree(); renderPatch(); renderQuestLog(); updateXPHud(false);
  }

  /* ---------- theme ---------- */
  function currentTheme() {
    var a = root.getAttribute('data-theme');
    if (a) return a;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function updateThemeLabel() {
    $('#themeBtn').setAttribute('aria-label', currentTheme() === 'dark' ? t('hud.themeLight') : t('hud.themeDark'));
  }
  $('#themeBtn').addEventListener('click', function (e) {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    var apply = function () { root.setAttribute('data-theme', next); store.set('vm-theme', next); updateThemeLabel(); };
    var r = this.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    if (document.startViewTransition && !reduceMotion.matches) {
      var vt = document.startViewTransition(apply);
      var rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      vt.ready.then(function () {
        root.animate({ clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + rad + 'px at ' + x + 'px ' + y + 'px)'] },
          { duration: 700, easing: 'cubic-bezier(.16, 1, .3, 1)', pseudoElement: '::view-transition-new(root)' });
      }).catch(function () {});
    } else apply();
    unlock('daynight');
  });

  /* ---------- language ---------- */
  $('#langBtn').addEventListener('click', function () {
    lang = lang === 'en' ? 'pt' : 'en';
    store.set('vm-lang', lang);
    var swap = function () { applyI18n(); renderAll(); afterRender(); };
    if (document.startViewTransition && !reduceMotion.matches) {
      root.classList.add('vt-fade');
      var vt = document.startViewTransition(swap);
      vt.finished.then(function () { root.classList.remove('vt-fade'); }, function () { root.classList.remove('vt-fade'); });
    } else swap();
    if (sheet.current) renderSheet(sheet.current);
    toast(t('toast.lang'));
    unlock('polyglot');
  });

  /* ---------- HUD: scrolled state, tabs, mobile menu ---------- */
  var hud = $('#hud');
  var heroEl = $('.hero');
  function onScrollHud() {
    hud.classList.toggle('is-scrolled', window.scrollY > 8);
    if (window.scrollY > heroEl.offsetHeight * 0.6) unlock('scout');
  }
  window.addEventListener('scroll', onScrollHud, { passive: true });
  /* One section at a time. Home is the hero and In short; each other section is a
     tab with its own hash (#work, #process…), so links, Back and reloads land on it.
     A case study (#case-<id>) opens over the Work tab. */
  var TABS = ['work', 'process', 'experience', 'skills', 'contact'];
  var currentTab = null;
  /* every tab ends with the hero's tiles; the next tab is the highlighted one */
  var tabNext = $('#tabNext');
  $('.hero-tabs', tabNext).innerHTML = $('.hero-tabs').innerHTML;
  function tabFromHash(h) {
    var id = (h || '').replace(/^#/, '');
    if (/^case-/.test(id)) return 'work';
    return TABS.indexOf(id) >= 0 ? id : 'home';
  }
  function showTab(id, opts) {
    opts = opts || {};
    var changed = id !== currentTab;
    currentTab = id;
    $$('[data-tab]').forEach(function (p) { p.hidden = p.getAttribute('data-tab') !== id; });
    markTabNext();
    $$('.hud-nav a, .mobile-nav a').forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + id ? 'page' : 'false'); });
    moveNavInd();
    if (changed && !opts.keepScroll) window.scrollTo(0, 0);
  }
  /* the end-of-tab tiles say which one is next and which page you're on, in words:
     a filled tile would read as the current page */
  function markTabNext() {
    if (!currentTab) return;
    var id = currentTab, next = TABS[(TABS.indexOf(id) + 1) % TABS.length];
    tabNext.hidden = id === 'home';
    $$('.hero-tab', tabNext).forEach(function (a) {
      var tab = a.getAttribute('href').slice(1);
      a.classList.remove('is-primary');
      a.classList.toggle('is-next', tab === next);
      if (tab === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      if (tab === next) a.setAttribute('data-badge', t('tabs.next'));
      else if (tab === id) a.setAttribute('data-badge', t('tabs.here'));
      else a.removeAttribute('data-badge');
    });
  }
  function goToTab(id) {
    if (id !== currentTab) hist('pushState', { tab: id }, tabUrl(id));
    else window.scrollTo(0, 0);
    showTab(id);
  }
  function tabUrl(id) { return location.pathname + location.search + (id === 'home' ? '' : '#' + id); }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || a.hasAttribute('data-case') || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    var href = a.getAttribute('href');
    if (href !== '#top' && TABS.indexOf(href.slice(1)) < 0) return;
    e.preventDefault();
    goToTab(href === '#top' ? 'home' : href.slice(1));
  });
  /* sliding nav indicator */
  var navEl = $('.hud-nav'), navInd = document.createElement('span');
  navInd.className = 'nav-ind'; navInd.setAttribute('aria-hidden', 'true'); navEl.appendChild(navInd);
  function moveNavInd(target) {
    var a = target || $('.hud-nav a[aria-current="page"]');
    if (!a) { navInd.style.setProperty('--no', 0); return; }
    navInd.style.setProperty('--nx', (a.offsetLeft + 12) + 'px');
    navInd.style.setProperty('--nw', (a.offsetWidth - 24) + 'px');
    navInd.style.setProperty('--no', 1);
  }
  $$('.hud-nav a').forEach(function (a) {
    a.addEventListener('mouseenter', function () { moveNavInd(a); });
    a.addEventListener('focus', function () { moveNavInd(a); });
  });
  navEl.addEventListener('mouseleave', function () { moveNavInd(); });
  var menuBtn = $('#menuBtn'), mobileNav = $('#mobileNav');
  function setMenu(open) {
    mobileNav.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? t('nav.close') : t('nav.menu'));
  }
  menuBtn.addEventListener('click', function () { setMenu(mobileNav.hidden); });
  $$('a', mobileNav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  /* ---------- player card tilt + holo ---------- */
  var card = $('#playerCard');
  if (card) {
    card.addEventListener('pointermove', function (e) {
      if (!finePointer.matches || reduceMotion.matches) return;
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.classList.add('is-tilting');
      card.style.setProperty('--ry', ((x - 0.5) * 14).toFixed(2) + 'deg');
      card.style.setProperty('--rx', ((0.5 - y) * 10).toFixed(2) + 'deg');
      card.style.setProperty('--hx', (x * 100).toFixed(1) + '%');
      card.style.setProperty('--hy', (y * 100).toFixed(1) + '%');
    });
    card.addEventListener('pointerleave', function () {
      card.classList.remove('is-tilting');
      ['--rx', '--ry'].forEach(function (p) { card.style.setProperty(p, '0deg'); });
      card.style.setProperty('--hx', '50%'); card.style.setProperty('--hy', '50%');
    });
  }

  /* ---------- case sheet ---------- */
  function hist(kind, state, url) { try { history[kind](state, '', url); return true; } catch (e) { return false; } }
  var sheetEl = $('#sheet'), sheetPanel = $('#sheetPanel'), sheetBody = $('#sheetBody');
  var sheet = { current: null, pushed: false, opener: null };
  var opened = store.getJSON('vm-opened', {});

  function caseById(id) { return C.cases.filter(function (c) { return c.id === id; })[0]; }
  function caseIndex(id) { for (var i = 0; i < C.cases.length; i++) if (C.cases[i].id === id) return i; return -1; }

  function imgTag(src, alt, cls) {
    return '<img src="' + src + '" alt="' + esc(alt || '') + '" loading="lazy"' + (cls ? ' class="' + cls + '"' : '') + '>';
  }

  function compareHint() { return '<p class="compare-hint">' + esc(t('case.compare')) + '</p>'; }
  function moveMedia(m, c) {
    if (m.compare) {
      var tb = m.tags ? m.tags[0] : t('case.before'), ta = m.tags ? m.tags[1] : t('case.after');
      return '<div class="compare-wrap"><div class="compare" style="--pos:50%">' +
        imgTag(m.compare[0], tb + ': ' + L(m.title)) +
        '<div class="cmp-after">' + imgTag(m.compare[1], ta + ': ' + L(m.title)) + '</div>' +
        '<input type="range" min="0" max="100" value="50" aria-label="' + esc(t('case.compare')) + '">' +
        '<span class="cmp-line" aria-hidden="true"></span>' +
        '<button type="button" class="cmp-tag before" aria-pressed="false">' + esc(tb) + '</button><button type="button" class="cmp-tag after" aria-pressed="false">' + esc(ta) + '</button>' +
        '</div>' + (m.noHint ? '' : compareHint()) + '</div>';
    }
    if (m.film) {
      var f0 = m.film[0];
      return '<div class="film" data-film' + (m.video ? ' data-video="' + esc(m.video) + '"' : '') + '>' +
        '<div class="film-screen"><img src="' + f0.src + '" alt="' + esc(L(f0.cap)) + '" data-film-img>' +
        (m.video ? '<button type="button" class="film-play" data-film-play aria-label="' + esc(t('case.play')) + '">' + ICON.play + '</button>' : '') +
        '<p class="film-cap"><span data-film-t>' + f0.t + '</span><span data-film-cap>' + esc(L(f0.cap)) + '</span></p></div>' +
        '<div class="film-strip">' + m.film.map(function (f, i) {
          return '<button type="button" aria-pressed="' + (i === 0) + '" data-frame="' + i + '" aria-label="' + esc(t('case.frame') + ' ' + f.t + ': ' + L(f.cap)) + '">' + imgTag(f.src, '') + '</button>';
        }).join('') + '</div>' +
        '<label><span>' + esc(t('case.film')) + '</span><input type="range" min="0" max="' + (m.film.length - 1) + '" value="0" step="1" data-film-range></label>' +
        '</div>';
    }
    if (!m.img) return '';
    var alt = L(m.title);
    if (m.kind === 'phones') return '<div class="move-media phones">' + m.img.map(function (s) { return imgTag(s, alt); }).join('') + '</div>';
    return '<div class="move-media ' + (m.kind || 'wide') + '">' + m.img.map(function (s) { return '<div class="frame">' + imgTag(s, alt) + '</div>'; }).join('') + '</div>';
  }

  function renderSheet(id) {
    var c = caseById(id); if (!c) return;
    var idx = caseIndex(id);
    var next = C.cases[(idx + 1) % C.cases.length];
    var groupName = t('work.' + c.group + '.title');
    var inGroup = C.cases.filter(function (x) { return x.group === c.group; });
    $('#sheetCrumb').textContent = groupName + ' · ' + (inGroup.indexOf(c) + 1) + '/' + inGroup.length;
    var meta = c.meta, keys = ['role', 'when', 'platform', 'context'];
    var cover = '';
    if (c.art === 'fan' && c.cover) cover = '<div class="cs-cover art-fan">' + imgTag(c.cover, L(c.coverAlt)) + '</div>';
    else if (c.cover && c.group === 'knomee') cover = '<div class="cs-cover frame">' + imgTag(c.cover, L(c.coverAlt)) + '</div>';
    else if (c.cover) cover = '<div class="cs-cover frame" style="max-width:720px">' + imgTag(c.cover, L(c.coverAlt)) + '</div>';

    var html =
      '<div class="cs-head">' +
        '<p class="eyebrow">' + esc(L(c.kicker)) + '</p>' +
        '<h2 class="cs-title" id="sheetTitle">' + esc(L(c.title)) + '</h2>' +
        '<p class="cs-tagline">' + esc(L(c.tagline)) + '</p>' +
        '<dl class="cs-meta">' + keys.map(function (k) { return meta && meta[k] ? '<div><dt>' + esc(t('case.' + k)) + '</dt><dd>' + esc(L(meta[k])) + '</dd></div>' : ''; }).join('') + '</dl>' +
        '<div class="cs-actions">' +
          (c.chip ? '<span class="chip-metric">' + esc(L(c.chip)) + '</span>' : '') +
          (c.live ? '<a class="btn btn-ghost btn-small" href="' + c.live + '" target="_blank" rel="noopener">' + esc(t('case.live')) + ICON.ext + '</a>' : '') +
        '</div>' +
      '</div>' +
      cover +
      '<section class="cs-section"><h3 class="label">' + esc(t('case.problem')) + '</h3><p class="cs-problem">' + esc(L(c.problem)) + '</p></section>' +
      '<section class="cs-section"><h3 class="label">' + esc(t('case.moves')) + '</h3><div class="moves">' +
        c.moves.map(function (m) {
          return '<article class="move"><h4 class="move-title">' + esc(L(m.title)) + '</h4><p class="move-body">' + esc(L(m.body)) + '</p>' + moveMedia(m, c) + '</article>';
        }).join('') +
      '</div></section>' +
      (c.evolution ? '<section class="cs-section"><h3 class="label">' + esc(t('case.evolution')) + '</h3><div class="move"><h4 class="move-title">' + esc(L(c.evolution.title)) + '</h4><p class="move-body">' + esc(L(c.evolution.body)) + '</p>' +
        '<div class="evolution">' + c.evolution.compare.map(function (pair) { return moveMedia({ compare: pair, tags: c.evolution.tags, title: c.evolution.title, noHint: true }); }).join('') + '</div>' + compareHint() + '</div></section>' : '') +
      (c.metrics && c.metrics.length ? '<section class="cs-section"><h3 class="label">' + esc(t('case.outcome')) + '</h3><div class="metrics">' +
        c.metrics.map(function (m) {
          return '<div class="metric"><span class="metric-v">' + esc(m.v) + '</span><span class="metric-l">' + esc(L(m.l)) + '</span>' +
            (m.kind ? '<span class="metric-kind k-' + m.kind + '">' + esc(t('case.' + m.kind)) + '</span>' : '') + '</div>';
        }).join('') + '</div></section>' : '') +
      (c.learned ? '<section class="cs-section"><h3 class="label">' + esc(t('case.learned')) + '</h3><p class="learned">' + esc(L(c.learned)) + '</p></section>' : '') +
      '<div class="cs-end"><p class="label cs-end-label">' + esc(t('case.end')) + '</p>' +
        '<button type="button" class="next-case" data-goto="' + next.id + '"><span><span class="label">' + esc(t('case.next')) + '</span><strong>' + esc(L(next.title)) + '</strong></span>' + ICON.arrow + '</button>' +
      '</div>';
    sheetBody.innerHTML = html;
    wireSheet();
    $$('.metric-v', sheetBody).forEach(prepCount);
    observeCounts(sheetBody, sheetPanel);
  }

  function wireSheet() {
    $$('.compare', sheetBody).forEach(function (cmp) {
      var input = $('input', cmp), tagB = $('.cmp-tag.before', cmp), tagA = $('.cmp-tag.after', cmp);
      function set(v, glide) {
        v = Math.max(0, Math.min(100, v)); input.value = v;
        cmp.classList.toggle('is-gliding', !!glide && !reduceMotion.matches);
        cmp.style.setProperty('--pos', v + '%');
        tagB.setAttribute('aria-pressed', String(v >= 100)); tagA.setAttribute('aria-pressed', String(v <= 0));
      }
      function follow(e) { var r = cmp.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); }
      input.addEventListener('input', function () { set(+input.value); });
      // drag the divider with a mouse, a finger or a pen (vertical swipes still scroll on touch)
      cmp.addEventListener('pointerdown', function (e) {
        if (e.button > 0 || e.target.closest('.cmp-tag')) return;
        cmp.setPointerCapture(e.pointerId); follow(e);
      });
      cmp.addEventListener('pointermove', function (e) { if (cmp.hasPointerCapture(e.pointerId)) follow(e); });
      // the labels show one version whole: Before slides the divider all the way right, After all the way left
      tagB.addEventListener('click', function () { set(100, true); });
      tagA.addEventListener('click', function () { set(0, true); });
    });
    $$('[data-film]', sheetBody).forEach(function (film) {
      var c = caseById(sheet.current);
      var frames = [];
      c.moves.forEach(function (m) { if (m.film) frames = m.film; });
      var img = $('[data-film-img]', film), cap = $('[data-film-cap]', film), tt = $('[data-film-t]', film), range = $('[data-film-range]', film);
      var btns = $$('.film-strip button', film);
      function show(i) {
        var f = frames[i];
        if (!reduceMotion.matches) { img.classList.add('swap'); setTimeout(function () { img.src = f.src; img.classList.remove('swap'); }, 120); } else img.src = f.src;
        img.alt = L(f.cap); cap.textContent = L(f.cap); tt.textContent = f.t; range.value = i;
        btns.forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === i)); });
      }
      /* The real video, from YouTube's privacy-enhanced domain. It loads only when someone
         presses play or picks a frame, so nothing is fetched from YouTube before that.
         Once it is playing, picking a frame jumps the video to that moment. */
      var vid = film.getAttribute('data-video'), screen = $('.film-screen', film), player = null;
      function secs(tm) { var p = tm.split(':'); return +p[0] * 60 + +p[1]; }
      function send(func, args) { player.contentWindow.postMessage(JSON.stringify({ event: 'command', func: func, args: args || [] }), '*'); }
      function playAt(s) {
        if (!vid) return;
        if (player) { send('seekTo', [s, true]); send('playVideo'); return; }
        player = document.createElement('iframe');
        player.className = 'film-video';
        player.title = t('case.videoTitle');
        player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        player.allowFullscreen = true;
        player.src = 'https://www.youtube-nocookie.com/embed/' + vid + '?autoplay=1&rel=0&playsinline=1&enablejsapi=1&start=' + s;
        player.addEventListener('load', function () { player.contentWindow.postMessage(JSON.stringify({ event: 'listening' }), '*'); });
        screen.appendChild(player);
        film.classList.add('is-playing');
      }
      var playBtn = $('[data-film-play]', film);
      if (playBtn) playBtn.addEventListener('click', function () { playAt(0); });
      btns.forEach(function (b, i) { b.addEventListener('click', function () { show(i); playAt(secs(frames[i].t)); }); });
      range.addEventListener('input', function () { show(+range.value); });
      range.addEventListener('change', function () { if (player) playAt(secs(frames[+range.value].t)); });
    });
    $$('[data-goto]', sheetBody).forEach(function (b) {
      b.addEventListener('click', function () { openCase(b.getAttribute('data-goto'), { replace: true }); });
    });
    var end = $('.cs-end', sheetBody);
    if (end && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { unlock('reader'); io.disconnect(); }
      }, { root: sheetPanel, threshold: .4 });
      io.observe(end);
    }
  }

  function openCase(id, opts) {
    opts = opts || {};
    if (!caseById(id)) return;
    var wasOpen = !sheetEl.hidden;
    sheet.current = id;
    renderSheet(id);
    if (!wasOpen) {
      sheet.opener = document.activeElement;
      sheetEl.hidden = false;
      root.classList.add('sheet-open');
      document.body.style.overflow = 'hidden';
    }
    sheetPanel.scrollTop = 0;
    var hash = '#case-' + id;
    if (opts.fromHash) { sheet.pushed = false; }
    else if (wasOpen || opts.replace) { hist('replaceState', { caseId: id }, hash); }
    else { sheet.pushed = hist('pushState', { caseId: id }, hash); }
    setTimeout(function () { sheetPanel.focus({ preventScroll: true }); }, 30);
    var c = caseById(id);
    if (c.group === 'knomee') {
      opened[id] = 1; store.setJSON('vm-opened', opened);
      var all = C.cases.filter(function (x) { return x.group === 'knomee'; }).every(function (x) { return opened[x.id]; });
      if (all) unlock('completionist');
    }
  }

  function hideSheet() {
    if (sheetEl.hidden) return;
    sheetEl.hidden = true; sheet.current = null;
    root.classList.remove('sheet-open');
    document.body.style.overflow = '';
    if (sheet.opener && sheet.opener.focus) sheet.opener.focus({ preventScroll: true });
  }
  function closeCase() {
    if (sheetEl.hidden) return;
    if (sheet.pushed) { sheet.pushed = false; history.back(); }
    else { hist('replaceState', null, tabUrl(currentTab)); hideSheet(); }
  }
  window.addEventListener('popstate', function () {
    showTab(tabFromHash(location.hash));
    var m = location.hash.match(/^#case-([\w-]+)$/);
    if (m && caseById(m[1])) openCase(m[1], { fromHash: true });
    else hideSheet();
  });

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-case]');
    if (a && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) { e.preventDefault(); openCase(a.getAttribute('data-case')); return; }
    if (e.target.closest('[data-close]')) { closeCase(); return; }
  });
  /* ---------- picture lightbox: click a case study picture to see it large ---------- */
  var lb = $('#lightbox'), lbImg = $('#lbImg');
  function openLightbox(img) {
    lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
    lb.hidden = false;
    $('#lbClose').focus({ preventScroll: true });
  }
  function closeLightbox() {
    if (lb.hidden) return;
    lb.hidden = true; lbImg.removeAttribute('src');
    sheetPanel.focus({ preventScroll: true });
  }
  sheetBody.addEventListener('click', function (e) {
    var img = e.target.closest('.cs-cover img, .move-media img');
    if (img) openLightbox(img);
  });
  lb.addEventListener('click', closeLightbox);
  lb.addEventListener('keydown', function (e) { if (e.key === 'Tab') { e.preventDefault(); $('#lbClose').focus(); } });

  $('#sheetPrev').addEventListener('click', function () { var i = caseIndex(sheet.current); openCase(C.cases[(i - 1 + C.cases.length) % C.cases.length].id, { replace: true }); });
  $('#sheetNext').addEventListener('click', function () { var i = caseIndex(sheet.current); openCase(C.cases[(i + 1) % C.cases.length].id, { replace: true }); });
  sheetEl.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = $$('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])', sheetEl).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === sheetPanel)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- case sheet reading progress ---------- */
  var sheetProg = document.createElement('span'); sheetProg.className = 'sheet-progress'; sheetProg.setAttribute('aria-hidden', 'true');
  $('.sheet-bar').appendChild(sheetProg);
  sheetPanel.addEventListener('scroll', function () {
    var max = sheetPanel.scrollHeight - sheetPanel.clientHeight;
    sheetProg.style.setProperty('--read', max > 0 ? (sheetPanel.scrollTop / max).toFixed(3) : 0);
  }, { passive: true });


  /* ---------- game layer: XP, achievements, quest log ---------- */
  var unlocked = store.getJSON('vm-ach', {});
  function xpTotal() { return C.achievements.reduce(function (s, a) { return s + (unlocked[a.id] ? a.xp : 0); }, 0); }
  function levelOf(xp) { var l = 0; C.levels.forEach(function (th, i) { if (xp >= th) l = i; }); return l; }
  function levelProgress(xp) {
    var l = levelOf(xp), lo = C.levels[l], hi = C.levels[l + 1];
    if (hi == null) return 1; return (xp - lo) / (hi - lo);
  }
  function gameOn() { return !root.classList.contains('game-off'); }
  function updateXPHud(bump) {
    var xp = xpTotal(), l = levelOf(xp), name = t('levels')[l];
    $('#xpLevel').textContent = t('hud.level') + ' ' + (l + 1);
    $('#xpFill').style.width = Math.round(levelProgress(xp) * 100) + '%';
    $('#xpLabel').textContent = t('hud.xp') + ': ' + t('hud.level') + ' ' + (l + 1) + ', ' + name + ', ' + xp + ' XP';
    if (bump) { var b = $('#xpBtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
  }
  function renderQuestLog() {
    var xp = xpTotal(), l = levelOf(xp), max = C.levels.length - 1;
    $('#qlLv').textContent = t('hud.level') + ' ' + (l + 1);
    $('#qlName').textContent = t('levels')[l];
    $('#qlXp').textContent = xp + (l < max ? ' / ' + C.levels[l + 1] : '') + ' ' + t('quest.xp');
    $('#qlFill').style.width = Math.round(levelProgress(xp) * 100) + '%';
    $('#qlList').innerHTML = C.achievements.map(function (a) {
      var done = !!unlocked[a.id];
      var title = a.secret && !done ? '???' : L(a.t);
      var desc = a.secret && !done ? t('quest.secret') : L(a.d);
      var tag = a.secret ? 'div' : 'button type="button" data-go="' + a.id + '"';
      return '<li class="' + (done ? 'is-done' : '') + '"><' + tag + ' class="ql-item"><span class="medal" aria-hidden="true">' + (done ? ICON.check : ICON.lock) + '</span>' +
        '<span><span class="ql-t">' + esc(title) + '</span><span class="ql-d">' + esc(desc) + '</span></span>' +
        '<span class="ql-x">+' + a.xp + '</span></' + (a.secret ? 'div' : 'button') + '></li>';
    }).join('');
    var maxed = C.achievements.filter(function (a) { return !a.secret; }).every(function (a) { return unlocked[a.id]; });
    $('#qlMax').hidden = !maxed; $('#qlMax').textContent = t('quest.max');
    $('#gameToggle').textContent = gameOn() ? t('quest.hide') : t('quest.show');
  }
  function unlock(id) {
    if (unlocked[id]) return;
    var a = C.achievements.filter(function (x) { return x.id === id; })[0]; if (!a) return;
    var before = levelOf(xpTotal());
    unlocked[id] = Date.now(); store.setJSON('vm-ach', unlocked);
    var after = levelOf(xpTotal());
    renderQuestLog(); updateXPHud(true);
    if (!gameOn()) return;
    xpFloat('+' + a.xp + ' XP');
    if (after > before) { var xb = $('#xpBtn'); xb.classList.remove('level-up'); void xb.offsetWidth; xb.classList.add('level-up'); }
    toast(null, { k: t('quest.unlocked'), title: L(a.t) + '  +' + a.xp + ' XP', icon: ICON.star });
    if (after > before) {
      setTimeout(function () { toast(null, { k: t('quest.levelUp'), title: t('hud.level') + ' ' + (after + 1) + ' · ' + t('levels')[after], icon: ICON.up }); confetti(); }, 700);
    }
  }
  var ql = $('#questlog');
  function setQuest(open) { ql.hidden = !open; $('#xpBtn').setAttribute('aria-expanded', String(open)); if (open) { renderQuestLog(); $('#questClose').focus(); } }
  $('#xpBtn').addEventListener('click', function (e) { e.stopPropagation(); setQuest(ql.hidden); });
  $('#questClose').addEventListener('click', function () { setQuest(false); $('#xpBtn').focus(); });
  // each mission takes you to where it can be done
  function hint(el) { el.focus(); el.classList.add('is-hint'); setTimeout(function () { el.classList.remove('is-hint'); }, 2400); }
  $('#qlList').addEventListener('click', function (e) {
    var b = e.target.closest('[data-go]'); if (!b) return;
    var id = b.getAttribute('data-go');
    setQuest(false);
    if (id === 'scout') {
      goToTab('home');
      setTimeout(function () {
        var sh = $('section.short'), y = sh.getBoundingClientRect().top + window.scrollY - (window.innerHeight - sh.offsetHeight) / 2;
        window.scrollTo({ top: Math.max(0, y), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      }, 60);
    } else if (id === 'reader' || id === 'completionist') {
      var knomee = C.cases.filter(function (c) { return c.group === 'knomee'; });
      var next = id === 'reader' ? knomee[0] : (knomee.filter(function (c) { return !opened[c.id]; })[0] || knomee[0]);
      goToTab('work'); openCase(next.id);
    } else if (id === 'climber') goToTab('skills');
    else if (id === 'party') goToTab('contact');
    else if (id === 'polyglot') hint($('#langBtn'));
    else if (id === 'daynight') hint($('#themeBtn'));
  });
  document.addEventListener('click', function (e) { if (!ql.hidden && !e.target.closest('#questlog, #xpBtn')) setQuest(false); });
  $('#questReset').addEventListener('click', function () {
    unlocked = {}; opened = {}; inspectedSkills = {}; store.del('vm-ach'); store.del('vm-opened'); renderQuestLog(); updateXPHud(false);
  });
  $('#gameToggle').addEventListener('click', function () {
    var off = gameOn(); root.classList.toggle('game-off', off); store.set('vm-game', off ? 'off' : 'on'); renderQuestLog();
    if (off) setQuest(false);
    renderGameFooter();
  });
  function renderGameFooter() {
    var holder = $('#gameBack');
    if (!gameOn()) {
      if (!holder) {
        holder = document.createElement('button'); holder.id = 'gameBack'; holder.type = 'button'; holder.className = 'btn btn-ghost btn-small';
        holder.addEventListener('click', function () { root.classList.remove('game-off'); store.set('vm-game', 'on'); holder.remove(); renderQuestLog(); });
        $('.footer-end').insertBefore(holder, $('.footer-end a'));
      }
      holder.textContent = t('quest.show');
    } else if (holder) holder.remove();
  }

  function xpFloat(text) {
    if (reduceMotion.matches) return;
    var b = $('#xpBtn'), r = b.getBoundingClientRect();
    if (!r.width) return;
    var f = document.createElement('span'); f.className = 'xp-float'; f.textContent = text;
    f.style.left = (r.left + r.width / 2) + 'px'; f.style.top = (r.bottom + 4) + 'px';
    document.body.appendChild(f); setTimeout(function () { f.remove(); }, 1400);
  }

  /* toasts */
  function toast(text, opts) {
    var box = $('#toasts');
    var el = document.createElement('div');
    if (opts) {
      el.className = 'toast';
      el.innerHTML = '<span class="medal" aria-hidden="true">' + (opts.icon || ICON.star) + '</span><span><span class="toast-k">' + esc(opts.k) + '</span><span class="toast-t">' + esc(opts.title) + '</span></span>';
    } else { el.className = 'toast toast-plain'; el.textContent = text; }
    box.appendChild(el);
    var all = box.children; if (all.length > 2) all[0].remove();
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 400); }, 3400);
  }

  /* confetti burst (skipped for reduced motion) */
  function confetti(cx, cy, count) {
    if (reduceMotion.matches) return;
    var cv = document.createElement('canvas'), dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:130';
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; document.body.appendChild(cv);
    var ctx = cv.getContext('2d'); ctx.scale(dpr, dpr);
    var cs = getComputedStyle(document.documentElement);
    var cols = ['--note', '--gold', '--note-edge', '--accent', '--blue-deep-2', '--surface'].map(function (v) { return cs.getPropertyValue(v).trim() || '#FFD84D'; });
    var ox = cx == null ? innerWidth - 120 : cx, oy = cy == null ? 40 : cy, n = count || 110, spread = cx == null ? .7 : .5;
    var ps = []; for (var i = 0; i < n; i++) ps.push({ x: ox, y: oy, vx: (Math.random() - spread) * 9, vy: cx == null ? Math.random() * 4 - 2 : -(3 + Math.random() * 6), s: 4 + Math.random() * 5, r: Math.random() * 6, vr: (Math.random() - .5) * .3, c: cols[i % cols.length] });
    var t0 = performance.now();
    (function frame(now) {
      var dt = now - t0; ctx.clearRect(0, 0, innerWidth, innerHeight);
      ps.forEach(function (p) { p.vy += .22; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = Math.max(0, 1 - dt / 1800); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); });
      if (dt < 1800) requestAnimationFrame(frame); else cv.remove();
    })(t0);
  }

  /* Konami code */
  var seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'], pos = 0;

  /* ---------- skill tree interactions ---------- */
  $('#tree').addEventListener('click', function (e) {
    var b = e.target.closest('[data-skill]'); if (!b) return;
    selectedSkill = b.getAttribute('data-skill');
    $$('.node', $('#tree')).forEach(function (n) { n.setAttribute('aria-pressed', String(n === b)); });
    renderSkillDetail();
    inspectedSkills[selectedSkill] = 1;
    if (Object.keys(inspectedSkills).length >= 3) unlock('climber');
    // when the details card sits under the tree (phones, narrow windows), scroll just enough to
    // show it at the bottom of the screen, so the item that was tapped stays in view above it
    var detail = $('#treeDetail');
    if (detail.getBoundingClientRect().top >= $('#tree').getBoundingClientRect().bottom - 1) {
      detail.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'nearest' });
    }
  });

  /* ---------- contact ---------- */
  $('#copyMail').addEventListener('click', function () {
    var btn = this, label = $('span', btn);
    function done() {
      label.textContent = t('contact.copied'); btn.classList.add('is-done');
      var addr = $('#mailAddress'); addr.classList.remove('flash'); void addr.offsetWidth; addr.classList.add('flash');
      var br = btn.getBoundingClientRect(); confetti(br.left + br.width / 2, br.top, 46);
      setTimeout(function () { label.textContent = t('contact.copy'); btn.classList.remove('is-done'); }, 2400);
      unlock('party');
    }
    function fallback() {
      var r = document.createRange(); r.selectNodeContents($('#mailAddress'));
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      toast(t('contact.copyFail'));
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(C.person.email).then(done, fallback);
      else fallback();
    } catch (e) { fallback(); }
  });
  $('#linkedin').addEventListener('click', function () { unlock('party'); });

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    var typing = tag === 'input' && e.target.type !== 'range' || tag === 'textarea' || e.target.isContentEditable;
    // Konami
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = (k === seq[pos]) ? pos + 1 : (k === seq[0] ? 1 : 0);
    if (pos === seq.length) { pos = 0; unlock('secret'); confetti(); }
    if (e.key === 'Escape') {
      if (!lb.hidden) { closeLightbox(); return; }
      if (!ql.hidden) { setQuest(false); $('#xpBtn').focus(); return; }
      if (!sheetEl.hidden) { closeCase(); return; }
      if (!mobileNav.hidden) { setMenu(false); menuBtn.focus(); return; }
      return;
    }
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
  });

  /* ---------- motion: reveals, count-ups, pointer effects ---------- */
  function prepCount(el) {
    var txt = el.textContent.trim();
    var m = txt.match(/^([+−\-]?)(\d+(?:[.,]\d+)?)(\D*)$/);
    if (!m) return;
    el.setAttribute('data-count', txt);
  }
  function runCount(el) {
    var txt = el.getAttribute('data-count'); if (!txt || el._counted) return;
    el._counted = true;
    if (reduceMotion.matches) return;
    var m = txt.match(/^([+−\-]?)(\d+(?:[.,]\d+)?)(\D*)$/);
    var sep = m[2].indexOf(',') > -1 ? ',' : '.';
    var target = parseFloat(m[2].replace(',', '.')), dec = (m[2].split(/[.,]/)[1] || '').length;
    var t0 = performance.now(), dur = 1100 + Math.min(target, 700);
    (function tick(now) {
      var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      var v = (target * e).toFixed(dec);
      el.textContent = m[1] + (sep === ',' ? v.replace('.', ',') : v) + m[3];
      if (k < 1) requestAnimationFrame(tick); else el.textContent = txt;
    })(t0);
  }
  function observeCounts(scope, rootEl) {
    var els = $$('[data-count]', scope);
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { runCount(x.target); io.unobserve(x.target); } });
    }, { root: rootEl || null, threshold: .6 });
    els.forEach(function (el) { el._counted = false; io.observe(el); });
  }

  var revealIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (en) {
    en.forEach(function (x) {
      if (!x.isIntersecting) return;
      var el = x.target; el.classList.add('in'); revealIO.unobserve(el);
      if (el.classList.contains('rv')) {
        // once settled, hand the element back to its normal hover transitions
        var d = parseFloat(el.style.getPropertyValue('--rd')) || 0;
        setTimeout(function () { el.classList.remove('rv'); el.style.removeProperty('--rd'); }, 1700 + d * 1000);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 }) : null;

  function setupReveal() {
    if (!revealIO) return;
    var groups = [
      ['.section-head', 0], ['.group-head', 0], ['.side-list', 0], ['.courses', 0], ['.contact-inner', 0],
      ['#gridKnomee > .case-card', 90], ['#gridGamification > .case-card', 90], ['#gridGames > .case-card', 90],
      ['.timeline > li', 70], ['.tree-detail', 0], ['.footer-inner', 0]
    ];
    groups.forEach(function (g) {
      $$(g[0]).forEach(function (el, i) {
        if (el.classList.contains('in')) return;
        if (reduceMotion.matches || el.getBoundingClientRect().top < innerHeight * .92) { el.classList.add('in'); return; }
        el.classList.add('rv'); el.style.setProperty('--rd', Math.min(i * g[1], 360) / 1000 + 's');
        revealIO.observe(el);
      });
    });
    var pl = $('#processList');
    $$('li .step-node', pl).forEach(function (n, i) { n.style.setProperty('--i', i); });
    if (!pl.classList.contains('in')) {
      if (reduceMotion.matches) pl.classList.add('in');
      else { pl.classList.add('rv'); revealIO.observe(pl); }
    }
    var tree = $('#tree');
    if (!tree.classList.contains('in')) {
      if (reduceMotion.matches) tree.classList.add('in'); else { tree.classList.add('rv'); revealIO.observe(tree); }
    }
  }

  function afterRender() {
    $$('.short-list strong').forEach(prepCount);
    observeCounts($('.short'));
    setupReveal();
    moveNavInd();
  }

  /* pointer-driven effects: page glow, spotlight cards, magnetic buttons */
  var pageGlow = $('.page-glow'), ptr = { x: 0, y: 0, t: null }, ptrRaf = 0;
  function pointerFrame() {
    ptrRaf = 0;
    var e = ptr, t = e.t; if (!t) return;
    var card = t.closest && t.closest('.case-card');
    if (card) { var r = card.getBoundingClientRect(); card.style.setProperty('--sx', (e.x - r.left) + 'px'); card.style.setProperty('--sy', (e.y - r.top) + 'px'); }
    pageGlow.style.setProperty('--gx', e.x + 'px');
    pageGlow.style.setProperty('--gy', e.y + 'px');
    var mag = t.closest && t.closest('.btn-primary, .btn-card, .contact .btn');
    if (mag !== magActive) { if (magActive) { magActive.style.setProperty('--mx', '0px'); magActive.style.setProperty('--my', '0px'); } magActive = mag; }
    if (mag) {
      var b = mag.getBoundingClientRect();
      var dx = (e.x - (b.left + b.width / 2)) / (b.width / 2), dy = (e.y - (b.top + b.height / 2)) / (b.height / 2);
      mag.style.setProperty('--mx', (dx * 6).toFixed(1) + 'px'); mag.style.setProperty('--my', (dy * 4).toFixed(1) + 'px');
    }
  }
  var magActive = null;
  document.addEventListener('pointermove', function (e) {
    if (!finePointer.matches || reduceMotion.matches) return;
    ptr.x = e.clientX; ptr.y = e.clientY; ptr.t = e.target;
    if (!ptrRaf) ptrRaf = requestAnimationFrame(pointerFrame);
  }, { passive: true });
  document.addEventListener('pointerleave', function () { if (magActive) { magActive.style.setProperty('--mx', '0px'); magActive.style.setProperty('--my', '0px'); magActive = null; } });

  /* ---------- boot ---------- */
  applyI18n();
  renderAll();
  afterRender();
  setTimeout(function () { root.classList.remove('intro'); }, 2600);
  renderGameFooter();
  onScrollHud();
  showTab(tabFromHash(location.hash), { keepScroll: true });
  var m0 = location.hash.match(/^#case-([\w-]+)$/);
  if (m0 && caseById(m0[1])) openCase(m0[1], { fromHash: true });

  // expose for quick debugging in the console
  window.VM = { openCase: openCase, unlock: unlock };
})();
