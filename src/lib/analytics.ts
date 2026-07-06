import posthog from "posthog-js";

const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string | undefined;
const apiHost = (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined) || "https://us.i.posthog.com";

export function initAnalytics() {
  if (!apiKey) {
    if (import.meta.env.DEV) {
      console.warn("[analytics] VITE_PUBLIC_POSTHOG_KEY no está definido; los eventos no se enviarán.");
    }
    return;
  }

  posthog.init(apiKey, {
    api_host: apiHost,
    person_profiles: "always",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: false,
  });
}

export { posthog };
