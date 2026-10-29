"use strict";

const header = document.querySelector('#site-header');
const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('#site-navigation');

function setMenu(open) {
  if (!toggle || !panel) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  panel.hidden = !open;
}

toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
panel?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && panel && !panel.hidden) {
    setMenu(false);
    toggle?.focus();
  }
});
document.addEventListener('click', event => {
  if (header && !header.contains(event.target)) setMenu(false);
});
window.matchMedia('(min-width: 1101px)').addEventListener('change', () => setMenu(false));

let scrollQueued = false;
function updateHeader() {
  if (header) header.classList.toggle('is-compact', window.scrollY > 64);
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(updateHeader);
  }
}, { passive: true });
window.addEventListener('pageshow', updateHeader);
updateHeader();

document.querySelectorAll('[data-rb-slider]').forEach(slider => {
  const hero = slider.closest('.rb-hero');
  const slides = [...slider.querySelectorAll('.rb-slide')];
  const controls = [...hero.querySelectorAll('[data-rb-slide]')];
  const play = hero.querySelector('[data-rb-play]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let paused = motion.matches;
  let timer;
  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    controls.forEach((button, i) => {
      button.classList.toggle('is-active', i === current);
      if (i === current) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  };
  const schedule = () => {
    clearInterval(timer);
    if (!paused && slides.length > 1) timer = setInterval(() => show(current + 1), 6500);
  };
  controls.forEach(button => button.addEventListener('click', () => {
    show(Number(button.dataset.rbSlide));
    schedule();
  }));
  play?.addEventListener('click', () => {
    paused = !paused;
    play.textContent = paused ? '▶' : 'Ⅱ';
    play.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    schedule();
  });
  motion.addEventListener('change', () => {
    paused = motion.matches;
    if (play) {
      play.textContent = paused ? '▶' : 'Ⅱ';
      play.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    }
    schedule();
  });
  const updateParallax = () => {
    if (motion.matches || window.innerWidth < 761) {
      slider.style.setProperty('--rb-parallax', '0px');
      return;
    }
    const rect = hero.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < innerHeight) {
      slider.style.setProperty('--rb-parallax', `${Math.max(-40, Math.min(40, -rect.top * .08))}px`);
    }
  };
  window.addEventListener('scroll', updateParallax, { passive: true });
  window.addEventListener('resize', updateParallax, { passive: true });
  show(0);
  schedule();
  updateParallax();
});
