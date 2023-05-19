import { useCallback, useEffect, useState } from 'react';

function useIntersectionObserver(
  triggerOnce = true,
  threshold = 0.3,
  rootMargin = '0px'
): [(node: Element) => void, boolean] {
  const [isIntersecting, setIntersecting] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  const refCallback = useCallback(
    (node: Element) => {
      if (node) {
        setElement(node);
      } else {
        setElement(null);
      }
    },
    [setElement]
  );

  useEffect(() => {
    let observer: IntersectionObserver;

    if (element) {
      const el = element;
      if (el?.tagName) {
        const options = {
          threshold,
          triggerOnce: Boolean(triggerOnce),
          rootMargin
        };
        observer = new IntersectionObserver(function (entries) {
          if (options.triggerOnce) {
            if (entries.some((e) => e.isIntersecting)) {
              setIntersecting(true);
              observer.unobserve(el);
            }
          } else {
            setIntersecting(entries[0].isIntersecting);
          }
        }, options);
        observer.observe(el);
      }
    }

    return () => {
      observer?.disconnect();
    };
  }, [element, threshold, triggerOnce, rootMargin]);

  return [refCallback, isIntersecting];
}

export default useIntersectionObserver;
