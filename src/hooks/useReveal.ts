import { useEffect, useRef } from 'react';

let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            sharedObserver!.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    );
  }
  return sharedObserver;
}

export function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${delayMs}ms`);
    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [delayMs]);

  return ref;
}
