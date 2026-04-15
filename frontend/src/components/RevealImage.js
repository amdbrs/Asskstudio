import { useRef, useEffect, useState } from 'react';

export const RevealImage = ({ 
  src, 
  alt, 
  className = '',
  revealDirection = 'left', // 'left', 'right', 'top', 'bottom'
  delay = 0,
  ...props 
}) => {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  // Clip-path based on direction
  const clipPaths = {
    left: {
      hidden: 'inset(0 100% 0 0)',
      revealed: 'inset(0 0 0 0)'
    },
    right: {
      hidden: 'inset(0 0 0 100%)',
      revealed: 'inset(0 0 0 0)'
    },
    top: {
      hidden: 'inset(0 0 100% 0)',
      revealed: 'inset(0 0 0 0)'
    },
    bottom: {
      hidden: 'inset(100% 0 0 0)',
      revealed: 'inset(0 0 0 0)'
    }
  };

  const currentClipPath = clipPaths[revealDirection] || clipPaths.left;

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Reveal overlay */}
      <div 
        className="absolute inset-0 bg-[#0047FF] z-10 transition-transform duration-700 ease-out"
        style={{
          transform: isRevealed 
            ? revealDirection === 'left' ? 'translateX(-101%)' 
            : revealDirection === 'right' ? 'translateX(101%)'
            : revealDirection === 'top' ? 'translateY(-101%)'
            : 'translateY(101%)'
            : 'translate(0)'
        }}
      />
      
      {/* Image with clip-path reveal */}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-all duration-700 ease-out`}
        style={{
          clipPath: isRevealed ? currentClipPath.revealed : currentClipPath.hidden,
          transform: isRevealed ? 'scale(1)' : 'scale(1.1)',
        }}
        {...props}
      />
    </div>
  );
};

export default RevealImage;
