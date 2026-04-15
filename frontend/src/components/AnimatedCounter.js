import { useRef, useState, useEffect } from 'react';

export const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  className = ''
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Start animation
          const startTime = Date.now();
          const startValue = 0;
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-expo)
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            const currentValue = Math.floor(startValue + (end - startValue) * easeOutExpo);
            setCount(currentValue);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, duration, end]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
