/* ============================================================
   LETTORE · Traduzioni di Michael Crippa
   v14 — fix: MOBILE solo su touch reali (no finestre strette)
   Logica desktop/mobile invariata rispetto a v13.
   ============================================================ */
(function () {
  'use strict';

  const catalog = window.MANGA_CATALOG;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const params = new URLSearchParams(location.search);
  const mangaId = params.get('manga');
  const volId   = params.get('vol');

  const manga = catalog && catalog.manga.find(m => m.id === mangaId);
  const vol   = manga && manga.volumes.find(v => v.id === volId);

  if (!manga || !vol) {
    document.body.innerHTML = `<div style="display:grid;place-items:center;height:100vh;color:#e9dcc0;font-family:serif;text-align:center">
      <div><h1 style="color:#d4af37">Volume non trovato</h1><p><a href="index.html" style="color:#d4af37">← Torna alla home</a></p></div></div>`;
    return;
  }

  /* ---------- Costanti ---------- */
  const ZOOM_MIN = 1;
  const ZOOM_MAX = 4;
  const AUTOHIDE_DELAY = 4000;
  const SWIPE_THRESHOLD = 55;

  /* Prefetch pagina successiva (1 sola) — metti false per zero richieste extra */
  const PREFETCH_NEXT = true;

  /* ============================================================
     RILEVAMENTO DISPOSITIVO — FIX v14
     ------------------------------------------------------------
     MOBILE = true SOLO su dispositivi touch reali.
     NON dipende più dalla larghezza della finestra:
     un desktop ridimensionato a 500px resta desktop.
     ============================================================ */
  function detectTouchDevice() {
    try {
      if (window.matchMedia) {
        /* Standard moderno: hover assente + puntatore coarse = touch primario */
        if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
          return true;
        }
        return false;
      }
      /* Fallback per browser molto vecchi */
      return ('ontouchstart' in window) && (navigator.maxTouchPoints > 0);
    } catch (e) {
      return false;
    }
  }
  const MOBILE = detectTouchDevice();

  /* Zoom consentito solo su desktop */
  const ZOOM_ENABLED = !MOBILE;

  /* ---------- Stato ---------- */
  let currentPage = 1;
  const totalPages = vol.pages || 1;
  let doubleMode  = localStorage.getItem('mc_double') === 'on';
  let zoom        = ZOOM_ENABLED
    ? (parseFloat(localStorage.getItem('mc_zoom')) || 1)
    : 1;
  if (zoom < ZOOM_MIN) zoom = ZOOM_MIN;
  if (zoom > ZOOM_MAX) zoom = ZOOM_MAX;
  let notesOn     = localStorage.getItem('mc_notes') !== 'off';
  let notes       = {};
  let activePopup = null;

  const prefetched = new Set();

  /* ---------- Titoli ---------- */
  const titleOf = (o) => {
    if (typeof o.title === 'string') return o.title;
    return (o.title && (o.title.en || o.title.it || o.title.ja)) || o.id;
  };
  document.title = `${titleOf(manga)} · ${titleOf(vol)} · Traduzioni di Michael Crippa`;
  $('#readerTitle').textContent = `${titleOf(manga)} — ${titleOf(vol)}`;
  $('#readerSub').textContent   = `Traduzioni di Michael Crippa · ${totalPages} pagine`;
  $('#pageTotal').textContent   = totalPages;

  /* ---------- Kanji numero volume ---------- */
  function kanjiNumber(n) {
    const digits = ['', '一','二','三','四','五','六','七','八','九'];
    if (n <= 0) return '';
    if (n < 10) return digits[n];
    if (n === 10) return '十';
    if (n < 20) return '十' + digits[n - 10];
    if (n < 100) {
      const tens = Math.floor(n / 10);
      const ones = n % 10;
      return digits[tens] + '十' + (ones ? digits[ones] : '');
    }
    return String(n);
  }
  const railRight = $('#railRightText');
  if (railRight) {
    const volNum = vol.number || parseInt((vol.id || '').replace(/\D+/g, ''), 10) || 1;
    railRight.textContent = `第${kanjiNumber(volNum)}巻`;
  }

  /* ---------- Path pagina ---------- */
  function pagePath(n) {
    const pad = vol.pagePad || 0;
    const num = pad > 0 ? String(n).padStart(pad, '0') : String(n);
    return vol.pagePattern.replace('{page}', num);
  }

  /* ---------- Prefetch pagina successiva ---------- */
  function prefetch(n) {
    if (!PREFETCH_NEXT) return;
    if (n < 1 || n > totalPages) return;
    const url = pagePath(n);
    if (prefetched.has(url)) return;
    prefetched.add(url);
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
  }

  /* ---------- Note ---------- */
  function loadNotes() {
    return new Promise((resolve) => {
      document.querySelectorAll('script[data-mc-notes]').forEach(s => s.remove());
      window.notes = undefined;
      if (!vol.notes) return resolve({});
      const s = document.createElement('script');
      s.src = vol.notes + '?v=' + Date.now();
      s.dataset.mcNotes = '1';
      s.onload  = () => resolve(window.notes || {});
      s.onerror = () => { console.warn('[note] file non trovato:', vol.notes); resolve({}); };
      document.head.appendChild(s);
    });
  }

  /* ---------- Progresso ---------- */
  function saveProgress() {
    try { localStorage.setItem(`mc_progress_${manga.id}_${vol.id}`, String(currentPage)); } catch (e) {}
  }
  function restoreProgress() {
    const v = parseInt(localStorage.getItem(`mc_progress_${manga.id}_${vol.id}`) || '0', 10);
    return (v >= 1 && v <= totalPages) ? v : 1;
  }

  /* ============================================================
     RENDER
     ============================================================ */
  const pagesEl = $('#pages');
  const stage   = $('#stage');
  const pagePill = $('#pagePill');
  const pagePillText = $('#pagePillText');

  function closePopup() {
    if (activePopup) { activePopup.remove(); activePopup = null; }
    document.querySelectorAll('.note-dot.active').forEach(d => d.classList.remove('active'));
  }

  function render() {
    closePopup();
    pagesEl.innerHTML = '';

    const nums = doubleMode
      ? (currentPage + 1 <= totalPages ? [currentPage, currentPage + 1] : [currentPage])
      : [currentPage];

    if (doubleMode) pagesEl.classList.add('rtl');
    else            pagesEl.classList.remove('rtl');

    nums.forEach(n => {
      const pageDiv = document.createElement('div');
      pageDiv.className = 'page';
      pageDiv.dataset.page = n;

      const inner = document.createElement('div');
      inner.className = 'page-inner';

      const img = document.createElement('img');
      img.src = pagePath(n);
      img.alt = `Pagina ${n}`;
      img.draggable = false;
      img.decoding = 'async';
      img.addEventListener('error', () => {
        inner.innerHTML = `<div style="color:#a89066;padding:40px;border:1px dashed #7a5f1e;font-family:serif">
          Pagina ${n} non trovata<br><small>${pagePath(n)}</small></div>`;
      });
      if (ZOOM_ENABLED) img.style.zoom = zoom;
      inner.appendChild(img);

      const pageNotes = notes[String(n)] || notes[n] || [];
      if (notesOn) {
        pageNotes.forEach((note) => {
          const dot = document.createElement('div');
          dot.className = 'note-dot';
          dot.style.left = (note.x || 0) + '%';
          dot.style.top  = (note.y || 0) + '%';
          if (note.title) dot.title = note.title;

          const visual = document.createElement('span');
          visual.className = 'note-dot-visual';
          dot.appendChild(visual);

          dot.addEventListener('click', (e) => {
            e.stopPropagation();
            openNote(inner, dot, note);
          });
          inner.appendChild(dot);
        });
      }

      pageDiv.appendChild(inner);
      pagesEl.appendChild(pageDiv);
    });

    $('#pageInput').value = currentPage;
    $('#progressBar').style.width = ((currentPage / totalPages) * 100) + '%';
    if (pagePillText) pagePillText.textContent = `${currentPage} / ${totalPages}`;
    saveProgress();
    applyZoom();

    prefetch(currentPage + (doubleMode ? 2 : 1));
  }

  /* ============================================================
     POPUP NOTA
     ============================================================ */
  function openNote(pageInner, dotEl, note) {
    if (typeof MCSound !== 'undefined') MCSound.note();
    if (activePopup && activePopup._dot === dotEl) { closePopup(); return; }
    closePopup();

    const popup = document.createElement('div');
    popup.className = 'note-popup';
    popup._dot = dotEl;

    const titleHtml = note.title
      ? `<div class="note-title">${note.title}</div>` : '';

    popup.innerHTML = `
      <button class="close-note" title="Chiudi">✕</button>
      <div class="note-popup-body">
        ${titleHtml}
        <div>${note.text || ''}</div>
      </div>`;

    pageInner.appendChild(popup);

    popup.style.visibility = 'hidden';
    popup.style.left = '0px';
    popup.style.top  = '0px';

    const pw = popup.offsetWidth;
    const ph = popup.offsetHeight;
    const innerW = pageInner.clientWidth;
    const innerH = pageInner.clientHeight;

    const dotRect   = dotEl.getBoundingClientRect();
    const innerRect = pageInner.getBoundingClientRect();
    const dotX = dotRect.left - innerRect.left + dotRect.width  / 2;
    const dotY = dotRect.top  - innerRect.top  + dotRect.height / 2;

    let left = dotX + 16;
    let top  = dotY + 12;

    if (left + pw > innerW - 8) left = dotX - pw - 16;
    if (left < 8) left = 8;
    if (left + pw > innerW - 8) left = Math.max(8, innerW - pw - 8);

    if (top + ph > innerH - 8) top = dotY - ph - 12;
    if (top < 8) top = 8;
    if (top + ph > innerH - 8) top = Math.max(8, innerH - ph - 8);

    popup.style.left = left + 'px';
    popup.style.top  = top + 'px';
    popup.style.visibility = '';

    popup.querySelector('.close-note').addEventListener('click', (e) => {
      e.stopPropagation();
      closePopup();
    });

    dotEl.classList.add('active');
    activePopup = popup;
  }

  document.addEventListener('click', (e) => {
    if (activePopup && !activePopup.contains(e.target) && !e.target.closest('.note-dot')) {
      closePopup();
    }
  });

  /* ============================================================
     NAVIGAZIONE
     ============================================================ */
  const step = () => doubleMode ? 2 : 1;

  function goTo(n, silent) {
    const t = Math.max(1, Math.min(totalPages, n));
    if (t === currentPage) return;
    currentPage = t;
    if (!silent && typeof MCSound !== 'undefined') MCSound.page();
    render();
    if (MOBILE) pulsePill();
  }
  const nextPage = () => goTo(currentPage + step());
  const prevPage = () => goTo(currentPage - step());

  $('#nextPage').addEventListener('click', nextPage);
  $('#prevPage').addEventListener('click', prevPage);

  function jumpTo() {
    const v = parseInt($('#pageInput').value, 10);
    if (!isNaN(v) && v >= 1 && v <= totalPages) goTo(v);
    else {
      if (typeof MCSound !== 'undefined') MCSound.error();
      toast('Pagina non valida');
    }
  }
  $('#goPage').addEventListener('click', jumpTo);
  $('#pageInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); jumpTo(); }
  });

  /* ============================================================
     TOGGLE VISTA / NOTE
     ============================================================ */
  const viewBtn = $('#viewToggle');
  function updateViewBtn() {
    $('#viewIcon').textContent = doubleMode ? '▮▮' : '▯';
    viewBtn.title = doubleMode ? 'Passa a pagina singola' : 'Passa a pagina doppia';
  }
  viewBtn.addEventListener('click', () => {
    if (typeof MCSound !== 'undefined') MCSound.click();
    doubleMode = !doubleMode;
    localStorage.setItem('mc_double', doubleMode ? 'on' : 'off');
    updateViewBtn();
    render();
  });
  updateViewBtn();

  const notesBtn = $('#notesToggle');
  function updateNotesBtn() {
    document.body.classList.toggle('notes-off', !notesOn);
    notesBtn.classList.toggle('active', notesOn);
    notesBtn.title = notesOn ? 'Note attive' : 'Note disattivate';
  }
  notesBtn.addEventListener('click', () => {
    if (typeof MCSound !== 'undefined') MCSound.click();
    notesOn = !notesOn;
    localStorage.setItem('mc_notes', notesOn ? 'on' : 'off');
    updateNotesBtn();
    render();
  });
  updateNotesBtn();

  /* ============================================================
     ZOOM (solo desktop)
     ============================================================ */
  function applyZoom() {
    if (!ZOOM_ENABLED) {
      pagesEl.style.setProperty('--dot-scale', '1');
      return;
    }
    $$('.page-inner > img').forEach(img => { img.style.zoom = zoom; });
    const dotScale = Math.sqrt(zoom).toFixed(3);
    pagesEl.style.setProperty('--dot-scale', dotScale);
    $('#zoomLevel').textContent = Math.round(zoom * 100) + '%';
    localStorage.setItem('mc_zoom', zoom);
  }

  function setZoom(z, anchor) {
    if (!ZOOM_ENABLED) return;
    closePopup();
    let newZoom = Math.round(z * 100) / 100;
    if (newZoom < ZOOM_MIN) newZoom = ZOOM_MIN;
    if (newZoom > ZOOM_MAX) newZoom = ZOOM_MAX;
    if (newZoom === zoom) return;
    const oldZoom = zoom;
    zoom = newZoom;
    applyZoom();
    if (anchor && anchor.cx != null && anchor.cy != null) {
      const ratio = zoom / oldZoom;
      requestAnimationFrame(() => {
        stage.scrollLeft = (anchor.scrollX + anchor.cx) * ratio - anchor.cx;
        stage.scrollTop  = (anchor.scrollY + anchor.cy) * ratio - anchor.cy;
      });
    }
  }

  if (ZOOM_ENABLED) {
    $('#zoomIn').addEventListener('click', () => { if (typeof MCSound !== 'undefined') MCSound.click(); setZoom(zoom + 0.15); });
    $('#zoomOut').addEventListener('click', () => { if (typeof MCSound !== 'undefined') MCSound.click(); setZoom(zoom - 0.15); });
    $('#zoomReset').addEventListener('click', () => { if (typeof MCSound !== 'undefined') MCSound.click(); setZoom(1); });

    /* Wheel = zoom (solo desktop) */
    stage.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = stage.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const scrollX = stage.scrollLeft;
      const scrollY = stage.scrollTop;
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      setZoom(zoom * factor, { cx, cy, scrollX, scrollY });
    }, { passive: false });
  }

  /* ============================================================
     DRAG-TO-PAN CON MOUSE (solo desktop)
     ============================================================ */
  let isDragging = false;
  let dragStartX = 0, dragStartY = 0;
  let scrollStartX = 0, scrollStartY = 0;
  let dragMoved = false;

  if (!MOBILE) {
    stage.addEventListener('mousedown', (e) => {
      if (e.target.closest('.note-dot') ||
          e.target.closest('.note-popup') ||
          e.target.closest('button') ||
          e.target.closest('input')) return;
      if (e.button !== 0) return;
      isDragging = true;
      dragMoved = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      scrollStartX = stage.scrollLeft;
      scrollStartY = stage.scrollTop;
      stage.classList.add('dragging');
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved = true;
      stage.scrollLeft = scrollStartX - dx;
      stage.scrollTop  = scrollStartY - dy;
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      stage.classList.remove('dragging');
    });

    stage.addEventListener('click', (e) => {
      if (dragMoved) {
        e.stopPropagation();
        e.preventDefault();
        dragMoved = false;
      }
    }, true);
  }

  /* ============================================================
     GESTURE TOUCH (solo mobile)
     ============================================================ */
  let tStartX = 0, tStartY = 0;
  let tLastX = 0, tLastY = 0;
  let tStartTime = 0;
  let tMoved = false;
  let tStartedOnInteractive = false;

  if (MOBILE) {
    stage.addEventListener('touchstart', (e) => {
      tStartedOnInteractive = !!(
        e.target.closest('.note-dot') ||
        e.target.closest('.note-popup') ||
        e.target.closest('button') ||
        e.target.closest('input') ||
        e.target.closest('.page-pill')
      );
      if (tStartedOnInteractive) return;

      if (e.touches.length === 1) {
        const t = e.touches[0];
        tStartX = tLastX = t.clientX;
        tStartY = tLastY = t.clientY;
        tStartTime = Date.now();
        tMoved = false;
      } else {
        tMoved = true;
        tStartedOnInteractive = true;
      }
    }, { passive: true });

    stage.addEventListener('touchmove', (e) => {
      if (tStartedOnInteractive) return;
      if (e.touches.length > 1) {
        e.preventDefault();
        return;
      }
      if (e.touches.length === 1) {
        const t = e.touches[0];
        const dx = t.clientX - tStartX;
        const dy = t.clientY - tStartY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx > 6 || absDy > 6) tMoved = true;

        if (absDx > absDy && absDx > 10) {
          e.preventDefault();
        }
        tLastX = t.clientX;
        tLastY = t.clientY;
      }
    }, { passive: false });

    stage.addEventListener('touchend', (e) => {
      if (tStartedOnInteractive) {
        tStartedOnInteractive = false;
        return;
      }
      if (e.touches.length === 0) {
        const dt = Date.now() - tStartTime;
        const dx = tLastX - tStartX;
        const dy = tLastY - tStartY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx > SWIPE_THRESHOLD && absDx > absDy * 1.4) {
          if (dx > 0) nextPage();
          else        prevPage();
          tMoved = false;
          return;
        }

        if (!tMoved && dt < 300 && absDx < 10 && absDy < 10) {
          toggleUI();
        }
        tMoved = false;
      }
    }, { passive: true });

    /* Previeni gesture del browser (pinch, double-tap zoom) */
    document.addEventListener('gesturestart',  (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
    document.addEventListener('gestureend',    (e) => e.preventDefault());

    let lastTouchEnd = 0;
    stage.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) e.preventDefault();
      lastTouchEnd = now;
    }, false);
  }

  /* ============================================================
     UI AUTO-HIDE + PAGE PILL
     ============================================================ */
  let uiHideTimer = null;

  function toggleUI() {
    if (!MOBILE) return;
    document.body.classList.toggle('ui-hidden');
    if (!document.body.classList.contains('ui-hidden')) {
      scheduleUIHide();
    }
  }

  function scheduleUIHide() {
    if (!MOBILE) return;
    if (uiHideTimer) clearTimeout(uiHideTimer);
    uiHideTimer = setTimeout(() => {
      document.body.classList.add('ui-hidden');
    }, AUTOHIDE_DELAY);
  }

  function pulsePill() {
    if (!pagePill) return;
    pagePill.classList.add('pulse');
    clearTimeout(pagePill._t);
    pagePill._t = setTimeout(() => pagePill.classList.remove('pulse'), 700);
  }

  if (pagePill) {
    pagePill.addEventListener('click', (e) => {
      e.stopPropagation();
      document.body.classList.remove('ui-hidden');
      scheduleUIHide();
      if (typeof MCSound !== 'undefined') MCSound.click();
    });
  }

  const topbarEl = document.querySelector('.reader-topbar');
  const bottombarEl = document.querySelector('.reader-bottombar');
  [topbarEl, bottombarEl].forEach(bar => {
    if (!bar) return;
    ['click', 'touchstart', 'pointerdown'].forEach(ev => {
      bar.addEventListener(ev, () => {
        if (MOBILE) {
          document.body.classList.remove('ui-hidden');
          scheduleUIHide();
        }
      }, { passive: true });
    });
  });

  if (MOBILE) {
    setTimeout(scheduleUIHide, 4000);
  }

  /* ============================================================
     FULLSCREEN
     ============================================================ */
  $('#fullscreenBtn').addEventListener('click', () => {
    if (typeof MCSound !== 'undefined') MCSound.click();
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  });

  /* ============================================================
     TASTIERA (desktop)
     ============================================================ */
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    switch (e.key) {
      case 'ArrowLeft':  nextPage(); break;
      case 'ArrowRight': prevPage(); break;
      case ' ':          e.preventDefault(); nextPage(); break;
      case 'Home':       goTo(1); break;
      case 'End':        goTo(totalPages); break;
      case '+': case '=': if (ZOOM_ENABLED) setZoom(zoom + 0.15); break;
      case '-':           if (ZOOM_ENABLED) setZoom(zoom - 0.15); break;
      case '0':           if (ZOOM_ENABLED) setZoom(1); break;
      case 'f': case 'F':
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
        break;
      case 'n': case 'N':
        notesOn = !notesOn;
        localStorage.setItem('mc_notes', notesOn ? 'on' : 'off');
        updateNotesBtn(); render();
        break;
      case 'd': case 'D':
        doubleMode = !doubleMode;
        localStorage.setItem('mc_double', doubleMode ? 'on' : 'off');
        updateViewBtn(); render();
        break;
      case 'Escape': closePopup(); break;
    }
  });

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
  }

  /* ============================================================
     INIT
     ============================================================ */
  currentPage = restoreProgress();

  loadNotes().then((n) => {
    notes = n || {};
    render();
  });

  if (MOBILE) {
    setTimeout(() => {
      document.body.classList.remove('intro');
    }, 1200);
  }
})();