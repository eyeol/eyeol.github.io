import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

/** @type {import('astro').AstroUserConfig} */
export default {
  site: 'https://eyeol.github.io',
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append', properties: { ariaHidden: 'true', tabIndex: -1 } }],
    ],
  },
};
