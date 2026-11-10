(() => {
  'use strict';

  // Mobile navigation and keyboard access.
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    };
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Fallback illustrations are shown when a stock image fails to load.
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      if (img.dataset.fallback && img.getAttribute('src') !== img.dataset.fallback) {
        img.setAttribute('src', img.dataset.fallback);
      }
    });
  });

  // Gallery category filters.
  const filters = document.querySelectorAll('[data-filter]');
  filters.forEach(btn => btn.addEventListener('click', () => {
    const category = btn.dataset.filter;
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === btn)));
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  }));

  // Preserve preselected services, e.g. contact.html?service=Housekeeping.
  // The HTML form is submitted natively to Netlify (no mailto or JS interception).
  const form = document.getElementById('quote-form');
  if (form) {
    const requested = new URLSearchParams(window.location.search).get('service');
    const serviceSelect = form.querySelector('[name="service"]');
    if (requested && serviceSelect &&
        Array.from(serviceSelect.options).some(option => option.value === requested)) {
      serviceSelect.value = requested;
    }
  }

  // Persistent, accessible mobile actions throughout the website.
  const actions = document.createElement('nav');
  actions.className = 'mobile-contact-bar';
  actions.setAttribute('aria-label', 'Quick contact');
  const call = document.createElement('a');
  call.href = 'tel:+16784041756';
  call.className = 'mobile-contact-bar__call';
  call.textContent = 'Call Now';
  call.setAttribute('aria-label', 'Call Jasmine at (678) 404-1756');
  const quote = document.createElement('a');
  quote.href = form ? '#quote-form' : '/contact.html';
  quote.className = 'mobile-contact-bar__quote';
  quote.textContent = 'Get a Quote';
  quote.setAttribute('aria-label', 'Request a Jasmine quote');
  actions.append(call, quote);
  document.body.appendChild(actions);
})();
