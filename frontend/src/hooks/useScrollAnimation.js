import { useEffect, useRef, useState, useCallback } from 'react';

// Hook for scroll-triggered animations - optimized for performance
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother state updates
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
          // Optionally unobserve after animation triggers
          if (options.once !== false) {
            observer.unobserve(entry.target);
          }
        } else if (options.once === false) {
          requestAnimationFrame(() => {
            setIsVisible(false);
          });
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -80px 0px'
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return { ref, isVisible };
};

// Hook for staggered children animations
export const useStaggerAnimation = (itemCount, baseDelay = 80) => {
  const getDelay = useCallback((index) => `${index * baseDelay}ms`, [baseDelay]);
  return { getDelay };
};

// Animated section wrapper component - optimized
export const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.15,
  as: Component = 'div'
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });
  
  const animationClasses = {
    fadeInUp: 'scroll-animate',
    slideLeft: 'scroll-animate-left',
    slideRight: 'scroll-animate-right',
    scale: 'scroll-animate-scale'
  };

  return (
    <Component
      ref={ref}
      className={`${animationClasses[animation] || 'scroll-animate'} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'transform, opacity'
      }}
    >
      {children}
    </Component>
  );
};

export default useScrollAnimation;
