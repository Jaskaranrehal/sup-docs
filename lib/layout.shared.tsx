import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src="/logo.png" alt="" width={24} height={24} />
          {appName}
        </>
      ),
    },
    links: [{ text: 'Open Sup', url: 'https://app.supbot.com', external: true }],
    githubUrl: gitConfig ? `https://github.com/${gitConfig.user}/${gitConfig.repo}` : undefined,
  };
}
