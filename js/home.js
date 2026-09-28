/* ============================================================
   HOME · Traduzioni di Michael Crippa
   v4 — mobile-safe: try/catch, drago leggero, skip su mobile
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Utility sicure ---------- */
  const $ = (s) => {
    try { return document.querySelector(s); } catch (e) { return null; }
  };
  const $$ = (s) => {
    try { return document.querySelectorAll(s); } catch (e) { return []; }
  };

  /* ---------- Stato ---------- */
  let filter = 'all';
  const catalog = window.MANGA_CATALOG || { manga: [] };

  /* ---------- Rilevamento dispositivo ---------- */
  function isMobile() {
    try {
      if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return true;
      if ('ontouchstart' in window && window.innerWidth <= 900) return true;
      return false;
    } catch (e) { return false; }
  }
  const MOBILE = isMobile();

  /* ---------- Utility dati ---------- */
  function titleOf(manga) {
    if (!manga) return '';
    if (typeof manga.title === 'string') return manga.title;
    const t = manga.title || {};
    return t.en || t.it || t.ja || manga.id || '';
  }
  function volTitle(vol) {
    if (!vol) return '';
    if (typeof vol.title === 'string') return vol.title;
    const t = vol.title || {};
    return t.en || t.it || t.ja || ('Vol. ' + (vol.number || ''));
  }
  function statusLabel(s) {
    return s === 'translated' ? 'Completato' : 'In corso';
  }
  function coverOf(manga) {
    return (manga && manga.volumes && manga.volumes[0])
      ? manga.volumes[0].cover : '';
  }

  /* ============================================================
     INTRO OVERLAY — chiuso dopo un breve delay
     ============================================================ */
  function playIntro() {
    try {
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.body.classList.add('intro-done');
        }, 120);
      });
      // Safety net: dopo 3s, qualunque cosa accada, rimuovi l'overlay
      setTimeout(() => document.body.classList.add('intro-done'), 3000);
    } catch (e) {}
  }

  /* ============================================================
     DRAGO CINESE — SVG LEGGERO
     Numero nodi ridotto ~60%: 36 spine, 24 scaglie, testa semplificata.
     Nessun drop-shadow (era il killer su mobile).
     ============================================================ */
  function buildDragon() {
    if (MOBILE) return; // niente drago su mobile

    const host = document.getElementById('dragonBg');
    if (!host) return;

    try {
      const cx = 500, cy = 500;
      const R = 340;
      const spikesN = 36;
      const scalesN = 24;

      let spikes = '';
      for (let i = 0; i < spikesN; i++) {
        const a = (i / spikesN) * Math.PI * 2;
        const x = cx + Math.cos(a) * (R + 12);
        const y = cy + Math.sin(a) * (R + 12);
        const deg = (a * 180 / Math.PI) + 90;
        const h = 12 + Math.abs(Math.sin(i * 0.7)) * 6;
        spikes += `<path d="M-4 0 L0 -${h.toFixed(1)} L4 0Z" fill="#d4af37" opacity="0.75" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg.toFixed(1)})"/>`;
      }

      let scales = '';
      for (let i = 0; i < scalesN; i++) {
        const a = (i / scalesN) * Math.PI * 2;
        const x = cx + Math.cos(a) * R;
        const y = cy + Math.sin(a) * R;
        const deg = (a * 180 / Math.PI) + 90;
        scales += `<path d="M-6 0 Q0 -6 6 0" stroke="#7a5f1e" stroke-width="1" fill="none" opacity="0.8" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg.toFixed(1)})"/>`;
      }

      let claws = '';
      [45, 135, 225, 315].forEach(deg => {
        const rad = deg * Math.PI / 180;
        const x = cx + Math.cos(rad) * (R + 4);
        const y = cy + Math.sin(rad) * (R + 4);
        claws += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg + 90})">
          <path d="M0 -8 Q0 -22 -6 -26 M0 -8 Q0 -22 6 -26 M0 -8 Q-10 -18 -14 -18"
                stroke="#d4af37" stroke-width="3" fill="none" stroke-linecap="round"/>
          <circle cx="0" cy="-8" r="4" fill="#c62828" stroke="#d4af37" stroke-width="1"/>
        </g>`;
      });

      const head = `
        <g transform="translate(500 160)">
          <path d="M-30 -20 Q-40 -55 -70 -65 M-55 -60 Q-60 -75 -75 -80 M-50 -60 Q-40 -75 -45 -85"
                stroke="#c62828" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M-55 -5 Q-80 -20 -85 -5 Q-95 5 -80 15 Q-85 25 -70 30 Q-50 35 -30 25Z"
                fill="#7a1a1a" opacity="0.85"/>
          <path d="M-60 -20 Q-20 -32 30 -25 Q70 -18 85 -6 Q90 5 80 15 Q60 25 30 26 Q-20 28 -60 15 Q-70 0 -60 -20Z"
                fill="url(#dg)" stroke="#7a5f1e" stroke-width="2"/>
          <path d="M80 -6 Q110 -12 125 -4 Q120 4 100 6 Q90 8 80 5Z"
                fill="#d4af37" stroke="#7a5f1e" stroke-width="1.5"/>
          <circle cx="118" cy="-2" r="3" fill="#7a1a1a"/>
          <path d="M20 -12 Q35 -20 50 -12 Q40 -6 25 -8Z"
                fill="#fff5c8" stroke="#7a5f1e" stroke-width="1"/>
          <circle cx="35" cy="-12" r="3.5" fill="#7a1a1a"/>
          <circle cx="34" cy="-13" r="1.2" fill="#fff"/>
          <path d="M15 -18 Q35 -28 55 -18"
                stroke="#c62828" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M40 18 L44 26 L48 18Z" fill="#fff5c8"/>
          <path d="M60 18 L64 26 L68 18Z" fill="#fff5c8"/>
          <path d="M80 16 L84 24 L88 16Z" fill="#fff5c8"/>
          <path d="M-30 25 Q-25 45 -45 60 Q-60 45 -55 25Z"
                fill="#7a1a1a" opacity="0.9"/>
          <path d="M-45 55 Q-70 75 -90 80"
                stroke="#c62828" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M110 -8 Q150 -30 195 -25 Q175 -35 155 -30 Q130 -25 115 -5Z"
                fill="#f2dd8b" opacity="0.9"/>
          <path d="M105 8 Q140 40 180 45 Q160 52 140 45 Q120 38 108 15Z"
                fill="#f2dd8b" opacity="0.9"/>
        </g>`;

      const tail = `
        <g transform="translate(500 840) rotate(180)">
          <path d="M-20 0 Q-40 -10 -60 -5 Q-50 5 -60 15 Q-40 20 -20 8Z"
                fill="#d4af37" stroke="#7a5f1e" stroke-width="1.5"/>
          <path d="M-55 0 Q-70 -8 -80 -5 Q-75 0 -80 8 Q-65 8 -55 3Z"
                fill="#c62828" stroke="#7a5f1e" stroke-width="1"/>
        </g>`;

      const svg = `
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision">
          <defs>
            <linearGradient id="dg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#7a5f1e"/>
              <stop offset="20%" stop-color="#d4af37"/>
              <stop offset="50%" stop-color="#ffe9a3"/>
              <stop offset="80%" stop-color="#d4af37"/>
              <stop offset="100%" stop-color="#7a5f1e"/>
            </linearGradient>
          </defs>
          ${spikes}
          <circle cx="500" cy="500" r="340" fill="none" stroke="rgba(50,8,8,0.5)" stroke-width="30" opacity="0.4"/>
          <circle cx="500" cy="500" r="340" fill="none" stroke="url(#dg)" stroke-width="22"/>
          ${scales}
          ${claws}
          ${tail}
          ${head}
        </svg>`;

      host.innerHTML = svg;
    } catch (e) {
      console.warn('[dragon] non disegnato:', e);
      host.innerHTML = '';
    }
  }

  /* ============================================================
     REVEAL ON SCROLL
     ============================================================ */
  let revealObserver = null;

  function setupReveal() {
    try {
      if (!('IntersectionObserver' in window)) {
        $$('.reveal, .manga-card').forEach(el => el.classList.add('in-view'));
        return;
      }
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      $$('.reveal').forEach(el => revealObserver.observe(el));
    } catch (e) {
      $$('.reveal').forEach(el => el.classList.add('in-view'));
    }
  }

  function observeCard(card) {
    try {
      if (revealObserver) revealObserver.observe(card);
      else card.classList.add('in-view');
    } catch (e) {
      card.classList.add('in-view');
    }
  }

  /* ============================================================
     TILT 3D — disattivato su mobile
     ============================================================ */
  function setupTilt() {
    if (MOBILE) return; // niente tilt su touch
    try {
      document.addEventListener('mousemove', (e) => {
        const hovered = document.querySelector('.carousel-item:hover, .manga-card:hover');
        if (!hovered) return;
        const rect = hovered.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width  - 0.5;
        const cy = (e.clientY - rect.top)  / rect.height - 0.5;
        const maxTilt = 8;
        if (hovered.classList.contains('carousel-item')) {
          hovered.style.transform =
            `translateY(-6px) rotateY(${cx * maxTilt}deg) rotateX(${-cy * maxTilt}deg)`;
        } else {
          hovered.style.transform =
            `translateY(-8px) scale(1.015) rotateY(${cx * maxTilt}deg) rotateX(${-cy * maxTilt}deg)`;
        }
      });

      document.querySelectorAll('.carousel-item, .manga-card').forEach(el => {
        el.addEventListener('mouseleave', () => { el.style.transform = ''; });
      });
    } catch (e) {}
  }

  function attachTiltReset() {
    if (MOBILE) return;
    try {
      document.querySelectorAll('.carousel-item, .manga-card').forEach(el => {
        if (el._tiltReset) return;
        el._tiltReset = true;
        el.addEventListener('mouseleave', () => { el.style.transform = ''; });
      });
    } catch (e) {}
  }

  /* ---------- Anno footer ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Bottone suono ---------- */
  const sndBtn = $('#soundToggle');
  if (sndBtn) {
    const updateSndBtn = () => {
      if (typeof MCSound === 'undefined') return;
      sndBtn.classList.toggle('active', MCSound.isEnabled());
      sndBtn.textContent = MCSound.isEnabled() ? '音' : '消';
      sndBtn.title = MCSound.isEnabled() ? 'Suoni attivi' : 'Suoni disattivati';
    };
    sndBtn.addEventListener('click', () => {
      if (typeof MCSound === 'undefined') return;
      MCSound.toggle();
      updateSndBtn();
    });
    updateSndBtn();
  }

  /* ============================================================
     CAROSELLO
     ============================================================ */
  const track  = $('#carouselTrack');
  const dotsEl = $('#carouselDots');
  let carIdx   = 0;
  let carMax   = 0;

  function buildCarousel() {
    if (!track || !dotsEl) return;
    try {
      track.innerHTML = '';
      dotsEl.innerHTML = '';

      const items = [];
      catalog.manga.forEach(m => {
        (m.volumes || []).forEach(v => items.push({ manga: m, vol: v }));
      });

      items.forEach(({ manga, vol }) => {
        const a = document.createElement('a');
        a.className = 'carousel-item';
        a.href = `reader.html?manga=${encodeURIComponent(manga.id)}&vol=${encodeURIComponent(vol.id)}`;
        a.innerHTML = `
          <div class="carousel-cover">
            <img src="${vol.cover}" alt="${titleOf(manga)} — ${volTitle(vol)}" loading="lazy">
          </div>
          <div class="carousel-info">
            <h3>${titleOf(manga)}</h3>
            <p>${volTitle(vol)}</p>
          </div>`;
        a.addEventListener('click', () => {
          if (typeof MCSound !== 'undefined') MCSound.open();
        });
        track.appendChild(a);
      });

      buildDots(items.length);
      requestAnimationFrame(updateCarousel);
      attachTiltReset();
    } catch (e) {
      console.warn('[carousel] errore:', e);
    }
  }

  function buildDots(n) {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const d = document.createElement('span');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => { carIdx = i; snapCarousel(); });
      dotsEl.appendChild(d);
    }
  }

  function visibleCount() {
    if (!track || !track.parentElement) return 1;
    const vp = track.parentElement.clientWidth;
    const item = track.children[0];
    if (!item) return 1;
    const w = item.offsetWidth + 22;
    return Math.max(1, Math.floor(vp / w));
  }

  function updateCarousel() {
    if (!track) return;
    const items = track.children;
    if (!items.length) return;
    try {
      const item = items[0];
      const gap  = 22;
      const step = item.offsetWidth + gap;
      const vis  = visibleCount();
      carMax = Math.max(0, items.length - vis);
      if (carIdx > carMax) carIdx = carMax;
      if (carIdx < 0) carIdx = 0;
      track.style.transform = `translateX(${-carIdx * step}px)`;

      if (dotsEl) {
        [...dotsEl.children].forEach((d, i) => {
          d.classList.toggle('active', i === carIdx || (carIdx > carMax && i === carMax));
        });
      }
    } catch (e) {}
  }

  function snapCarousel() {
    if (typeof MCSound !== 'undefined') MCSound.click();
    updateCarousel();
  }

  const btnPrev = $('#carouselPrev');
  const btnNext = $('#carouselNext');
  if (btnPrev) btnPrev.addEventListener('click', () => {
    carIdx = carIdx <= 0 ? carMax : carIdx - 1;
    snapCarousel();
  });
  if (btnNext) btnNext.addEventListener('click', () => {
    carIdx = carIdx >= carMax ? 0 : carIdx + 1;
    snapCarousel();
  });

  let autoTimer = null;
  function startAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      carIdx = carIdx >= carMax ? 0 : carIdx + 1;
      updateCarousel();
    }, 5000);
  }
  function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

  const carouselEl = $('#carousel');
  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', stopAuto);
    carouselEl.addEventListener('mouseleave', startAuto);
    carouselEl.addEventListener('touchstart', stopAuto, { passive: true });
    carouselEl.addEventListener('touchend', startAuto, { passive: true });
  }

  window.addEventListener('resize', () => {
    requestAnimationFrame(updateCarousel);
  });

  /* ============================================================
     CATALOGO
     ============================================================ */
  const grid = $('#mangaGrid');
  const filterList = $('#filterList');

  if (filterList) {
    filterList.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li) return;
      if (typeof MCSound !== 'undefined') MCSound.click();
      [...filterList.children].forEach(x => x.classList.remove('active'));
      li.classList.add('active');
      filter = li.dataset.filter || 'all';
      renderGrid();
    });
  }

  function renderGrid() {
    if (!grid) return;
    try {
      grid.innerHTML = '';
      const list = (catalog.manga || []).filter(m =>
        filter === 'all' ? true : m.status === filter
      );

      if (!list.length) {
        grid.innerHTML = `<p style="color:var(--muted);grid-column:1/-1;text-align:center;padding:40px 0;letter-spacing:2px;">Nessun manga in questa categoria.</p>`;
        return;
      }

      list.forEach((m, i) => {
        const card = document.createElement('article');
        card.className = 'manga-card';
        card.style.transitionDelay = (i * 70) + 'ms';

        const vols = (m.volumes || []).map(v =>
          `<a class="vol-btn" href="reader.html?manga=${encodeURIComponent(m.id)}&vol=${encodeURIComponent(v.id)}">${volTitle(v)}</a>`
        ).join('');

        card.innerHTML = `
          <span class="status-badge ${m.status === 'in-progress' ? 'in-progress' : ''}">${statusLabel(m.status)}</span>
          <div class="cover-wrap">
            <img src="${coverOf(m)}" alt="${titleOf(m)}" loading="lazy">
          </div>
          <h3>${titleOf(m)}</h3>
          <p class="author">${m.author || ''}</p>
          <div class="volumes">${vols}</div>`;

        card.querySelectorAll('.vol-btn').forEach(a =>
          a.addEventListener('click', () => {
            if (typeof MCSound !== 'undefined') MCSound.open();
          })
        );

        grid.appendChild(card);
        observeCard(card);
      });

      attachTiltReset();
    } catch (e) {
      console.warn('[grid] errore:', e);
    }
  }

  /* ============================================================
     INIT — tutto protetto
     ============================================================ */
  function init() {
    try { playIntro(); }       catch (e) {}
    try { buildDragon(); }     catch (e) {}
    try { setupReveal(); }     catch (e) {}
    try { setupTilt(); }       catch (e) {}
    try { buildCarousel(); }   catch (e) {}
    try { renderGrid(); }      catch (e) {}
    try { startAuto(); }       catch (e) {}
  }

  // Avvia quando il DOM è pronto (o subito se già pronto)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();