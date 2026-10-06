import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Smooth scroll ----------
let lenis: Lenis | null = null;
if (!reduceMotion) {
  lenis = new Lenis({ duration: 1.2, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

document.querySelector('[data-to-top]')?.addEventListener('click', (event) => {
  event.preventDefault();
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0 });
});

// ---------- Tema ----------
document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.classList.add('theme-switching');
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // sem armazenamento disponível: o tema vale só para esta visita
    }
    window.setTimeout(() => root.classList.remove('theme-switching'), 350);
  });
});

// ---------- Nav: some ao rolar para baixo, volta ao rolar para cima ----------
const nav = document.querySelector<HTMLElement>('[data-nav]');
let lastY = window.scrollY;
window.addEventListener(
  'scroll',
  () => {
    const y = window.scrollY;
    if (nav && Math.abs(y - lastY) > 4) {
      nav.classList.toggle('is-hidden', y > lastY && y > 200);
      lastY = y;
    }
  },
  { passive: true },
);

// ---------- Menu mobile ----------
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

function setMenu(open: boolean) {
  root.classList.toggle('menu-open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
  menuButton?.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menu?.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) lenis?.stop();
  else lenis?.start();
}

menuButton?.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
document.querySelectorAll('[data-menu-link]').forEach((link) => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

// ---------- Entrada das seções ----------
function setupReveal() {
  gsap.set('[data-reveal]', { y: 24 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (elements) =>
      elements.forEach((el, i) =>
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          // Escalonamento padrão + atraso extra opcional por elemento (data-reveal-delay, em segundos)
          delay: i * 0.08 + Number((el as HTMLElement).dataset.revealDelay ?? 0),
          overwrite: true,
        }),
      ),
  });
}

// Com a tela de abertura, o conteúdo só entra quando ela começa a sumir.
const intro = document.querySelector<HTMLElement>('[data-intro]');
if (root.classList.contains('intro') && intro) {
  window.setTimeout(setupReveal, 1600);
  intro.addEventListener('animationend', (event) => {
    if (event.animationName === 'intro-out') root.classList.remove('intro');
  });
} else if (!reduceMotion) {
  setupReveal();
}

// ---------- Cards de case empilhados (desktop) ----------
const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]');
if (cards.length > 1) {
  gsap.matchMedia().add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    cards.forEach((card, i) => {
      const inner = card.querySelector<HTMLElement>('[data-stack-inner]');
      if (!inner) return;
      // Cada card que chega por cima encolhe um pouco os anteriores.
      for (let j = i + 1; j < cards.length; j++) {
        gsap.fromTo(
          inner,
          { scale: 1 - (j - i - 1) * 0.04 },
          {
            scale: 1 - (j - i) * 0.04,
            transformOrigin: 'center top',
            ease: 'none',
            immediateRender: false,
            scrollTrigger: { trigger: cards[j], start: 'top bottom', end: 'top 20%', scrub: true },
          },
        );
      }
    });
  });
}

// ---------- Efeito de digitação ----------
function typewriter(el: HTMLElement) {
  const words: string[] = JSON.parse(el.dataset.typed ?? '[]');
  if (words.length < 2) return;

  let word = 0;
  let length = words[0].length;
  let deleting = true;
  let visible = false;
  let timer = 0;
  // A primeira troca espera mais, para dar tempo de ler a descrição ao lado do título.
  // Com a tela de abertura, soma o tempo que o conteúdo leva para aparecer.
  let firstDelay = 5000 + (root.classList.contains('intro') ? 1600 : 0);

  const step = () => {
    if (!visible) return;
    if (deleting) {
      length -= 1;
      if (length === 0) {
        deleting = false;
        word = (word + 1) % words.length;
      }
    } else {
      length += 1;
    }
    el.textContent = words[word].slice(0, length) || '​';

    let delay = deleting ? 35 : 70;
    if (!deleting && length === words[word].length) {
      deleting = true;
      delay = 2400;
    } else if (!deleting && length === 0) {
      delay = 350;
    }
    timer = window.setTimeout(step, delay);
  };

  // Só anima enquanto o título está na tela.
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    window.clearTimeout(timer);
    if (visible) {
      timer = window.setTimeout(step, firstDelay);
      firstDelay = 2400;
    }
  }).observe(el);
}

if (!reduceMotion) document.querySelectorAll<HTMLElement>('[data-typed]').forEach(typewriter);
