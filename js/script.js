/*
 * Mega Cyberpunk Portfolio – Main JavaScript
 *
 * Questo script controlla le animazioni dell'interfaccia, l'inizializzazione
 * delle librerie esterne (VanillaTilt, GSAP, Three.js) e la gestione del
 * preloader. Ogni sezione della pagina prende vita con effetti dinamici
 * per dare al visitatore un'impressione futuristica e coinvolgente.
 */

// Avvio dopo il caricamento del DOM
document.addEventListener('DOMContentLoaded', () => {
  // Nasconde il preloader al termine del caricamento delle risorse
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('loaded');
    // rimuovi l'elemento dopo l'animazione per evitare click accidentali
    setTimeout(() => preloader.remove(), 800);
  });

  // Attiva l'effetto tilt su tutti gli elementi con attributo data-tilt
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 15,
      speed: 500,
      glare: true,
      'max-glare': 0.5,
    });
  }

  // Evidenzia il link della navigazione corrente
  highlightCurrentNav();

  // Inizializza una scena spiralata per l'hero
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    initSpiralScene(heroCanvas, {
      torus: true,
      torusColor: 0x00e5ff,
      particleColor: 0xff2d95,
      swirlCount: 700,
    });
  }

  // Inizializza la scena 3D nella pagina dei contatti se presente (canvas di sfondo)
  const contactCanvas = document.getElementById('contact-background');
  if (contactCanvas) {
    initContactScene(contactCanvas);
  }

  // Inizializza campi di stelle per ogni canvas con classe stars-canvas
  const starCanvases = document.querySelectorAll('.stars-canvas');
  starCanvases.forEach((sc) => {
    initStarField(sc, 400);
  });

  // Inizializza scena spiralata per la sezione competenze
  const skillsCanvas = document.getElementById('skills-background');
  if (skillsCanvas) {
    initSpiralScene(skillsCanvas, { torus: false, particleColor: 0x00e5ff, swirlCount: 500 });
  }

  // Inizializza sfondo spiralato per la hero del portfolio
  const portfolioCanvas = document.getElementById('portfolio-background');
  if (portfolioCanvas) {
    initSpiralScene(portfolioCanvas, { torus: false, particleColor: 0x00e5ff, swirlCount: 500 });
  }

  // Inizializza rete di particelle per la sezione servizi
  const networkCanvas = document.getElementById('services-network');
  if (networkCanvas) {
    initParticleNetwork(networkCanvas);
  }

  // Inizializza rete di particelle per la sezione stats
  const statsCanvas = document.getElementById('stats-network');
  if (statsCanvas) {
    initParticleNetwork(statsCanvas);
  }

  // Inizializza rete di particelle per la sezione terminale
  const terminalBg = document.getElementById('terminal-background');
  if (terminalBg) {
    initParticleNetwork(terminalBg);
  }

  // Le scene 3D integrate nei riquadri del portfolio sono state rimosse per migliorare la pulizia visiva

  // Inizializza la griglia 3D per la sezione Featured se presente
  const featuredCanvas = document.getElementById('featured-canvas');
  if (featuredCanvas) {
    initFeaturedGrid(featuredCanvas);
  }

  // Inizializza contatori nella sezione stats
  initCounters();

  // Inizializza il carosello delle testimonianze
  initTestimonialsCarousel();

  // Inizializza terminal interattiva
  initTerminal();

  // Inizializza forme fluttuanti se il canvas è presente
  const floatingCanvas = document.getElementById('floating-shapes');
  if (floatingCanvas) {
    initFloatingShapes(floatingCanvas, { colors: ['#00e5ff', '#ff2d95', '#8338ec'] });
  }

  // Inizializza modale portfolio se presenti progetti
  initPortfolioModals();

  // Inizializza form di contatto se presente
  initContactForm();

  // Inizializza effetto di testo digitato nella hero, se presente
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    initTypedEffect(typedEl, [
      'Creo esperienze digitali futuristiche',
      'Combinando design all’avanguardia',
      'Tecnologie di ultima generazione',
    ], 80, 2000);
  }

  // Inizializza grafico delle competenze, se presente
  const skillsChartCanvas = document.getElementById('skills-chart-canvas');
  if (skillsChartCanvas) {
    initSkillsChart(skillsChartCanvas);
  }
  // Inizializza sfondo a rete per il grafico se presente
  const skillsChartBg = document.getElementById('skills-chart-bg');
  if (skillsChartBg) {
    initParticleNetwork(skillsChartBg);
  }

  // Inizializza sfondo ad onde nel modulo di contatto se presente
  const formWave = document.getElementById('form-wave');
  if (formWave) {
    initWaveBackground(formWave);
  }

  // Inizializza pulsante "Back to Top" per tornare rapidamente in cima
  initBackToTop();

  // Inizializza le animazioni di scroll con GSAP
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animazione generica per titoli di sezione
    gsap.utils.toArray('.section-title').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      });
    });

    // Animazione per schede abilità e progetti
    gsap.utils.toArray('.skill-card, .project-card').forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Animazioni per elementi della timeline: alternano entrata da sinistra e destra
    gsap.utils.toArray('.timeline-item').forEach((item, idx) => {
      gsap.from(item, {
        x: idx % 2 === 0 ? -80 : 80,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
    // Animazioni per carte dei servizi: entrano dal basso
    gsap.utils.toArray('.service-card').forEach((card) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    });
    // Animazioni per le testimonianze: lieve movimento e dissolvenza
    gsap.utils.toArray('.testimonial-slide').forEach((slide) => {
      gsap.from(slide, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: slide,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }
});

/**
 * Aggiunge la classe "active" al link di navigazione corrispondente
 * alla pagina corrente. Utilizza la proprietà location.pathname.
 */
function highlightCurrentNav() {
  const navLinks = document.querySelectorAll('.nav a');
  const path = window.location.pathname.split('/').pop();
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Effetto parallax per gli sfondi a scorrimento con il mouse
  initParallaxBackground();

  // Effetto scia al cursore disattivato per un look più pulito
}

/**
 * Inizializza una scena Three.js con un icosaedro wireframe e un campo di stelle.
 * L'oggetto ruota lentamente e la scena viene ridimensionata al resize.
 * @param {HTMLCanvasElement} canvas - Il canvas su cui rendere la scena 3D.
 */
function initHeroScene(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Geometria e materiale per l'icosaedro wireframe
  const icoGeometry = new THREE.IcosahedronGeometry(1.2, 1);
  const icoMaterial = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true });
  const ico = new THREE.Mesh(icoGeometry, icoMaterial);

  // Crea un gruppo per contenere l'icosaedro e la navicella spaziale
  const rootGroup = new THREE.Group();
  rootGroup.add(ico);
  scene.add(rootGroup);

  // Luci per illuminare la navicella 3D
  const ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  // Costruisci la navicella con geometrie di base
  const spaceship = new THREE.Group();
  // Corpo
  const bodyGeom = new THREE.CylinderGeometry(0.15, 0.15, 1.4, 16);
  const bodyMat = new THREE.MeshStandardMaterial({
    // Colore brillante per far risaltare la navicella
    color: 0xff00d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  spaceship.add(body);
  // Punta
  const noseGeom = new THREE.ConeGeometry(0.15, 0.4, 16);
  const nose = new THREE.Mesh(noseGeom, bodyMat);
  nose.position.y = 0.7 + 0.2;
  spaceship.add(nose);
  // Propulsore
  const thrusterGeom = new THREE.ConeGeometry(0.18, 0.5, 16);
  const thrusterMat = new THREE.MeshStandardMaterial({
    color: 0xff0077,
    emissive: 0xff0077,
    emissiveIntensity: 0.8,
    metalness: 0.3,
    roughness: 0.4,
  });
  const thruster = new THREE.Mesh(thrusterGeom, thrusterMat);
  thruster.position.y = -0.7 - 0.25;
  thruster.rotation.x = Math.PI;
  spaceship.add(thruster);
  // Ali
  const wingGeom = new THREE.BoxGeometry(0.8, 0.05, 0.25);
  const leftWing = new THREE.Mesh(wingGeom, bodyMat);
  leftWing.position.set(0, 0, 0.25);
  leftWing.rotation.z = Math.PI / 8;
  spaceship.add(leftWing);
  const rightWing = leftWing.clone();
  rightWing.position.set(0, 0, -0.25);
  rightWing.rotation.z = -Math.PI / 8;
  spaceship.add(rightWing);
  // Scala la navicella: dimensioni moderate per non sovrastare l'ero
  // Riduci ulteriormente la scala per evitare che la navicella occupi troppo spazio
  spaceship.scale.set(0.4, 0.4, 0.4);
  // Aggiungi la navicella al gruppo radice
  rootGroup.add(spaceship);

  // Particelle per simulare stelle
  const starCount = 800;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 30;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  const starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starsMaterial = new THREE.PointsMaterial({
    color: 0x007bff,
    size: 0.05,
    transparent: true,
    opacity: 0.6,
  });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  // Variabili per l'interazione con il mouse e l'orbita
  let targetRotX = 0;
  let targetRotY = 0;
  let orbitAngle = 0;
  // Raggio dell'orbita; ridotto per portare la navicella più vicino al centro
  const orbitRadius = 2;
  window.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth) * 2 - 1;
    const yRatio = (e.clientY / window.innerHeight) * 2 - 1;
    targetRotY = xRatio * 0.6;
    targetRotX = yRatio * 0.6;
  });

  function animate() {
    requestAnimationFrame(animate);
    // Rotazione basata sul puntatore
    rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.03;
    rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.03;
    // Orbit della navicella attorno al centro
    orbitAngle += 0.01;
    spaceship.position.x = Math.cos(orbitAngle) * orbitRadius;
    spaceship.position.z = Math.sin(orbitAngle) * orbitRadius;
    // Rotazione propria della navicella
    spaceship.rotation.y += 0.05;
    // Leggera rotazione dell'icosaedro per dinamismo
    ico.rotation.x += 0.003;
    ico.rotation.y += 0.002;
    // Rotazione delle stelle
    stars.rotation.y += 0.0004;
    renderer.render(scene, camera);
  }
  animate();

  // Adatta la scena al ridimensionamento della finestra
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

/**
 * Inizializza una scena Three.js per la pagina dei contatti.
 * Crea un torus knot wireframe ruotante per aggiungere un elemento visivo dinamico.
 * @param {HTMLCanvasElement} canvas
 */
function initContactScene(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  // avvicina la camera per rendere il torus più visibile
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Torus knot geometry, leggermente più grande per riempire lo spazio
  const geometry = new THREE.TorusKnotGeometry(1.8, 0.35, 128, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  // Particelle a spirale per creare un effetto vorticoso interattivo
  const swirlCount = 700;
  const positions = new Float32Array(swirlCount * 3);
  const angles = new Float32Array(swirlCount);
  const radii = new Float32Array(swirlCount);
  for (let i = 0; i < swirlCount; i++) {
    angles[i] = Math.random() * Math.PI * 2;
    radii[i] = 1 + Math.random() * 4;
    // Posizioni iniziali
    positions[i * 3] = Math.cos(angles[i]) * radii[i];
    positions[i * 3 + 1] = Math.sin(angles[i]) * radii[i];
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
  }
  const starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const starsMaterial = new THREE.PointsMaterial({
    // Colore vivace magenta per risaltare sullo sfondo scuro
    color: 0xff00d4,
    size: 0.075,
    transparent: true,
    opacity: 0.7,
  });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  // Velocità di rotazione del vortice, regolabile con il mouse
  let swirlSpeed = 0.002;
  window.addEventListener('mousemove', (e) => {
    const ratioX = e.clientX / window.innerWidth;
    // velocità varia tra 0.002 e 0.012 a seconda della posizione del mouse
    swirlSpeed = 0.002 + ratioX * 0.01;
  });

  function animate() {
    requestAnimationFrame(animate);
    // Rotazione del torus
    torusKnot.rotation.x += 0.004;
    torusKnot.rotation.y += 0.003;
    // Aggiornamento posizioni delle particelle a spirale
    for (let i = 0; i < swirlCount; i++) {
      angles[i] += swirlSpeed;
      const r = radii[i];
      const a = angles[i];
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = Math.sin(a) * r;
      positions[i * 3 + 2] = Math.sin(a * 2) * r * 0.2;
    }
    starsGeometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }
  animate();

  // Resize handling
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

/**
 * Inizializza una scena con particelle spiralate e, opzionalmente, un torus knot.
 * Si ispira all'animazione della pagina dei contatti per riutilizzarla in altre sezioni
 * senza dover duplicare codice. Il colore e il numero di particelle sono configurabili.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Object} options
 * @param {boolean} options.torus - se true disegna anche un torus knot
 * @param {number} [options.torusColor=0x00e5ff] - colore del torus knot
 * @param {number} [options.particleColor=0xff00d4] - colore delle particelle spiralate
 * @param {number} [options.swirlCount=600] - numero di particelle nella spirale
 */
function initSpiralScene(canvas, options = {}) {
  const torus = options.torus || false;
  const torusColor = options.torusColor !== undefined ? options.torusColor : 0x00e5ff;
  const particleColor = options.particleColor !== undefined ? options.particleColor : 0xff00d4;
  const swirlCount = options.swirlCount || 600;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.z = 4;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Aggiungi torus knot se richiesto
  let torusMesh;
  if (torus) {
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.35, 128, 16);
    const material = new THREE.MeshBasicMaterial({ color: torusColor, wireframe: true });
    torusMesh = new THREE.Mesh(geometry, material);
    scene.add(torusMesh);
  }
  // Particelle a spirale
  const positions = new Float32Array(swirlCount * 3);
  const angles = new Float32Array(swirlCount);
  const radii = new Float32Array(swirlCount);
  for (let i = 0; i < swirlCount; i++) {
    angles[i] = Math.random() * Math.PI * 2;
    // radii randomici tra 1 e 4 per creare profondità
    radii[i] = 1 + Math.random() * 4;
    positions[i * 3] = Math.cos(angles[i]) * radii[i];
    positions[i * 3 + 1] = Math.sin(angles[i]) * radii[i];
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
  }
  const starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const starsMaterial = new THREE.PointsMaterial({
    color: particleColor,
    size: 0.07,
    transparent: true,
    opacity: 0.7,
  });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  // Velocità di rotazione del vortice, regolabile con il mouse
  let swirlSpeed = 0.002;
  window.addEventListener('mousemove', (e) => {
    const ratioX = e.clientX / window.innerWidth;
    swirlSpeed = 0.002 + ratioX * 0.01;
  });

  function animate() {
    requestAnimationFrame(animate);
    // Ruota il torus, se presente
    if (torusMesh) {
      torusMesh.rotation.x += 0.004;
      torusMesh.rotation.y += 0.003;
    }
    // Aggiorna posizioni delle particelle a spirale
    for (let i = 0; i < swirlCount; i++) {
      angles[i] += swirlSpeed;
      const r = radii[i];
      const a = angles[i];
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = Math.sin(a) * r;
      positions[i * 3 + 2] = Math.sin(a * 2) * r * 0.2;
    }
    starsGeometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }
  animate();

  // Resize handling
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

/**
 * Inizializza un semplice reticolo di particelle con linee che si connettono
 * quando sono abbastanza vicine. Utilizza il canvas 2D per performance
 * migliori e crea un effetto cibernetico in movimento. Adatto a sfondi.
 * @param {HTMLCanvasElement} canvas
 */
function initParticleNetwork(canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width, height;
  const maxDistance = 120;
  function resize() {
    // Aggiorna dimensioni
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width;
    canvas.height = height;
    // Numero di particelle in base all'area, limitato per prestazioni
    const count = Math.floor((width * height) / 8000);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      });
    }
  }
  resize();
  window.addEventListener('resize', resize);
  function draw() {
    ctx.clearRect(0, 0, width, height);
    // Disegna particelle
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      // Rimbalzo ai bordi
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      // Punto
      ctx.fillStyle = '#00e5ff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    // Disegna linee tra particelle vicine
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance;
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/**
 * Crea un semplice campo di stelle su un canvas per utilizzare come sfondo animato.
 * Ogni canvas viene gestito in modo indipendente.
 * @param {HTMLCanvasElement} canvas – l'elemento su cui disegnare
 * @param {number} count – numero di stelle da generare
 */
function initStarField(canvas, count = 300) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 10;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Genera stelle randomiche
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
  }
  const starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const starsMaterial = new THREE.PointsMaterial({
    color: 0x004d8c,
    size: 0.6,
    transparent: true,
    opacity: 0.5,
  });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }
  animate();

  // Adatta le dimensioni al resize
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

