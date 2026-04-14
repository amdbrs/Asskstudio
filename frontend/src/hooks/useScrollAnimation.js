import { useEffect, useRef, useState } from 'react';

// Hook for scroll-triggered animations
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optionally unobserve after animation triggers
          if (options.once !== false) {
            observer.unobserve(entry.target);
          }
        } else if (options.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return { ref, isVisible };
};

// Hook for staggered children animations
export const useStaggerAnimation = (itemCount, baseDelay = 100) => {
  const getDelay = (index) => `${index * baseDelay}ms`;
  return { getDelay };
};

// Animated section wrapper component
export const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1 
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });
  
  const animationClasses = {
    fadeInUp: 'scroll-animate',
    slideLeft: 'scroll-animate-left',
    slideRight: 'scroll-animate-right',
    scale: 'scroll-animate-scale'
  };

  return (
    <div
      ref={ref}
      className={`${animationClasses[animation] || 'scroll-animate'} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default useScrollAnimation;
