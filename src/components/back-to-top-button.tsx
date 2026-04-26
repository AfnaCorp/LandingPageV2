'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const remainingScroll = pageHeight - scrollBottom;
      const hasScrollableContent = pageHeight > window.innerHeight + 80;
      const isNearBottom = remainingScroll <= Math.max(320, window.innerHeight * 0.25);
      const hasScrolledDown = window.scrollY > 80;

      setIsVisible(hasScrollableContent && isNearBottom && hasScrolledDown);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={[
        'fixed bottom-5 right-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 bg-background/90 text-foreground shadow-lg backdrop-blur transition',
        'hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      ].join(' ')}
      aria-label="Remonter en haut de la page"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
