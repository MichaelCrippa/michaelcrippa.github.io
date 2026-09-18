/* ═══════════════════════════════════════════════════════════
   漫画リーダー · Manga Reader
   Un unico file JS che rileva da sé se siamo nella pagina
   libreria (index.html) o nel lettore (reader.html).
   ═══════════════════════════════════════════════════════════ */
console.log('[manga-reader] app start');

/* ═══════════ CONFIG ═══════════ */
const CONFIG = {
    githubRepo: null,
    translator: "Michael Crippa",
    libraryTitle: "作品集",
    librarySubtitle: "Raccolta delle traduzioni",
    libraryDescription: "Ogni volume è completamente tradotto e impaginato. Seleziona un'opera per iniziare a leggere.",
    excludeFromPages: /cover|copertina/i,

    volumes: [
        {
            id: "alya-vol-1",
            series: "Alya Sometimes Hides Her Feelings in Russian",
            seriesJp: "時々ボソッとロシア語でデレる隣のアーリャさん",
            volume: 1,
            volumeLabel: "Volume 1",
            path: "alya/vol-01",
            cover: "alya/vol-01/cover.png",
            status: "complete",
            pages: null,

            notes: {
                1: [
        { x: 4.5,  y: 3.5,  title: "原作 燦々SUN", text: "Opera originale: Sansan SUN" },
        { x: 4.5,  y: 9,    title: "漫画 手名町紗帆", text: "Manga: Saho Tenamachi" },
        { x: 4.5,  y: 13.5, title: "キャラクター原案 ももこ", text: "Character design originale: Momoko" },
        { x: 88,   y: 22,   title: "時々ボソッとロシア語でデレる隣のアーリャさん", text: "Alya Sometimes Hides Her Feelings in Russian" },
        { x: 24,   y: 80,   title: "Иногда Аля внезапно кокетничает по-русски", text: "A volte Alya improvvisamente civetta in russo" }
    ],
    2: [],
    3: [
        { x: 18,   y: 15,   title: "時々ボソッとロシア語でデレる隣のアーリャさん", text: "Alya Sometimes Hides Her Feelings in Russian" },
        { x: 7.5,  y: 22,   title: "Иногда Аля внезапно кокетничает по-русски", text: "A volte Alya improvvisamente civetta in russo" }
    ],
    4: [
        { x: 50,   y: 11,   title: "Иногда Аля внезапно кокетничает по-русски", text: "A volte Alya improvvisamente civetta in russo" },
        { x: 50,   y: 21,   title: "目次", text: "Indice" },
        { x: 82,   y: 45,   title: "第1話 · 孤高のお姫様と怠惰な隣人", text: "Capitolo 1 — La principessa altezzosa e il pigro vicino di casa" },
        { x: 73,   y: 45,   title: "第2話 · 無料ガチャって逃すと無性に悔しくない？", text: "Capitolo 2 — Non è tremendamente frustrante lasciarsi sfuggire un gacha gratis?" },
        { x: 65,   y: 45,   title: "第3話 · 別にぼっちじゃないぞ？①", text: "Capitolo 3 — Mica sono un tipo solitario, sai? ①" },
        { x: 57,   y: 45,   title: "第4話 · 別にぼっちじゃないぞ？②", text: "Capitolo 4 — Mica sono un tipo solitario, sai? ②" },
        { x: 48,   y: 45,   title: "第5話 · 別にぼっちじゃないぞ？③", text: "Capitolo 5 — Mica sono un tipo solitario, sai? ③" },
        { x: 40,   y: 45,   title: "第6話 · お巡りさん、こいつです①", text: "Capitolo 6 — Signor poliziotto, è questa persona qui! ①" },
        { x: 32,   y: 45,   title: "第7話 · お巡りさん、こいつです②", text: "Capitolo 7 — Signor poliziotto, è questa persona qui! ②" },
        { x: 24,   y: 45,   title: "第8話 · 姉妹百合、嫌いじゃないです①", text: "Capitolo 8 — Lo yuri tra sorelle non mi dispiace ①" },
        { x: 16,   y: 45,   title: "第9話 · 姉妹百合、嫌いじゃないです②", text: "Capitolo 9 — Lo yuri tra sorelle non mi dispiace ②" }
    ],
    5: [
        { x: 17,   y: 9,    title: "第1話", text: "Capitolo 1" },
        { x: 78,   y: 14,   title: "私立征領学園", text: "Istituto Privato Seiryou" },
        { x: 85,   y: 44,   title: "日本最高峰の偏差値を誇る", text: "Vanta il punteggio di deviazione più alto del Giappone" },
        { x: 78,   y: 52,   title: "由緒正しき中高大一貫校", text: "Prestigioso istituto a ciclo unico: medie, superiori e università" },
        { x: 35,   y: 45,   title: "かつては貴族や華族の子女が通い", text: "Un tempo vi studiavano i figli di aristocratici e nobili" },
        { x: 15,   y: 48,   title: "卒業生は政財界で活躍する者も多い──", text: "Molti diplomati sono attivi nel mondo politico e finanziario──" },
        { x: 80,   y: 72,   title: "そんな傑物たちの中で", text: "E tra tali persone straordinarie" },
        { x: 20,   y: 80,   title: "一際輝く少女がいた…！", text: "C'era una ragazza che brillava più di tutte…!" }
    ],
    6: [
        { x: 91,   y: 8,    title: "第1話", text: "Capitolo 1" },
        { x: 83,   y: 20,   title: "孤高のお姫様と怠惰な隣人", text: "La principessa altezzosa e il pigro vicino di casa" }
    ],
    7: [
        { x: 86,   y: 70,   title: "おいあれ", text: "Oh, ehi!" },
        { x: 71,   y: 84,   title: "うおお！九条さんだ！", text: "Whoa! È Kujou-san!" },
        { x: 55,   y: 69,   title: "え 誰？", text: "Eh? Chi è?" },
        { x: 33,   y: 82,   title: "知らないのかお前！", text: "Non la conosci?!" }
    ],
    8: [
        { x: 75,   y: 12,   title: "アリサ・ミハイロヴナ・九条", text: "Alisa Mikhailovna Kujou" },
        { x: 70,   y: 62,   title: "ロシア人のお父上と日本人のお母上を持つ", text: "Figlia di un padre russo e di una madre giapponese" },
        { x: 48,   y: 72,   title: "奇跡の美少女だよ!!", text: "È una bellezza miracolosa!!" }
    ],
    9: [
        { x: 76,   y: 11,   title: "去年、中学三年生で転入してきて以降", text: "L'anno scorso, da quando è arrivata trasferendosi in terza media" },
        { x: 78,   y: 21,   title: "常に成績は学年一位！", text: "è sempre stata la prima della classe!" },
        { x: 19,   y: 13,   title: "おまけにスポーツ万能で", text: "E per giunta è portata per qualsiasi sport" },
        { x: 27,   y: 60,   title: "今年からは生徒会で会計を務める!!", text: "Da quest'anno ricopre il ruolo di tesoriere nel consiglio studentesco!!" },
        { x: 78,   y: 77,   title: "…その完璧超人ぶりを見て人は言う", text: "…Vedendo la sua perfezione sovrumana, la gente dice" },
        { x: 18,   y: 77,   title: "”孤高のお姫様”と…", text: "«La principessa altezzosa»…" }
    ],
    10: [
        { x: 80,   y: 17,   title: "孤高って…確かに美人でとっつきにくそうだけど話してみると案外気さくなんじゃや…", text: "«Altezzosa»... è vero che è bella e sembra inavvicinabile, ma a parlarci è sorprendentemente alla mano..." },
        { x: 14,   y: 17,   title: "おお…！", text: "Oooh...!" },
        { x: 79,   y: 38,   title: "あれは女子人気トップの安藤先輩！", text: "Quello è Andou-senpai, il ragazzo più popolare tra le ragazze!" },
        { x: 60,   y: 44,   title: "あの九条さんに挨拶するみたいだぞ！", text: "Sembra che stia salutando proprio Kujou-san!" },
        { x: 27,   y: 63,   title: "やあ おはよう 気持ちのいい朝だね", text: "Ehi, buongiorno. È una bella mattina, vero?" },
        { x: 32,   y: 78,   title: "…おはようございます", text: "...Buongiorno." }
    ],
    11: [
        { x: 80,   y: 12,   title: "はじめましてだよね 僕は二年の安藤", text: "Più o meno è la prima volta che ci parliamo, vero? Io sono Andou, del secondo anno" },
        { x: 38,   y: 12,   title: "前から話してみたくなってさ", text: "È da un po' che volevo parlarti" },
        { x: 15,   y: 16,   title: "よかったら昼休み一緒に…", text: "Se ti va, durante la pausa pranzo possiamo..." },
        { x: 27,   y: 40,   title: "結構です", text: "No, grazie" },
        { x: 86,   y: 82,   title: "ええ…あのモテ男を一蹴かよ…", text: "Eh... ha respinto il rubacuori con una sola parola..." },
        { x: 63,   y: 82,   title: "背筋が凍る…", text: "Mi si è gelata la schiena..." },
        { x: 24,   y: 83,   title: "これは厳しい…", text: "Questa è dura..." }
    ],
    12: [
        { x: 77,   y: 11,   title: "つ…つれないなあ じゃあせめて連絡先…", text: "C-Che freddezza... allora almeno il tuo contatto..." },
        { x: 72,   y: 20,   title: "いやこの花だけでも…！", text: "No aspetta, almeno questo fiore...!" },
        { x: 17,   y: 21,   title: "…もっと はっきり言った方が良いですか", text: "...Vuoi che te lo dica più chiaramente?" },
        { x: 75,   y: 39,   title: "私", text: "Io..." },
        { x: 25,   y: 52,   title: "あなたに興味ありませんので", text: "...non ho alcun interesse per te." },
        { x: 15,   y: 78,   title: "…あと", text: "...E inoltre" }
    ],
    13: [
        { x: 74,   y: 40,   title: "その服装、校則違反ですよ", text: "Quell'outfit è una violazione del regolamento scolastico" },
        { x: 73,   y: 82,   title: "Противный / 気持ち悪い", text: "Disgustoso / Che schifo" }
    ],
    14: [
        { x: 82,   y: 18,   title: ":…しょ", text: "Vabbè..." },
        { x: 74,   y: 25,   title: "勝負アリ〜〜〜〜〜！！", text: "La sfida è aperta!" },
        { x: 73,   y: 44,   title: "安藤先輩、チャレンジ失敗ですッ！", text: "Andou-senpai, tentativo fallito!" },
        { x: 22,   y: 23,   title: "いい戦いだった！", text: "È stata una bella battaglia!" },
        { x: 40,   y: 50,   title: "最後になんて言ったんだ？", text: "Cosa ha detto alla fine?" },
        { x: 15,   y: 53,   title: "ロシア語だろわからんけど", text: "Sarà russo, non lo capisco" },
        { x: 82,   y: 68,   title: "なるほど…まさに孤高のお姫様", text: "Capisco... proprio una principessa altezzosa" },
        { x: 50,   y: 88,   title: "どんだけ理想高いんだ…", text: "Quanto sono alti i suoi ideali..." },
        { x: 33,   y: 65,   title: "誰のものにもならないっていう安心感はあるよな", text: "C'è una sensazione di sicurezza nel fatto che non appartenga a nessuno" },
        { x: 14,   y: 68,   title: "ほんとそれアイドルより全然アイドル", text: "Esatto, è più idol degli idol stessi" },
        { x: 14,   y: 88,   title: "…でも", text: "...Ma" }
    ],
    15: [
        { x: 33,   y: 16,   title: "あんな女の子が興味を持つとしたら", text: "Se una ragazza così si interessasse a qualcuno" },
        { x: 27,   y: 22,   title: "いったいどんな男なんだろうな…", text: "Chissà che tipo di ragazzo sarebbe..." }
    ],
    16: [
        { x: 88,   y: 18,    title: "1年B組", text: "Classe 1-B" },
        { x: 72,   y: 9,    title: "おはよう久世くん", text: "Buongiorno, Kuze-kun" },
        { x: 74,   y: 38,   title: "おおーい…", text: "Ehi, ehilà..." },
        { x: 12,   y: 37,   title: "起きろ久世〜", text: "Svegliati, Kuze~" },
        { x: 88,   y: 65,   title: "うグァッ！？", text: "Ugh!?" },
        { x: 23,   y: 52,   title: "おはよう", text: "Buongiorno" },
        { x: 15,   y: 82,   title: "またアニメ見て夜更かししてたの？", text: "Sei rimasto di nuovo sveglio tutta la notte a guardare anime?" }
    ],
	17: [
        /* ═══ PANNELLO 1 — Presentazione di Kuze (RTL: dx → sx) ═══ */
        { x: 88,   y: 12,   title: "久世政近",
          text: "Kuze Masachika" },
        { x: 27,   y: 15,   title: "学園一の怠惰な生徒でありながら",
          text: "Nonostante sia lo studente più pigro dell'istituto" },
        { x: 27,   y: 38,   title: "なぜか九条アリサを愛称で呼ぶ唯一の存在",
          text: "Per qualche motivo, l'unico che chiama Alisa Kujou con un vezzeggiativo" },
        { x: 79,   y: 32,   title: "おお…おはようアーリャ",
          text: "Oh... buongiorno Alya" },
        { x: 62,   y: 39,   title: "まそんなとこだ",
          text: "Beh, più o meno è così" },

        /* ═══ PANNELLO 2 — Alya lo sgrida (RTL: dx → sx) ═══ */
        { x: 88,   y: 58,   title: "ただし彼女からの当たりはちゃんとキツい",
          text: "Tuttavia, i modi con cui lei lo tratta sono piuttosto duri" },
        { x: 43,   y: 52,   title: "本当にだらしないわね",
          text: "Sei davvero uno sfaticato" },
        { x: 13,   y: 60,   title: "いや〜オタ友との感想会が盛り上がりすぎてな",
          text: "Eh... la sessione di commenti con gli amici otaku si è protratta troppo" },

        /* ═══ PANNELLO 3 — Kuze si giustifica (RTL: dx → sx) ═══ */
        { x: 88,   y: 73,   title: "気づいたら2時間も通話してた",
          text: "Prima che me ne accorgessi, ho parlato al telefono per 2 ore" },
        { x: 38,   y: 78,   title: "外めちゃ明るいっスね",
          text: "Fuori è un sacco luminoso, eh" },
        { x: 25,   y: 85,   title: "なるほど こうして馬鹿が出来上がるのね",
          text: "Capisco, ecco come si diventa scemi" }
    ],
            }
        }
    ]
};

