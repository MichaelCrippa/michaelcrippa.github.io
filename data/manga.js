/* ============================================================
   CATALOGO MANGA · Traduzioni di Michael Crippa
   VERSIONE GITHUB PAGES — immagini WebP locali
   ------------------------------------------------------------
   Struttura di ogni volume:
     cover       → percorso del file copertina
     pagePattern → pattern del percorso pagina, {page} = numero
     pagePad     → cifre per il padding del numero (3 = 001, 002…)
     pages       → numero totale di pagine del volume
     notes       → percorso del file JS con le note

   Per aggiungere un volume: copia il blocco e cambia i campi.
   ============================================================ */
window.MANGA_CATALOG = {
  manga: [
    {
      id: "alya",
      status: "in-progress",
      author: "Sun Sun Sun · Saho Tenamachi",
      title: "Alya Sometimes Hides Her Feelings in Russian",
      volumes: [
        {
          id: "vol-01",
          number: 1,
          title: "Volume 1",
          cover: "alya/vol-01/cover.webp",
          pagePattern: "alya/vol-01/page_{page}.webp",
          pagePad: 3,
          pages: 188,
          notes: "data/notes/alya-vol-01.js"
        },
        {
          id: "vol-02",
          number: 2,
          title: "Volume 2",
          cover: "alya/vol-02/cover.webp",
          pagePattern: "alya/vol-02/page_{page}.webp",
          pagePad: 3,
          pages: 156,
          notes: "data/notes/alya-vol-02.js"
        }
      ]
    }
  ]
};