/**
 * Inizializza piccole scene 3D all'interno delle schede del portfolio.
 * Ogni canvas possiede un attributo data-shape che definisce la geometria da utilizzare.
 */
function initProjectScenes() {
  const canvases = document.querySelectorAll('.project-canvas');
  canvases.forEach((canvas) => {
    const shape = canvas.dataset.shape || 'cube';
    const scene = new THREE.Scene();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    let geometry;
    switch (shape) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(1, 32, 32);
        break;
      case 'torusKnot':
        geometry = new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16);
        break;
      case 'cone':
        geometry = new THREE.ConeGeometry(0.8, 1.5, 32);
        break;
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(0.9, 1);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(0.8, 0.25, 30, 100);
        break;
      case 'cube':
      default:
        geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        break;
    }
    const material = new THREE.MeshNormalMaterial({ wireframe: false });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Rotazione animata con velocità base
    let speed = 0.01;
    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.x += speed;
      mesh.rotation.y += speed;
      renderer.render(scene, camera);
    }
    animate();

    // Cambia velocità al passaggio del mouse sulla carta
    const parentCard = canvas.closest('.portfolio-item');
    if (parentCard) {
      parentCard.addEventListener('mouseenter', () => {
        speed = 0.05;
      });
      parentCard.addEventListener('mouseleave', () => {
        speed = 0.01;
      });
    }
    // Aggiorna dimensioni al resize
    window.addEventListener('resize', () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  });
}

