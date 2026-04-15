import { useState, useEffect, useRef, useCallback } from 'react';

// Hook for parallax scroll effect
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const relativeScroll = scrolled - elementTop + window.innerHeight;
      setOffset(relativeScroll * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};

// Hook for mouse parallax effect
export const useMouseParallax = (intensity = 20) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = ((e.clientX - centerX) / window.innerWidth) * intensity;
      const y = ((e.clientY - centerY) / window.innerHeight) * intensity;
      
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return { ref, position };
};

// Parallax container component
export const ParallaxLayer = ({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'vertical' // 'vertical' | 'horizontal' | 'both'
}) => {
  const { ref, offset } = useParallax(speed);
  
  const transform = direction === 'vertical' 
    ? `translateY(${offset}px)`
    : direction === 'horizontal'
    ? `translateX(${offset}px)`
    : `translate(${offset}px, ${offset}px)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

// Mouse follow parallax component
export const MouseParallax = ({ 
  children, 
  intensity = 20, 
  className = '',
  rotateIntensity = 0 // Add subtle rotation
}) => {
  const { ref, position } = useMouseParallax(intensity);
  
  const rotation = rotateIntensity 
    ? `rotateX(${-position.y * rotateIntensity}deg) rotateY(${position.x * rotateIntensity}deg)`
    : '';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) ${rotation}`,
        transition: 'transform 0.3s ease-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

// Scroll progress hook
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(scrollHeight > 0 ? scrolled / scrollHeight : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

// Tilt on hover component
export const TiltCard = ({ 
  children, 
  className = '',
  maxTilt = 10,
  scale = 1.02
}) => {
  const ref = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateX = (y - 0.5) * -maxTilt * 2;
    const rotateY = (x - 0.5) * maxTilt * 2;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
  }, [maxTilt, scale]);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.3s ease-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default { useParallax, useMouseParallax, ParallaxLayer, MouseParallax, useScrollProgress, TiltCard };
