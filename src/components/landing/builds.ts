// Build archetypes, copied from the homepage build cards (index.astro).
// Same hrefs, descriptions and timelines. Icons are the homepage SVG paths.
const svg = (inner: string) =>
  `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

export type Build = {
  id: string;
  title: string;
  desc: string;
  time: string;
  href: string;
  cta: string;
  icon: string;
};

export const BUILDS: Record<string, Build> = {
  intake: {
    id: 'intake',
    title: 'AI Intake & Voice Capture',
    desc: '24/7 conversational intake forms and voice AI that book appointments, qualify leads, and route urgent calls, before your team even logs in.',
    time: '2–4 weeks',
    href: '/demos#demo-ai-intake-form',
    cta: 'See the demos',
    icon: svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
  },
  reputation: {
    id: 'reputation',
    title: 'Reputation & Review Intelligence',
    desc: 'Ingest reviews across every platform, extract sentiment and themes, and draft responses at scale, in your voice, queued for approval in a 15-minute sitting.',
    time: '2–4 weeks',
    href: '/demos#demo-reputation-intelligence',
    cta: 'See the demo',
    icon: svg('<path d="M12 2l2.5 6.5L21 9l-5 4.5L17 21l-5-3-5 3 1-7.5L3 9l6.5-.5z"/>'),
  },
  geo: {
    id: 'geo',
    title: 'GEO & AI Search Optimization',
    desc: "Rewrite your website so it shows up in Google's AI Overviews, ChatGPT answers, and Perplexity citations. Most business websites are structurally invisible to AI search.",
    time: '1 wk / 20 pages',
    href: '/demos#demo-geo-content-rewriter',
    cta: 'See the demo',
    icon: svg('<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
  },
  hr: {
    id: 'hr',
    title: 'Internal Knowledge & HR Assistants',
    desc: 'Employees get instant answers to handbook, benefits, and policy questions, with citations to the source doc. HR stops answering the same fifty things every week.',
    time: '2–3 weeks',
    href: '/demos#demo-hr-policy-chatbot',
    cta: 'See the demo',
    icon: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'),
  },
  agentic: {
    id: 'agentic',
    title: 'Agentic Operational Workflows',
    desc: 'Multi-step AI agents that span your systems, onboarding pipelines, client-health dashboards, operational diligence, back-office automation.',
    time: '4–12 weeks',
    href: '/demos#demo-client-portfolio-dashboard',
    cta: 'See the demo',
    icon: svg('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'),
  },
};

export const CUSTOM_BUILD = {
  title: 'Custom AI Tools',
  desc: "Bespoke AI for odd-shaped problems that don't fit a template. Start with a diagnostic, leave with a working system designed for your exact business logic.",
  time: '3–8 weeks',
  cta: 'Start with a diagnostic',
  icon: svg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'),
};

// Homepage "about" highlights (icons identical to index.astro).
const hi = (inner: string) =>
  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
export const HIGHLIGHT_ICONS = {
  discovery: hi('<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
  methods: hi('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'),
  systems: hi('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),
  direct: hi('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
};

export const CAL = {
  link: 'gavin-coleman-pxrlkg/intro',
  namespace: 'intro',
  config: '{"layout":"week_view","useSlotsViewOnSmallScreen":"true"}',
};