/**
 * Inizializza una griglia 3D animata utilizzando Three.js per la sezione Featured.
 * La griglia crea l'effetto di un reticolo neon che ruota lentamente, fornendo
 * profondità e movimento alla sezione senza interferire con i contenuti sovrapposti.
 * @param {HTMLCanvasElement} canvas
 */
function initFeaturedGrid(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    200
  );
  camera.position.set(0, 0, 30);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Crea un reticolo di linee che simula un piano cibernetico
  const size = 60;
  const divisions = 60;
  const gridHelper = new THREE.GridHelper(size, divisions, 0x0044aa, 0x001a44);
  // Ruota la griglia per essere parallela al piano XY (verticale)
  gridHelper.rotation.x = Math.PI / 2;
  // Rendi le linee semi-trasparenti per un effetto futuristico
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.3;
  scene.add(gridHelper);

  // Aggiungi qualche elemento puntiforme per dare maggior profondità
  const pointCount = 300;
  const pointPositions = new Float32Array(pointCount * 3);
  for (let i = 0; i < pointCount; i++) {
    pointPositions[i * 3] = (Math.random() - 0.5) * size;
    pointPositions[i * 3 + 1] = (Math.random() - 0.5) * size;
    pointPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
  const pointsMat = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.06, transparent: true, opacity: 0.6 });
  const points = new THREE.Points(pointsGeo, pointsMat);
  scene.add(points);

  let rot = 0;
  function animate() {
    requestAnimationFrame(animate);
    rot += 0.0015;
    // Ruota la griglia e i punti attorno all'asse Z per creare movimento
    gridHelper.rotation.z = rot;
    points.rotation.z = rot * 1.5;
    renderer.render(scene, camera);
  }
  animate();

  // Adatta le dimensioni al resize
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

