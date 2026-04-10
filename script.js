// ============================================================
// Gavin Coleman — Consulting Site Interactions
// ============================================================

// Fade-in on scroll using IntersectionObserver
(function () {
  const selectors = [
    '.section__header',
    '.service-card',
    '.case-card',
    '.testimonial',
    '.about__photo',
    '.about__content',
    '.highlight',
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '-50px 0px',
      threshold: 0.05,
    }
  );

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, idx) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${Math.min(idx * 60, 300)}ms`;
      observer.observe(el);
    });
  });
})();

// Service card spotlight effect — cursor-aware glow
(function () {
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
  });
})();

// Nav scroll effect — increase backdrop on scroll
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;
  window.addEventListener(
    'scroll',
    () => {
      const current = window.scrollY;
      if (current > 40) {
        nav.style.background = 'rgba(10, 14, 39, 0.92)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
      } else {
        nav.style.background = 'rgba(10, 14, 39, 0.8)';
        nav.style.boxShadow = 'none';
      }
      lastScroll = current;
    },
    { passive: true }
  );
})();

// Smooth scroll for in-page nav links (fallback for older browsers)
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
