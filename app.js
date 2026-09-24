/* ═══════════════════════════════════════════════════════════
   漫画リーダー · Manga Reader
   Un unico file JS che rileva da sé se siamo nella pagina
   libreria (index.html) o nel lettore (reader.html).

   ✅ Funziona offline / file:// / doppio click
   Le pagine dei volumi che dichiarano `pageCount` + `pagePattern`
   vengono costruite direttamente, senza alcuna fetch().

   ✨ Novità:
   - Suoni ispirati a strumenti tradizionali giapponesi
     (拍子木 hyoshigi · 鈴 rin/suzu · 太鼓 taiko)
   - Memoria posizione lettura (localStorage) + badge "続きから"
   - Fix qualità zoom (riasterizzazione GPU)
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

            /* Numero totale di pagine del volume.
               ⚠️ Può variare da volume a volume (100, 200, 300...).
               Serve sia per la barra di progresso in libreria
               sia come fallback se manca `pageCount`. */
            pages: 188,

            /* ─── DICHIARAZIONE PAGINE (offline-friendly) ───
               Se queste due proprietà esistono, il reader costruisce
               la lista direttamente senza fetch(). Funziona con
               file://, offline, su GitHub Pages, ovunque.
               Per un nuovo volume basta cambiare path + pageCount.
               pageCount può essere qualsiasi numero (100, 250, 500...). */
            pageCount: 188,
            pagePattern: n => `alya/vol-01/page_${String(n).padStart(3, '0')}.png`,

            /* ─── NOTE INTERATTIVE ───
               Vuoto per ora. Aggiungile così:

               notes: {
                   1: [ { x: 50, y: 20, title: "…", text: "…" }, ... ],
                   2: [ ... ],
                   ...
               }

               Le chiavi sono numeri di pagina (1-based). */
