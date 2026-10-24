import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Sup!';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// Fill in once the GitHub remote exists, e.g. { user: 'org', repo: 'sup-docs', branch: 'main' };
// the nav GitHub link and the page "Open in GitHub" action appear then.
export const gitConfig: { user: string; repo: string; branch: string } | null = null;

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