/**
 * Inizializza contatori numerici nella sezione stats.
 * Utilizza GSAP e ScrollTrigger per animare i numeri quando la sezione
 * entra nello viewport. Ogni elemento con classe .count e attributo
 * data-target verrà incrementato da 0 al valore target in 2 secondi.
 */
function initCounters() {
  const counters = document.querySelectorAll('.stat-item .count');
  if (!counters.length || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    // Crea un oggetto fittizio per animare il valore
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power1.out',
          onUpdate: () => {
            counter.textContent = Math.floor(obj.val);
          },
        });
      },
    });
  });
}

/**
 * Inizializza il carosello delle testimonianze.
 * Le slide si alternano con dissolvenze incrociate ogni 6 secondi.
 */
function initTestimonialsCarousel() {
  const slides = document.querySelectorAll('.testimonial-slide');
  if (!slides.length) return;
  let currentIndex = 0;
  // Imposta la prima slide come attiva
  slides[0].classList.add('active');
  setInterval(() => {
    const current = slides[currentIndex];
    current.classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    const next = slides[currentIndex];
    next.classList.add('active');
  }, 6000);
}

/**
 * Inizializza la console interattiva.
 * Permette all'utente di digitare comandi come help, progetti, servizi,
 * contatta e ottenere risposte. Stampa l'output nel contenitore.
 */
