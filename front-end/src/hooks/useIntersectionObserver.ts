import { useEffect, useRef, useState } from 'react';


export const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        // Sustabdome stebėjimą po pirmo pasirodimo
        observer.unobserve(entry.target);
      }
    });

    observer.observe(elementRef.current);
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [isVisible]);

  return { elementRef, isVisible };
};