/* ═══════════ HELPERS ═══════════ */
const $ = id => document.getElementById(id);
function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function fetchWithTimeout(url, ms, opts = {}) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    return fetch(url, { ...opts, signal: ctrl.signal }).finally(() => clearTimeout(t));
}
function detectRepo() {
    if (CONFIG.githubRepo) return CONFIG.githubRepo;
    const host = location.hostname;
    if (host.endsWith('.github.io')) {
        const user = host.replace('.github.io','');
        const path = location.pathname.replace(/^\/|\/$/g,'').split('/')[0];
        if (user && path && path !== 'reader.html' && path !== 'index.html') return `${user}/${path}`;
        if (user) return `${user}/${user}.github.io`;
    }
    return null;
}
const REPO = detectRepo();
const BRANCH = 'main';
console.log('[manga-reader] repo:', REPO);

/* ═══════════ SOUND ENGINE ═══════════ */
const SoundEngine = (() => {
    let ctx = null, enabled = true, master = null, lastPlay = 0;
    function init() {
        if (ctx) return ctx;
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        try { ctx = new AC(); master = ctx.createGain(); master.gain.value = 0.32; master.connect(ctx.destination); } catch (e) { ctx = null; }
        return ctx;
    }
    function resume() { if (ctx && ctx.state === 'suspended') ctx.resume().catch(()=>{}); }
    function kachi(vol = 1) {
        const c = init(); if (!c) return; resume();
        const t = c.currentTime;
        const g = c.createGain(); g.gain.value = vol; g.connect(master);
        const dur = 0.045;
        const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/d.length, 5);
        const noise = c.createBufferSource(); noise.buffer = buf;
        const bp = c.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value = 2400 + Math.random()*500; bp.Q.value = 4;
        const ng = c.createGain(); ng.gain.value = 0.55;
        noise.connect(bp).connect(ng).connect(g); noise.start(t); noise.stop(t + dur);
        const osc = c.createOscillator(); osc.type = 'triangle';
        const f0 = 720 + Math.random()*90;
        osc.frequency.setValueAtTime(f0, t); osc.frequency.exponentialRampToValueAtTime(f0*0.32, t + 0.07);
        const og = c.createGain();
        og.gain.setValueAtTime(0.38, t); og.gain.exponentialRampToValueAtTime(0.0005, t + 0.09);
        osc.connect(og).connect(g); osc.start(t); osc.stop(t + 0.1);
    }
    function chin(vol = 1) {
        const c = init(); if (!c) return; resume();
        const t = c.currentTime;
        const g = c.createGain(); g.gain.value = vol; g.connect(master);
        [1150 + Math.random()*40, 2310, 3480].forEach((f, i) => {
            const osc = c.createOscillator(); osc.type = 'sine'; osc.frequency.value = f;
            const og = c.createGain(); const peak = 0.24 / (i + 1);
            og.gain.setValueAtTime(0.0001, t); og.gain.exponentialRampToValueAtTime(peak, t + 0.005);
            og.gain.exponentialRampToValueAtTime(0.0001, t + 0.38 + i*0.05);
            osc.connect(og).connect(g); osc.start(t); osc.stop(t + 0.5);
        });
    }
    function don(vol = 1) {
        const c = init(); if (!c) return; resume();
        const t = c.currentTime;
        const g = c.createGain(); g.gain.value = vol * 0.9; g.connect(master);
        const osc = c.createOscillator(); osc.type = 'sine';
        osc.frequency.setValueAtTime(95, t); osc.frequency.exponentialRampToValueAtTime(45, t + 0.18);
        const og = c.createGain();
        og.gain.setValueAtTime(0.0001, t); og.gain.exponentialRampToValueAtTime(0.65, t + 0.008);
        og.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
        osc.connect(og).connect(g); osc.start(t); osc.stop(t + 0.4);
    }
    function ko(vol = 1) {
        const c = init(); if (!c) return; resume();
        const t = c.currentTime;
        const g = c.createGain(); g.gain.value = vol * 0.55; g.connect(master);
        const osc = c.createOscillator(); osc.type = 'square'; osc.frequency.value = 3200 + Math.random()*400;
        const og = c.createGain();
        og.gain.setValueAtTime(0.18, t); og.gain.exponentialRampToValueAtTime(0.0001, t + 0.026);
        osc.connect(og).connect(g); osc.start(t); osc.stop(t + 0.03);
    }
    const sounds = { kachi, chin, don, ko };
    return {
        play(name, vol) {
            if (!enabled) return;
            const fn = sounds[name] || sounds.kachi;
            const now = performance.now();
            if (name !== 'chin' && name !== 'don' && now - lastPlay < 22) return;
            lastPlay = now;
            try { fn(vol); } catch (e) {}
        },
        setEnabled(v) { enabled = !!v; },
        isEnabled() { return enabled; }
    };
})();

