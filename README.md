# Gavin Coleman — Consulting Website

A sleek, corporate-grade single-page site for Gavin Coleman's independent technology consulting practice. No build process, no dependencies — pure HTML, CSS, and JavaScript.

## Structure

```
gavincoleman-consulting/
├── index.html        # The site
├── styles.css        # All styling
├── script.js         # Scroll animations, nav effects
├── images/
│   ├── hero-portrait.jpg     (TODO: add your photo)
│   └── about-portrait.jpg    (TODO: add your photo)
└── README.md         # This file
```

## Before going live

1. **Add your photos** to the `images/` folder:
   - `hero-portrait.jpg` — your portrait for the hero section (the ski helmet / mountains photo works great)
   - `about-portrait.jpg` — your portrait for the About section (the Greece photo works great)

2. **Update your email** in two places in `index.html`:
   - Search for `gavin@gavincoleman.com` and replace with your actual email.

3. **Customize the bio** in the About section of `index.html` if you want more specific details (firm names, deal sizes, client names).

4. **Update testimonials** as you collect real ones — they're in the `#testimonials` section of `index.html`.

## Run locally

Just open `index.html` in any browser:

```bash
open index.html
```

Or serve it with Python for a proper http:// URL:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Any static host works. Here are the easiest options:

### Option 1 — Netlify drop (30 seconds, no account needed)
Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag this folder in. You'll get a live URL like `yoursite.netlify.app` instantly.

### Option 2 — Vercel
```bash
npm i -g vercel
cd gavincoleman-consulting
vercel
```

### Option 3 — GitHub Pages
```bash
cd gavincoleman-consulting
git init
git add .
git commit -m "Initial site"
gh repo create gavincoleman-consulting --public --source=. --push
# Then enable GitHub Pages in the repo settings → Pages → source: main branch
```

### Option 4 — Custom domain
Point `www.gavincoleman.com` or any domain at Netlify/Vercel (they both handle DNS and HTTPS for free).

## Tech decisions

- **No framework** — loads instantly, no build step, easy to hand off or edit.
- **Google Fonts** (Inter + Fraunces) loaded async — Inter for UI, Fraunces for editorial headings.
- **CSS custom properties** for colors so you can retheme in one place if you want.
- **Intersection Observer** for fade-in animations (performant, battery-friendly).
- **Mobile-first responsive** — breaks at 1024px (tablet) and 720px (mobile).

## Color tokens

If you want to re-theme, edit the `:root` block at the top of `styles.css`:

```css
--accent: #2563eb;       /* primary blue accent */
--accent-2: #6366f1;     /* secondary purple */
--accent-gold: #f59e0b;  /* gold highlights */
--bg-dark: #0a0e27;      /* hero + services background */
```
