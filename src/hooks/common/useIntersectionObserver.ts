import { useEffect } from 'react';

interface IUseIntersectionObserverParams {
  elementId: string;
  options?: IntersectionObserverInit;
  callback: IntersectionObserverCallback;
}

export default function useIntersectionObserver({
  elementId,
  options,
  callback,
}: IUseIntersectionObserverParams) {
  useEffect(() => {
    const observedElement = document.getElementById(elementId);
    const observer = new IntersectionObserver(callback, options);

    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [elementId, options, callback]);
}