function pickClickSound(el) {
    if (!el) return 'kachi';
    if (el.dataset && el.dataset.sound) return el.dataset.sound;
    const id = el.id || '';
    const cl = el.classList;
    if (id === 'mp-play' || id === 'mp-sound' || (cl && cl.contains('volume-card'))) return 'chin';
    if (id === 'mp-collapse' || id === 'mp-mini' || id === 'mp-hide' || id === 'reopen-player-btn') return 'don';
    if (id === 'reader-dual-toggle') return 'don';
    if (cl && (cl.contains('mp-item') || cl.contains('mp-suggest') || cl.contains('note-dot') || cl.contains('note-close'))) return 'ko';
    return 'kachi';
}

document.addEventListener('click', (e) => {
    const el = e.target && e.target.closest && e.target.closest('button, .mp-suggest, .mp-item, .volume-card, .header-btn, .note-dot');
    if (!el) return;
    if (el.disabled) return;
    SoundEngine.play(pickClickSound(el));
}, true);

['pointerdown','keydown','touchstart'].forEach(ev => {
    document.addEventListener(ev, () => {
        try {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return;
            if (!window.__soundCtx) window.__soundCtx = new AC();
            if (window.__soundCtx.state === 'suspended') window.__soundCtx.resume();
        } catch (e) {}
    }, { once: true, capture: true });
});

document.addEventListener('contextmenu', (e) => {
    const t = e.target;
    if (t.tagName === 'IMG' || (t.closest && t.closest('#transform-area'))) {
        e.preventDefault(); return false;
    }
}, true);
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') { e.preventDefault(); return false; }
}, true);
document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || e.keyCode === 123) { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) { e.preventDefault(); return false; }
    if (e.ctrlKey && ['u','U','s','S'].includes(e.key)) { e.preventDefault(); return false; }
}, true);

/* ═══════════ CARICAMENTO PAGINE ═══════════ */
const pageCache = {};

