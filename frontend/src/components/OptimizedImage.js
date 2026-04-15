import { useState, useRef, useEffect } from 'react';

// Optimized Image component with lazy loading (a) and WebP support (b)
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  placeholder = 'blur',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px', threshold: 0 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate WebP URL if using external images that support it
  const getOptimizedSrc = (originalSrc) => {
    // If it's already a WebP or data URL, return as-is
    if (originalSrc?.includes('.webp') || originalSrc?.startsWith('data:')) {
      return originalSrc;
    }
    // For cloud storage URLs that support format conversion
    if (originalSrc?.includes('cloudinary.com')) {
      return originalSrc.replace('/upload/', '/upload/f_webp,q_auto/');
    }
    // For other URLs, return original
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(src);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder skeleton */}
      {!isLoaded && placeholder === 'blur' && (
        <div className="absolute inset-0 bg-[#0047FF]/5 animate-pulse" />
      )}
      
      {/* Actual image - only load when in view */}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
