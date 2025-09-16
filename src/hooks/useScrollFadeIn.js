// src/hooks/useScrollFadeIn.js
import { useEffect, useRef, useCallback } from 'react';

export const useScrollFadeIn = () => {
  const dom = useRef();

  const handleScroll = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      dom.current.classList.add('fade-in');
    }
  }, []);

  useEffect(() => {
    let observer;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.1 });
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return {
    ref: dom,
    style: {
      opacity: 0,
      transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
    },
  };
};