function initTerminal() {
  const input = document.getElementById('terminal-input-field');
  const output = document.getElementById('terminal-output');
  if (!input || !output) return;
  // Comandi predefiniti
  const commands = {
    help:
      'Comandi disponibili:\n' +
      ' - help: Mostra questo messaggio\n' +
      ' - progetti: Elenca alcuni dei miei progetti\n' +
      ' - servizi: Scopri cosa posso fare per te\n' +
      ' - contatta: Mostra l’indirizzo email per contattarmi',
    progetti:
      'Progetti disponibili:\n' +
      ' • Interfaccia Immersiva – Dashboard in realtà aumentata con dati in tempo reale\n' +
      ' • Codice Dinamico – Piattaforma di live coding con WebAssembly e streaming WebRTC\n' +
      ' • Città Virtuale – Simulazione 3D interattiva di una metropoli cyberpunk',
    servizi:
      'Servizi offerti:\n' +
      ' • Frontend Futuristico: Animazioni WebGL, SPA e design responsive\n' +
      ' • Backend & API: Microservizi scalabili, GraphQL e WebSocket\n' +
      ' • Cloud & DevOps: Containerizzazione, CI/CD e Kubernetes',
    contatta: 'Puoi scrivermi a michael.crippa1@gmail.com per discutere del tuo progetto.',
  };
  // Funzione per stampare messaggi
  function printMessage(message) {
    const line = document.createElement('div');
    line.textContent = message;
    output.appendChild(line);
    // scrolla alla fine
    output.scrollTop = output.scrollHeight;
  }
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value.trim().toLowerCase();
      if (val) {
        printMessage('> ' + val);
        if (commands[val]) {
          printMessage(commands[val]);
        } else {
          printMessage('Comando non riconosciuto. Digita "help" per la lista completa.');
        }
        input.value = '';
      }
    }
  });
}

