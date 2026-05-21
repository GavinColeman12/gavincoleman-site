// ============================================================
// Gavin Coleman — Consulting Site Interactions
// ============================================================

// Reveal on scroll — two flavors share one IntersectionObserver:
//   .fade-in        — opacity + 30px Y rise (cards, photos, highlights)
//   .shift-in-right — opacity + 64px X enter (section headers; cinematic)
(function () {
  const fadeSelectors = [
    '.service-card',
    '.case-card',
    '.testimonial',
    '.about__photo',
    '.about__content',
    '.highlight',
    '.build-card',
  ];

  const shiftSelectors = [
    '.section__header',
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

  fadeSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, idx) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${Math.min(idx * 60, 300)}ms`;
      observer.observe(el);
    });
  });

  shiftSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add('shift-in-right');
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

// Magnetic hover on primary CTAs — button drifts toward cursor (Accenture-style)
(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (reducedMotion || isTouch) return;

  const STRENGTH = 0.28;
  const targets = document.querySelectorAll('.btn--primary');

  targets.forEach((btn) => {
    btn.style.willChange = 'translate';
    btn.style.transition = (btn.style.transition || '') + ', translate 360ms cubic-bezier(0.85, 0, 0, 1)';

    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * STRENGTH;
      const dy = (e.clientY - r.top - r.height / 2) * STRENGTH;
      btn.style.translate = dx + 'px ' + dy + 'px';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.translate = '';
    });
  });
})();

// Stat number ticker — count up from 0 on first viewport entry
(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function tickerFor(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = parseInt(el.dataset.duration || '1300', 10);
    const decimals = parseInt(el.dataset.decimals || '0', 10);

    if (reducedMotion) {
      el.textContent = prefix + target.toFixed(decimals) + suffix;
      return;
    }

    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const v = target * easeOutCubic(t);
      el.textContent = prefix + v.toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }

  function isInView(el) {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  els.forEach((el) => {
    if (isInView(el)) {
      tickerFor(el);
    } else if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              tickerFor(e.target);
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      io.observe(el);
    } else {
      tickerFor(el);
    }
  });
})();

// Word rotator — cycles through [data-words]="a|b|c" with crossfade
(function () {
  const els = document.querySelectorAll('[data-words]');
  if (!els.length) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  els.forEach((el) => {
    const words = (el.dataset.words || '').split('|').map((s) => s.trim()).filter(Boolean);
    if (words.length < 2) return;

    const interval = parseInt(el.dataset.interval || '2800', 10);
    let i = words.indexOf((el.textContent || '').trim());
    if (i < 0) i = 0;

    if (reducedMotion) return; // leave the static text as-is

    function cycle() {
      el.classList.add('is-leaving');
      setTimeout(() => {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.classList.remove('is-leaving');
        el.classList.add('is-entering');
        // Force reflow so the transition kicks
        void el.offsetWidth;
        requestAnimationFrame(() => {
          el.classList.remove('is-entering');
        });
      }, 300);
    }

    setInterval(cycle, interval);
  });
})();

// Scroll-progress bar — gradient bar at top of viewport, scales with scroll
(function () {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.max(0, Math.min(1, scrollTop / max)) : 0;
    bar.style.transform = 'scaleX(' + progress + ')';
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
