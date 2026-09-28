/* ============================================================
   Suoni UI sintetizzati (Web Audio) · Traduzioni di M.C.
   ============================================================ */
(function () {
  let ctx = null;
  let enabled = localStorage.getItem('mc_sound') !== 'off';

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function beep(freq, dur, type, vol) {
    const c = ensure(); if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type || 'triangle';
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.55), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.06, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }

  window.MCSound = {
    isEnabled: () => enabled,
    toggle() {
      enabled = !enabled;
      localStorage.setItem('mc_sound', enabled ? 'on' : 'off');
      if (enabled) beep(880, 0.12, 'sine', 0.05);
      return enabled;
    },
    click()  { if (enabled) beep(660, 0.08, 'triangle', 0.05); },
    page()   { if (enabled) beep(320, 0.16, 'sine', 0.06); },
    note()   { if (enabled) beep(1180, 0.10, 'sine', 0.05); },
    open()   { if (enabled) beep(520, 0.22, 'sine', 0.05); },
    error()  { if (enabled) beep(160, 0.22, 'sawtooth', 0.04); }
  };
})();