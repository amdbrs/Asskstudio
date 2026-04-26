import { useEffect, useRef, useState } from 'react';

// Hook for scroll-triggered animations
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { threshold = 0.1, once = true, rootMargin = '0px' } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, isVisible, hasAnimated };
};

// Animated wrapper component
export const ScrollReveal = ({ 
  children, 
  animation = 'fadeUp', 
  delay = 0, 
  duration = 600,
  className = '',
  once = true,
  threshold = 0.1
}) => {
  const { ref, isVisible } = useScrollAnimation({ once, threshold });

  const animations = {
    fadeUp: {
      initial: { opacity: 0, transform: 'translateY(40px)' },
      animate: { opacity: 1, transform: 'translateY(0)' }
    },
    fadeDown: {
      initial: { opacity: 0, transform: 'translateY(-40px)' },
      animate: { opacity: 1, transform: 'translateY(0)' }
    },
    fadeLeft: {
      initial: { opacity: 0, transform: 'translateX(-40px)' },
      animate: { opacity: 1, transform: 'translateX(0)' }
    },
    fadeRight: {
      initial: { opacity: 0, transform: 'translateX(40px)' },
      animate: { opacity: 1, transform: 'translateX(0)' }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    scaleUp: {
      initial: { opacity: 0, transform: 'scale(0.9)' },
      animate: { opacity: 1, transform: 'scale(1)' }
    },
    blur: {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: { opacity: 1, filter: 'blur(0)' }
    }
  };

  const { initial, animate } = animations[animation] || animations.fadeUp;
  const currentStyle = isVisible ? animate : initial;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...currentStyle,
        transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform, filter'
      }}
    >
      {children}
    </div>
  );
};

// Staggered children animation
export const StaggerReveal = ({ 
  children, 
  staggerDelay = 100, 
  animation = 'fadeUp',
  className = '',
  childClassName = ''
}) => {
  const { ref, isVisible } = useScrollAnimation({ once: true, threshold: 0.1 });

  const animations = {
    fadeUp: { initial: 'translate-y-8 opacity-0', animate: 'translate-y-0 opacity-100' },
    fadeLeft: { initial: 'translate-x-8 opacity-0', animate: 'translate-x-0 opacity-100' },
    scaleUp: { initial: 'scale-95 opacity-0', animate: 'scale-100 opacity-100' }
  };

  const anim = animations[animation] || animations.fadeUp;

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) ? children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ease-out ${childClassName} ${
            isVisible ? anim.animate : anim.initial
          }`}
          style={{ transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms' }}
        >
          {child}
        </div>
      )) : children}
    </div>
  );
};

export default ScrollReveal;
