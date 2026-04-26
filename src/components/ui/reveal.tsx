'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RevealDirection = 'up' | 'left' | 'right' | 'scale';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  once?: boolean;
  threshold?: number;
}

export function Reveal({
  children,
  as: Component = 'div',
  className,
  delay = 0,
  direction = 'up',
  once = true,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  const directionClass =
    direction === 'left'
      ? 'jloow-reveal--left'
      : direction === 'right'
        ? 'jloow-reveal--right'
        : direction === 'scale'
          ? 'jloow-reveal--scale'
          : '';

  return (
    <Component
      ref={ref as never}
      className={cn('jloow-reveal', directionClass, visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
