import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://soaked-page.soaked.top',
  integrations: [mdx()],
  redirects: {
    '/algorithms/': '/notes/',
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { output: 'html' }]],
    shikiConfig: {
      theme: 'github-light',
      langs: ['cpp', 'bash', 'javascript', 'typescript', 'json', 'yaml', 'markdown'],
    },
  },
});

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
