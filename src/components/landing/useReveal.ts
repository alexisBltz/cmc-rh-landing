import { useEffect, useRef, useState } from "react";
import { posthog } from "../../lib/analytics";

export function useReveal<T extends HTMLElement>(trackSection?: string) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (trackSection) {
            posthog.capture("section_viewed", { section: trackSection });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [trackSection]);

  return { ref, visible };
}