async function listPagesFromGitHub(vol) {
    if (!REPO) throw new Error('repo non rilevato');
    const url = `https://api.github.com/repos/${REPO}/contents/${vol.path}?ref=${BRANCH}`;
    const r = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const items = await r.json();
    if (!Array.isArray(items)) throw new Error('formato inatteso');
    const excludeRe = CONFIG.excludeFromPages || /cover|copertina/i;
    const images = items
        .filter(it => it.type === 'file' && /\.(jpe?g|png|webp|gif|avif)$/i.test(it.name))
        .filter(it => !excludeRe.test(it.name))
        .sort((a,b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
    console.log('[manga-reader] pagine trovate:', images.length);
    if (!images.length) throw new Error('nessuna immagine trovata');
    return images.map(it => it.download_url || `${vol.path}/${it.name}`);
}

async function listPagesFromProbe(vol, onProgress) {
    const patterns = [
        n => `${vol.path}/${String(n).padStart(3,'0')}.png`,
        n => `${vol.path}/${String(n).padStart(3,'0')}.jpg`,
        n => `${vol.path}/${String(n).padStart(2,'0')}.png`,
        n => `${vol.path}/${String(n).padStart(2,'0')}.jpg`,
        n => `${vol.path}/${n}.png`,
        n => `${vol.path}/${n}.jpg`
    ];
    const urls = [];
    for (let n = 1; n <= 500; n++) {
        let found = false;
        for (const p of patterns) {
            const u = p(n);
            try {
                const r = await fetchWithTimeout(u, 4000, { method: 'HEAD' });
                if (r.ok) { urls.push(u); found = true; break; }
            } catch (e) {}
        }
        if (!found) break;
        if (onProgress && n % 10 === 0) onProgress(n);
    }
    if (!urls.length) throw new Error('nessuna pagina trovata');
    return urls;
}

async function getPagesForVolume(vol, onProgress) {
    if (pageCache[vol.id]) return pageCache[vol.id];
    let urls;
    try {
        urls = await listPagesFromGitHub(vol);
    } catch (e) {
        console.warn('[manga-reader] GitHub API fallita, uso probe:', e.message);
        urls = await listPagesFromProbe(vol, onProgress);
    }
    pageCache[vol.id] = urls;
    return urls;
}

/* ═══════════ SHARED UI (player + info panel) ═══════════ */
const MUSIC_PLAYER_HTML = `
<div id="music-player">
    <button id="mp-mini" title="Apri player">音</button>
    <div id="mp-panel">
        <div class="mp-header" id="mp-header">
            <div>
                <span class="mp-title-jp">音楽</span>
                <span class="mp-title-it">Radio · Audius</span>
            </div>
            <div class="mp-controls-corner">
                <button class="mp-collapse" id="mp-sound" title="Suoni interfaccia">♪</button>
                <button class="mp-collapse" id="mp-hide" title="Nascondi player">×</button>
                <button class="mp-collapse" id="mp-collapse" title="Riduci">−</button>
            </div>
        </div>
        <div class="mp-now">
            <div class="mp-now-label">再生中</div>
            <div class="mp-now-title" id="mp-now-title">— Nessun brano —</div>
            <div class="mp-now-artist" id="mp-now-artist">Cerca una radio o un brano</div>
            <div class="mp-engine" id="mp-engine"></div>
        </div>
        <div class="mp-progress">
            <span class="mp-time" id="mp-time-cur">0:00</span>
            <input type="range" class="mp-seek" id="mp-seek" min="0" max="100" value="0" step="0.1">
            <span class="mp-time" id="mp-time-dur">0:00</span>
        </div>
        <div class="mp-controls">
            <button class="mp-btn" id="mp-shuffle" title="Casuale">⤨</button>
            <button class="mp-btn" id="mp-prev" title="Precedente">⏮</button>
            <button class="mp-btn mp-play-btn" id="mp-play" title="Play / Pausa">▶</button>
            <button class="mp-btn" id="mp-next" title="Successivo">⏭</button>
            <button class="mp-btn" id="mp-repeat" title="Ripeti">↻</button>
        </div>
        <div class="mp-volume">
            <button class="mp-btn" id="mp-mute" title="Muto">🔊</button>
            <input type="range" class="mp-vol" id="mp-vol" min="0" max="100" value="70">
        </div>
        <div class="mp-search">
            <div class="mp-search-row">
                <input type="text" class="mp-search-input" id="mp-search-input" placeholder="曲名・アーティスト…" autocomplete="off">
                <button class="mp-search-btn" id="mp-search-btn" title="Cerca">🔍</button>
            </div>
            <div class="mp-search-hint" id="mp-search-hint">Radio + Audius</div>
            <div class="mp-suggests">
                <span class="mp-suggest" data-q="lofi">lofi</span>
                <span class="mp-suggest" data-q="jazz">jazz</span>
                <span class="mp-suggest" data-q="city pop">city pop</span>
                <span class="mp-suggest" data-q="anime">anime</span>
                <span class="mp-suggest" data-q="classical">classica</span>
                <span class="mp-suggest" data-q="synthwave">synthwave</span>
            </div>
        </div>
        <div class="mp-list-header" id="mp-list-header" style="display:none;">
            <button class="mp-back" id="mp-back">← 再生リスト</button>
            <span id="mp-list-title">検索結果</span>
        </div>
        <div class="mp-playlist" id="mp-playlist">
            <div class="mp-empty">再生リストは空です。</div>
        </div>
    </div>
    <audio id="audio-engine" preload="auto"></audio>
</div>`;

const INFO_PANEL_HTML = `
<div id="info-panel">
    <div class="info-card">
        <button class="info-close" id="info-close">×</button>
        <h3>漫画リーダー</h3>
        <p class="info-sub">Informazioni</p>
        <div id="info-content">
            <p>Questo è un progetto amatoriale di traduzione e impaginazione di manga. Ogni volume è stato tradotto e adattato con cura per i lettori italiani.</p>
            <p>Le scan originali non sono state modificate. Le traduzioni sono disponibili come <strong>note interattive</strong>: clicca sui pallini rossi numerati che appaiono sulle pagine per leggere il testo tradotto. Puoi nascondere tutte le note con il tasto <strong>注</strong> in alto a destra.</p>
            <p>Il lettore supporta <strong>zoom</strong> (pizzica con due dita su mobile), <strong>pan</strong>, navigazione da <strong>tastiera</strong>, <strong>swipe</strong>, <strong>modalità doppia pagina</strong> (tasto <strong>双</strong>), e <strong>musica di sottofondo</strong> integrata.</p>
            <div class="credits">
                <strong>Traduzione &amp; impaginazione</strong>
                <span class="name">Michael Crippa</span>
            </div>
        </div>
    </div>
</div>`;

function initSharedUI({ inReader = false } = {}) {
    const mount = $('shared-ui');
    if (!mount) return;
    mount.innerHTML = MUSIC_PLAYER_HTML + INFO_PANEL_HTML;

    // Info panel listeners
    const panel = $('info-panel');
    const aboutBtn = $('about-btn');
    const readerInfoBtn = $('reader-info');
    if (aboutBtn) aboutBtn.addEventListener('click', () => panel.classList.add('show'));
    if (readerInfoBtn) readerInfoBtn.addEventListener('click', () => panel.classList.add('show'));
    $('info-close').addEventListener('click', () => panel.classList.remove('show'));
    panel.addEventListener('click', e => { if (e.target === panel) panel.classList.remove('show'); });

    initMusicPlayer({ inReader });
}

/* ═══════════ MUSIC PLAYER ═══════════ */
function initMusicPlayer({ inReader = false } = {}) {
    const musicPlayer = $('music-player');
    const audioEngine = $('audio-engine');
    if (!musicPlayer || !audioEngine) return;

    const RADIO_API = 'https://api.radio-browser.info';
    let playlist = [], currentTrack = -1, shuffleOn = false, repeatMode = 0;
    let isSeeking = false, seekTimer = null, lastVolume = 70, muted = false;
    let listView = 'playlist', searchResults = [], searchAbort = null;

    if (inReader) musicPlayer.classList.add('in-reader');

    try {
        if (localStorage.getItem('mp-hidden') === '1') {
            musicPlayer.classList.add('hidden-by-user');
            const rb = $('reopen-player-btn');
            if (rb) rb.style.display = '';
        }
    } catch(e){}

    function formatTime(s){if(!s||isNaN(s)||s<0||!isFinite(s))return '0:00';s=Math.floor(s);const m=Math.floor(s/60),sec=s%60;return `${m}:${sec.toString().padStart(2,'0')}`;}
    function setHint(text,cls){const el=$('mp-search-hint');el.textContent=text;el.className='mp-search-hint'+(cls?' '+cls:'');}
    function setEngineStatus(text,cls){const el=$('mp-engine');el.textContent=text||'';el.className='mp-engine'+(cls?' '+cls:'');}

    async function searchRadio(query){
        const url=`${RADIO_API}/json/stations/search?name=${encodeURIComponent(query)}&limit=25&hidebroken=true&order=votes&reverse=true`;
        const r=await fetchWithTimeout(url,9000);
        if(!r.ok)throw new Error('radio HTTP '+r.status);
        const data=await r.json();
        if(!Array.isArray(data))throw new Error('radio formato');
        return data.map(s=>({source:'radio',id:s.stationuuid,title:(s.name||'').trim(),artist:[s.country||s.countrycode,s.tags?String(s.tags).split(',')[0]:''].filter(Boolean).join(' · ')||'Radio',thumbnail:s.favicon||'',duration:0,streamUrl:s.url_resolved||s.url})).filter(x=>x.streamUrl&&x.title);
    }
    let audiusHost=null;
    async function getAudiusHost(){
        if(audiusHost)return audiusHost;
        const r=await fetchWithTimeout('https://api.audius.co/',6000);
        if(!r.ok)throw new Error('audius host HTTP '+r.status);
        const j=await r.json();
        if(!j||!Array.isArray(j.data)||!j.data.length)throw new Error('audius no host');
        audiusHost=j.data[0];return audiusHost;
    }
    async function searchAudius(query){
        const host=await getAudiusHost();
        const r=await fetchWithTimeout(`${host}/v1/tracks/search?query=${encodeURIComponent(query)}&app_name=MangaReader&limit=20`,9000);
        if(!r.ok)throw new Error('audius HTTP '+r.status);
        const j=await r.json();
        if(!Array.isArray(j.data))throw new Error('audius formato');
        return j.data.map(t=>({source:'audius',id:t.id,title:t.title||'',artist:t.user?.name||t.user?.handle||'',thumbnail:t.artwork?.['150x150']||t.artwork?.['480x480']||'',duration:t.duration||0,streamUrl:`${host}/v1/tracks/${t.id}/stream?app_name=MangaReader`})).filter(x=>x.title);
    }
    async function searchAll(query){
        const errors=[];
        const [radioRes,audiusRes]=await Promise.allSettled([searchRadio(query),searchAudius(query)]);
        let radio=[],audius=[];
        if(radioRes.status==='fulfilled')radio=radioRes.value;else errors.push('radio: '+(radioRes.reason?.message||'err'));
        if(audiusRes.status==='fulfilled')audius=audiusRes.value;else errors.push('audius: '+(audiusRes.reason?.message||'err'));
        const combined=[...radio,...audius];
        if(!combined.length)throw new Error(errors.join(' | ')||'nessun risultato');
        return {results:combined,via:`radio:${radio.length} · audius:${audius.length}`};
    }
    async function doSearch(){
        const input=$('mp-search-input');const query=input.value.trim();if(!query)return;
        if(searchAbort)searchAbort.abort();searchAbort=new AbortController();const thisAbort=searchAbort;
        renderSearchLoading(query);$('mp-search-btn').disabled=true;
        setHint('Interrogo Radio + Audius…','working');
        try{
            const out=await searchAll(query);
            if(thisAbort.signal.aborted)return;
            searchResults=out.results;renderSearchResults();
            setHint(`${out.results.length} risultati · ${out.via}`,'ok');
        }catch(e){
            if(thisAbort.signal.aborted)return;
            searchResults=[];
            $('mp-playlist').innerHTML='<div class="mp-empty">Ricerca non disponibile.<br><span style="font-size:9px;opacity:.7;">'+escapeHtml(String(e.message||e).split(' | ').slice(0,2).join(' · '))+'</span></div>';
            setHint('Errore di rete','error');
        }finally{$('mp-search-btn').disabled=false;}
    }

    function stopAudioEngine(){try{audioEngine.pause();}catch(e){}audioEngine.removeAttribute('src');try{audioEngine.load();}catch(e){}}
    function playViaAudio(track){
        stopSeekTimer();
        setEngineStatus(track.source==='radio'?'Radio · preparazione…':'Audius · preparazione…','warn');
        audioEngine.onerror=null;audioEngine.onplaying=null;audioEngine.onloadedmetadata=null;
        let settled=false;
        let timeoutId=setTimeout(()=>{if(settled)return;setEngineStatus('Timeout stream','err');setHint('Stream non risponde','error');},12000);
        audioEngine.onerror=()=>{if(settled)return;settled=true;clearTimeout(timeoutId);setEngineStatus('Errore stream','err');};
        audioEngine.onloadedmetadata=()=>{if(isFinite(audioEngine.duration))$('mp-time-dur').textContent=formatTime(audioEngine.duration);};
        audioEngine.onplaying=()=>{
            if(settled)return;settled=true;clearTimeout(timeoutId);
            setEngineStatus(track.source==='radio'?'📻 Radio · in onda':'♪ Audius · in riproduzione','ok');
            $('mp-play').textContent='⏸';$('mp-mini').classList.add('playing');
            startSeekTimer();
        };
        try{
            audioEngine.src=track.streamUrl;
            audioEngine.volume=parseInt($('mp-vol').value)/100;
            const p=audioEngine.play();
            if(p&&p.catch)p.catch(err=>{});
        }catch(e){setEngineStatus('Errore avvio','err');}
    }
    function handleTrackEnd(){
        if(repeatMode===2){audioEngine.currentTime=0;audioEngine.play();}
        else if(shuffleOn&&playlist.length>1)playRandom();
        else if(currentTrack<playlist.length-1)playTrack(currentTrack+1);
        else if(repeatMode===1)playTrack(0);
    }
    function playTrack(index){
        if(index<0||index>=playlist.length)return;
        currentTrack=index;
        const t=playlist[index];
        $('mp-now-title').textContent=t.title||'—';
        $('mp-now-artist').textContent=t.artist||'';
        document.title=t.title?`♪ ${t.title} · 漫画リーダー`:'漫画リーダー · Manga Reader';
        if(listView==='playlist')renderPlaylist();
        playViaAudio(t);
    }
    function playRandom(){if(playlist.length<2)return playTrack(0);let n;do{n=Math.floor(Math.random()*playlist.length);}while(n===currentTrack);playTrack(n);}
    function playNext(skip){if(!playlist.length)return;if(shuffleOn)return playRandom();if(currentTrack<playlist.length-1)playTrack(currentTrack+1);else if(repeatMode===1)playTrack(0);else if(skip)playTrack(0);}
    function playPrev(){if(!playlist.length)return;if(audioEngine.currentTime>3&&isFinite(audioEngine.duration)){audioEngine.currentTime=0;return;}if(currentTrack>0)playTrack(currentTrack-1);else playTrack(playlist.length-1);}
    function togglePlay(){
        if(!playlist.length)return;
        if(audioEngine.paused){
            if(!audioEngine.src||audioEngine.src==='')playTrack(currentTrack>=0?currentTrack:0);
            else audioEngine.play();
        }else audioEngine.pause();
    }
    function startSeekTimer(){stopSeekTimer();seekTimer=setInterval(()=>{
        if(isSeeking)return;
        const isRadio=currentTrack>=0&&playlist[currentTrack]?.source==='radio';
        if(isRadio){$('mp-time-cur').textContent='●';$('mp-time-dur').textContent='LIVE';$('mp-seek').value=0;return;}
        const cur=audioEngine.currentTime||0,dur=audioEngine.duration||0;
        if(dur>0&&isFinite(dur)){
            $('mp-seek').value=(cur/dur)*100;
            $('mp-time-cur').textContent=formatTime(cur);
            $('mp-time-dur').textContent=formatTime(dur);
        }
    },400);}
    function stopSeekTimer(){if(seekTimer){clearInterval(seekTimer);seekTimer=null;}}

    function renderItemBadge(source){
        if(source==='radio')return '<span class="mp-item-badge radio">Radio</span>';
        if(source==='audius')return '<span class="mp-item-badge audius">Audius</span>';
        return '';
    }
    function renderPlaylist(){
        listView='playlist';$('mp-list-header').style.display='none';
        const el=$('mp-playlist');
        if(!playlist.length){el.innerHTML='<div class="mp-empty">再生リストは空です。</div>';return;}
        el.innerHTML=playlist.map((t,i)=>{
            const thumb=t.thumbnail?`<img class="mp-item-thumb" src="${escapeHtml(t.thumbnail)}" alt="" loading="lazy" onerror="this.style.opacity=.25">`:`<div class="mp-item-thumb">${t.source==='radio'?'📻':'♪'}</div>`;
            const dur=t.source==='radio'?'<span class="mp-item-live">● LIVE</span>':(t.duration?`<span class="mp-item-dur">${formatTime(t.duration)}</span>`:'');
            return `<div class="mp-item ${i===currentTrack?'current':''}" data-index="${i}">${thumb}<span class="mp-item-num">${i===currentTrack?'▶':(i+1).toString().padStart(2,'0')}</span><div class="mp-item-info"><div class="mp-item-title">${renderItemBadge(t.source)} ${escapeHtml(t.title||'Brano '+(i+1))}</div><div class="mp-item-artist">${escapeHtml(t.artist||'—')}</div></div>${dur}<button class="mp-item-remove" data-remove="${i}" title="Rimuovi">×</button></div>`;
        }).join('');
    }
    function renderSearchResults(){
        listView='search';$('mp-list-header').style.display='flex';$('mp-list-title').textContent=`検索結果 · ${searchResults.length}`;
        const el=$('mp-playlist');
        if(!searchResults.length){el.innerHTML='<div class="mp-empty">Nessun risultato.</div>';return;}
        el.innerHTML=searchResults.map((r,i)=>{
            const inP=playlist.some(t=>t.source===r.source&&t.id===r.id);
            const thumb=r.thumbnail?`<img class="mp-item-thumb" src="${escapeHtml(r.thumbnail)}" alt="" loading="lazy" onerror="this.style.opacity=.25">`:`<div class="mp-item-thumb">${r.source==='radio'?'📻':'♪'}</div>`;
            const dur=r.source==='radio'?'<span class="mp-item-live">● LIVE</span>':(r.duration?`<span class="mp-item-dur">${formatTime(r.duration)}</span>`:'');
            return `<div class="mp-item" data-result="${i}">${thumb}<div class="mp-item-info"><div class="mp-item-title">${renderItemBadge(r.source)} ${escapeHtml(r.title)}</div><div class="mp-item-artist">${escapeHtml(r.artist||'—')}</div></div>${dur}<button class="mp-item-add" data-add="${i}">${inP?'✓':'+'}</button></div>`;
        }).join('');
    }
    function renderSearchLoading(q){
        listView='search';$('mp-list-header').style.display='flex';$('mp-list-title').textContent='検索中…';
        $('mp-playlist').innerHTML=`<div class="mp-loading"><div class="mp-spinner"></div><div class="mp-loading-text">Cerco "${escapeHtml(q)}"…</div></div>`;
    }
    function addTrackToPlaylist(track){
        const existing=playlist.findIndex(t=>t.source===track.source&&t.id===track.id);
        if(existing>=0){playTrack(existing);return;}
        playlist.push(track);
        playTrack(playlist.length-1);
        if(listView==='search')renderSearchResults();
    }

    audioEngine.addEventListener('pause',()=>{$('mp-play').textContent='▶';$('mp-mini').classList.remove('playing');stopSeekTimer();});
    audioEngine.addEventListener('ended',()=>{$('mp-play').textContent='▶';$('mp-mini').classList.remove('playing');stopSeekTimer();handleTrackEnd();});

    $('mp-play').addEventListener('click',togglePlay);
    $('mp-next').addEventListener('click',()=>playNext());
    $('mp-prev').addEventListener('click',playPrev);
    $('mp-shuffle').addEventListener('click',e=>{shuffleOn=!shuffleOn;e.currentTarget.classList.toggle('active',shuffleOn);});
    $('mp-repeat').addEventListener('click',e=>{repeatMode=(repeatMode+1)%3;const btn=e.currentTarget;btn.classList.toggle('active',repeatMode!==0);btn.textContent=repeatMode===2?'1':'↻';});
    $('mp-mute').addEventListener('click',()=>{audioEngine.muted=!audioEngine.muted;muted=audioEngine.muted;$('mp-mute').textContent=muted?'🔇':'🔊';});
    $('mp-vol').addEventListener('input',e=>{const v=parseInt(e.target.value);lastVolume=v;audioEngine.volume=v/100;audioEngine.muted=false;muted=false;$('mp-mute').textContent=v===0?'🔇':'🔊';});
    const seekEl=$('mp-seek');
    seekEl.addEventListener('mousedown',()=>isSeeking=true);
    seekEl.addEventListener('touchstart',()=>isSeeking=true,{passive:true});
    seekEl.addEventListener('input',()=>{isSeeking=true;const d=audioEngine.duration||0;if(d>0&&isFinite(d))$('mp-time-cur').textContent=formatTime((seekEl.value/100)*d);});
    seekEl.addEventListener('change',()=>{const d=audioEngine.duration||0;if(d>0&&isFinite(d))audioEngine.currentTime=(seekEl.value/100)*d;isSeeking=false;});
    seekEl.addEventListener('mouseup',()=>isSeeking=false);
    seekEl.addEventListener('touchend',()=>isSeeking=false);
    $('mp-search-btn').addEventListener('click',doSearch);
    $('mp-search-input').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();doSearch();}e.stopPropagation();});
    document.querySelectorAll('.mp-suggest').forEach(el=>{
        el.addEventListener('click',()=>{$('mp-search-input').value=el.dataset.q;doSearch();});
    });
    $('mp-playlist').addEventListener('click',e=>{
        const removeBtn=e.target.closest('[data-remove]');
        if(removeBtn){e.stopPropagation();const idx=parseInt(removeBtn.getAttribute('data-remove'));playlist.splice(idx,1);
            if(idx===currentTrack){stopAudioEngine();currentTrack=-1;$('mp-now-title').textContent='— Nessun brano —';$('mp-now-artist').textContent='Cerca una radio o un brano';setEngineStatus('');}
            else if(idx<currentTrack)currentTrack--;
            renderPlaylist();return;}
        const addBtn=e.target.closest('[data-add]');
        if(addBtn){e.stopPropagation();const idx=parseInt(addBtn.getAttribute('data-add'));const r=searchResults[idx];if(r)addTrackToPlaylist(r);return;}
        const item=e.target.closest('.mp-item');if(!item)return;
        if(item.dataset.index!==undefined)playTrack(parseInt(item.dataset.index));
        else if(item.dataset.result!==undefined){const r=searchResults[parseInt(item.dataset.result)];if(r)addTrackToPlaylist(r);}
    });
    $('mp-back').addEventListener('click',renderPlaylist);
    $('mp-collapse').addEventListener('click',(e)=>{e.stopPropagation();$('mp-panel').style.display='none';$('mp-mini').style.display='flex';});

    function setPlayerHidden(hidden) {
        if (hidden) { musicPlayer.classList.add('hidden-by-user'); const rb=$('reopen-player-btn'); if(rb) rb.style.display=''; }
        else { musicPlayer.classList.remove('hidden-by-user'); const rb=$('reopen-player-btn'); if(rb) rb.style.display='none'; }
        try { localStorage.setItem('mp-hidden', hidden ? '1' : '0'); } catch(e){}
    }
    $('mp-hide').addEventListener('click',(e)=>{e.stopPropagation();setPlayerHidden(true);SoundEngine.play('don');});
    const reopenBtn = $('reopen-player-btn');
    if (reopenBtn) reopenBtn.addEventListener('click',(e)=>{e.stopPropagation();setPlayerHidden(false);SoundEngine.play('chin');});
    $('mp-mini').addEventListener('click',(e)=>{e.stopPropagation();if(musicPlayer.dataset.justDragged==='1')return;$('mp-panel').style.display='block';$('mp-mini').style.display='none';});
    $('mp-sound').addEventListener('click',(e)=>{
        e.stopPropagation();
        const next = !SoundEngine.isEnabled();
        SoundEngine.setEnabled(next);
        const btn = $('mp-sound');
        btn.textContent = next ? '♪' : '×';
        btn.classList.toggle('muted', !next);
        if (next) SoundEngine.play('chin');
    });
    audioEngine.volume=parseInt($('mp-vol').value)/100;

    (function makePlayerDraggable(){
        const player = musicPlayer;
        const header = $('mp-header');
        const mini = $('mp-mini');
        if (!player || !header) return;

        const grip = document.createElement('span');
        grip.className = 'mp-drag-grip';
        grip.textContent = '⋮⋮';
        grip.title = 'Trascina per spostare';
        const titleWrap = header.firstElementChild;
        if (titleWrap) {
            const firstChild = titleWrap.firstChild;
            if (firstChild && firstChild.nodeType === 1 && firstChild.tagName === 'SPAN') {
                firstChild.insertBefore(grip, firstChild.firstChild);
            } else {
                titleWrap.insertBefore(grip, titleWrap.firstChild);
            }
        }

        let dragging=false, offX=0, offY=0, dragStartX=0, dragStartY=0, dragMoved=false, dragSource=null;
        function startDrag(clientX, clientY, source){
            const rect = player.getBoundingClientRect();
            offX = clientX - rect.left; offY = clientY - rect.top;
            dragging = true; dragMoved = false;
            dragStartX = clientX; dragStartY = clientY; dragSource = source;
            player.classList.add('dragging');
            player.style.right='auto'; player.style.bottom='auto';
            player.style.left = rect.left+'px'; player.style.top = rect.top+'px';
            document.body.style.userSelect='none';
            document.body.style.cursor='grabbing';
        }
        function moveDrag(clientX, clientY){
            if (!dragging) return;
            if (!dragMoved) {
                const dx=clientX-dragStartX, dy=clientY-dragStartY;
                if (Math.hypot(dx,dy)>6) dragMoved=true;
            }
            const w=player.offsetWidth, h=player.offsetHeight;
            let x=clientX-offX, y=clientY-offY;
            x=Math.max(8,Math.min(window.innerWidth-w-8,x));
            y=Math.max(8,Math.min(window.innerHeight-h-8,y));
            player.style.left=x+'px'; player.style.top=y+'px';
        }
        function endDrag(){
            if (!dragging) return;
            dragging=false;
            const wasDragged=dragMoved, source=dragSource;
            dragSource=null; dragMoved=false;
            player.classList.remove('dragging');
            document.body.style.userSelect='';
            document.body.style.cursor='';
            if (wasDragged) {
                const rect=player.getBoundingClientRect();
                try {
                    localStorage.setItem('mp-pos', JSON.stringify({x:rect.left,y:rect.top}));
                    localStorage.setItem('mp-custom-pos','1');
                } catch(e){}
                player.classList.add('has-custom-pos');
                player.style.setProperty('--mp-custom-left', rect.left+'px');
                player.style.setProperty('--mp-custom-top', rect.top+'px');
            }
            if (source==='mini' && wasDragged) {
                player.dataset.justDragged='1';
                setTimeout(()=>{delete player.dataset.justDragged;},80);
            }
        }
        header.addEventListener('mousedown',(e)=>{if(e.target.closest('button'))return;e.preventDefault();startDrag(e.clientX,e.clientY,'header');});
        header.addEventListener('touchstart',(e)=>{if(e.target.closest('button'))return;const t=e.touches[0];startDrag(t.clientX,t.clientY,'header');},{passive:true});
        if (mini) {
            mini.addEventListener('mousedown',(e)=>startDrag(e.clientX,e.clientY,'mini'));
            mini.addEventListener('touchstart',(e)=>{const t=e.touches[0];startDrag(t.clientX,t.clientY,'mini');},{passive:true});
        }
        document.addEventListener('mousemove',(e)=>moveDrag(e.clientX,e.clientY));
        document.addEventListener('mouseup',endDrag);
        document.addEventListener('touchmove',(e)=>{if(!dragging)return;const t=e.touches[0];moveDrag(t.clientX,t.clientY);},{passive:true});
        document.addEventListener('touchend',endDrag);

        try {
            if (localStorage.getItem('mp-custom-pos')==='1') {
                const saved=JSON.parse(localStorage.getItem('mp-pos')||'null');
                if (saved && typeof saved.x==='number' && typeof saved.y==='number') {
                    const w=player.offsetWidth, h=player.offsetHeight;
                    const x=Math.max(8,Math.min(window.innerWidth-w-8,saved.x));
                    const y=Math.max(8,Math.min(window.innerHeight-h-8,saved.y));
                    player.style.right='auto'; player.style.bottom='auto';
                    player.style.left=x+'px'; player.style.top=y+'px';
                    player.classList.add('has-custom-pos');
                    player.style.setProperty('--mp-custom-left',x+'px');
                    player.style.setProperty('--mp-custom-top',y+'px');
                }
            }
        } catch(e){}

        window.addEventListener('resize',()=>{
            const rect=player.getBoundingClientRect();
            const w=player.offsetWidth, h=player.offsetHeight;
            let needFix=false, x=rect.left, y=rect.top;
            if (rect.right>window.innerWidth){x=window.innerWidth-w-8;needFix=true;}
            if (rect.bottom>window.innerHeight){y=window.innerHeight-h-8;needFix=true;}
            if (x<8){x=8;needFix=true;}
            if (y<8){y=8;needFix=true;}
            if (needFix && player.classList.contains('has-custom-pos')) {
                player.style.right='auto'; player.style.bottom='auto';
                player.style.left=x+'px'; player.style.top=y+'px';
                player.style.setProperty('--mp-custom-left',x+'px');
                player.style.setProperty('--mp-custom-top',y+'px');
            }
        });
    })();

    renderPlaylist();
}