notes: {
1: [
/* ═══ PANNELLO 1 — Copertina: Alya in divisa scolastica (RTL: dx → sx) ═══ */
{ x: 87, y: 38, title: "時々ボソッとロシア語でデレる隣のアーリャさん",
text: "Alya Sometimes Hides Her Feelings in Russian" },
{ x: 13, y: 5, title: "| 原作 | 燦々SUN",
text: "| Opera originale | Sunsunsun" },
{ x: 13, y: 9, title: "| 漫画 | 手名町紗帆",
text: "| Disegni | Saho Tenamachi" },
{ x: 10, y: 13, title: "| キャラクター原案 | ももこ",
text: "| Character Design originale | Momoko" },
{ x: 22, y: 82, title: "Иногда Аля внезапно кокетничает по-русски",
text: "A volte Alya flirta all'improvviso in russo" }
],

2: [],

3: [
/* ═══ PANNELLO 1 — Frontespizio: Primo piano di Alya (RTL: dx → sx) ═══ */
{ x: 20, y: 21, title: "時々ボソッとロシア語でデレる隣のアーリャさん",
text: "Alya Sometimes Hides Her Feelings in Russian" },
{ x: 8, y: 21, title: "Иногда Аля внезапно кокетничает по-русски",
text: "A volte Alya flirta all'improvviso in russo" }
],

4: [
/* ═══ PANNELLO 1 — Indice dei contenuti (RTL: dx → sx) ═══ */
{ x: 51, y: 19, title: "Иногда Аля внезапно кокетничает по-русски",
text: "A volte Alya flirta all'improvviso in russo" },
{ x: 52, y: 26, title: "目次",
text: "Indice" },
{ x: 80, y: 55, title: "第1話 孤高のお姫様と怠惰な隣人 003",
text: "Capitolo 1: La principessa solitaria e il compagno indolente - 003" },
{ x: 73, y: 55, title: "第2話 無料ガチャって逃すと無性に悔しくない？ 027",
text: "Capitolo 2: Non ti dà un fastidio tremendo perdere i gacha gratuiti? - 027 - N.d.T.: I gacha sono meccaniche di estrazione casuale tipiche dei videogiochi per smartphone" },
{ x: 66, y: 55, title: "第3話 別にぼっちじゃないぞ？① 043",
text: "Capitolo 3: Non sono mica un tipo solitario, eh? 1 - 043" },
{ x: 59, y: 55, title: "第4話 別にぼっちじゃないぞ？② 059",
text: "Capitolo 4: Non sono mica un tipo solitario, eh? 2 - 059" },
{ x: 52, y: 55, title: "第5話 別にぼっちじゃないぞ？③ 073",
text: "Capitolo 5: Non sono mica un tipo solitario, eh? 3 - 073" },
{ x: 45, y: 55, title: "第6話 お巡りさん、こいつです① 087",
text: "Capitolo 6: Agente, è questo qui! 1 - 087 - N.d.T.: Celebre frase meme usata online per segnalare con ironia qualcuno alla polizia per comportamenti o gusti bizzarri" },
{ x: 38, y: 55, title: "第7話 お巡りさん、こいつです② 105",
text: "Capitolo 7: Agente, è questo qui! 2 - 105" },
{ x: 30, y: 55, title: "第8話 姉妹百合、嫌いじゃないです① 127",
text: "Capitolo 8: Lo yuri tra sorelle non mi dispiace affatto 1 - 127 - N.d.T.: Il termine yuri indica opere o relazioni basate su legami intimi e sentimentali tra ragazze" },
{ x: 23, y: 55, title: "第9話 姉妹百合、嫌いじゃないです② 145",
text: "Capitolo 9: Lo yuri tra sorelle non mi dispiace affatto 2 - 145" }
],

5: [
/* ═══ PANNELLO 1 — Facciata dell'Accademia Seirei (RTL: dx → sx) ═══ */
{ x: 78, y: 15, title: "私立征嶺学園",
text: "Accademia Privata Seirei" },
{ x: 15, y: 10, title: "第1話",
text: "Capitolo 1" },
/* ═══ PANNELLO 2 — Ingresso degli studenti a scuola (RTL: dx → sx) ═══ */
{ x: 80, y: 50, title: "日本最高峰の偏差値を誇る 由緒正しき中高大一貫校",
text: "Un prestigioso istituto a ciclo unico - medie, superiori e università - che vanta il livello accademico più alto di tutto il Giappone." },
{ x: 26, y: 50, title: "かつては貴族や華族の子女が通い 卒業生は政財界で活躍する者も多い――",
text: "Un tempo vi studiavano i rampolli dell'antica nobiltà, e ancora oggi molti dei suoi allievi ricoprono ruoli di primo piano nel mondo della politica e della finanza... - N.d.T.: Con kazoku si intende l'alta nobiltà ereditaria del Giappone imperiale" },
/* ═══ PANNELLO 3 — Alya di spalle che cammina verso l'istituto (RTL: dx → sx) ═══ */
{ x: 78, y: 75, title: "そんな傑物たちの中で",
text: "In mezzo a tutte quelle menti brillanti..." },
{ x: 23, y: 83, title: "一際輝く少女がいた…！",
text: "...c'era una ragazza che risplendeva più di chiunque altra...!" }
],

6: [
/* ═══ PANNELLO 1 — Frontespizio del Capitolo 1: Alya con la corona tra i gigli (RTL: dx → sx) ═══ */
{ x: 85, y: 9, title: "第1話",
text: "Capitolo 1" },
{ x: 81, y: 22, title: "孤高のお姫様と怠惰な隣人",
text: "La principessa solitaria e il compagno indolente" }
],

7: [
/* ═══ PANNELLO 2 — Alya cammina tra i petali di ciliegio (RTL: dx → sx) ═══ */
{ x: 65, y: 32,
text: "brusio" },
/* ═══ PANNELLO 3 — Gli studenti riconoscono Kujo (RTL: dx → sx) ═══ */
    { x: 86, y: 67, title: "おい あれ",
      text: "Ehi, guarda là!" },
    { x: 68, y: 83, title: "うお！ 九条さんだ！",
      text: "Woah! È Kujo-san!" },

    /* ═══ PANNELLO 4 — Uno studente incredulo (RTL: dx → sx) ═══ */
    { x: 55, y: 67, title: "え 誰？",
      text: "Eh? Chi è?" },
    { x: 35, y: 83, title: "知らないのか お前！",
      text: "Non la conosci?!" }
],

8: [
/* ═══ PANNELLO 1 — Presentazione di Alisa Mikhailovna Kujo (RTL: dx → sx) ═══ */
{ x: 66, y: 14, title: "アリサ・ミハイロヴナ・九条",
text: "Alisa Mikhailovna Kujo" },
{ x: 65, y: 65, title: "ロシア人のお父上と日本人の母上を持つ",
text: "Nata da padre russo e madre giapponese..." },
{ x: 49, y: 77, title: "奇跡の美少女だよ！！",
text: "...è una ragazza dalla bellezza miracolosa!!" }
],

9: [
/* ═══ PANNELLO 1 — La perfezione di Alya nello studio e nello sport (RTL: dx → sx) ═══ */
{ x: 80, y: 12, title: "去年 中学三年生で 転入してきて 以降",
text: "Da quando si è trasferita l'anno scorso in terza media..." },
{ x: 75, y: 27, title: "常に成績は 学年一位！",
text: "...ha sempre mantenuto il primo posto nei voti di tutto l'anno!" },
{ x: 71, y: 63, title: "MUZUKASHII HON",
text: "Libro difficile" },
{ x: 23, y: 15, title: "おまけに スポーツ万能で",
text: "Come se non bastasse, è bravissima in qualsiasi sport..." },
{ x: 36, y: 56, title: "今年からは 生徒会で会計を 務める！！",
text: "...e da quest'anno è la tesoriera del consiglio studentesco!!" },
{ x: 14, y: 58, title: "会計",
text: "Tesoriera" },
/* ═══ PANNELLO 2 — Alya cammina ammirata da tutti (RTL: dx → sx) ═══ */
    { x: 83, y: 79, title: "…その 完璧超人 ぶりを見て 人は言う",
      text: "...Davanti a una tale perfezione sovrumana, tutti la chiamano..." },
    { x: 20, y: 79, title: "“孤高のお姫様” と…",
      text: "...«La principessa solitaria»." }
],

10: [
/* ═══ PANNELLO 1 — Tre studenti chiacchierano tra loro (RTL: dx → sx) ═══ */
{ x: 79, y: 15, title: "孤高って… 確かに美人で とっつきにくそうだけど",
text: "Solitaria... È vero che è una bellezza e sembra inavvicinabile, ma..." },
{ x: 65, y: 18, title: "話してみると 案外気さくなんじゃ…",
text: "...magari a parlarci è sorprendentemente alla mano..." },
{ x: 13, y: 9,
text: "brusio" },
{ x: 16, y: 19, title: "おお…！",
text: "Ooh...!" },
/* ═══ PANNELLO 2 — L'apparizione di Ando-senpai (RTL: dx → sx) ═══ */
    { x: 79, y: 40, title: "あれは 女子人気トップの 安藤先輩！",
      text: "Quello è Ando-senpai, il ragazzo più popolare tra le femmine!" },
    { x: 60, y: 41, title: "あの九条さんに 挨拶する みたいだぞ！",
      text: "Sembra proprio che stia per andare a salutare Kujo-san!" },

    /* ═══ PANNELLO 3 — Ando-senpai saluta Alya con fare affascinante (RTL: dx → sx) ═══ */
    { x: 28, y: 61, title: "やあ おはよう",
      text: "Ehilà, buongiorno." },
    { x: 18, y: 65, title: "気持ちの いい朝だね",
      text: "Che splendida mattinata, non trovi?" },

    /* ═══ PANNELLO 4 — Lo sguardo gelido di Alya (RTL: dx → sx) ═══ */
    { x: 29, y: 77, title: "…おはよう ございます",
      text: "...Buongiorno." }
],

11: [
/* ═══ PANNELLO 1 — Ando tenta di invitare Alya (RTL: dx → sx) ═══ */
{ x: 83, y: 15, title: "はじめましてだよね 僕は二年の安藤",
text: "È la prima volta che ci parliamo, vero? Sono Ando del secondo anno." },
{ x: 34, y: 16, title: "前から話してみたくてさ",
text: "Volevo scambiare due parole con te da un bel pezzo." },
{ x: 21, y: 20, title: "よかったら昼休み一緒に…",
text: "Se ti va, a pranzo potremmo..." },
/* ═══ PANNELLO 2 — Il rifiuto glaciale di Alya (RTL: dx → sx) ═══ */
    { x: 24, y: 36, title: "結構です",
      text: "No, grazie." },
    { x: 48, y: 67,
      text: "*folata di gelo*" },

    /* ═══ PANNELLO 3 — Lo sgomento dei compagni (RTL: dx → sx) ═══ */
    { x: 82, y: 82, title: "ええ… あのモテ男を一蹴かよ…",
      text: "Eeeh... Ha liquidato in tronco persino il ragazzo più ambito della scuola..." },
    { x: 58, y: 80, title: "背筋が凍る…",
      text: "Vengono i brividi lungo la schiena..." },
    { x: 24, y: 81, title: "これは厳しい…",
      text: "Questa sì che è spietata..." }
],

12: [
/* ═══ PANNELLO 1 — Ando insiste ma Alya lo gela (RTL: dx → sx) ═══ */
{ x: 83, y: 15, title: "つ… つれないなあ じゃあせめて 連絡先…",
text: "C-Che freddezza... Almeno lasciami il tuo contatto..." },
{ x: 68, y: 19, title: "いやこの 花だけでも …！",
text: "O per lo meno accetta questo fiore...!" },
{ x: 18, y: 22, title: "…もっと はっきり 言った方が 良いですか",
text: "...Preferisce che sia più chiara?" },
/* ═══ PANNELLO 2 — Il colpo di grazia di Alya (RTL: dx → sx) ═══ */
    { x: 75, y: 38, title: "私",
      text: "Io" },
    { x: 21, y: 55, title: "あなたに 興味ありません ので",
      text: "...non ho alcun interesse per lei." },

    /* ═══ PANNELLO 3 — Ando pietrificato e la stoccata finale (RTL: dx → sx) ═══ */
    { x: 79, y: 75,
      text: "*pressione cupa*" },
    { x: 14, y: 75, title: "…あと",
      text: "...Inoltre," }
],

13: [
/* ═══ PANNELLO 1 — Alya distrugge la rosa e rimprovera Ando (RTL: dx → sx) ═══ */
{ x: 75, y: 45, title: "その服装 校則違反ですよ",
text: "Quell'abbigliamento viola il regolamento scolastico." },
/* ═══ PANNELLO 2 — Alya si allontana mormorando in russo (RTL: dx → sx) ═══ */
    { x: 70, y: 83, title: "Противный - 気持ち悪い",
      text: "Che viscido... - N.d.T.: Dal russo protivnyj, ripugnante o viscido" }
],

14: [
/* ═══ PANNELLO 1 — Lo studente annuncia il verdetto (RTL: dx → sx) ═══ */
{ x: 83, y: 20, title: "…しょ",
text: "...Fi-" },
/* ═══ PANNELLO 2 — Ando sconfitto e acclamazione generale (RTL: dx → sx) ═══ */
    { x: 72, y: 25, title: "勝負アリ~~~~!!",
      text: "...fine dei giochi~~~~!!" },
    { x: 65, y: 46, title: "安藤先輩 チャレンジ 失敗ですッ！",
      text: "La Sfida Ando-senpai è fallita miseramente!!" },
    { x: 35, y: 49, title: "最後 なんて 言ったんだ？",
      text: "Ma cosa ha detto alla fine?" },
    { x: 15, y: 49, title: "ロシア語だろ わからんけど",
      text: "Era russo, no? Anche se non ci ho capito un tubo." },
    { x: 18, y: 24, title: "いい戦い だった！",
      text: "È stata una bella battaglia!" },

    /* ═══ PANNELLO 3 — I commenti sugli standard inarrivabili di Alya (RTL: dx → sx) ═══ */
    { x: 83, y: 65, title: "な なるほど…",
      text: "C-Capisco..." },
    { x: 72, y: 70, title: "まさに “孤高のお姫様”",
      text: "È proprio «La principessa solitaria»!" },
    { x: 72, y: 83,
      text: "*evviva evviva*" },
    { x: 52, y: 86, title: "どんだけ 理想 高いんだ…",
      text: "Ma quanto li ha alti i suoi standard...?" },

    /* ═══ PANNELLO 4 — Il ragazzo riflette tra sé (RTL: dx → sx) ═══ */
    { x: 28, y: 65, title: "誰のものにも ならんっていう 安心感は あるよな",
      text: "Be', dà una certa sicurezza sapere che non sarà mai di nessuno, no?" },
    { x: 14, y: 65, title: "ほんとそれ アイドルより 全然アイドル",
      text: "Proprio così! Molto più idol lei di una vera idol!" },
    { x: 14, y: 86, title: "…でも",
      text: "...Però..." }
],

15: [
/* ═══ PANNELLO 1 — Il ragazzo si chiede chi potrebbe conquistare Alya (RTL: dx → sx) ═══ */
{ x: 38, y: 15, title: "あんな子が 興味を持つ としたら",
text: "Se una come lei dovesse mai interessarsi a qualcuno..." },
/* ═══ PANNELLO 2 — Masachika crollato addormentato sul banco (RTL: dx → sx) ═══ */
    { x: 23, y: 26, title: "いったい どんな男 なんだろうな…",
      text: "...che razza di ragazzo potrebbe mai essere...?" },

    /* ═══ PANNELLO 3 — Lo sguardo irritato di Alya su Masachika che russa (RTL: dx → sx) ═══ */
    { x: 21, y: 65,
      text: "*ronf... ronf...*" }
],

16: [
/* ═══ PANNELLO 1 — Ingresso della classe (RTL: dx → sx) ═══ */
{ x: 80, y: 21, title: "1年B組",
text: "Classe 1-B" },
/* ═══ PANNELLO 2 — Alya saluta Masachika addormentato (RTL: dx → sx) ═══ */
    { x: 67, y: 13, title: "おはよう 久世くん",
      text: "Buongiorno, Kuze-kun." },
    { x: 25, y: 12,
      text: "*ansito*" },

    /* ═══ PANNELLO 3 — L'aura minacciosa di Alya (RTL: dx → sx) ═══ */
    { x: 76, y: 38, title: "お おい…",
      text: "E-Ehi..." },
    { x: 48, y: 34,
      text: "*rombo minaccioso*" },
    { x: 16, y: 39, title: "起きろ 久世〜",
      text: "Svegliati, Kuzeee..." },

    /* ═══ PANNELLO 4 — Il calcio al banco (RTL: dx → sx) ═══ */
    { x: 84, y: 54,
      text: "*sbam*" },
    { x: 86, y: 70, title: "うグフッ⁉",
      text: "Ugh-!?" },

    /* ═══ PANNELLO 5 — Alya rimprovera Kuze (RTL: dx → sx) ═══ */
    { x: 26, y: 56, title: "おはよう",
      text: "Buongiorno." },
    { x: 16, y: 87, title: "また アニメ見て 夜更かし してたの？",
      text: "Sei rimasto di nuovo alzato fino a tardi a guardare anime?" }
],

17: [
/* ═══ PANNELLO 1 — Presentazione di Kuze Masachika (RTL: dx → sx) ═══ */
{ x: 82, y: 15, title: "久世政近",
text: "Kuze Masachika" },
{ x: 74, y: 35, title: "おお… おはよう アーリャ",
text: "Ooh... Buongiorno, Alya." },
{ x: 65, y: 41, title: "ま そんなとこだ",
text: "Be', più o meno." },
{ x: 28, y: 19, title: "学園一の怠惰な生徒でありながら",
text: "Nonostante sia lo studente più pigro dell'intero istituto..." },
{ x: 23, y: 35, title: "なぜか九条アリサを愛称で呼ぶ唯一の存在",
text: "...è inspiegabilmente l'unico a chiamare Alisa Kujo con un vezzeggiativo." },
/* ═══ PANNELLO 2 — Alya rimprovera Kuze per le sue abitudini (RTL: dx → sx) ═══ */
    { x: 85, y: 58, title: "ただし 彼女からの当たりは ちゃんとキツい",
      text: "Solo che i modi di lei nei suoi confronti sono decisamente duri." },
    { x: 38, y: 55, title: "本当にだらしないわね",
      text: "Sei davvero un buono a nulla." },
    { x: 19, y: 61, title: "いや〜 オタ友との感想会が盛り上がりすぎてな",
      text: "Eh già~ Ci siamo fatti prendere troppo la mano a commentarlo tra amici otaku..." },

    /* ═══ PANNELLO 3 — Kuze spiega la nottata insonne e Alya lo gela (RTL: dx → sx) ═══ */
    { x: 83, y: 78, title: "気づいたら２時間も通話してた",
      text: "...e prima che me ne accorgessi eravamo stati al telefono per due ore." },
    { x: 35, y: 78, title: "外めっちゃ明るいでやんの",
      text: "«Accidenti, fuori è già giorno!»" },
    { x: 19, y: 84, title: "なるほど こうして馬鹿が出来上がるのね",
      text: "Capisco. È così che si forgia un perfetto idiota." }
],

18: [
/* ═══ PANNELLO 1 — Kuze filosofeggia sull'amore per i propri hobby (RTL: dx → sx) ═══ */
{ x: 79, y: 15, title: "ふっ… そうだな 行き過ぎた愛は 時に愚行を生む…",
text: "Eh già... A volte un amore smisurato genera stoltezza..." },
/* ═══ PANNELLO 2 — Kuze rivendica con orgoglio il suo essere otaku (RTL: dx → sx) ═══ */
    { x: 52, y: 14, title: "しかしそれが オタクというもの！",
      text: "Ma è proprio questo che significa essere un otaku!" },
    { x: 16, y: 23, title: "何とでも 呼ぶがいいさ！",
      text: "Chiamami pure come vuoi!" },

    /* ═══ PANNELLO 3 — Lo sguardo congelante di Alya (RTL: dx → sx) ═══ */
    { x: 50, y: 42,
      text: "*bufera glaciale*" },
    { x: 22, y: 58, title: "…おお〜う 今日もいい ブリザードだ〜",
      text: "...Ooh-ooh... che splendida bufera glaciale anche oggi..." },

    /* ═══ PANNELLO 4 — I compagni osservano perplessi la loro dinamica (RTL: dx → sx) ═══ */
    { x: 64, y: 81, title: "にらむなって〜",
      text: "Non fulminarmi con lo sguardo dai~" },
    { x: 18, y: 87, title: "…つーか 何なんだろな あの二人…",
      text: "...Comunque sia, ma che razza di rapporto hanno quei due...?" }
],

19: [
/* ═══ PANNELLO 1 — I compagni parlano della resistenza di Kuze (RTL: dx → sx) ═══ */
{ x: 83, y: 12, title: "久世は よく耐えられてるよな 何言われても ぐらってないし",
text: "Kuze ha proprio una bella resistenza, eh? Qualunque cosa gli dica, non fa una piega." },
{ x: 52, y: 42, title: "いくら 美人とはいえ しんどく ならんもんかね",
text: "Per quanto sia una bellezza, non diventa estenuante alla lunga?" },
/* ═══ PANNELLO 2 — Gusti particolari tra i banchi (RTL: dx → sx) ═══ */
    { x: 33, y: 14, title: "ならんだろ 美人が勝つ",
      text: "Ma figurati! La bellezza vince su tutto." },
    { x: 20, y: 18, title: "なんなら ご褒美だろ",
      text: "Anzi, consideralo pure un premio!" },
    { x: 22, y: 44, title: "おっと 特殊性癖の 人口密度 すごいな",
      text: "Accidenti, che alta densità di feticismi particolari abbiamo qui..." },

    /* ═══ PANNELLO 3 — Gli studenti si interrogano sul comportamento di Alya (RTL: dx → sx) ═══ */
    { x: 83, y: 63, title: "てか九条さんは 何で久世にだけ あんな 絡むんだろな",
      text: "Ma poi, perché Kujo-san punzecchia così solo Kuze?" },
    { x: 22, y: 62, title: "だらしない奴 見ると イライラ すんじゃない",
      text: "Forse si innervosisce quando vede qualcuno di così pigro e scansafatiche." },
    { x: 23, y: 82, title: "ああ…",
      text: "Ah già..." },

    /* ═══ PANNELLO 4 — Il suono della campanella (RTL: dx → sx) ═══ */
    { x: 60, y: 86,
      text: "*din don dan don*" }
],

20: [
/* ═══ PANNELLO 1 — I pensieri dei compagni su Alya (RTL: dx → sx) ═══ */
{ x: 77, y: 14, title: "九条さん 完璧超人 だもんな",
text: "Dopotutto Kujo-san è un modello di perfezione assoluta." },
{ x: 74, y: 26,
text: "clac" },
/* ═══ PANNELLO 2 — L'inizio della lezione (RTL: dx → sx) ═══ */
    { x: 26, y: 12,
      text: "*scorrimento porta*" },
    { x: 24, y: 33, title: "授業 始めるぞ〜",
      text: "Iniziamo la lezione~" },
    { x: 8, y: 32,
      text: "Alzarsi in piedi-! - N.d.T.: Tipico comando formale a inizio lezione nelle scuole giapponesi" },

    /* ═══ PANNELLO 3 — Il professore riprende la spiegazione (RTL: dx → sx) ═══ */
    { x: 81, y: 44, title: "昨日の 続きから…",
      text: "Riprendiamo da dove eravamo rimasti ieri..." },

    /* ═══ PANNELLO 4 — Masachika si stiracchia assonnato (RTL: dx → sx) ═══ */
    { x: 18, y: 52,
      text: "*stiracchiamento*" },

    /* ═══ PANNELLO 5 — Alya lancia un'occhiata furtiva (RTL: dx → sx) ═══ */
    { x: 79, y: 84,
      text: "*occhiata furtiva*" }
],

21: [
/* ═══ PANNELLO 1 — Masachika sbadiglia assonnato (RTL: dx → sx) ═══ */
{ x: 23, y: 25, title: "ふぁ",
text: "sbadiglio" }
],

22: [
/* ═══ PANNELLO 1 — Alya osserva Masachika e sussurra in russo (RTL: dx → sx) ═══ */
{ x: 28, y: 65, title: "Милашка - かわいい",
text: "Che carino... - N.d.T.: Dal russo milashka, carino, adorabile" }
],

23: [
/* ═══ PANNELLO 1 — Masachika fissa Alya incuriosito (RTL: dx → sx) ═══ */
{ x: 48, y: 7,
text: "fissa intensamente" },
/* ═══ PANNELLO 2 — Alya arrossisce sorpresa dallo sguardo (RTL: dx → sx) ═══ */
    { x: 34, y: 22, title: "どき",
      text: "*tuffo al cuore*" },
    { x: 20, y: 30, title: "…何よ",
      text: "...Che c'è?" },

    /* ═══ PANNELLO 3 — Scambio di battute tra i banchi (RTL: dx → sx) ═══ */
    { x: 79, y: 51, title: "いやその… なんか 言ったか？",
      text: "No, ecco... Hai detto qualcosa?" },
    { x: 24, y: 47, title: "別に",
      text: "Niente." },
    { x: 20, y: 57, title: "みっともないって 言っただけ",
      text: "Ho solo detto che sei pietoso." },

    /* ═══ PANNELLO 4 — Masachika torna ai suoi appunti (RTL: dx → sx) ═══ */
    { x: 53, y: 84, title: "…そりゃ 失礼",
      text: "...Scusa tanto allora." }

    /* ═══ PANNELLO 5 — Alya imbarazzata in silenzio (RTL: dx → sx) ═══ */
],

24: [
/* ═══ PANNELLO 1 — Alya ridacchia soddisfatta tra sé (RTL: dx → sx) ═══ */
{ x: 15, y: 14,
text: "ridacchia" },
{ x: 17, y: 23, title: "Дурачок. - ばーか",
text: "Scemotto... - N.d.T.: Dal russo duraciok, vezzeggiativo affettuoso per sciocchino o stupido" },
{ x: 24, y: 30, title: "Совсем не догадывается. - 全然気づいてない",
text: "Non ne ha proprio la minima idea... - N.d.T.: Dal russo, non sospetta assolutamente nulla" },
/* ═══ PANNELLO 3 — Alya osserva Masachika con tenerezza (RTL: dx → sx) ═══ */
    { x: 24, y: 71, title: "Хотя, серьезное выражение лица тебе идет... - …真面目にしてたら ちょっとは かっこいいのに",
      text: "Anche se... l'aria seria ti dona parecchio... - N.d.T.: Dal russo, un'espressione seria ti sta bene; il testo giapponese glossato aggiunge che se si mostrasse serio sarebbe persino carino" }
],

25: [
/* ═══ PANNELLO 1 — Alya continua a parlare tra sé in russo (RTL: dx → sx) ═══ */
{ x: 54, y: 23, title: "Только вот я никогда тебе не расскажу. - ま 一生伝えてあげないけど",
text: "Solo che non te lo dirò mai... - N.d.T.: Dal russo Tol'ko vot ya nikogda tebe ne rasskazhu, non te lo dirò mai; il testo giapponese glossato specifica che non glielo confesserà mai in tutta la vita" },
/* ═══ PANNELLO 2 — La mano di Kuze si blocca all'improvviso (RTL: dx → sx) ═══ */
    { x: 58, y: 91,
      text: "*si blocca di colpo*" }
],

26: [
/* ═══ PANNELLO 1 — La rivelazione di Masachika (RTL: dx → sx) ═══ */
{ x: 79, y: 15, title: "いや…",
text: "Veramente..." },
{ x: 80, y: 58,
text: "snap" },
{ x: 24, y: 73, title: "全部 伝わってるんだけどな…！",
text: "...in realtà mi è arrivato tutto fin troppo chiaro...!" }
],

27: [
/* ═══ PANNELLO 1 — Masachika clicca la matita nervosamente (RTL: dx → sx) ═══ */
{ x: 83, y: 15, title: "俺は ロシア人ではないし",
text: "Non sono russo..." },
{ x: 69, y: 20, title: "ロシアに 行ったこともない",
text: "...e non sono nemmeno mai stato in Russia." },
{ x: 22, y: 18,
text: "click click click click" },
/* ═══ PANNELLO 2 — Il flashback con il nonno e i film russi (RTL: dx → sx) ═══ */
    { x: 83, y: 40, title: "だが祖父が ロシア映画好きで",
      text: "Però mio nonno era un appassionato di cinema russo..." },
    { x: 30, y: 41, title: "小学生のころ 散々観せられ",
      text: "...e me ne ha fatti guardare così tanti quando facevo le elementari..." },
    { x: 18, y: 50, title: "ロシア語が 理解できるように なってしまったのだ",
      text: "...da finire per comprendere il russo alla perfezione." },

    /* ═══ PANNELLO 3 — Un segreto condiviso solo con la sorella (RTL: dx → sx) ═══ */
    { x: 80, y: 73, title: "このことを 知るのは 隣のクラスの 妹だけ…",
      text: "L'unica a sapere questa cosa è mia sorella, nella classe accanto..." },
    { x: 23, y: 83, title: "つまり",
      text: "In altre parole..." }
],

28: [
/* ═══ PANNELLO 1 — L'insegnante e Alya parlano di Masachika (RTL: dx → sx) ═══ */
{ x: 72, y: 16, title: "彼女は知らない",
text: "Lei non sa..." },
{ x: 41, y: 16, title: "先生: 久世〜 具合悪いか？",
text: "Professore: Kuze~ Ti senti poco bene?" },
{ x: 48, y: 47, title: "いえ 様子がおかしいだけです",
text: "No, è soltanto che si comporta in modo strano." },
{ x: 60, y: 71, title: "そのロシア語を",
text: "...che quel russo..." },
{ x: 41, y: 83, title: "俺だけは 理解している ことを",
text: "...soltanto io riesco a capirlo." },
{ x: 17, y: 68, title: "どんな 羞恥プレイ …！",
text: "Ma che razza di gioco imbarazzante è mai questo...?! - N.d.T.: Il termine shuuchi play indica situazioni o perversioni basate sull'estremo imbarazzo e sull'umiliazione" }
],

29: [
/* ═══ PANNELLO 1 — La lezione prosegue alla lavagna (RTL: dx → sx) ═══ */
{ x: 74, y: 12,
text: "toc toc" },
{ x: 16, y: 18, title: "第2話",
text: "Capitolo 2" },
/* ═══ PANNELLO 2 — Gli studenti prendono appunti (RTL: dx → sx) ═══ */
    { x: 82, y: 28,
      text: "*scritt scritt*" },
    { x: 23, y: 34,
      text: "*scritt scritt*" },

    /* ═══ PANNELLO 3 — Masachika cede alla sonnolenza (RTL: dx → sx) ═══ */
    { x: 58, y: 54,
      text: "*sonnecchia...*" },

    /* ═══ PANNELLO 4 — Alya freme di irritazione (RTL: dx → sx) ═══ */
    { x: 46, y: 63,
      text: "*nervosismo palpabile*" }
],

30: [
/* ═══ PANNELLO 1 — Alya punta la matita verso Kuze (RTL: dx → sx) ═══ */
{ x: 64, y: 14,
text: "movimento repentino" },
/* ═══ PANNELLO 2 — Dettaglio del colpo alle costole (RTL: dx → sx) ═══ */
    { x: 23, y: 18,
      text: "*colpo secco*" },
    { x: 11, y: 30,
      text: "*Proprio nello spazio tra le costole" },

    /* ═══ PANNELLO 3 — Reazione dolorosa di Kuze (RTL: dx → sx) ═══ */
    { x: 87, y: 44, title: "第2話 無料ガチャって逃すと無性に悔しくない？",
      text: "Capitolo 2: Non ti dà un fastidio tremendo perdere i gacha gratuiti? - N.d.T.: I gacha sono meccaniche di estrazione casuale tipiche dei videogiochi per smartphone" },
    { x: 52, y: 47,
      text: "Ugh-!!" }
],

31: [
/* ═══ PANNELLO 1 — Kuze si alza di scatto dolorante (RTL: dx → sx) ═══ */
{ x: 65, y: 9,
text: "sedia che sbatte" },
{ x: 80, y: 12, title: "あにすんだよ…！",
text: "Ma che ti salta in mente...?!" },
{ x: 78, y: 42, title: "私に教科書見せさせて居眠りなんて良い度胸ね 忘れて泣きついてきたくせに",
text: "Ci vuole un bel fegato ad addormentarti dopo avermi chiesto di condividere il libro. E pensare che sei venuto a piagnucolare perché te l'eri dimenticato." },
{ x: 52, y: 44, title: "そうでした！ すみませんでした！",
text: "Ha perfettamente ragione! Chiedo umilmente scusa!" },
/* ═══ PANNELLO 2 — Il professore interroga Kuze (RTL: dx → sx) ═══ */
    { x: 23, y: 14, title: "先生: 久世〜 どうした〜 そんなに ここの問題 自信あるか",
      text: "Professore: Kuzeee~ Che succede~? Sei così sicuro di saper risolvere questo esercizio?" },
    { x: 24, y: 44, title: "あっ いや… ヤベ…",
      text: "Ah, no... cioè... Cavolo..." },

    /* ═══ PANNELLO 3 — Il professore incalza mentre Alya attira l'attenzione (RTL: dx → sx) ═══ */
    { x: 84, y: 60, title: "じゃこの 空欄に入るのは？",
      text: "Allora, cosa va inserito in questo spazio vuoto?" },
    { x: 56, y: 57, title: "うお…",
      text: "Ugh..." },
    { x: 63, y: 66,
      text: "*tira la giacca*" },

    /* ═══ PANNELLO 4 — Alya indica il quaderno (RTL: dx → sx) ═══ */
    { x: 37, y: 62, title: "②銅",
      text: "2. Rame" },
    { x: 32, y: 58,
      text: "*toc toc toc*" },
    { x: 16, y: 61, title: "神様…！",
      text: "Sei una dea...!" },

    /* ═══ PANNELLO 5 — La trappola di Alya ha successo (RTL: dx → sx) ═══ */
    { x: 80, y: 79, title: "②の銅 です！",
      text: "La numero due, rame!" },
    { x: 70, y: 88, title: "違う 九条",
      text: "Sbagliato. Kujo, tocca a te." },
    { x: 28, y: 81, title: "⑧の ニッケル",
      text: "La numero otto, nichel." },
    { x: 18, y: 86, title: "はい 正解",
      text: "Esatto, corretta." }
],

32: [
/* ═══ PANNELLO 1 — Kuze protesta a bassa voce (RTL: dx → sx) ═══ */
{ x: 72, y: 15, title: "てめえええ…！ 無駄にミスリードすなよ！ 小声",
text: "Maledetta...! Non depistarmi apposta! - a bassa voce" },
/* ═══ PANNELLO 2 — Alya ribatte e Kuze capitola (RTL: dx → sx) ═══ */
    { x: 37, y: 26, title: "寝てるのが悪いでしょ",
      text: "È colpa tua che stavi dormendo." },
    { x: 18, y: 34, title: "そりゃそうだ！ すみませんでした！！ 3分ぶり2度目",
      text: "Questo è vero! Chiedo umilmente scusa!! - seconda volta in tre minuti" },

    /* ═══ PANNELLO 3 — Kuze cerca di riprendere il filo (RTL: dx → sx) ═══ */
    { x: 48, y: 50, title: "えーと 今はどこを…",
      text: "Ehm... a che punto siamo arrivati...?" },

    /* ═══ PANNELLO 4 — Alya ridacchia (RTL: dx → sx) ═══ */
    { x: 34, y: 53,
      text: "*risatina*" },

    /* ═══ PANNELLO 5 — Alya mormora di nuovo in russo (RTL: dx → sx) ═══ */
    { x: 38, y: 87, title: "Милашка - かわいい",
      text: "Che carino... - N.d.T.: Dal russo milashka, carino, adorabile" },
    { x: 13, y: 85,
      text: "*si irrigidisce per l'imbarazzo*" }
],

33: [
/* ═══ PANNELLO 1 — Masachika riflette sulla sua compagna di banco (RTL: dx → sx) ═══ */
{ x: 76, y: 15, title: "出た…",
text: "Ci risiamo..." },
{ x: 27, y: 14, title: "俺の隣人 アリサ・ミハイロヴナ・九条",
text: "La mia vicina di banco, Alisa Mikhailovna Kujo." },
{ x: 22, y: 26, title: "容姿端麗 頭脳明晰 完璧主義の 努力家…",
text: "Di una bellezza mozzafiato, dalla mente brillante, una stakanovista perfezionista..." },
/* ═══ PANNELLO 2 — La strana abitudine di Alya (RTL: dx → sx) ═══ */
    { x: 83, y: 46, title: "ただ時折",
      text: "Solo che, a volte..." },
    { x: 26, y: 48, title: "ロシア語で とんでもないことを 呟く癖がある",
      text: "...ha il vizio di mormorare in russo delle cose a dir poco assurde." },

    /* ═══ PANNELLO 3 — La conclusione di Masachika (RTL: dx → sx) ═══ */
    { x: 61, y: 69, title: "誰にも知られてないと思ってるんだろうけど… 俺はロシア語わかるんだよなぁ",
      text: "Pensa che nessuno possa capirla, ma... la verità è che io il russo lo capisco benissimo..." },
    { x: 35, y: 68, title: "なぜ彼女は 突飛なことを 口走るのか…",
      text: "Per quale motivo le sfuggono uscite così bizzarre...?" },
    { x: 18, y: 83, title: "俺が至った 結論はこうだ",
      text: "La conclusione a cui sono giunto è questa." }
],

34: [
/* ═══ PANNELLO 1 — La teoria di Masachika (RTL: dx → sx) ═══ */
{ x: 50, y: 18, title: "“精神的露出狂”",
text: "«Un'esibizionista psicologica»" },
/* ═══ PANNELLO 2 — L'esempio immaginato da Masachika (RTL: dx → sx) ═══ */
    { x: 79, y: 39, title: "わざと ヤバい発言を することで",
      text: "Facendo affermazioni azzardate di proposito..." },
    { x: 65, y: 52, title: "парик - ヅラ",
      text: "Parrucchino - N.d.T.: Dal russo parik, parrucca o parrucchino" },
    { x: 30, y: 55, title: "※画像はイメージです",
      text: "*Immagine a puro scopo illustrativo" },
    { x: 18, y: 42, title: "バレるか バレないかの スリルを 楽しんでいる――！",
      text: "...si gode il brivido del rischio di farsi scoprire oppure no...!" },

    /* ═══ PANNELLO 3 — Masachika cerca di razionalizzare (RTL: dx → sx) ═══ */
    { x: 78, y: 68, title: "自制心の塊 みたいな奴だし こっそり ストレス発散 したいんだろう",
      text: "È un concentrato vivente di autocontrollo, vorrà solo sfogare lo stress di nascosto." },
    { x: 56, y: 68, title: "だから あれはきっと 本心じゃない",
      text: "Ecco perché quello che dice non viene affatto dal cuore." },
    { x: 55, y: 85, title: "でないと おかしい だろ…！",
      text: "Altrimenti sarebbe inconcepibile...!" },

    /* ═══ PANNELLO 4 — L'ipotesi di farglielo notare (RTL: dx → sx) ═══ */
    { x: 36, y: 70, title: "もし仮に 指摘してしまった 日にゃあ…",
      text: "Se per puro caso dovessi farglielo notare..." },
    { x: 21, y: 83, title: "あのさー いまロシア語で 俺のこと 褒めたよね？",
      text: "Senti un po'... Mi hai appena fatto dei complimenti in russo, vero?" }
],

35: [
/* ═══ PANNELLO 1 — Alya deride Masachika nell'immaginazione di lui (RTL: dx → sx) ═══ */
{ x: 80, y: 14, title: "…で？ まさか 本気だと でも？",
text: "...E quindi? Credevi sul serio che dicessi davvero?" },
{ x: 74, y: 41, title: "私が あなた なんかに 好意を？",
text: "Io che provo dei sentimenti per uno come te?" },
/* ═══ PANNELLO 2 — Lo sguardo di scherno immaginato di Alya (RTL: dx → sx) ═══ */
    { x: 55, y: 18, title: "…ずいぶんと おめでたい人ね",
      text: "...Che povero illuso che sei." },
    { x: 43, y: 24,
      text: "*ghigno di scherno*" },

    /* ═══ PANNELLO 3 — Masachika crolla nel panico (RTL: dx → sx) ═══ */
    { x: 84, y: 63, title: "うがあ あああ！！",
      text: "Uaaaargh!!" },
    { x: 67, y: 58,
      text: "*sedia che sbatte*" },
    { x: 55, y: 65,
      text: "*sobbalzo*" },
    { x: 24, y: 62, title: "死んでも 言えるか！",
      text: "Non glielo direi manco morto!" },

    /* ═══ PANNELLO 4 — La campanella di fine ora (RTL: dx → sx) ═══ */
    { x: 79, y: 83, title: "…あ 授業 終わってた…",
      text: "...Ah. La lezione era già finita..." },
    { x: 64, y: 81,
      text: "*din don dan don*" }
],

36: [
/* ═══ PANNELLO 1 — Kuze ringrazia per il libro di testo (RTL: dx → sx) ═══ */
{ x: 65, y: 16, title: "ガコ",
text: "clac" },
{ x: 45, y: 15, title: "あ 教科書 ありがとな",
text: "Ah, grazie per avermi fatto guardare il libro." },
{ x: 14, y: 32, title: "…そんな目で 見んなよ",
text: "...Non guardarmi con quegli occhi, dai." },
/* ═══ PANNELLO 2 — Il broncio di Alya e l'improvvisa realizzazione di Kuze (RTL: dx → sx) ═══ */
    { x: 81, y: 47, title: "もう二度と 貸さない",
      text: "Non te lo presterò mai più." },
    { x: 79, y: 54,
      text: "*si volta indignata*" },
    { x: 42, y: 44, title: "悪かった って",
      text: "Ti ho detto che mi dispiace..." },
    { x: 32, y: 52, title: "午後からの 授業は 心入れ替えて…",
      text: "Dalle lezioni del pomeriggio mi rimetterò in riga..." },
    { x: 12, y: 49, title: "…あれ 午後？",
      text: "...Un momento. Pomeriggio?" },

    /* ═══ PANNELLO 3 — La priorità schiacciante: il gacha (RTL: dx → sx) ═══ */
    { x: 83, y: 74, title: "あ――っ!!",
      text: "Aaah--!!" },
    { x: 67, y: 72, title: "午前限定 無料ガチャ もうすぐ 終わる！",
      text: "Il gacha gratuito del mattino sta per scadere!" },
    { x: 69, y: 91,
      text: "*pesante tonfo della bilancia*" },
    { x: 64, y: 87, title: "アーリャ",
      text: "Alya" },
    { x: 51, y: 88, title: "ガチャ オタク",
      text: "Gacha / Otaku" }
],

37: [
/* ═══ PANNELLO 1 — Kuze apre il gioco all'ultimo secondo (RTL: dx → sx) ═══ */
{ x: 85, y: 12, title: "あっぶねぇ〜",
text: "C'è mancato un pelo~" },
{ x: 52, y: 15,
text: "tap tap tap rapido" },
/* ═══ PANNELLO 2 — Lo scrigno del gacha si illumina (RTL: dx → sx) ═══ */
    { x: 37, y: 15, title: "お… おお⁉",
      text: "O-Ohh?!" },
    { x: 18, y: 10,
      text: "*tintinnio scintillante*" },

    /* ═══ PANNELLO 3 — Pescata miracolosa: Tsukuyomi SSR (RTL: dx → sx) ═══ */
    { x: 83, y: 34, title: "っしゃあ！！",
      text: "Sìììì!!" },
    { x: 35, y: 51, title: "私こそが 夜を統べる もの…",
      text: "Sono colei che regna sulla notte..." },
    { x: 23, y: 35, title: "SSR月読 キターー！！",
      text: "Ho beccato Tsukuyomi SSR!! - N.d.T.: Tsukuyomi è la divinità shintoista della luna, qui apparsa come personaggio di massima rarità" },

    /* ═══ PANNELLO 4 — Alya requisisce il telefono (RTL: dx → sx) ═══ */
    { x: 87, y: 84,
      text: "*afferra di scatto*" },
    { x: 81, y: 88, title: "あ",
      text: "Ah." },

    /* ═══ PANNELLO 5 — Alya fa rispettare le regole scolastiche (RTL: dx → sx) ═══ */
    { x: 62, y: 72, title: "緊急時と 勉強に必要な 場合を除き スマホ禁止",
      text: "L'uso dello smartphone è vietato, salvo emergenze o necessità legate allo studio." }
],

38: [
/* ═══ PANNELLO 1 — Kuze si prostra a terra supplicando pietà (RTL: dx → sx) ═══ */
{ x: 88, y: 8, title: "くっ…",
text: "Ugh..." },
{ x: 67, y: 15, title: "お許しくだされ！ どうか御慈悲を…！",
text: "Abbiate pietà, vi scongiuro! Concedetemi la vostra grazia...!" },
{ x: 33, y: 9,
text: "tonfo a terra" },
{ x: 15, y: 16, title: "ちょっ… 必死すぎない⁉",
text: "Ehi, aspetta... Non è un po' troppo disperato?!" },
/* ═══ PANNELLO 2 — Kuze giustifica la rarità della carta e Alya lo fredda (RTL: dx → sx) ═══ */
    { x: 82, y: 40, title: "そのカードは今期イベ限定 排出確率0.2% SSRでして‼",
      text: "Quella carta è una SSR limitata dell'evento in corso, con un tasso di drop dello 0,2%!!" },
    { x: 52, y: 43, title: "絵師むむこ先生とCV上里あやめの神タッグはここでしか見られないという意味 いやもしかしたら復刻イベも何年先に いやもしかしたらもう一生手に入れる",
      text: "Significa che la collaborazione divina tra l'illustratore Mumuko-sensei e la doppiatrice Ayame Uesato si può trovare solo qui! O magari la replica dell'evento ci sarà solo tra diversi anni, se non mai più in tutta la vita..." },
    { x: 48, y: 55, title: "早口やめて",
      text: "Smettila di parlare a raffica." },
    { x: 33, y: 39, title: "というか…",
      text: "E poi..." },
    { x: 26, y: 42, title: "月読って日本神話の神様でしょ？ なんで銀髪なのよ",
      text: "Tsukuyomi è una divinità della mitologia giapponese, no? Perché mai ha i capelli d'argento?" },

    /* ═══ PANNELLO 3 — Kuze esalta i cliché degli anime e Alya arrossisce (RTL: dx → sx) ═══ */
    { x: 82, y: 74, title: "細けえこたあいいのいいの",
      text: "Ma lascia stare i dettagli, non importano!" },
    { x: 50, y: 71, title: "アーサー王も美少女にしちゃうのがクールジャパンよ？",
      text: "Trasformare persino Re Artù in una bella ragazza è il marchio di fabbrica del Cool Japan, no? - N.d.T.: Concetto promosso dal governo nipponico per l'esportazione della cultura pop, qui con chiaro riferimento al franchise Fate" },
    { x: 41, y: 84, title: "可愛い(カワイイ)は正義！ 銀髪キャラはロマン！",
      text: "La carineria è giustizia! E i personaggi con i capelli d'argento sono pura poesia!" },
    { x: 26, y: 72, title: "可愛いって…",
      text: "Ha detto «carina»..." }
],

39: [
/* ═══ PANNELLO 1 — Alya arrossisce toccandosi i capelli d'argento (RTL: dx → sx) ═══ */
{ x: 75, y: 55, title: "У меня ведь тоже серебристые волосы… - …私だって銀髪なのに",
text: "Eppure anche io ho i capelli argentati... - N.d.T.: Dal russo, e pensare che anch'io ho i capelli d'argento" },
/* ═══ PANNELLO 2 — Masachika cerca di mantenere la calma tra le frecciatine (RTL: dx → sx) ═══ */
    { x: 85, y: 80, title: "…本気にしない 本気にしない…！",
      text: "...Non prenderla sul serio, non prenderla assolutamente sul serio...!" },
    { x: 42, y: 75, title: "…なんか 言ったか？",
      text: "...Hai detto qualcosa?" },
    { x: 24, y: 86, title: "この ゲーム廃人が って言ったの",
      text: "Ho detto: «brutto drogato di videogiochi che non sei altro»." },
    { x: 14, y: 77, title: "俺は 無課金勢だ",
      text: "Guarda che io sono un giocatore free-to-play, sia chiaro!" }
],

40: [
/* ═══ PANNELLO 1 — Alya minaccia di spegnere lo smartphone (RTL: dx → sx) ═══ */
{ x: 83, y: 15, title: "…とりあえず これは 電源を切って おきます",
text: "...Per il momento provvedo a spegnerlo." },
{ x: 81, y: 27, title: "生徒会役員 として 見過ごせない",
text: "In quanto membro del consiglio studentesco, non posso chiudere un occhio." },
/* ═══ PANNELLO 2 — Il panico di Masachika per i dati non salvati (RTL: dx → sx) ═══ */
    { x: 48, y: 15, title: "あっ 待て！",
      text: "A-Aspetta!" },
    { x: 32, y: 17, title: "そのまま オフったら セーブされない 可能性が！",
      text: "Se lo spegni adesso c'è il rischio che non si salvi!" },
    { x: 14, y: 32, title: "…や やめろ！",
      text: "...F-Fermati!" },

    /* ═══ PANNELLO 3 — Il melodramma disperato di Masachika (RTL: dx → sx) ═══ */
    { x: 82, y: 48, title: "彼女に 罪はない！",
      text: "Lei non ha colpe!" },
    { x: 26, y: 51, title: "俺は どうなっても いいから",
      text: "Non mi importa cosa ne sarà di me..." },
    { x: 16, y: 66, title: "彼女は 解放して やってくれ…！",
      text: "...ma ti prego, risparmia lei...!" },

    /* ═══ PANNELLO 4 — Lo sguardo gelido di Alya (RTL: dx → sx) ═══ */
    { x: 65, y: 82,
      text: "*sguardo di perplessità*" }
],

41: [
/* ═══ PANNELLO 1 — Lo smartphone viene spento senza pietà (RTL: dx → sx) ═══ */
{ x: 83, y: 22, title: "ア――――無慈悲",
text: "Aaaaah... che crudeltà spietata!" },
{ x: 38, y: 15,
text: "clic dello schermo spento" },
/* ═══ PANNELLO 2 — La residenza di Alya nella notte (RTL: dx → sx) ═══ */
    { x: 83, y: 60, title: "その夜",
      text: "Quella sera" },

    /* ═══ PANNELLO 3 — La porta della stanza di Alya (RTL: dx → sx) ═══ */
    { x: 18, y: 70, title: "Алиса",
      text: "Alisa - N.d.T.: Targa della stanza con il nome Alisa in caratteri cirillici" },

    /* ═══ PANNELLO 4 — Alya si infila sotto le coperte (RTL: dx → sx) ═══ */
    { x: 68, y: 84,
      text: "*fruscio di vestiti...*" }
],

42: [
/* ═══ PANNELLO 2 — Alya prova una posa carina con le orecchie da coniglio (RTL: dx → sx) ═══ */
{ x: 24, y: 68,
text: "stringe i denti per l'imbarazzo..." }
],

43: [
/* ═══ PANNELLO 1 — Alya imita davanti allo specchio la battuta del personaggio SSR (RTL: dx → sx) ═══ */
{ x: 83, y: 18, title: "…わ",
text: "...I-Io..." },
{ x: 23, y: 20, title: "私こそが 夜を 統べるもの…",
text: "«Sono proprio io colei che regna sulla notte...»" },
/* ═══ PANNELLO 2 — Masha la coglie sul fatto (RTL: dx → sx) ═══ */
    { x: 81, y: 45, title: "…アーリャちゃん 何してるの〜？",
      text: "...Alya-chan, che cosa stai facendo~?" },
    { x: 21, y: 45, title: "ギャーーツ",
      text: "Gyaaaah!!" },

    /* ═══ PANNELLO 3 — Vista notturna della casa e conclusione del capitolo (RTL: dx → sx) ═══ */
    { x: 83, y: 67, title: "アリサ・ミハイロヴナ・九条",
      text: "Alisa Mikhailovna Kujo." },
    { x: 62, y: 70, title: "マーシャ！ ノック しなさいよ！！",
      text: "Masha! Bussa prima di entrare!!" },
    { x: 45, y: 83, title: "したわよ〜 アーリャちゃん 気づかないん だもん〜",
      text: "Ma ho bussato~ Sei tu che non mi hai sentita, Alya-chan~" },
    { x: 29, y: 67, title: "彼女が呟く ロシア語は 本心――",
      text: "Le parole che sussurra in russo... vengono davvero dal suo cuore..." },
    { x: 23, y: 79, title: "…なのかも しれない",
      text: "...o almeno, potrebbe essere così." }
],

44: [
/* ═══ PANNELLO 1 — Masha interroga Alya sul cerchietto da coniglio (Striscia 1) (RTL: dx → sx) ═══ */
{ x: 72, y: 6, title: "第２話後の九条姉妹①",
text: "Le sorelle Kujo dopo il capitolo 2 - parte 1" },
{ x: 83, y: 20, title: "…で ホントに 何してたの？ わたしが遊園地で買ったカチューシャまでつけて…",
text: "...E quindi, che cosa stavi facendo per davvero? Ti sei persino messa il cerchietto che avevo comprato al parco divertimenti..." },
{ x: 55, y: 22, title: "こ… これは その…",
text: "Q-Questo... ecco..." },
{ x: 53, y: 12,
text: "panico totale" },
/* ═══ PANNELLO 2 — La proposta alternativa di Masha (Striscia 1) (RTL: dx → sx) ═══ */
    { x: 83, y: 34, title: "…わかった！ 言いにくいなら 聞かないわ",
      text: "...Ho capito! Se ti crea imbarazzo non insisto oltre." },
    { x: 57, y: 33, title: "！ マーシャ……",
      text: "! Masha...!" },
    { x: 57, y: 44, title: "その代わり ちょっとした お願いがあるんだけど…",
      text: "In cambio però avrei un piccolo favore da chiederti..." },
    { x: 83, y: 46,
      text: "*sguardo insistente...*" },

    /* ═══ PANNELLO 3 — Masha tira fuori lo smartphone (Striscia 1) (RTL: dx → sx) ═══ */
    { x: 83, y: 56, title: "写真 撮らせて",
      text: "Fammi fare qualche foto!" },
    { x: 58, y: 66, title: "それが いちばん 嫌！！",
      text: "Questo mai e poi mai!!" },

    /* ═══ PANNELLO 4 — Alya caccia Masha dalla stanza (Striscia 1) (RTL: dx → sx) ═══ */
    { x: 81, y: 77, title: "お願いお願い！ 顔写真と 全身写真だけで いいから！",
      text: "Ti prego, ti prego! Mi bastano solo un primo piano e una a figura intera!" },
    { x: 72, y: 83, title: "あ！ どうせなら メイクもして あげよっか？",
      text: "Ah! Già che ci siamo, che ne dici se ti trucco un po'?" },
    { x: 56, y: 87, title: "もおおお 頼むから 出てって！",
      text: "Aaaaah, ti scongiuro, esci da questa camera!!" },

    /* ═══ PANNELLO 5 — Alya si cambia e chiede spiegazioni (Striscia 2) (RTL: dx → sx) ═══ */
    { x: 26, y: 6, title: "第２話後の九条姉妹②",
      text: "Le sorelle Kujo dopo il capitolo 2 - parte 2" },
    { x: 12, y: 11, title: "着替えた",
      text: "Si è cambiata" },
    { x: 41, y: 15, title: "写真なんか 何に使うつもり だったのよ…",
      text: "E poi per cosa avevi intenzione di usarle quelle foto...?" },
    { x: 11, y: 23, title: "それは もちろん",
      text: "Ma è ovvio..." },

    /* ═══ PANNELLO 6 — Il modulo per l'agenzia di talenti (Striscia 2) (RTL: dx → sx) ═══ */
    { x: 19, y: 33, title: "芸能事務所 に送る 応募用紙よ",
      text: "...per il modulo di candidatura da inviare a un'agenzia per idol!" },
    { x: 10, y: 41,
      text: "*sventola il foglio*" },
    { x: 21, y: 42, title: "オーディション応募用紙 アリサ・ミハイロヴナ・九条",
      text: "Modulo di candidatura per audizioni - Alisa Mikhailovna Kujo" },
    { x: 36, y: 42, title: "一瞬で さっきの嫌さ 超えて こないで‼",
      text: "Non superare l'orrore di prima nel giro di un secondo!!" },

    /* ═══ PANNELLO 7 — Il dovere di ogni sorella maggiore (Striscia 2) (RTL: dx → sx) ═══ */
    { x: 41, y: 56,
      text: "*scuote forsennatamente*" },
    { x: 26, y: 55, title: "あ やめて〜‼",
      text: "Ah! Fermatiii!!" },
    { x: 17, y: 57, title: "かわいい妹を 芸能界デビュー させるのは 姉のつとめ でしょ！",
      text: "Far debuttare nel mondo dello spettacolo una sorellina così carina è il dovere di ogni sorella maggiore!" },
    { x: 10, y: 65, title: "そんな常識 知らない わよ‼",
      text: "Non esiste una regola simile al mondo!!" },

    /* ═══ PANNELLO 8 — La foto rubata per la schermata di blocco (Striscia 2) (RTL: dx → sx) ═══ */
    { x: 39, y: 77, title: "もう…冗談よ アーリャちゃんが 嫌がることは しないわ",
      text: "Ma dai... scherzavo! Non farei mai qualcosa che ti dà fastidio, Alya-chan." },
    { x: 28, y: 78, title: "これは ロック画面に するだけよ",
      text: "Questa la userò solo come sfondo per la schermata di blocco." },
    { x: 14, y: 77, title: "いやだから それも嫌…",
      text: "No, mi dà fastidio pure quello..." },
    { x: 12, y: 87, title: "ねえ ちょっと 待って いつの間に 撮って",
      text: "Ehi, aspetta un momento... Ma quando diamine l'hai scattata?!" }
],

45: [
/* ═══ PANNELLO 1 — Frontespizio del Capitolo 3: Alya cammina nel corridoio (RTL: dx → sx) ═══ */
{ x: 20, y: 11, title: "第3話",
text: "Capitolo 3" },
{ x: 16, y: 23, title: "別にぼっちじゃないぞ？①",
text: "Non sono mica un tipo solitario, eh? 1" }
],

46: [
/* ═══ PANNELLO 1 — La disperazione nella mensa dell'accademia (RTL: dx → sx) ═══ */
{ x: 83, y: 12, title: "征嶺学園 食堂",
text: "Mensa dell'Accademia Seirei" },
{ x: 58, y: 19, title: "モテたい…！",
text: "Voglio piacere alle ragazze...!" },
/* ═══ PANNELLO 2 — Masachika e Hikaru ignorano i pianti dell'amico (RTL: dx → sx) ═══ */
    { x: 81, y: 66, title: "うわっ 政近それ 何食べてるの",
      text: "Uwah, Masachika, che cosa ti stai mangiando?" },
    { x: 52, y: 66, title: "ん？ 激辛麻婆ラーメン〜 新メニューらしい",
      text: "Mmh? Ramen extra piccante al mapo tofu~ Pare sia una novità del menu." },
    { x: 64, y: 71,
      text: "*slurp*" },
    { x: 44, y: 88, title: "おい！",
      text: "Ehiii!" },

    /* ═══ PANNELLO 3 — Takeshi sbotta furioso (RTL: dx → sx) ═══ */
    { x: 28, y: 67, title: "無視してんじゃねえぞ 色男ども…",
      text: "Non osate ignorarmi, maledetti bellocci..." },
    { x: 14, y: 86, title: "誰が色男だ",
      text: "A chi hai dato del belloccio?!" }
],

47: [
/* ═══ PANNELLO 1 — Il ramen infernale di Masachika (RTL: dx → sx) ═══ */
{ x: 83, y: 12, title: "って 辛ッ！ 目に 沁みる！",
text: "Ma è piccantissimo! Brucia persino agli occhi!" },
{ x: 52, y: 15, title: "学食で 出ていい 赤さじゃない…",
text: "Non è una sfumatura di rosso accettabile nella mensa di una scuola..." },
{ x: 58, y: 27,
text: "vampa piccante" },
{ x: 49, y: 38, title: "美味いけど そんなに 辛くないぞ",
text: "È buono, dai, e poi non è mica così piccante." },
/* ═══ PANNELLO 2 — Discussione sui condimenti estremi (RTL: dx → sx) ═══ */
    { x: 26, y: 15, title: "テーブルに デスソース あれば いいのに",
      text: "Magari mettessero della Death Sauce sui tavoli, ci starebbe benissimo." },
    { x: 29, y: 41, title: "塩と醤油の 間に並べて いいもんじゃ ねえだろ",
      text: "Non è proprio roba da piazzare in mezzo al sale e alla soia!" },
    { x: 16, y: 44, title: "麻婆に 合うの？",
      text: "E poi ci sta bene con il mapo tofu?" },

    /* ═══ PANNELLO 3 — Presentazione di Takeshi Maruyama e Hikaru Kiyomiya (RTL: dx → sx) ═══ */
    { x: 80, y: 59, title: "そんなもん 食わなくても 刺激的な生活 送ってる くせによ…",
      text: "Come se avessi bisogno di mangiare roba simile, con la vita movimentata che ti ritrovi già..." },
    { x: 63, y: 69, title: "丸山毅",
      text: "Takeshi Maruyama" },
    { x: 29, y: 69, title: "清宮光瑠",
      text: "Hikaru Kiyomiya" },

    /* ═══ PANNELLO 4 — Masachika non capisce l'allusione (RTL: dx → sx) ═══ */
    { x: 27, y: 81, title: "ハァ？ 何がだ？",
      text: "Eh? Di che parli?" }
],

48: [
/* ═══ PANNELLO 1 — Masachika rammenta il trauma (RTL: dx → sx) ═══ */
{ x: 85, y: 11, title: "あ…",
text: "Ah..." },
/* ═══ PANNELLO 2 — Il dramma del salvataggio fallito al gacha (RTL: dx → sx) ═══ */
    { x: 65, y: 15, title: "一昨日 ガチャ爆死した件は 触れないでくれ… 月読を追って 無課金で コツコツ貯めた石 全溶かししたことは…",
      text: "Ti prego, non toccare il tasto del massacro al gacha dell'altro ieri... Per inseguire Tsukuyomi ho bruciato tutte le gemme accumulate con fatica da giocatore free-to-play..." },
    { x: 30, y: 16,
      text: "*urlo di disperazione*" },
    { x: 14, y: 27, title: "あれ結局 セーブされて なかったんだね",
      text: "Alla fine allora non si era salvato per davvero." },

    /* ═══ PANNELLO 3 — Takeshi esplode di gelosia per la vicinanza con Alya (RTL: dx → sx) ═══ */
    { x: 79, y: 43, title: "そうじゃね〜よ！",
      text: "Non parlavo di quello!" },
    { x: 48, y: 43, title: "毎日隣の席に 超絶美少女の アーリャ姫がいるんだぞ！ 羨ましすぎんだよ…！",
      text: "Ogni santo giorno hai seduta al banco di fianco la principessa Alya, una ragazza dalla bellezza stratosferica! È roba da morire d'invidia...!" },
    { x: 68, y: 65, title: "廊下側",
      text: "Lato corridoio" },
    { x: 53, y: 66, title: "政近の前の席",
      text: "Posto davanti a Masachika" },
    { x: 17, y: 53, title: "毎日怒られてる だけだけどね",
      text: "Anche se viene rimproverato ogni singolo giorno." },

    /* ═══ PANNELLO 4 — Le reazioni alla freddezza di Kujo-san (RTL: dx → sx) ═══ */
    { x: 81, y: 80, title: "馬鹿野郎！ それも 羨ましい だろうが！",
      text: "Idiota! È invidiabile pure quello, accidenti a te!" },
    { x: 48, y: 87, title: "こわっ 近寄らんとこ",
      text: "Che inquietante... Meglio stargli alla larga." },
    { x: 30, y: 83, title: "でも確かに 九条さんって 基本誰とも 喋らないよね",
      text: "Però è vero che di norma Kujo-san non rivolge la parola quasi a nessuno." }
],

49: [
/* ═══ PANNELLO 1 — Il ricordo del festival e l'uso del soprannome (RTL: dx → sx) ═══ */
{ x: 83, y: 11, title: "彼女が 転入したのが 中三の春で…",
text: "Si è trasferita qui nella primavera del terzo anno delle medie..." },
{ x: 68, y: 19, title: "その年の 学園祭 終わった 頃には",
text: "...e verso la fine del festival scolastico di quell'anno..." },
{ x: 83, y: 58, title: "政近は もう愛称で 呼んで なかった？",
text: "...tu, Masachika, non la chiamavi già con il suo nomignolo Alya?" },
/* ═══ PANNELLO 2 — Masachika minimizza mentre mangia (RTL: dx → sx) ═══ */
    { x: 48, y: 12, title: "まあ… 流れでな",
      text: "Be'... è successo così per caso." },
    { x: 50, y: 21,
      text: "*soffia sui noodles*" },
    { x: 18, y: 17, title: "お前 だけだぜ 直接呼べる のは いいよな〜",
      text: "Sei l'unico a poterla chiamare direttamente per nome. Che invidia~" },

    /* ═══ PANNELLO 3 — Masachika descrive il vero carattere di Alya (RTL: dx → sx) ═══ */
    { x: 48, y: 37, title: "みんな 神聖視しすぎ なんだよ",
      text: "È che tutti voi la idealizzate troppo, come se fosse una divinità intoccabile." },
    { x: 35, y: 44, title: "意外と 愉快な 奴だぜ",
      text: "In realtà sa essere un tipo parecchio spassoso." },
    { x: 20, y: 64, title: "いろんな 意味で…",
      text: "In tutti i sensi..." },

    /* ═══ PANNELLO 4 — Takeshi perde la pazienza e Hikaru commenta (RTL: dx → sx) ═══ */
    { x: 78, y: 82, title: "なんだその 俺の女感！",
      text: "Ma che è quest'aria da «lei è roba mia»?!" },
    { x: 39, y: 78,
      text: "*slurp slurp*" },
    { x: 22, y: 82, title: "ある意味 政近って 大物だよね あれだけ罵倒されて それ言えるの",
      text: "In un certo senso sei un tipo incredibile, Masachika. Riuscire a dire una cosa simile dopo tutti gli insulti che ti sei preso..." }
],

50: [
/* ═══ PANNELLO 1 — Takeshi e Hikaru riconoscono le abilità nascoste di Kuze (RTL: dx → sx) ═══ */
{ x: 79, y: 13, title: "いや… でもお前",
text: "No... però pensandoci bene," },
{ x: 48, y: 17, title: "意外と スペック 高いよな 普段の 不真面目さで 隠れてるけど",
text: "...hai delle capacità sorprendentemente alte, anche se sono mascherate dalla tua solita svogliatezza." },
{ x: 19, y: 14, title: "あー 確かに 運動神経も 地頭もかなり いいよね",
text: "Ah, è vero. Sei sia portato per lo sport che molto intelligente di natura." },
/* ═══ PANNELLO 2 — Paragonato a un protagonista di light novel (RTL: dx → sx) ═══ */
    { x: 75, y: 55, title: "普段全然 勉強して ないのに 赤点は回避 してるし あの 激ムズ テストを",
      text: "Nonostante non studi mai eviti sempre l'insufficienza, persino a quei test a difficoltà disumana... - N.d.T.: In Giappone il termine akaten indica il punteggio sotto la sufficienza" },
    { x: 42, y: 53, title: "どこの ラノベ主人公 だよ！ 現実社会で チート 持ちか⁉",
      text: "Ma che sei, il protagonista di una light novel?! Hai le abilità cheat persino nella vita reale?! - N.d.T.: Ranobe è l'abbreviazione comune per light novel, romanzi giapponesi illustrati" },
    { x: 17, y: 62, title: "だとしたら 俺みたいな サボリ魔 嫌われるだろ",
      text: "Se così fosse, uno scansafatiche cronico come me attirerebbe solo antipatie, no?" },

    /* ═══ PANNELLO 3 — I trascorsi alle medie e un brusio in mensa (RTL: dx → sx) ═══ */
    { x: 78, y: 80, title: "何げに 中学時代は 生徒会入って たしな",
      text: "E poi alle medie eri persino nel consiglio studentesco, senza dare nell'occhio." },
    { x: 40, y: 80, title: "それは さ… ほら あいつが",
      text: "Quello è... beh, insomma, per via di quella là..." },
    { x: 13, y: 78,
      text: "*brusio improvviso*" }
],

51: [
/* ═══ PANNELLO 1 — Gli studenti notano le ragazze del consiglio studentesco (RTL: dx → sx) ═══ */
{ x: 83, y: 11, title: "おい 見ろよ",
text: "Ehi, guardate là!" },
{ x: 77, y: 20, title: "生徒会 メンバー だ！",
text: "Ci sono i membri del consiglio studentesco!" },
{ x: 48, y: 11, title: "うそっ どこどこ⁉",
text: "Davvero?! Dove, dove?!" },
{ x: 26, y: 15, title: "会長と 副会長は いないのか",
text: "Il presidente e la vicepresidente non ci sono, a quanto pare." },
/* ═══ PANNELLO 2 — L'ingresso delle tre bellezze del consiglio studentesco (RTL: dx → sx) ═══ */
    { x: 23, y: 31, title: "でもやっぱ 三人 揃ってると すげえな…",
      text: "Però cavolo, vederle tutte e tre insieme fa un effetto davvero pazzesco..." }
],

52: [
/* ═══ PANNELLO 1 — Alya cerca posto a sedere nella mensa affollata (RTL: dx → sx) ═══ */
{ x: 74, y: 59, title: "…出遅れたわね",
text: "...Siamo arrivate un po' in ritardo." },
{ x: 62, y: 65, title: "席 あるかしら",
text: "Chissà se ci sono posti liberi." },
{ x: 70, y: 82, title: "一年 生徒会会計 アリサ・ミハイロヴナ・九条",
text: "Primo anno - Tesoriera del consiglio studentesco - Alisa Mikhailovna Kujo" },
/* ═══ PANNELLO 2 — Masha si allontana per pranzare con la sua classe (RTL: dx → sx) ═══ */
    { x: 26, y: 61, title: "大丈夫よ〜 わたし あっちで クラスの子たちと 食べるわね",
      text: "Non preoccuparti~ Io vado a mangiare laggiù insieme ai miei compagni di classe." },
    { x: 26, y: 82, title: "二年 生徒会書記 マリヤ・ミハイロヴナ・九条",
      text: "Secondo anno - Segretaria del consiglio studentesco - Maria Mikhailovna Kujo" }
],

53: [
/* ═══ PANNELLO 1 — Presentazione di Yuki Suou (RTL: dx → sx) ═══ */
{ x: 79, y: 61, title: "あら… マーシャ先輩 お気遣い すみません",
text: "Oh cielo... Masha-senpai, mi dispiace per averti fatto preoccupare." },
{ x: 73, y: 81, title: "一年 生徒会広報 周防有希",
text: "Primo anno - Addetta alle relazioni pubbliche del consiglio studentesco - Yuki Suou" },
/* ═══ PANNELLO 2 — Il dolce augurio di Masha (RTL: dx → sx) ═══ */
    { x: 34, y: 18, title: "いいのよ〜 二人に 仲良くなって もらいたい もの",
      text: "Ma figurati~ È che mi piacerebbe davvero che voi due faceste amicizia!" },

    /* ═══ PANNELLO 3 — Takeshi ammira incantato le ragazze (RTL: dx → sx) ═══ */
    { x: 30, y: 55, title: "はぁ…",
      text: "Aah..." },
    { x: 39, y: 64, title: "ほんと 目の保養 だよな…",
      text: "È proprio una gioia per gli occhi..." }
],

54: [
/* ═══ PANNELLO 1 — Alisa Mikhailovna Kujo, «La principessa solitaria» (RTL: dx → sx) ═══ */
{ x: 80, y: 20, title: "去年 超難関の転入試験を クリアし 彗星のごとく 現れた 完璧美少女",
text: "Una fanciulla dalla bellezza impeccabile apparsa come una cometa, dopo aver superato l'anno scorso un esame di ammissione per studenti trasferiti di estrema difficoltà..." },
{ x: 18, y: 23, title: "“孤高のお姫様”",
text: "«La principessa solitaria»." },
/* ═══ PANNELLO 2 — Maria Mikhailovna Kujo, «La Madonna dell'Accademia» (RTL: dx → sx) ═══ */
    { x: 78, y: 48, title: "その姫の お姉様であり 穏やかな性格と 溢れる母性で 人々の目を奪う",
      text: "Sorella maggiore di quella stessa principessa, che rapisce gli sguardi di tutti con la sua indole dolce e le sue forme materne prorompenti... - N.d.T.: Ai caratteri indicanti la maternità viene data scherzosamente la lettura di fisico procace" },
    { x: 18, y: 51, title: "“学園の聖母”",
      text: "«La Madonna dell'Accademia» - N.d.T.: Ai caratteri indicanti la santa madre viene data la pronuncia di madonna" },

    /* ═══ PANNELLO 3 — Yuki Suou, «La nobile fanciulla di alto rango» (RTL: dx → sx) ═══ */
    { x: 79, y: 76, title: "元華族で 代々外交官を担う 周防家の長女 正真正銘の お嬢様",
      text: "Primogenita della casata Suou, antica famiglia aristocratica che vanta generazioni di diplomatici, nonché autentica gentildonna di nobilissimo lignaggio..." },
    { x: 18, y: 80, title: "“深窓のおひい様”",
      text: "«La nobile fanciulla di alto rango» - N.d.T.: L'espressione shinsou no ohii-sama indica una dama di nobilissimi natali cresciuta al riparo dal mondo esterno nelle stanze del palazzo" }
],

55: [
/* ═══ PANNELLO 1 — Masachika cerca di sviare il discorso su Suou (RTL: dx → sx) ═══ */
{ x: 82, y: 14, title: "そんでもって 周防さんは 政近の…",
text: "E poi Suou-san sarebbe la tua..." },
{ x: 63, y: 19, title: "うちの生徒 二つ名 つけるの 好きだよな",
text: "Agli studenti di questa scuola piace proprio affibbiare soprannomi a tutti, eh?" },
{ x: 56, y: 48, title: "おい ごまかしてんじゃ ねえぞ",
text: "Ehi, non provare a cambiare discorso!" },
/* ═══ PANNELLO 2 — Hikaru non vuole parlare di ragazze (RTL: dx → sx) ═══ */
    { x: 33, y: 13, title: "女の子の 話はもう いいって…",
      text: "Lasciamo perdere i discorsi sulle ragazze, vi prego..." },
    { x: 18, y: 21, title: "ほら 光瑠は 恋愛で色々 あったから",
      text: "Be', dopotutto Hikaru ne ha passate tante per via dell'amore..." },
    { x: 32, y: 46, title: "ご ごめん…",
      text: "S-Scusa..." },
    { x: 18, y: 48, title: "モテすぎん のも 考えもんだな",
      text: "Anche essere fin troppo popolari è una bella seccatura, a quanto pare." },

    /* ═══ PANNELLO 3 — La domanda diretta di Hikaru a Masachika (RTL: dx → sx) ═══ */
    { x: 79, y: 86, title: "そういや 政近は どうなの？",
      text: "A proposito, tu invece che mi dici, Masachika?" },
    { x: 40, y: 62, title: "え？",
      text: "Eh?" },
    { x: 24, y: 65, title: "彼女 ほしい？",
      text: "La vorresti una ragazza?" },
    { x: 17, y: 88, title: "…あー…",
      text: "...Beh..." }
],

56: [
/* ═══ PANNELLO 1 — Masachika trova assurda l'idea di avere una ragazza (RTL: dx → sx) ═══ */
{ x: 80, y: 19, title: "……俺に 彼女とか",
text: "...Io con una ragazza?" },
{ x: 65, y: 25, title: "現実感なさ すぎるだろ",
text: "Sarebbe una cosa totalmente surreale." },
/* ═══ PANNELLO 2 — Gli amici prendono in giro le sue abitudini da otaku (RTL: dx → sx) ═══ */
    { x: 80, y: 44, title: "…ああ",
      text: "...Ah." },
    { x: 52, y: 46, title: "確かに 初デートで アニメイト 連れて いかれそう",
      text: "In effetti, ti vedo già a portarla da Animate al primo appuntamento - N.d.T.: Animate è la più celebre catena di negozi di anime e manga in Giappone" },
    { x: 60, y: 60, title: "わかる 現地集合 現地解散 でな",
      text: "Verissimo! Con tanto di ritrovo direttamente sul posto e ognuno a casa per conto suo dopo!" },
    { x: 18, y: 48, title: "んだと！ 最高だろうが アニメイト！",
      text: "Che cosa?! Ma se Animate è il posto più bello del mondo!" },

    /* ═══ PANNELLO 3 — Le battute continuano finché qualcuno si avvicina (RTL: dx → sx) ═══ */
    { x: 80, y: 75, title: "記念日に ファミレス 連れてって フラれそう",
      text: "Finiresti per farti scaricare dopo averla portata in un family restaurant per l'anniversario - N.d.T.: I famiresu sono catene di ristoranti informali ed economici per famiglie" },
    { x: 78, y: 87, title: "財布 マジック テープ そう",
      text: "E scommetto che tiri pure fuori il portafoglio a strappo col velcro!" },
    { x: 54, y: 84, title: "それオタク 関係 ないやろ！",
      text: "Quello non c'entra un bel niente con l'essere un otaku!" },
    { x: 19, y: 85, title: "…あの",
      text: "...Scusate..." }
],

57: [
/* ═══ PANNELLO 1 — Yuki e Alya chiedono di unirsi al tavolo (RTL: dx → sx) ═══ */
{ x: 81, y: 40, title: "こちらの席 よろしい ですか？",
text: "Possiamo sederci a questo tavolo?" },
{ x: 72, y: 51, title: "政近君",
text: "Masachika-kun." },
{ x: 41, y: 52, title: "えっ ちょっ 周防さん…",
text: "Eh? Aspetta, Suou-san..." },
/* ═══ PANNELLO 2 — Masachika saluta le due compagne (RTL: dx → sx) ═══ */
    { x: 20, y: 19, title: "…お 有希 とアーリャ",
      text: "...Oh. Yuki... e Alya." },

    /* ═══ PANNELLO 3 — Gli amici cedono il posto in preda all'agitazione (RTL: dx → sx) ═══ */
    { x: 80, y: 70, title: "まあ いいけど お前らは？",
      text: "Per me va bene, ma per voi due?" },
    { x: 70, y: 66,
      text: "*spostamento dalle sedie*" },
    { x: 52, y: 88, title: "どっどど どーぞ どーぞ！",
      text: "P-P-Prego, accomodatevi pure!" },

    /* ═══ PANNELLO 4 — Alya si accomoda imbarazzata (RTL: dx → sx) ═══ */
    { x: 38, y: 70, title: "おず…",
      text: "*con esitazione...*" },
    { x: 34, y: 83, title: "お… お邪魔 します…",
      text: "S-Scusate il disturbo... - N.d.T.: Formula cerimoniale di cortesia quando ci si accomoda nello spazio di altri" }
],

58: [
/* ═══ PANNELLO 1 — La ciotola di ramen piccante viene servita (RTL: dx → sx) ═══ */
{ x: 80, y: 22,
text: "clac" },
{ x: 24, y: 26, title: "…ああ やはり",
text: "...Ah, proprio come immaginavo." },
/* ═══ PANNELLO 2 — Conversazione sulle scelte del menu (RTL: dx → sx) ═══ */
    { x: 81, y: 44, title: "政近君も 同じものを 頼まれたの ですね",
      text: "Anche tu hai ordinato la stessa cosa, Masachika-kun?" },
    { x: 49, y: 39, title: "まあな",
      text: "Già." },
    { x: 32, y: 43, title: "周防さんも そういうの 食べるんスね",
      text: "Non pensavo che anche lei mangiasse piatti del genere, Suou-san!" },
    { x: 14, y: 44, title: "食べますよ〜 さすがに家では出ませんが",
      text: "Certo che sì~ Anche se a casa, com'è ovvio, non vengono serviti." },

    /* ═══ PANNELLO 3 — Yuki assaggia con grazia il ramen piccante (RTL: dx → sx) ═══ */
    { x: 75, y: 58,
      text: "*si scosta i capelli*" },
    { x: 8, y: 77,
      text: "*slurp delicato...*" }
],

59: [
/* ═══ PANNELLO 1 — Yuki si riprende dal boccone piccante (RTL: dx → sx) ═══ */
{ x: 43, y: 11, title: "ふぅ…",
text: "Fuuu..." },
/* ═══ PANNELLO 2 — I gusti estremi di Yuki per il piccante (RTL: dx → sx) ═══ */
    { x: 80, y: 34, title: "美味しいですが 辛さは まだまだですね",
      text: "È delizioso, ma quanto a piccantezza c'è ancora del margine." },
    { x: 23, y: 35, title: "テーブルに ブート ジョロキアが あればいいのに",
      text: "Se solo ci fosse del Bhut Jolokia sui tavoli, sarebbe perfetto - N.d.T.: Il Bhut Jolokia o Ghost Pepper è una varietà di peperoncino tra le più piccanti al mondo" },

    /* ═══ PANNELLO 3 — Il battibecco familiare tra Masachika e Yuki (RTL: dx → sx) ═══ */
    { x: 76, y: 60, title: "今度の 生徒会会議題で 検討して みようかしら",
      text: "Quasi quasi propongo di discuterne all'ordine del giorno della prossima riunione del consiglio!" },
    { x: 85, y: 85, title: "いや 職権濫用 すな",
      text: "Ehi, non abusare della tua carica!" },
    { x: 67, y: 88, title: "ふふ 冗談です",
      text: "Fufufu, stavo solo scherzando." },

    /* ═══ PANNELLO 4 — Takeshi osserva invidioso mentre Hikaru accenna un sorriso (RTL: dx → sx) ═══ */
    { x: 48, y: 61, title: "やっぱ 仲良いよな 羨ましい…",
      text: "Quei due vanno davvero d'accordo, eh... Che invidia..." },
    { x: 32, y: 56,
      text: "*bisbiglio*" },
    { x: 16, y: 65, title: "まあ そりゃ …ね",
      text: "Be'... com'è comprensibile, no?" }

    /* ═══ PANNELLO 5 — Lo sguardo silenzioso e turbato di Alya (RTL: dx → sx) ═══ */
],

60: [
/* ═══ PANNELLO 1 — Alya interrompe con timidezza (RTL: dx → sx) ═══ */
{ x: 67, y: 16,
text: "esitante..." },
{ x: 69, y: 26, title: "…あの",
text: "...Scusate..." },
/* ═══ PANNELLO 2 — Alya chiede del loro rapporto (RTL: dx → sx) ═══ */
    { x: 55, y: 19, title: "…二人は お友達… なの？",
      text: "...Voi due siete... amici?" },

    /* ═══ PANNELLO 3 — Il sorriso enigmatico di Yuki (RTL: dx → sx) ═══ */
    { x: 22, y: 41, title: "…ええ",
      text: "...Sì." },

    /* ═══ PANNELLO 4 — Yuki si avvinghia a Masachika (RTL: dx → sx) ═══ */
    { x: 74, y: 56,
      text: "*si stringe al suo braccio con affetto*" },
    { x: 84, y: 70, title: "わたくし たち",
      text: "Noi due..." },
    { x: 76, y: 82, title: "幼馴染 なんです",
      text: "...siamo amici d'infanzia! - N.d.T.: Il termine osananajimi indica legami stretti d'amicizia che durano fin dall'infanzia" },

    /* ═══ PANNELLO 5 — Lo shock pietrificante di Alya (RTL: dx → sx) ═══ */
    { x: 23, y: 71,
      text: "*shock improvviso*" }
],

61: [
/* ═══ PANNELLO 1 — Yuki ribadisce la loro vicinanza (RTL: dx → sx) ═══ */
{ x: 79, y: 25, title: "わたくしたち",
text: "Noi due..." },
{ x: 73, y: 41, title: "幼馴染 なんです",
text: "...siamo amici d'infanzia." },
{ x: 17, y: 12, title: "第4話",
text: "Capitolo 4" },
/* ═══ PANNELLO 2 — Lo sconcerto cosmico di Alya (RTL: dx → sx) ═══ */
    { x: 81, y: 81, title: "幼馴染なんです なんです なんです… (エコー)",
      text: "Amici d'infanzia... d'infanzia... d'infanzia... - eco" }
],

62: [
/* ═══ PANNELLO 1 — Frontespizio del Capitolo 4: Yuki Suou incoronata tra i fiori (RTL: dx → sx) ═══ */
{ x: 88, y: 8, title: "第4話",
text: "Capitolo 4" },
{ x: 84, y: 20, title: "別にぼっちじゃないぞ？②",
text: "Non sono mica un tipo solitario, eh? 2" }
],

63: [
/* ═══ PANNELLO 1 — I due amici finiscono il pranzo all'istante (RTL: dx → sx) ═══ */
{ x: 79, y: 11, title: "ごちそーサマ！",
text: "Grazie per il pranzo! - N.d.T.: Formula usata a fine pasto" },
{ x: 83, y: 23,
text: "sbam" },
/* ═══ PANNELLO 2 — Le scuse improbabili di Hikaru e Takeshi (RTL: dx → sx) ═══ */
    { x: 58, y: 12, title: "先にお暇させてもらうね 訳：女の子苦手",
      text: "Noi togliamo il disturbo! - Traduzione: Non regge il contatto con le ragazze" },
    { x: 23, y: 17, title: "一軍女子の吐く二酸化炭素でオレの肺が悲鳴を上げてる 訳：緊張して無理",
      text: "I miei polmoni gridano pietà per l'anidride carbonica emessa da queste ragazze d'élite! - Traduzione: Troppo agitato per resistere - N.d.T.: Ichigun indica gli studenti al vertice della gerarchia sociale" },
    { x: 18, y: 38, title: "はァ⁉",
      text: "Cosaaa?!" },

    /* ═══ PANNELLO 3 — La fuga precipitosa dei due amici (RTL: dx → sx) ═══ */
    { x: 83, y: 51, title: "後は若い方たちでごゆっくり〜",
      text: "Vi lasciamo soli tra giovani, fate pure con comodo~!" },
    { x: 53, y: 50, title: "ちょっ おい！",
      text: "Aspettate, ehi!" },
    { x: 58, y: 60,
      text: "*fuga a gambe levate*" },

    /* ═══ PANNELLO 4 — Masachika abbandonato al tavolo (RTL: dx → sx) ═══ */
    { x: 36, y: 52, title: "なんだよ あいつら…",
      text: "Ma che problemi hanno quei due...?" },
    { x: 12, y: 51, title: "あらあら",
      text: "Oh cielo..." },

    /* ═══ PANNELLO 5 — I deliri di persecuzione di Masachika (RTL: dx → sx) ═══ */
    { x: 80, y: 77, title: "ヤバいぞ… この状態は キッツい…",
      text: "È terribile... Questa situazione è pesantissima da sopportare..." },
    { x: 38, y: 70, title: "俺たちの 姫様二人を 侍らす… だと⁉",
      text: "Si fa servire da entrambe le nostre principesse... ma stiamo scherzando?!" },
    { x: 22, y: 70, title: "何モンじゃ ワレ",
      text: "Ma chi si crede di essere quel tipo?!" },
    { x: 10, y: 70,
      text: "*brusio minaccioso*" },
    { x: 14, y: 79, title: "オタクくんが ハーレム系 主人公ごっこ してるー",
      text: "Guardate l'otaku che gioca a fare il protagonista di un anime harem!" },
    { x: 12, y: 86,
      text: "*risatine beffarde*" },
    { x: 21, y: 90, title: "※被害妄想",
      text: "*Deliri di persecuzione" }
],

64: [
/* ═══ PANNELLO 1 — Masachika cerca di fuggire ma Yuki lo trattiene (RTL: dx → sx) ═══ */
{ x: 81, y: 14, title: "じゃ俺も 次の授業の 予習を…",
text: "Allora vado anch'io ad avvantaggiarmi per la prossima lezione..." },
{ x: 66, y: 18,
text: "tirata improvvisa per la giacca" },
{ x: 51, y: 17, title: "あらあら 見え透いた 嘘を",
text: "Ma cielo, che bugia trasparente..." },
{ x: 26, y: 14, title: "有希ィィ！ そんなに 俺の死体が 見たいか",
text: "Yukiii! Hai così tanta voglia di vedere il mio cadavere?!" },
{ x: 14, y: 34, title: "おっしゃる 意味がよく…",
text: "Non comprendo affatto cosa intenda...?" },
/* ═══ PANNELLO 2 — L'osservazione distaccata di Alya (RTL: dx → sx) ═══ */
    { x: 72, y: 51, title: "…本当に 仲が 良いのね",
      text: "...Siete davvero molto affiatati, voi due." },

    /* ═══ PANNELLO 3 — Yuki spiega il loro passato insieme (RTL: dx → sx) ═══ */
    { x: 77, y: 69, title: "幼稚園から ずっと同じ 学校ですから ね？",
      text: "Siamo nella stessa scuola fin dall'asilo, dopotutto. Vero?" },
    { x: 69, y: 65,
      text: "*slurp*" },
    { x: 41, y: 84, title: "まあな…",
      text: "Be', sì..." },

    /* ═══ PANNELLO 4 — La reazione malinconica di Alya (RTL: dx → sx) ═══ */
    { x: 23, y: 88, title: "そう… なの",
      text: "Capisco... è così, allora..." }
],

65: [
/* ═══ PANNELLO 1 — Masachika chiede del rapporto tra Yuki e Alya (RTL: dx → sx) ═══ */
{ x: 83, y: 18, title: "そういう お前らは 仲いいのか？",
text: "A proposito, voi due andate d'accordo?" },
{ x: 79, y: 28, title: "同じ 生徒会の 一年生 同士だし",
text: "Siete entrambe al primo anno e fate parte dello stesso consiglio studentesco, no?" },
/* ═══ PANNELLO 2 — La risposta diplomatica di Yuki (RTL: dx → sx) ═══ */
    { x: 32, y: 13, title: "…えと",
      text: "...Ehm..." },
    { x: 23, y: 29, title: "仲良く しようと している 最中… でしょうか",
      text: "Diciamo che stiamo cercando di fare amicizia proprio in questo periodo... suppongo?" },

    /* ═══ PANNELLO 3 — Il desiderio sincero di Yuki (RTL: dx → sx) ═══ */
    { x: 52, y: 44, title: "わたくしは お友達に なりたいの ですけれど",
      text: "Per quanto mi riguarda, desidero davvero che diventiamo amiche, però..." },

    /* ═══ PANNELLO 4 — Lo stupore di Alya (RTL: dx → sx) ═══ */

    /* ═══ PANNELLO 5 — L'esitazione di Alya (RTL: dx → sx) ═══ */

    /* ═══ PANNELLO 6 — La confessione insicura di Alya (RTL: dx → sx) ═══ */
    { x: 63, y: 73, title: "私と 友達に なっても",
      text: "Anche se diventassi mia amica..." },
    { x: 53, y: 82, title: "…楽しく ないと思うわ",
      text: "...non credo che ti divertiresti affatto." }
],

66: [
/* ═══ PANNELLO 1 — Masachika osserva Alya in silenzio (RTL: dx → sx) ═══ */
/* ═══ PANNELLO 2 — I pensieri di Masachika sulla solitudine di Alya (RTL: dx → sx) ═══ */
    { x: 80, y: 33, title: "そんなこと 言うなよ…",
      text: "Non dire così..." },
    { x: 65, y: 65, title: "――まあ",
      text: "- D'altronde..." },

    /* ═══ PANNELLO 3 — La barriera creata dalla perfezione di Alya (RTL: dx → sx) ═══ */
    { x: 45, y: 35, title: "自分にも 他人にも厳しい この性格",
      text: "Con questo suo carattere, severo sia verso se stessa che verso il prossimo..." },
    { x: 35, y: 38, title: "近寄り難い 完璧な容姿",
      text: "...e quell'aspetto impeccabile che tiene tutti a debita distanza..." },
    { x: 17, y: 65, title: "崇める人間は いても 親しい人間は 少ないか…",
      text: "...ci saranno anche persone che la venerano, ma ben poche che le siano davvero intime..." },

    /* ═══ PANNELLO 4 — L'infanzia di Alya divisa tra due paesi (RTL: dx → sx) ═══ */
    { x: 85, y: 81, title: "それに",
      text: "Inoltre," },
    { x: 74, y: 84, title: "小さい頃から ロシアと日本を 行き来してる らしいし",
      text: "...pare che fin da piccola abbia fatto la spola tra la Russia e il Giappone..." },
    { x: 15, y: 83, title: "幼馴染なんて もんは…",
      text: "...quindi figuriamoci avere qualcuno che sia un amico d'infanzia..." }
],

67: [
/* ═══ PANNELLO 1 — Masachika osserva Alya con sguardo serio (RTL: dx → sx) ═══ */
/* ═══ PANNELLO 2 — Le parole di Masachika sorprendono Alya (RTL: dx → sx) ═══ */
    { x: 79, y: 33, title: "お前と 親しくなって 楽しいか どうかは",
      text: "Se sia divertente o meno diventare tua amica..." },
    { x: 67, y: 40, title: "有希が 決めること だろ",
      text: "...è una cosa che spetta a Yuki decidere, no?" },
    { x: 25, y: 40, title: "えっ…",
      text: "Eh...?" },

    /* ═══ PANNELLO 3 — Masachika incoraggia Alya ad aprirsi (RTL: dx → sx) ═══ */
    { x: 47, y: 63, title: "友達に なること自体は 嫌じゃないん だろ？",
      text: "In fondo non è che a te dispiaccia diventare sua amica, giusto?" }
],

68: [
/* ═══ PANNELLO 1 — Alya ammette con timidezza i propri sentimenti (RTL: dx → sx) ═══ */
{ x: 80, y: 14, title: "そ それは…",
text: "Q-Questo è vero..." },
{ x: 48, y: 27, title: "…ええ",
text: "...Sì." },
/* ═══ PANNELLO 2 — Masachika la rassicura con calma (RTL: dx → sx) ═══ */
    { x: 28, y: 15, title: "んじゃ何も 遠慮することは ないよ",
      text: "Allora non hai alcun motivo di farti riguardi." },

    /* ═══ PANNELLO 3 — Alya accetta con dolcezza (RTL: dx → sx) ═══ */
    { x: 62, y: 42, title: "…そ そうね…",
      text: "...H-Hai ragione..." },

    /* ═══ PANNELLO 4 — Masachika si sente in imbarazzo per la serietà mostrata (RTL: dx → sx) ═══ */
    { x: 83, y: 57, title: "…余計な こと したな",
      text: "...Mi sono intromesso a sproposito." },
    { x: 68, y: 61, title: "柄にも ないことを…",
      text: "Non è proprio da me fare certi discorsi..." },
    { x: 76, y: 85, title: "よかったぁ〜〜〜！",
      text: "Che sollievoooo!" },

    /* ═══ PANNELLO 5 — La gioia incontenibile di Yuki (RTL: dx → sx) ═══ */
    { x: 48, y: 83, title: "でしたら お友達に なりましょう！",
      text: "E allora diventiamo buone amiche!" },
    { x: 14, y: 85, title: "…俺の シリアスを 返せ",
      text: "...Ridatemi indietro la serietà del mio momento." }
],

69: [
/* ═══ PANNELLO 1 — Yuki stringe le mani di Alya con affetto (RTL: dx → sx) ═══ */
{ x: 84, y: 20, title: "そうだ わたくしも アーリャさんと お呼びしても？",
text: "A proposito... Posso chiamarla Alya-san anch'io?" },
{ x: 74, y: 24, title: "わたくしのことは 有希と呼んで ください！",
text: "E lei mi chiami pure Yuki, la prego!" },
{ x: 32, y: 13, title: "か 構わない けれど…",
text: "P-Per me non c'è problema, però..." },
{ x: 18, y: 24, title: "こいつは 遠慮ねえ なあ…",
text: "Questa ragazza non si fa davvero nessun riguardo, eh..." },
/* ═══ PANNELLO 2 — Masachika mette in guardia Alya sulle sue maniere (RTL: dx → sx) ═══ */
    { x: 83, y: 39, title: "仲良くなっても 女子への 暴力は控えろよ",
      text: "Anche se diventate amiche, vedi di moderare la violenza..." },
    { x: 77, y: 51, title: "椅子 蹴ったり 肋骨 つついたり",
      text: "...tipo prendere a calci la sedia o pugnalare la gente tra le costole." },
    { x: 41, y: 50, title: "それは あなたが 居眠り してるから…！",
      text: "Quello è perché sei tu che ti addormenti durante la lezione...!" },

    /* ═══ PANNELLO 3 — Yuki ridacchia divertita dal battibecco (RTL: dx → sx) ═══ */
    { x: 14, y: 51,
      text: "*risatina*" },

    /* ═══ PANNELLO 4 — La rivelazione di Yuki su Masachika (RTL: dx → sx) ═══ */
    { x: 80, y: 66, title: "ずっと仲良く なりたかったん ですよ",
      text: "Desideravo fare amicizia con lei da tantissimo tempo, sa?" },
    { x: 76, y: 80, title: "いつも 政近君から お話を伺って いましたし",
      text: "Anche perché Masachika-kun mi parla continuamente di lei." }

    /* ═══ PANNELLO 5 — Lo stupore di Alya (RTL: dx → sx) ═══ */
],

70: [
/* ═══ PANNELLO 1 — Yuki prende in giro Masachika davanti ad Alya (RTL: dx → sx) ═══ */
{ x: 80, y: 11, title: "はい？",
text: "Prego?" },
{ x: 24, y: 9, title: "すごく 努力家で 尊敬してる って♡",
text: "Dicevi: «è una stakanovista incredibile, la stimo tantissimo»♡" },
{ x: 16, y: 21, title: "んなこと 言って ないだろ",
text: "Non ho mai detto una cosa del genere!" },
/* ═══ PANNELLO 2 — Yuki evidenzia la nobiltà d'animo di Masachika (RTL: dx → sx) ═══ */
    { x: 76, y: 32, title: "でも 政近君",
      text: "Però tu, Masachika-kun..." },
    { x: 65, y: 37, title: "努力する人には 無条件で 敬意を払う でしょう？",
      text: "...porti un rispetto incondizionato verso chi si impegna con dedizione, non è così?" },

    /* ═══ PANNELLO 3 — Masachika capitola imbarazzato (RTL: dx → sx) ═══ */
    { x: 37, y: 63, title: "…それは まあ",
      text: "...Be', su questo hai ragione." },

    /* ═══ PANNELLO 4 — Alya sussurra tra sé in russo (RTL: dx → sx) ═══ */
    { x: 21, y: 87, title: "Уважаешь… - …尊敬",
      text: "Mi stimi... - N.d.T.: Dal russo uvazhayesh, mi rispetti o mi stimi; il testo giapponese glossato indica stima e rispetto" }
],

71: [
/* ═══ PANNELLO 1 — Il dolce imbarazzo di Alya che arrossisce coprendosi il volto (RTL: dx → sx) ═══ */
{ x: 71, y: 14, title: "Ну же… Ууу… - …何よもう",
text: "Ma insomma... Uuu... - N.d.T.: Dal russo nu zhe, ma dai o insomma; il testo giapponese glossato esprime un dolce e timido imbarazzo" },
/* ═══ PANNELLO 2 — Masachika osserva sorpreso (RTL: dx → sx) ═══ */
    { x: 18, y: 52, title: "あ…",
      text: "Ah..." },

    /* ═══ PANNELLO 3 — Masachika nota il rossore sul viso di Alya (RTL: dx → sx) ═══ */
    { x: 80, y: 70, title: "ちょっと 赤くなってる…？ 照れたのか？",
      text: "È arrossita un po'...? Che si sia vergognata per le mie parole?" },
    { x: 18, y: 68,
      text: "*soffia piano sul cibo*" }
],

72: [
/* ═══ PANNELLO 1 — Alya ribolle d'imbarazzo e insulta Masachika in russo (RTL: dx → sx) ═══ */
{ x: 50, y: 9,
text: "vampa di rossore" },
{ x: 41, y: 37, title: "Ну чего уставился? - こっち見んな",
text: "Che hai da fissarmi così? - N.d.T.: Dal russo nu chego ustavilsya, che hai da fissare; il testo giapponese glossato dice non guardarmi" },
{ x: 32, y: 46, title: "Дурак - バカ",
text: "Stupido... - N.d.T.: Dal russo durak, scemo o stupido" },
/* ═══ PANNELLO 2 — Masachika colpito al cuore dalla carineria di Alya (RTL: dx → sx) ═══ */
    { x: 16, y: 15, title: "ぐ…ッ！！",
      text: "Guh...!!" },
    { x: 22, y: 38,
      text: "*stretta al cuore*" },

    /* ═══ PANNELLO 3 — La scusa stizzita di Alya (RTL: dx → sx) ═══ */
    { x: 80, y: 58, title: "…なん だって？",
      text: "...Cosa avresti detto?" },
    { x: 16, y: 61, title: "あなたに 尊敬されたって 嬉しくないって 言ったの！",
      text: "Ho detto che non mi fa minimamente piacere ricevere la tua stima!" },

    /* ═══ PANNELLO 4 — Yuki riprende la parola con sguardo impassibile (RTL: dx → sx) ═══ */
    { x: 30, y: 75,
      text: "*clac*" },
    { x: 23, y: 88, title: "ところで 政近君",
      text: "A ogni modo, Masachika-kun..." }
],

73: [
/* ═══ PANNELLO 1 — La proposta inaspettata di Yuki (RTL: dx → sx) ═══ */
{ x: 77, y: 15, title: "生徒会に 戻る話は",
text: "Riguardo alla proposta di fare ritorno nel consiglio studentesco..." },
{ x: 65, y: 23, title: "検討して ください ましたか？",
text: "...ci hai riflettuto sopra?" },
/* ═══ PANNELLO 2 — Lo sconcerto di Alya (RTL: dx → sx) ═══ */
    { x: 34, y: 12, title: "…え？",
      text: "...Eh?" },

    /* ═══ PANNELLO 3 — Il rifiuto categorico di Masachika (RTL: dx → sx) ═══ */
    { x: 30, y: 77, title: "…言った はずだ",
      text: "...Ti avevo già risposto." },
    { x: 18, y: 86, title: "その気は ない",
      text: "Non ne ho la benché minima intenzione." }
],

74: [
/* ═══ PANNELLO 1 — Lo shock di Alya per la notizia (RTL: dx → sx) ═══ */
{ x: 83, y: 15, title: "…あなた",
text: "...Tu..." },
{ x: 72, y: 20, title: "生徒会役員 だったの…？",
text: "...facevi parte del consiglio studentesco...?" },
/* ═══ PANNELLO 2 — Yuki svela i trascorsi di Masachika (RTL: dx → sx) ═══ */
    { x: 79, y: 42, title: "あら ご存知 なかったの ですか？",
      text: "Oh cielo, non ne era al corrente?" },
    { x: 77, y: 83, title: "この人 二年前の 中等部では",
      text: "Lui, due anni fa alle medie..." },

    /* ═══ PANNELLO 3 — La rivelazione del ruolo passato di Masachika (RTL: dx → sx) ═══ */
    { x: 32, y: 79, title: "生徒会 副会長 だったん ですよ",
      text: "...era nientemeno che il vicepresidente del consiglio studentesco!" }
],

75: [
/* ═══ PANNELLO 1 — Alya non riesce a credere a ciò che sente (RTL: dx → sx) ═══ */
{ x: 83, y: 14, title: "久世君が",
text: "Kuze-kun..." },
{ x: 76, y: 23, title: "生徒会 副会長…",
text: "...vicepresidente del consiglio studentesco...?" },
/* ═══ PANNELLO 2 — La conferma serena di Yuki (RTL: dx → sx) ═══ */
    { x: 26, y: 26, title: "ええ",
      text: "Esatto." },

    /* ═══ PANNELLO 3 — Yuki rievoca il loro passato ai vertici della scuola (RTL: dx → sx) ═══ */
    { x: 79, y: 43, title: "二年前の 中等部生徒会は",
      text: "Due anni fa, nel consiglio studentesco delle medie..." },
    { x: 22, y: 45, title: "わたくしが 生徒会長",
      text: "...io ero la presidente..." },
    { x: 16, y: 60, title: "政近君が 副会長でした",
      text: "...e Masachika-kun era il mio vicepresidente." },
    { x: 55, y: 70, title: "第５話",
      text: "Capitolo 5" },
    { x: 72, y: 73, title: "別にぼっちじゃないぞ？③",
      text: "Non sono mica un tipo solitario, eh? 3" }

    /* ═══ PANNELLO 4 — Il turbamento interiore di Alya (RTL: dx → sx) ═══ */
],

76: [
/* ═══ PANNELLO 1 — Masachika nota lo sgomento di Alya (RTL: dx → sx) ═══ */
{ x: 79, y: 15, title: "？ なんか ショック 受けてる？",
text: "? Perché hai quell'aria tanto sconvolta?" },
{ x: 22, y: 12, title: "…なんだよ 信じられ ないのか？",
text: "...Che c'è, fai tanta fatica a crederci?" },
/* ═══ PANNELLO 2 — I dubbi di Alya e le battute di Yuki (RTL: dx → sx) ═══ */
    { x: 79, y: 45, title: "そ そうね 素行を 見ていると…",
      text: "B-Be'... a giudicare dalla tua condotta di tutti i giorni..." },
    { x: 58, y: 39, title: "素行て 俺は 非行少年か",
      text: "Condotta? Ma che ti sembro, un teppista minorile?!" },
    { x: 23, y: 41, title: "ふふ 確かに",
      text: "Fufufu, in effetti..." },
    { x: 18, y: 50, title: "今の政近君は 学園一の だらしなさ ですよね",
      text: "...in questo momento Masachika-kun è lo studente più sfaticato di tutta la scuola, non è vero?" },

    /* ═══ PANNELLO 3 — La sincera ammirazione di Yuki (RTL: dx → sx) ═══ */
    { x: 76, y: 68, title: "でも",
      text: "Però..." },
    { x: 19, y: 77, title: "政近君は やる時はやる人 なんです",
      text: "...Masachika-kun è una persona che, quando la situazione lo richiede, sa davvero dare il massimo." }
],

77: [
/* ═══ PANNELLO 1 — Yuki stuzzica Masachika sotto gli occhi di Alya (RTL: dx → sx) ═══ */
{ x: 83, y: 12, title: "アーリャさんは 意外に 思われる でしょうけど…",
text: "Magari ad Alya-san sembrerà strano, ma..." },
{ x: 76, y: 23, title: "普段は こんな ですしね",
text: "...di solito si comporta proprio così!" },
{ x: 59, y: 10, title: "どんな だよ",
text: "Ma «così» come?!" },
{ x: 44, y: 16,
text: "tocchetto affettuoso sulla guancia" },
/* ═══ PANNELLO 2 — Alya sfoga la gelosia infierendo sulla torta (RTL: dx → sx) ═══ */
    { x: 83, y: 43, title: "〜〜ッ！",
      text: "Uuuugh...!" },
    { x: 74, y: 60,
      text: "*pugnalata violenta alla torta*" },

    /* ═══ PANNELLO 3 — Masachika presagisce il pericolo (RTL: dx → sx) ═══ */
    { x: 23, y: 65, title: "――まずい",
      text: "- Questo è un pessimo segnale..." },

    /* ═══ PANNELLO 4 — Il timore di rimproveri ancora più feroci (RTL: dx → sx) ═══ */
    { x: 72, y: 76,
      text: "*rombo minaccioso...*" },
    { x: 46, y: 80,
      text: "*zzz...*" },
    { x: 24, y: 83, title: "副会長やるほど 意識高い系だと 思われたら 叱られが さらに 激化するかも…！",
      text: "Se si convince che in realtà io sia un tipo motivato e ambizioso, le sue sfuriate potrebbero farsi ancora più spietate...!" }
],

78: [
/* ═══ PANNELLO 1 — I piani machiavellici di Masachika (RTL: dx → sx) ═══ */
{ x: 80, y: 16, title: "…さて どうやって 誤魔化そうか",
text: "...Dunque, come posso sviare la faccenda?" },
{ x: 46, y: 12, title: "学校に なんてもの 持ってきてるのよ 元副会長のくせに！",
text: "Che razza di roba porti a scuola, alla faccia dell'ex vicepresidente!" },
{ x: 24, y: 13, title: "そ それは 表紙がちょっと Hなだけの ラノベです！",
text: "Q-Quella è solo una light novel con una copertina un po' spinta! - N.d.T.: H si legge ecchi e indica contenuti piccanti o allusivi" },
{ x: 16, y: 27, title: "俺の 平穏学園 ライフの 危機…！",
text: "La mia tranquilla vita scolastica è in grave pericolo...!" },
/* ═══ PANNELLO 2 — La domanda di Alya e il tentativo di scusa di Masachika (RTL: dx → sx) ═══ */
    { x: 80, y: 44, title: "…どうして 久世君は 副生徒会長 に？",
      text: "...Come mai sei diventato vicepresidente del consiglio, Kuze-kun?" },
    { x: 58, y: 44, title: "あ… あ〜 えっと",
      text: "A-Ah... be'... ecco..." },
    { x: 43, y: 43, title: "罰ゲームの 立候補で 当選しち…",
      text: "Ho dovuto candidarmi per colpa di una penitenza e sono finito per essere eletto..." },

    /* ═══ PANNELLO 3 — Yuki svela la verità sporgendosi in avanti (RTL: dx → sx) ═══ */
    { x: 23, y: 41,
      text: "*si sporge all'improvviso*" },
    { x: 42, y: 52, title: "わたくしが 頼み込んだん ですよー！",
      text: "Sono stata io a supplicarlo con tutte le mie forze!" },
    { x: 34, y: 63, title: "政近君の サポートが 欲しくて！",
      text: "Perché desideravo a tutti i costi il sostegno di Masachika-kun!" },
    { x: 16, y: 64, title: "おい…！",
      text: "Ehi...!" },

    /* ═══ PANNELLO 4 — La richiesta di Yuki e il secco rifiuto di Masachika (RTL: dx → sx) ═══ */
    { x: 78, y: 81, title: "また お願い したくて こうして 頼みに 来たんです♡",
      text: "Ed è proprio per chiedergli di nuovo questo favore che sono venuta qui a implorarlo♡" },
    { x: 30, y: 77, title: "もう二度と やらん",
      text: "Non se ne parla, mai più in vita mia." },
    { x: 17, y: 86, title: "そう 言わずに〜",
      text: "Ma non dire così, dai~" }
],

79: [
/* ═══ PANNELLO 1 — Yuki spiega perché i nuovi membri non durano nel consiglio (RTL: dx → sx) ═══ */
{ x: 83, y: 12, title: "新しい方を 入れても 長続き しないん ですよ",
text: "Anche quando accogliamo nuovi membri, non durano mai a lungo." },
{ x: 83, y: 25, title: "あー…",
text: "Ah già..." },
{ x: 59, y: 12, title: "うへへ 美女ばっか だぜ",
text: "Eheheh, qui dentro ci sono solo belle ragazze!" },
{ x: 38, y: 12, title: "皆さん 凄すぎて ついていけない です〜！",
text: "Siete tutti fin troppo capaci, non riesco a starvi dietrooo!" },
/* ═══ PANNELLO 2 — Alya stringe nervosamente la gonna (RTL: dx → sx) ═══ */
    { x: 18, y: 7,
      text: "*stringe la sedia con forza*" },
    { x: 18, y: 24, title: "その点 政近君なら 実務能力は 充分ですし",
      text: "Sotto questo aspetto, Masachika-kun possiede competenze pratiche più che eccellenti..." },

    /* ═══ PANNELLO 3 — La provocazione intima di Yuki (RTL: dx → sx) ═══ */
    { x: 76, y: 80, title: "…わたくしには あなたしか いないんです",
      text: "...Per me non esiste nessun altro all'infuori di te." },

    /* ═══ PANNELLO 4 — Il cortocircuito mentale di Alya (RTL: dx → sx) ═══ */
    { x: 23, y: 83, title: "◎△$♪× ￥●&%#⁉",
      text: "◎△$♪× ￥●&%#⁉ - N.d.T.: Simboli grafici che rappresentano il totale cortocircuito e lo shock mentale di Alya" }
],

80: [
/* ═══ PANNELLO 1 — Yuki bisbiglia maliziosa a Masachika (RTL: dx → sx) ═══ */
{ x: 83, y: 12, title: "こいつ…",
text: "Questa qui..." },
{ x: 74, y: 18,
text: "bisbiglia all'orecchio" },
{ x: 76, y: 37, title: "おい いい加減 に…",
text: "Ehi, adesso dacci un taglio..." },
/* ═══ PANNELLO 2 — Il massacro della fragola e la citazione nerd (RTL: dx → sx) ═══ */
    { x: 60, y: 23,
      text: "*colpi furiosi di forchetta*" },
    { x: 52, y: 16, title: "って うおおおい！！",
      text: "...Cioè, eeehiii!!" },
    { x: 16, y: 32, title: "もうやめて！ イチゴのライフは ０よ！",
      text: "Basta, ti scongiuro! I Life Point della fragola sono già a zero! - N.d.T.: Celebre citazione dell'anime Yu-Gi-Oh pronunciata quando ci si accanisce su un bersaglio ormai privo di punti vita" },

    /* ═══ PANNELLO 3 — Alya si accorge del disastro nel piatto (RTL: dx → sx) ═══ */
    { x: 65, y: 51, title: "ア… アーリャさん 食べ物は 大事に…",
      text: "A-Alya-san... il cibo andrebbe trattato con più cura..." },
    { x: 80, y: 85, title: "ハッ じゃねえよ 無意識かよ 怖えな",
      text: "Altro che sorpresa! Lo facevi senza nemmeno rendertene conto?! Mette i brividi..." },

    /* ═══ PANNELLO 4 — Il cliché dell'amica d'infanzia (RTL: dx → sx) ═══ */
    { x: 46, y: 52, title: "そんで お前は いい加減離せ！",
      text: "E tu vedi di staccarti una buona volta!" },
    { x: 26, y: 51, title: "いいじゃない ですか〜 幼馴染 なんだし",
      text: "Ma che c'è di maleee~ Siamo amici d'infanzia, no?" },
    { x: 16, y: 60, title: "一緒に お風呂に入った 仲じゃない ですか〜",
      text: "Abbiamo persino fatto il bagno insieme, non ricorda~?" },
    { x: 22, y: 84, title: "幼馴染キャラの テンプレ台詞 やめろ！ 大昔な！！",
      text: "Piantala con le battute cliché da amica d'infanzia degli anime! Ed è successo una vita fa!!" }
],

81: [
/* ═══ PANNELLO 1 — Masachika è a disagio mentre Alya rimugina (RTL: dx → sx) ═══ */
{ x: 82, y: 14, title: "周囲の目が 怖すぎん だよ！",
text: "Gli sguardi della gente intorno fanno troppa paura!" },
{ x: 18, y: 16, title: "Зампредседателя школьного совета… - (副会長…)",
text: "Vicepresidente del consiglio studentesco... - N.d.T.: Dal russo zampredsedatelya shkolnogo soveta" },
{ x: 21, y: 24, title: "Подруга детства… - (幼馴染…)",
text: "Amica d'infanzia... - N.d.T.: Dal russo podruga detstva" },
/* ═══ PANNELLO 2 — Il rammarico di Alya sussurrato in russo (RTL: dx → sx) ═══ */
    { x: 67, y: 63, title: "Ты же об этом ни разу не рассказывал - (そんなこと一度も 教えてくれなかったじゃない)",
      text: "Non me ne avevi mai parlato nemmeno una volta... - N.d.T.: Dal russo, non me lo avevi mai raccontato; il testo giapponese glossato esprime il rimprovero per non averglielo mai fatto sapere" },
    { x: 11, y: 60,
      text: "*briciole che cadono*" },

    /* ═══ PANNELLO 3 — Le parole di Yuki riecheggiano nei pensieri di Alya (RTL: dx → sx) ═══ */
    { x: 75, y: 84, title: "政近君は やる時は やる人 なんです",
      text: "Masachika-kun è una persona che, quando la situazione lo richiede, sa davvero dare il massimo." }
],

82: [
/* ═══ PANNELLO 1 — I sussurri segreti di Alya in russo (RTL: dx → sx) ═══ */
{ x: 25, y: 23, title: "Я знаю - (知ってるわよ)",
text: "Lo so... - N.d.T.: Dal russo ya znayu, lo so; il testo giapponese glossato sottolinea che anche lei ne è perfettamente consapevole" },
{ x: 32, y: 36, title: "Да я - (私だって)",
text: "Anch'io... - N.d.T.: Dal russo da ya, anch'io; il testo giapponese glossato esprime il suo desiderio di essere considerata allo stesso modo" },
/* ═══ PANNELLO 3 — Alya si congeda dalla mensa (RTL: dx → sx) ═══ */
    { x: 72, y: 79, title: "それでは 私は 生徒会室に 寄りますので",
      text: "Se volete scusarmi, ora faccio un salto nell'aula del consiglio studentesco." }
],

83: [
/* ═══ PANNELLO 1 — Yuki insiste sulla proposta per il consiglio (RTL: dx → sx) ═══ */
{ x: 80, y: 12, title: "政近君 生徒会の件 考えておいて くださいね？",
text: "Masachika-kun, rifletti sulla proposta del consiglio studentesco, d'accordo?" },
{ x: 52, y: 15, title: "だから 入らんって",
text: "Ti ho già detto che non se ne parla." },
/* ═══ PANNELLO 2 — Lo sguardo complice di Yuki (RTL: dx → sx) ═══ */
    { x: 21, y: 36, title: "…その “私はわかってますからね” 顔やめろ！",
      text: "...Piantala di fare quell'aria da «io so tutto di te»!" },

    /* ═══ PANNELLO 3 — Yuki si congeda con grazia (RTL: dx → sx) ═══ */
    { x: 83, y: 51, title: "では 失礼いたし ますね！",
      text: "Allora vi saluto, a presto!" },

    /* ═══ PANNELLO 4 — Masachika svuotato di ogni energia (RTL: dx → sx) ═══ */
    { x: 32, y: 51,
      text: "*completamente spossato*" },

    /* ═══ PANNELLO 5 — Lo sguardo serio di Alya su Masachika (RTL: dx → sx) ═══ */
    { x: 55, y: 80, title: "…久世君",
      text: "...Kuze-kun." },
    { x: 24, y: 76,
      text: "*sobbalzo*" },
    { x: 20, y: 86, title: "な なんだ？",
      text: "C-Che c'è?" }
],

84: [
/* ═══ PANNELLO 1 — La malinconica osservazione di Alya (RTL: dx → sx) ═══ */
{ x: 68, y: 22, title: "…本当に 仲が 良いのね",
text: "...Siete davvero molto affiatati, voi due." },
/* ═══ PANNELLO 2 — Lo sguardo dolce di Masachika spiazza Alya (RTL: dx → sx) ═══ */
    { x: 22, y: 47, title: "…えっ？",
      text: "...Eh?" },

    /* ═══ PANNELLO 3 — Lo stupore di Alya per le conoscenze di Masachika (RTL: dx → sx) ═══ */
    { x: 83, y: 65, title: "有希の こと？",
      text: "Parli di Yuki?" },
    { x: 65, y: 65, title: "意外か？",
      text: "Ti sembra così strano?" },
    { x: 48, y: 78, title: "ええ まさか あなたに 女友達が いたなんて",
      text: "Sì... Non avrei mai immaginato che tu potessi avere delle amiche femmine." },

    /* ═══ PANNELLO 4 — Masachika spiazzato dalle parole di Alya (RTL: dx → sx) ═══ */
    { x: 28, y: 67, title: "え？ そこ？",
      text: "Eh? È quello che ti stupisce?!" },
    { x: 14, y: 74, title: "？ なによ",
      text: "? Che c'è di strano?" },
    { x: 16, y: 88, title: "いや だって…",
      text: "No, be'..." }
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

/* ═══════════ MEMORIA POSIZIONE LETTURA ═══════════ */
const POS_KEY = id => 'mr-pos-' + id;
function getSavedPage(volId) {
    try { return parseInt(localStorage.getItem(POS_KEY(volId))) || 0; }
    catch (e) { return 0; }
}
function savePage(volId, pageNum) {
    try { localStorage.setItem(POS_KEY(volId), String(pageNum)); } catch (e) {}
}

/* ═══════════ SOUND ENGINE ═══════════
   Suoni ispirati a strumenti tradizionali giapponesi:
   - kachi = 拍子木 (hyoshigi) · legnetti di bamboo
   - chin  = 鈴 (rin) · campana tibetana con parziali inarmonici reali
   - don   = 太鼓 (taiko) · tamburo con pelle
   - ko    = 鈴 (suzu) · piccolo campanellino acuto
   ═══════════════════════════════════════════════ */
const SoundEngine = (() => {
    let ctx = null, enabled = true, master = null, lastPlay = 0;
    function init() {
        if (ctx) return ctx;
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        try {
            ctx = new AC();
            master = ctx.createGain();
            master.gain.value = 0.55;
            master.connect(ctx.destination);
        } catch (e) { ctx = null; }
        return ctx;
    }
    function resume() { if (ctx && ctx.state === 'suspended') ctx.resume().catch(()=>{}); }

    /* 拍子木 KACHI — click legnoso secco con breve risonanza */
    function kachi(vol = 1) {
        const c = init(); if (!c) return; resume();
        const t = c.currentTime;
        const g = c.createGain(); g.gain.value = vol * 0.55; g.connect(master);

        const dur = 0.09;
        const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/d.length, 5);
        const noise = c.createBufferSource(); noise.buffer = buf;
        const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1750; bp.Q.value = 6;
        const ng = c.createGain(); ng.gain.value = 0.7;
        noise.connect(bp).connect(ng).connect(g);
        noise.start(t); noise.stop(t + dur);

        const osc = c.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1250, t);
        osc.frequency.exponentialRampToValueAtTime(680, t + 0.05);
        const og = c.createGain();
        og.gain.setValueAtTime(0.35, t);
        og.gain.exponentialRampToValueAtTime(0.0005, t + 0.07);
        osc.connect(og).connect(g);
        osc.start(t); osc.stop(t + 0.08);
    }

    /* 鈴 CHIN — campana tibetana (rin) con parziali inarmonici reali */
    function chin(vol = 1) {
        const c = init(); if (!c) return; resume();
        const t = c.currentTime;
        const g = c.createGain(); g.gain.value = vol * 0.32; g.connect(master);

        const f0 = 587.33; // Re5
        const partials = [
            { r: 1.000, decay: 2.6, gain: 1.00 },
            { r: 2.756, decay: 1.9, gain: 0.55 },
            { r: 5.404, decay: 1.1, gain: 0.30 },
            { r: 8.933, decay: 0.6, gain: 0.15 }
        ];
        partials.forEach(p => {
            const osc = c.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = f0 * p.r;
            const og = c.createGain();
            og.gain.setValueAtTime(0.0001, t);
            og.gain.exponentialRampToValueAtTime(0.32 * p.gain, t + 0.006);
            og.gain.exponentialRampToValueAtTime(0.0001, t + p.decay);
            osc.connect(og).connect(g);
            osc.start(t); osc.stop(t + p.decay + 0.05);
        });
    }

    /* 太鼓 DON — tamburo taiko: fondamentale grave + attacco di pelle */
    function don(vol = 1) {
        const c = init(); if (!c) return; resume();
        const t = c.currentTime;
        const g = c.createGain(); g.gain.value = vol * 0.85; g.connect(master);

        const osc = c.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(48, t + 0.22);
        const og = c.createGain();
        og.gain.setValueAtTime(0.0001, t);
        og.gain.exponentialRampToValueAtTime(0.95, t + 0.005);
        og.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
        osc.connect(og).connect(g);
        osc.start(t); osc.stop(t + 0.6);

        const dur = 0.05;
        const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/d.length, 4);
        const noise = c.createBufferSource(); noise.buffer = buf;
        const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 800;
        const ng = c.createGain(); ng.gain.value = 0.55;
        noise.connect(lp).connect(ng).connect(g);
        noise.start(t); noise.stop(t + dur);
    }

    /* 鈴 KO — piccolo suzu: come chin ma più acuto e coda breve */
    function ko(vol = 1) {
        const c = init(); if (!c) return; resume();
        const t = c.currentTime;
        const g = c.createGain(); g.gain.value = vol * 0.32; g.connect(master);

        const f0 = 1976;
        const partials = [
            { r: 1.000, decay: 0.55, gain: 1.00 },
            { r: 2.756, decay: 0.32, gain: 0.50 },
            { r: 5.404, decay: 0.18, gain: 0.25 }
        ];
        partials.forEach(p => {
            const osc = c.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = f0 * p.r;
            const og = c.createGain();
            og.gain.setValueAtTime(0.0001, t);
            og.gain.exponentialRampToValueAtTime(0.25 * p.gain, t + 0.004);
            og.gain.exponentialRampToValueAtTime(0.0001, t + p.decay);
            osc.connect(og).connect(g);
            osc.start(t); osc.stop(t + p.decay + 0.05);
        });
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
        n => `${vol.path}/page_${String(n).padStart(3,'0')}.png`,
        n => `${vol.path}/page_${String(n).padStart(3,'0')}.jpg`,
        n => `${vol.path}/page_${String(n).padStart(2,'0')}.png`,
        n => `${vol.path}/page_${String(n).padStart(2,'0')}.jpg`,
        n => `${vol.path}/${String(n).padStart(3,'0')}.png`,
        n => `${vol.path}/${String(n).padStart(3,'0')}.jpg`,
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

    /* ─── PRIORITÀ 1: pagine dichiarate nel config ───
       Niente fetch, funziona sempre: file://, offline, GitHub Pages.
       pageCount può essere qualsiasi numero, dipende dal volume. */
    if (vol.pageCount && typeof vol.pagePattern === 'function') {
        const urls = [];
        for (let n = 1; n <= vol.pageCount; n++) {
            urls.push(vol.pagePattern(n));
        }
        console.log('[manga-reader] pagine dichiarate nel config:', urls.length);
        pageCache[vol.id] = urls;
        return urls;
    }

    /* ─── PRIORITÀ 2: auto-discovery (richiede HTTP) ───
       Solo per volumi senza pageCount. Non funziona su file://. */
    const online = navigator.onLine && REPO;
    let urls;
    if (online) {
        try {
            urls = await listPagesFromGitHub(vol);
        } catch (e) {
            console.warn('[manga-reader] GitHub API fallita, uso probe:', e.message);
            urls = await listPagesFromProbe(vol, onProgress);
        }
    } else {
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

        /* ─── Badge "riprendi lettura" se c'è una posizione salvata ─── */
        const saved = getSavedPage(v.id);
        const totalP = v.pageCount || v.pages || 0;
        const showResume = saved > 0 && totalP > 0 && saved <= totalP;
        const resumeBadge = showResume
            ? `<div class="volume-resume">続きから · p. ${saved}</div>`
            : '';
        const progressBar = showResume
            ? `<div class="volume-progress" style="--progress:${(saved/totalP*100).toFixed(1)}%"></div>`
            : '';

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
                    ${resumeBadge}
                    ${progressBar}
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
            /* Apriamo reader.html senza specificare la pagina:
               il reader userà la posizione salvata, se presente. */
            location.href = `reader.html?vol=${encodeURIComponent(id)}`;
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
    const urlPage = parseInt(params.get('p'));

    let vol = volId ? CONFIG.volumes.find(v => v.id === volId) : null;
    if (!vol && CONFIG.volumes.length) {
        vol = CONFIG.volumes[0];
        console.warn('[manga-reader] vol non trovato nell\'URL, uso il primo volume:', vol.id);
    }
    if (!vol) {
        console.warn('[manga-reader] nessun volume disponibile, torno alla libreria');
        location.replace('index.html');
        return;
    }

    /* ─── Log ripristino posizione ─── */
    if (!urlPage) {
        const saved = getSavedPage(vol.id);
        if (saved > 0) console.log('[manga-reader] riprendo dalla pagina', saved);
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
        if (!/^https?:$/.test(location.protocol)) return;
        try {
            const p = new URLSearchParams(location.search);
            p.set('vol', vol.id);
            p.set('p', String(currentIndex + 1));
            history.replaceState(null, '', '?' + p.toString());
        } catch (e) { /* ignora */ }
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
            /* ─── FIX QUALITÀ ZOOM ───
               Forza il browser a riasterizzare le immagini alla
               scala finale. Senza questo, Chrome/Safari riusano
               la texture rasterizzata al picco di zoom e l'immagine
               resta "impastata" quando torni a 1x. */
            document.querySelectorAll('.page-img').forEach(img => {
                img.style.transform = 'translateZ(0)';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => { img.style.transform = ''; });
                });
            });
            _gestureTimer = null;
        }, 180);
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

        /* ─── Salva posizione corrente ─── */
        if (vol && vol.id) savePage(vol.id, currentIndex + 1);

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

    /* ─── FIX QUALITÀ ZOOM ───
       translate3d + scale3d forzano il compositing GPU e permettono
       al browser di riasterizzare correttamente al cambio di scala. */
    function applyTransformNoClamp() {
        transformArea.style.transform =
            `translate3d(${pointX}px, ${pointY}px, 0) scale3d(${scale}, ${scale}, 1)`;
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

            /* Priorità: pagina URL → pagina salvata → 1 */
            let startPage = urlPage || getSavedPage(vol.id) || 1;
            currentIndex = Math.max(0, Math.min(startPage - 1, currentPages.length - 1));

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
    if (hasReader && !hasLibrary) {
        try { initReaderPage(); } catch (err) { console.error('[manga-reader] errore reader init:', err); }
    } else if (hasLibrary) {
        try { initLibraryPage(); } catch (err) { console.error('[manga-reader] errore library init:', err); }
    } else {
        console.warn('[manga-reader] pagina non riconosciuta');
    }
})();
