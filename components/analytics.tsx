'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { gaMeasurementId, privacyPolicyUrl } from '@/lib/shared';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// gtag.js only understands the `arguments` object, not a plain array.
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

let configured = false;
let lastTrackedUrl: string | null = null;

/**
 * Google Analytics 4, on the same property as www.supbot.com. Moving between docs pages does
 * not reload the browser, so each route change is reported as a page view by hand (the
 * marketing site does the same, and the automatic one is switched off with `send_page_view`).
 */
function GoogleAnalytics({ id }: { id: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!configured) {
      configured = true;
      gtag('js', new Date());
      gtag('config', id, { send_page_view: false });
    }

    // The new page's <title> lands a moment after the route changes; wait for it (up to a
    // second) so the page view is not reported with an empty title.
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const send = () => {
      if (!document.title && tries++ < 20) {
        timer = setTimeout(send, 50);
        return;
      }
      const url = window.location.href;
      if (url === lastTrackedUrl) return;
      lastTrackedUrl = url;
      gtag('event', 'page_view', { page_location: url, page_title: document.title });
    };
    send();

    return () => clearTimeout(timer);
  }, [id, pathname]);

  return (
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
  );
}

// Same key, value and wording as the notice on www.supbot.com.
const CONSENT_KEY = 'sup_cookie_consent';

function hasAccepted() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

/**
 * A notice, not a gate: there is no reject option and analytics runs whether or not it is
 * accepted. Accepting only stops it from showing again in this browser.
 */
function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hasAccepted()) setOpen(true);
  }, []);

  if (!open) return null;

  const accept = () => {
    try {
      window.localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {
      // Storage is blocked: the notice comes back on the next page load.
    }
    setOpen(false);
  };

  return (
    <section
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-50 rounded-xl border bg-fd-popover p-4 text-fd-popover-foreground shadow-lg sm:left-auto sm:right-6 sm:bottom-6 sm:w-96"
    >
      <p className="text-sm font-semibold">We use cookies</p>
      <p className="mt-1 text-sm text-fd-muted-foreground">
        We use cookies to improve your experience and to understand how our site is used. By
        continuing to browse, you agree to our use of cookies.{' '}
        <a
          href={privacyPolicyUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-fd-foreground underline underline-offset-2"
        >
          Learn more
        </a>
      </p>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={accept}
          className="w-full rounded-lg bg-fd-primary px-5 py-2 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90 sm:w-auto"
        >
          Accept
        </button>
      </div>
    </section>
  );
}

export function Analytics() {
  if (!gaMeasurementId) return null;

  return (
    <>
      <GoogleAnalytics id={gaMeasurementId} />
      <CookieNotice />
    </>
  );
}