/* ═══════════════════════════════════════════════════════════
   PAGINA LIBRERIA (index.html)
   ═══════════════════════════════════════════════════════════ */
function initLibraryPage() {
    console.log('[manga-reader] library init');
    initSharedUI({ inReader: false });

    if (CONFIG.libraryTitle) $('lib-jp-title').textContent = CONFIG.libraryTitle;
    if (CONFIG.librarySubtitle) $('lib-it-title').textContent = CONFIG.librarySubtitle;
    if (CONFIG.libraryDescription) $('lib-desc').textContent = CONFIG.libraryDescription;

    const grid = $('volume-grid');
    const empty = $('library-empty');

    if (!CONFIG.volumes || !CONFIG.volumes.length) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
        return;
    }
    empty.classList.add('hidden');

    let html = '';
    for (const v of CONFIG.volumes) {
        const hasCover = !!v.cover;
        const statusClass = v.status === 'complete' ? 'complete' : 'ongoing';
        const statusText = v.status === 'complete' ? 'Completo' : 'In corso';
        const pagesTxt = v.pages ? `${v.pages} pagine` : '—';

        const imgHtml = hasCover
            ? `<img class="cover-img" src="${escapeHtml(v.cover)}" alt="Copertina ${escapeHtml(v.series)}" loading="lazy">`
            : '';
        const placeholderHtml = `<div class="cover-placeholder"${hasCover ? ' style="display:none"' : ''}><span class="big">${v.volume}</span>${escapeHtml(v.seriesJp || v.series)}</div>`;

        html += `
            <div class="volume-card" data-volume-id="${escapeHtml(v.id)}">
                <div class="volume-cover">
                    ${imgHtml}
                    ${placeholderHtml}
                    <div class="volume-badge">VOL.${v.volume}</div>
                    <div class="volume-status ${statusClass}">${statusText}</div>
                </div>
                <div class="volume-info">
                    <h3 class="volume-title">${escapeHtml(v.series)}</h3>
                    <p class="volume-subtitle">${escapeHtml(v.seriesJp || '')}</p>
                    <div class="volume-meta">
                        <span>${escapeHtml(v.volumeLabel || ('Volume ' + v.volume))}</span>
                        <span class="pages">${pagesTxt}</span>
                    </div>
                </div>
            </div>
        `;
    }
    grid.innerHTML = html;

    grid.querySelectorAll('.cover-img').forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            const ph = img.parentElement.querySelector('.cover-placeholder');
            if (ph) ph.style.display = 'flex';
        });
    });

    grid.querySelectorAll('.volume-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-volume-id');
            if (!id) return;
            location.href = `reader.html?vol=${encodeURIComponent(id)}&p=1`;
        });
    });

    console.log('[manga-reader] griglia volumi renderizzata:', CONFIG.volumes.length);
}

