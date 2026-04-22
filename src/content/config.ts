import { defineCollection, z } from 'astro:content';

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    category: z.enum(['Commentary', 'Research', 'Playbook', 'Field Notes', 'Teardown']),
    date: z.coerce.date(),
    readTime: z.number(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const demos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pitch: z.string(),               // 1-sentence description for the grid tile
    tags: z.array(z.string()),       // industry / use case tags
    liveUrl: z.string().optional(),  // the URL to embed in an iframe. Omit or empty = "coming soon"
    screenshot: z.string().optional(),// path under /public, e.g. "/images/demos/dashboard.png"
    order: z.number().default(0),    // for ordering in the grid (lower = first)
    pricingFrom: z.string().optional(), // e.g. "$8,000"
    timeline: z.string().optional(), // e.g. "2 weeks to pilot"
    aspect: z.enum(['landscape', 'portrait', 'auto']).default('landscape'),
      // "landscape" = 16:10 dashboard style
      // "portrait"  = 9:16 phone-app style
      // "auto"      = content-driven, auto-resizes via postMessage from iframe
    sandbox: z.string().optional(),  // iframe sandbox attr, e.g. "allow-scripts allow-same-origin allow-forms"
    allow: z.string().optional(),    // iframe allow attr; defaults in DemoEmbed cover clipboard/fullscreen. Override for e.g. microphone.
    resizeSource: z.string().optional(), // for aspect="auto": the postMessage source ID to listen for
    initialHeight: z.number().default(900), // for aspect="auto": starting iframe height in pixels
    draft: z.boolean().default(false),
  }),
});

export const collections = { insights, demos };
