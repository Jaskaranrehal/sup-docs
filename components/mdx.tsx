import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { ImageZoom, type ImageZoomProps } from 'fumadocs-ui/components/image-zoom';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';

// Short screen recordings (the changelog's old GIFs, as MP4): first frame
// until played, so a page of them doesn't load every clip at once.
function Video({ src, label }: { src: string; label?: string }) {
  return (
    <video
      src={src}
      aria-label={label}
      title={label}
      controls
      loop
      muted
      playsInline
      preload="metadata"
      className="my-4 w-full rounded-xl border shadow-sm"
    />
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    // Screenshots: framed, and click to see them full size.
    img: (props) => (
      <ImageZoom {...(props as ImageZoomProps)} className="rounded-xl border shadow-sm" />
    ),
    Accordion,
    Accordions,
    Step,
    Steps,
    Tab,
    Tabs,
    Video,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