/* ═══════════════════════════════════════════════════════════
   PAGINA LETTORE (reader.html)
   ═══════════════════════════════════════════════════════════ */
function initReaderPage() {
    console.log('[manga-reader] reader init');

    const params = new URLSearchParams(location.search);
    const volId = params.get('vol');
    const initialPage = parseInt(params.get('p')) || 1;

    const vol = CONFIG.volumes.find(v => v.id === volId);
    if (!vol) {
        console.warn('[manga-reader] volume non trovato, torno alla libreria');
        location.replace('index.html');
        return;
    }

    initSharedUI({ inReader: true });

    const readerView = $('reader-view');
    const transformArea = $('transform-area');
    const pagesContainer = $('pages-container');
    const pageLoading = $('page-loading');

    let currentPages = [];
    let currentIndex = 0;
    let scale = 1, pointX = 0, pointY = 0;
    let panning = false, startX = 0, startY = 0;
    let notesVisible = true;
    let dualPage = false;
    let loadToken = 0;
    const preloadCache = new Set();

    try { dualPage = localStorage.getItem('mr-dual-page') === '1'; } catch(e){}

    function updateURL() {
        const p = new URLSearchParams(location.search);
        p.set('vol', vol.id);
        p.set('p', String(currentIndex + 1));
        history.replaceState(null, '', '?' + p.toString());
    }

    let _gestureTimer = null;
    function startGesture() {
        transformArea.classList.add('gesturing');
        if (_gestureTimer) { clearTimeout(_gestureTimer); _gestureTimer = null; }
    }
    function endGesture() {
        if (_gestureTimer) clearTimeout(_gestureTimer);
        _gestureTimer = setTimeout(() => {
            transformArea.classList.remove('gesturing');
            _gestureTimer = null;
        }, 200);
    }

    let idleTimer = null;
    function resetIdleTimer() {
        if (!readerView.classList.contains('active')) return;
        readerView.classList.remove('notes-idle');
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            if (readerView.classList.contains('active')) readerView.classList.add('notes-idle');
        }, 2600);
    }
    ['pointermove','pointerdown','touchstart','touchmove','wheel'].forEach(ev => {
        document.addEventListener(ev, resetIdleTimer, { passive: true });
    });

    function updateDualToggleUI() {
        const btn = $('reader-dual-toggle');
        btn.classList.toggle('active', dualPage);
        btn.title = dualPage ? 'Modalità doppia pagina (attiva) · clicca per singola' : 'Modalità pagina singola · clicca per doppia';
    }

    function toggleDualPage() {
        dualPage = !dualPage;
        try { localStorage.setItem('mr-dual-page', dualPage ? '1' : '0'); } catch(e){}
        updateDualToggleUI();
        SoundEngine.play(dualPage ? 'chin' : 'don');
        displayPage();
    }
    $('reader-dual-toggle').addEventListener('click', toggleDualPage);

    function toggleNotes() {
        notesVisible = !notesVisible;
        if (!notesVisible) closeAllNotes();
        document.querySelectorAll('.notes-layer').forEach(nl => {
            nl.style.display = notesVisible ? '' : 'none';
        });
        const btn = $('reader-notes-toggle');
        btn.classList.toggle('off', !notesVisible);
        btn.title = notesVisible ? 'Nascondi note' : 'Mostra note';
        SoundEngine.play(notesVisible ? 'chin' : 'don');
    }
    $('reader-notes-toggle').addEventListener('click', toggleNotes);

    function getVisibleIndices() {
        if (!dualPage) return [currentIndex];
        if (currentIndex === 0) return [0];
        const idxs = [currentIndex];
        if (currentIndex + 1 < currentPages.length) idxs.push(currentIndex + 1);
        return idxs;
    }

    function preloadImage(url) {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = img.onerror = () => resolve();
            img.src = url;
        });
    }

    async function displayPage() {
        if (!currentPages.length) return;
        const myToken = ++loadToken;

        $('page-info').textContent = `${currentIndex + 1} / ${currentPages.length}`;
        $('page-input').value = currentIndex + 1;
        $('page-input').max = currentPages.length;
        updateNavButtons();
        updateURL();

        const indices = getVisibleIndices();
        await Promise.all(indices.map(i => preloadImage(currentPages[i])));
        if (myToken !== loadToken) return;

        pagesContainer.className = (dualPage && indices.length > 1) ? 'dual' : 'single';
        pagesContainer.innerHTML = '';

        indices.forEach(idx => {
            const slot = document.createElement('div');
            slot.className = 'page-slot';
            slot.dataset.idx = String(idx);

            const img = document.createElement('img');
            img.className = 'page-img loaded';
            img.src = currentPages[idx];
            img.draggable = false;
            img.alt = '';
            img.oncontextmenu = () => false;
            slot.appendChild(img);

            const nl = document.createElement('div');
            nl.className = 'notes-layer';
            nl.dataset.page = String(idx);
            slot.appendChild(nl);

            pagesContainer.appendChild(slot);
        });

        pageLoading.classList.add('hidden');
        document.querySelectorAll('.notes-layer').forEach(nl => {
            nl.style.display = notesVisible ? '' : 'none';
        });

        renderAllNotes();
        updateNotesScale();
        preloadAround();
    }

    function updateNavButtons() {
        $('nav-next').disabled = currentIndex === currentPages.length - 1;
        $('nav-prev').disabled = currentIndex === 0;
    }

    function updateNotesScale() {
        pagesContainer.style.setProperty('--cs', 1 / scale);
    }

    function preloadAround() {
        [currentIndex + 1, currentIndex + 2, currentIndex - 1, currentIndex - 2].forEach(i => {
            if (i < 0 || i >= currentPages.length) return;
            const u = currentPages[i];
            if (preloadCache.has(u)) return;
            preloadCache.add(u);
            const im = new Image();
            im.src = u;
        });
    }

    function nextPage() {
        if (currentIndex >= currentPages.length - 1) return;
        if (dualPage) {
            if (currentIndex === 0) currentIndex = 1;
            else currentIndex = Math.min(currentIndex + 2, currentPages.length - 1);
        } else currentIndex++;
        SoundEngine.play('kachi');
        displayPage();
    }
    function prevPage() {
        if (currentIndex <= 0) return;
        if (dualPage) {
            if (currentIndex <= 1) currentIndex = 0;
            else currentIndex = Math.max(0, currentIndex - 2);
        } else currentIndex--;
        SoundEngine.play('kachi');
        displayPage();
    }
    function jumpToPage() {
        let t = parseInt($('page-input').value);
        if (isNaN(t)) return;
        t = Math.max(1, Math.min(t, currentPages.length));
        currentIndex = t - 1;
        displayPage();
    }

    function clampPan() {
        if (scale <= 1) { pointX = 0; pointY = 0; return; }
        const aw = transformArea.clientWidth, ah = transformArea.clientHeight;
        const minX = aw * (1 - scale), minY = ah * (1 - scale);
        pointX = Math.max(minX, Math.min(0, pointX));
        pointY = Math.max(minY, Math.min(0, pointY));
    }
    function applyTransformNoClamp() {
        transformArea.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
        $('zoom-info').textContent = `${Math.round(scale * 100)}%`;
        updateNotesScale();
    }
    function updateTransform() { clampPan(); applyTransformNoClamp(); }
    function resetZoomAndPan() { scale = 1; pointX = 0; pointY = 0; updateTransform(); }
    function zoomIn() { zoomTo(scale * 1.25); }
    function zoomOut() { zoomTo(scale / 1.25); }
    function zoomTo(ns) {
        ns = Math.max(1, Math.min(ns, 5));
        const aw = transformArea.clientWidth, ah = transformArea.clientHeight;
        const cx = aw / 2, cy = ah / 2;
        const xs = (cx - pointX) / scale, ys = (cy - pointY) / scale;
        scale = ns;
        pointX = cx - xs * scale;
        pointY = cy - ys * scale;
        if (scale === 1) { pointX = 0; pointY = 0; }
        updateTransform();
    }

    function readerKeyHandler(e) {
        const ae = document.activeElement;
        const typing = ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA');
        if (typing) return;
        if (e.key === 'Escape') {
            const openNote = document.querySelector('.note.open');
            if (openNote) { closeNote(openNote); return; }
            closeReader();
        }
        else if (e.key === 'ArrowLeft') nextPage();
        else if (e.key === 'ArrowRight') prevPage();
        else if (e.key === '+' || e.key === '=') zoomIn();
        else if (e.key === '-') zoomOut();
        else if (e.key === '0') resetZoomAndPan();
        else if (e.key.toLowerCase() === 'n') toggleNotes();
        else if (e.key.toLowerCase() === 'd') toggleDualPage();
    }

    function closeReader() { location.href = 'index.html'; }
    $('reader-back').addEventListener('click', closeReader);
    $('nav-next').addEventListener('click', nextPage);
    $('nav-prev').addEventListener('click', prevPage);
    $('nav-jump').addEventListener('click', jumpToPage);
    $('page-input').addEventListener('keydown', e => { if (e.key === 'Enter') jumpToPage(); });
    $('nav-zoomin').addEventListener('click', () => { startGesture(); zoomIn(); endGesture(); });
    $('nav-zoomout').addEventListener('click', () => { startGesture(); zoomOut(); endGesture(); });
    $('nav-zoomreset').addEventListener('click', () => { startGesture(); resetZoomAndPan(); endGesture(); });

    transformArea.addEventListener('wheel', e => {
        if (!readerView.classList.contains('active')) return;
        e.preventDefault();
        startGesture();
        const xs = (e.clientX - pointX) / scale;
        const ys = (e.clientY - pointY) / scale;
        let ns = scale * (-e.deltaY > 0 ? 1.1 : 0.9);
        ns = Math.max(1, Math.min(ns, 5));
        scale = ns;
        pointX = e.clientX - xs * scale;
        pointY = e.clientY - ys * scale;
        if (scale === 1) { pointX = 0; pointY = 0; }
        updateTransform();
        endGesture();
    }, { passive: false });

    transformArea.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        if (e.target.closest && e.target.closest('.note')) return;
        if (scale > 1) {
            startGesture();
            panning = true;
            startX = e.clientX - pointX;
            startY = e.clientY - pointY;
            transformArea.classList.add('grabbing');
        }
    });
    document.addEventListener('mousemove', e => {
        if (!panning) return;
        e.preventDefault();
        pointX = e.clientX - startX;
        pointY = e.clientY - startY;
        updateTransform();
    });
    document.addEventListener('mouseup', () => {
        if (panning) endGesture();
        panning = false;
        transformArea.classList.remove('grabbing');
    });

    transformArea.addEventListener('click', e => {
        if (scale > 1) return;
        if (e.target.closest && e.target.closest('.note')) return;
        if (e.target.closest('#pages-container')) closeAllNotes();
    });

    let touchStartX = 0, touchStartY = 0, touchTime = 0;
    let isPinching = false;
    let pinchAnchorX = 0, pinchAnchorY = 0;
    let pinchStartDist = 0;
    let pinchStartMidX = 0, pinchStartMidY = 0;
    let pinchMoved = false;
    function getTouchMid(t1, t2) { return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 }; }

    transformArea.addEventListener('touchstart', e => {
        startGesture();
        if (e.touches.length === 2) {
            isPinching = true;
            pinchMoved = false;
            const t1 = e.touches[0], t2 = e.touches[1];
            pinchStartDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
            if (pinchStartDist < 20) pinchStartDist = 20;
            const mid = getTouchMid(t1, t2);
            const rect = transformArea.getBoundingClientRect();
            pinchStartMidX = mid.x; pinchStartMidY = mid.y;
            const localX = mid.x - rect.left, localY = mid.y - rect.top;
            pinchAnchorX = (localX - pointX) / scale;
            pinchAnchorY = (localY - pointY) / scale;
            e.preventDefault();
            return;
        }
        if (e.touches.length === 1) {
            if (scale > 1) {
                panning = true;
                startX = e.touches[0].clientX - pointX;
                startY = e.touches[0].clientY - pointY;
                transformArea.classList.add('grabbing');
                return;
            }
            if (e.target.closest && e.target.closest('.note')) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchTime = Date.now();
        }
    }, { passive: false });

    transformArea.addEventListener('touchmove', e => {
        if (e.touches.length === 2 && isPinching) {
            e.preventDefault();
            pinchMoved = true;
            const t1 = e.touches[0], t2 = e.touches[1];
            const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
            const mid = getTouchMid(t1, t2);
            const SENSITIVITY = 0.85;
            const rawRatio = dist / pinchStartDist;
            const ratio = 1 + (rawRatio - 1) * SENSITIVITY;
            let newScale = scale * ratio;
            newScale = Math.max(1, Math.min(newScale, 5));
            const rect = transformArea.getBoundingClientRect();
            const localMidX = mid.x - rect.left, localMidY = mid.y - rect.top;
            scale = newScale;
            pointX = localMidX - pinchAnchorX * scale;
            pointY = localMidY - pinchAnchorY * scale;
            if (scale === 1) { pointX = 0; pointY = 0; }
            applyTransformNoClamp();
            return;
        }
        if (panning && e.touches.length === 1) {
            e.preventDefault();
            pointX = e.touches[0].clientX - startX;
            pointY = e.touches[0].clientY - startY;
            clampPan();
            applyTransformNoClamp();
        }
    }, { passive: false });

    transformArea.addEventListener('touchend', e => {
        if (e.touches.length < 2 && isPinching) {
            isPinching = false;
            if (pinchMoved) { clampPan(); applyTransformNoClamp(); }
            endGesture();
            return;
        }
        if (e.touches.length === 0) {
            endGesture();
            if (panning) {
                panning = false;
                transformArea.classList.remove('grabbing');
                return;
            }
            if (scale > 1) return;
            if (e.target.closest && e.target.closest('.note')) return;
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            const dt = Date.now() - touchTime;
            if (Math.abs(dx) > 60 && Math.abs(dy) < 80 && dt < 700) {
                if (dx > 0) nextPage(); else prevPage();
            }
        }
    }, { passive: true });

    function renderAllNotes() {
        document.querySelectorAll('.notes-layer').forEach(nl => {
            nl.innerHTML = '';
            nl.classList.remove('has-open');
            const pageIdx = parseInt(nl.dataset.page);
            if (isNaN(pageIdx)) return;
            if (!vol.notes) return;
            const pageNum = pageIdx + 1;
            const notes = vol.notes[pageNum];
            if (!notes || !notes.length) return;

            notes.forEach((n, i) => {
                const el = document.createElement('div');
                el.className = 'note';
                el.style.left = n.x + '%';
                el.style.top = n.y + '%';
                el.dataset.idx = i;
                const titleHtml = n.title ? `<div class="note-title">${escapeHtml(n.title)}</div>` : '';
                el.innerHTML = `
                    <button class="note-dot" aria-label="Nota ${i+1}" type="button">${i+1}</button>
                    <div class="note-popup" role="dialog">
                        <button class="note-close" type="button" aria-label="Chiudi">×</button>
                        ${titleHtml}
                        <div class="note-text">${escapeHtml(n.text || '')}</div>
                    </div>
                `;
                nl.appendChild(el);
            });
        });
    }

    function closeNote(note) {
        if (!note) return;
        note.classList.remove('open');
        const layer = note.closest('.notes-layer');
        if (layer && !layer.querySelector('.note.open')) layer.classList.remove('has-open');
    }
    function closeAllNotes() {
        document.querySelectorAll('.note.open').forEach(n => n.classList.remove('open'));
        document.querySelectorAll('.notes-layer.has-open').forEach(l => l.classList.remove('has-open'));
    }
    function adjustNotePosition(note) {
        const dot = note.querySelector('.note-dot');
        if (!dot) return;
        const rect = dot.getBoundingClientRect();
        if (rect.top < 220) note.classList.add('below');
        else note.classList.remove('below');
    }
    function positionNotePopup(note) {
        const popup = note.querySelector('.note-popup');
        if (!popup) return;
        const prevTransition = popup.style.transition;
        const prevTransform = popup.style.transform;
        popup.style.transition = 'none';
        popup.style.transform = 'translateX(-50%) scale(1)';
        popup.style.marginLeft = '';
        popup.style.setProperty('--arrow-pos', '50%');
        void popup.offsetWidth;
        const rect = popup.getBoundingClientRect();
        const vw = window.innerWidth;
        const margin = 10;
        let shift = 0;
        if (rect.left < margin) shift = margin - rect.left;
        else if (rect.right > vw - margin) shift = (vw - margin) - rect.right;
        if (shift !== 0) {
            popup.style.marginLeft = shift + 'px';
            const arrowPct = 50 - (shift / rect.width * 100);
            popup.style.setProperty('--arrow-pos', Math.max(12, Math.min(88, arrowPct)) + '%');
        }
        popup.style.transform = prevTransform;
        popup.style.transition = prevTransition;
    }

    document.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('.note-close');
        const dotBtn = e.target.closest('.note-dot');
        const note = e.target.closest('.note');
        if (!note) { closeAllNotes(); return; }

        if (closeBtn) {
            e.stopPropagation();
            closeNote(note);
            SoundEngine.play('ko');
            return;
        }
        if (dotBtn) {
            e.stopPropagation();
            e.preventDefault();
            const wasOpen = note.classList.contains('open');
            const myLayer = note.closest('.notes-layer');
            document.querySelectorAll('.note.open').forEach(n => { if (n !== note) n.classList.remove('open'); });
            document.querySelectorAll('.notes-layer.has-open').forEach(l => { if (l !== myLayer) l.classList.remove('has-open'); });
            if (wasOpen) closeNote(note);
            else {
                adjustNotePosition(note);
                note.classList.add('open');
                if (myLayer) myLayer.classList.add('has-open');
                SoundEngine.play('chin');
                requestAnimationFrame(() => requestAnimationFrame(() => positionNotePopup(note)));
            }
        }
    }, true);

    async function boot() {
        $('reader-title').textContent = `${vol.series} · ${vol.volumeLabel || ('Vol. ' + vol.volume)}`;
        updateDualToggleUI();

        pagesContainer.innerHTML = '';
        pageLoading.classList.remove('hidden');
        $('page-info').textContent = '...';

        try {
            const onProgress = (n) => { $('page-info').textContent = `Cerco pagine… ${n}`; };
            currentPages = await getPagesForVolume(vol, onProgress);
            currentIndex = Math.max(0, Math.min((initialPage || 1) - 1, currentPages.length - 1));
            resetZoomAndPan();
            await displayPage();
            document.addEventListener('keydown', readerKeyHandler);
            resetIdleTimer();
            console.log('[manga-reader] reader init completato');
        } catch (e) {
            console.error('[manga-reader] errore apertura volume:', e);
            alert('Impossibile caricare le pagine del volume.\n\n' + e.message);
            location.href = 'index.html';
        }
    }

    boot();
}

/* ═══════════ AVVIO: rileva la pagina ═══════════ */
(function boot() {
    const hasReader = document.getElementById('reader-view');
    const hasLibrary = document.getElementById('library-view');
    if (hasReader) {
        try { initReaderPage(); } catch (err) { console.error('[manga-reader] errore reader init:', err); }
    } else if (hasLibrary) {
        try { initLibraryPage(); } catch (err) { console.error('[manga-reader] errore library init:', err); }
    } else {
        console.warn('[manga-reader] pagina non riconosciuta');
    }
})();
