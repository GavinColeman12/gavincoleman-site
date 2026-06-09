import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://crescendo-consulting.net';

/**
 * Custom sitemap. (@astrojs/sitemap is incompatible with this Astro version,
 * so we generate it ourselves.) Pre-rendered to /sitemap.xml at build time.
 * Lists static pages + all non-draft insights and demos.
 */
export const GET: APIRoute = async () => {
  const insights = await getCollection('insights', (e) => !e.data.draft);
  const demos = await getCollection('demos', (e) => !e.data.draft);

  type Entry = { loc: string; priority: string; lastmod?: string };

  const entries: Entry[] = [
    { loc: `${SITE}/`, priority: '1.0' },
    { loc: `${SITE}/insights`, priority: '0.8' },
    { loc: `${SITE}/demos`, priority: '0.8' },
    { loc: `${SITE}/faq`, priority: '0.6' },
    { loc: `${SITE}/privacy`, priority: '0.3' },
    { loc: `${SITE}/data-deletion`, priority: '0.3' },
    ...insights.map((e) => ({
      loc: `${SITE}/insights/${e.slug}`,
      priority: '0.7',
      lastmod: e.data.date.toISOString().slice(0, 10),
    })),
    ...demos.map((e) => ({ loc: `${SITE}/demos/${e.slug}`, priority: '0.7' })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url>\n    <loc>${e.loc}</loc>${
        e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''
      }\n    <priority>${e.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
