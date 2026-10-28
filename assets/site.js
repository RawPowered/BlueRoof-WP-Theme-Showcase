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