/**
 * Inizializza un effetto di forme neon fluttuanti su un canvas 2D.
 * Le forme (cerchi) si muovono lentamente, ricomparendo ai bordi
 * per creare un movimento continuo. I colori sono configurabili.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Object} options
 * @param {string[]} [options.colors] - array di colori in formato HEX
 */
function initFloatingShapes(canvas, options = {}) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;
  const colors = options.colors || ['#00e5ff', '#ff2d95', '#8338ec'];
  let shapes = [];

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    // Genera un numero di forme proporzionato all'area
    const count = Math.floor((width * height) / 18000);
    shapes = [];
    for (let i = 0; i < count; i++) {
      shapes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 25 + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const s of shapes) {
      s.x += s.vx;
      s.y += s.vy;
      // Avvolgi ai bordi
      if (s.x > width + s.size) s.x = -s.size;
      if (s.x < -s.size) s.x = width + s.size;
      if (s.y > height + s.size) s.y = -s.size;
      if (s.y < -s.size) s.y = height + s.size;
      // Disegna cerchio
      ctx.fillStyle = s.color + '30';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = s.color + '70';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/**
 * Inizializza modali per gli elementi del portfolio. Quando l'utente
 * clicca su un card del portfolio, viene aperta una modale con il
 * titolo, l'immagine e la descrizione estesa del progetto. La modale può
 * essere chiusa cliccando sulla X o all'esterno del contenuto.
 */
function initPortfolioModals() {
  const modal = document.getElementById('portfolio-modal');
  if (!modal) return;
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDesc = document.getElementById('modal-description');
  const closeBtn = modal.querySelector('.modal-close');
  const items = document.querySelectorAll('.portfolio-item');
  items.forEach((item) => {
    item.addEventListener('click', () => {
      // Ottieni titolo e descrizione dal contenuto
      const titleEl = item.querySelector('h3');
      const descEl = item.querySelector('p');
      const imageDiv = item.querySelector('.item-image');
      const bg = imageDiv && imageDiv.style.backgroundImage;
      let imageUrl = '';
      if (bg && bg.startsWith('url(')) {
        imageUrl = bg.slice(5, -2);
      }
      if (modalTitle) modalTitle.innerText = titleEl ? titleEl.innerText : '';
      if (modalDesc) modalDesc.innerText = descEl ? descEl.innerText : '';
      if (modalImage) modalImage.src = imageUrl || '';
      modal.classList.add('active');
    });
  });
  // Funzione di chiusura
  function closeModal() {
    modal.classList.remove('active');
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/**
 * Inizializza il form di contatto nella pagina dei contatti.
 * Alla sottomissione, mostra un messaggio di ringraziamento e resetta
 * i campi del modulo. Non invia realmente i dati.
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const responseEl = document.getElementById('form-response');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Mostra messaggio di ringraziamento
    if (responseEl) {
      responseEl.textContent = 'Grazie per il tuo messaggio! Ti risponderò il prima possibile.';
    }
    // Reset dei campi
    form.reset();
  });
}

/**
 * Inizializza l'effetto "pioggia digitale" in stile Matrix su un canvas 2D.
 * Viene utilizzata una lista di caratteri alfanumerici e simboli katakana
 * che cadono dall'alto verso il basso. La velocità di caduta reagisce
 * alla posizione orizzontale del puntatore dell'utente: spostandosi
 * verso destra la pioggia diventa più veloce.
 *
 * @param {HTMLCanvasElement} canvas - Canvas 2D su cui disegnare l'effetto
 */
function initMatrixRain(canvas) {
  const ctx = canvas.getContext('2d');
  // Set iniziale di caratteri: numeri, lettere e simboli giapponesi
  const chars = 'アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*';
  // Dimensione caratteri in pixel (aumentata per essere ben visibile)
  let fontSize = 20;
  // Numero di colonne è determinato dalla larghezza del canvas e dalla dimensione del carattere
  let columns = Math.floor(canvas.clientWidth / fontSize);
  // Array che tiene traccia della posizione Y di ogni colonna
  let drops = new Array(columns).fill(0);
  // Fattore di velocità che cambia in base al puntatore
  let speedMultiplier = 1;

  // Ridimensiona il canvas e aggiorna dimensioni/colonne
  function resize() {
    // Utilizza getBoundingClientRect per ottenere dimensioni reali
    const rect = canvas.getBoundingClientRect();
    // Imposta dimensioni effettive del canvas
    canvas.width = rect.width;
    canvas.height = rect.height;
    // Calcola il numero di colonne in base alla larghezza
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(0);
  }
  // Inizializza dimensioni iniziali
  resize();
  window.addEventListener('resize', resize);

  // Aggiorna velocità in base alla posizione del mouse sull'asse X
  window.addEventListener('mousemove', (e) => {
    const ratio = e.clientX / window.innerWidth;
    // Velocità base 1 con massimo 5x a destra
    speedMultiplier = 1 + ratio * 4;
  });

  function draw() {
    // Disegna lo sfondo semi-trasparente per l'effetto di scia
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Imposta colore del testo
    ctx.fillStyle = '#00e5ff';
    ctx.font = fontSize + 'px monospace';
    // Disegna ogni colonna
    for (let i = 0; i < columns; i++) {
      // Scegli un carattere casuale
      const text = chars[Math.floor(Math.random() * chars.length)];
      // Coordinate X in base all'indice della colonna
      const x = i * fontSize;
      // Coordinate Y in base alla posizione di caduta della colonna
      const y = drops[i] * fontSize;
      ctx.fillText(text, x, y);
      // Aumenta la posizione Y
      drops[i] += speedMultiplier;
      // Resetta la colonna randomicamente quando raggiunge il fondo
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/**
 * Effetto di digitazione dinamico per simulare un terminale o un testo battuto.
 * Accetta un elemento e un array di stringhe da digitare in sequenza. Ogni
 * stringa viene scritta carattere per carattere, poi cancellata, quindi
 * si passa alla successiva. La velocità di digitazione e l'intervallo
 * tra le frasi sono configurabili.
 *
 * @param {HTMLElement} el - L'elemento in cui scrivere il testo.
 * @param {string[]} texts - Array di frasi da digitare.
 * @param {number} speed - Millisecondi tra l'inserimento di ciascun carattere.
 * @param {number} delayBetween - Millisecondi di pausa alla fine di una frase prima di cancellare.
 */
function initTypedEffect(el, texts, speed = 100, delayBetween = 2000) {
  if (!el || !texts || !texts.length) return;
  let textIndex = 0;
  let charIndex = 0;
  let currentText = texts[textIndex];
  let deleting = false;
  function type() {
    if (!deleting) {
      // Scrive caratteri uno alla volta
      el.textContent = currentText.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        deleting = true;
        setTimeout(type, delayBetween);
        return;
      }
    } else {
      // Cancella caratteri uno alla volta
      el.textContent = currentText.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        textIndex = (textIndex + 1) % texts.length;
        currentText = texts[textIndex];
        setTimeout(type, speed);
        return;
      }
    }
    setTimeout(type, deleting ? speed / 2 : speed);
  }
  type();
}

/**
 * Inizializza un grafico a ciambella (doughnut) per visualizzare le
 * competenze tecniche e le relative percentuali. Utilizza Chart.js,
 * che deve essere presente nella pagina. I colori sono scelti per
 * rispecchiare la palette neon.
 *
 * @param {HTMLCanvasElement} canvas - Canvas su cui disegnare il grafico.
 */
function initSkillsChart(canvas) {
  if (!canvas || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');
  const data = {
    labels: ['HTML5', 'CSS/SCSS', 'JavaScript', 'Node.js', 'Docker', 'Database'],
    datasets: [
      {
        data: [90, 85, 80, 75, 70, 65],
        backgroundColor: [
          'rgba(0, 229, 255, 0.8)',
          'rgba(255, 45, 149, 0.8)',
          'rgba(131, 56, 236, 0.8)',
          'rgba(0, 229, 255, 0.6)',
          'rgba(255, 45, 149, 0.6)',
          'rgba(131, 56, 236, 0.6)',
        ],
        borderColor: [
          'rgba(0, 229, 255, 1)',
          'rgba(255, 45, 149, 1)',
          'rgba(131, 56, 236, 1)',
          'rgba(0, 229, 255, 1)',
          'rgba(255, 45, 149, 1)',
          'rgba(131, 56, 236, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e3f2fd',
          font: {
            family: 'Orbitron',
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.formattedValue;
            return label + ': ' + value + '%';
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    cutout: '60%',
  };
  new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options,
  });
}

/**
 * Crea un'animazione di onde sinusoidali su un canvas 2D. Le onde si
 * propagano orizzontalmente variando fase e ampiezza nel tempo per
 * creare un effetto fluido e ipnotico. Può essere utilizzato come
 * sfondo decorativo per moduli o sezioni statiche.
 *
 * @param {HTMLCanvasElement} canvas - Canvas su cui disegnare le onde.
 */
function initWaveBackground(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;
  canvas.width = width;
  canvas.height = height;
  let waves = [];
  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    // Genera alcune onde con ampiezza e frequenza casuali
    waves = [];
    const count = 4;
    for (let i = 0; i < count; i++) {
      waves.push({
        amplitude: Math.random() * 20 + 20,
        wavelength: Math.random() * 100 + 100,
        speed: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? 'rgba(0, 229, 255, 0.5)' : 'rgba(255, 45, 149, 0.4)',
      });
    }
  }
  resize();
  window.addEventListener('resize', resize);
  function draw() {
    ctx.clearRect(0, 0, width, height);
    waves.forEach((wave) => {
      wave.phase += wave.speed * 0.01;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      for (let x = 0; x <= width; x += 2) {
        const y =
          height / 2 + Math.sin((x / wave.wavelength) * Math.PI * 2 + wave.phase) * wave.amplitude;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/**
 * Inizializza il pulsante "Back to Top" che compare dopo un certo
 * scorrimento e permette di tornare rapidamente in cima alla pagina.
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Aggiunge un semplice effetto parallax ai background delle sezioni indicate dalla
 * classe .parallax-bg. Il background si sposta lentamente al movimento del
 * puntatore, creando profondità. L'effetto funziona solo su dispositivi con
 * puntatore (desktop) ed è limitato a intensità moderate per non distrarre.
 */
function initParallaxBackground() {
  const elements = document.querySelectorAll('.parallax-bg');
  if (!elements.length) return;
  // Non applicare l'effetto su dispositivi mobili per prestazioni
  if (window.innerWidth < 768) return;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  // Intensità massima dello spostamento in percentuale
  const intensity = 8;
  window.addEventListener('mousemove', (e) => {
    const ratioX = (e.clientX / window.innerWidth) - 0.5;
    const ratioY = (e.clientY / window.innerHeight) - 0.5;
    targetX = ratioX * intensity;
    targetY = ratioY * intensity;
  });
  function animateParallax() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    elements.forEach((el) => {
      el.style.backgroundPosition = `${50 + currentX}% ${50 + currentY}%`;
    });
    requestAnimationFrame(animateParallax);
  }
  animateParallax();
}

/**
 * Crea un effetto di scia luminosa che segue il cursore. Ogni movimento
 * genera un piccolo cerchio colorato che si espande e svanisce, dando
 * l'impressione di particelle al neon. Ideale per aumentare l'interattività.
 */
function initCursorTrail() {
  // Non attivare su dispositivi touch per evitare overload
  if ('ontouchstart' in window) return;
  const colors = ['#00e5ff', '#ff2d95', '#00bfa5'];
  document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('span');
    trail.className = 'cursor-trail';
    const size = Math.random() * 8 + 4;
    trail.style.width = `${size}px`;
    trail.style.height = `${size}px`;
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
    trail.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(trail);
    // Rimuove l'elemento dopo l'animazione
    setTimeout(() => {
      trail.remove();
    }, 600);
  });
}