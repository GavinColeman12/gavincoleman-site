import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('insights', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return rss({
    title: 'Crescendo AI Strategy Consultants — Insights',
    description:
      'Commentary, research, playbooks, field notes, and teardowns on AI and enterprise tech, and the businesses deploying it.',
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.dek,
      link: `/insights/${post.slug}/`,
      categories: [post.data.category],
    })),
    customData: `<language>en-us</language>`,
  });
}
