import { useState, useRef, useEffect } from 'react';

export const ImageWithLoader = ({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
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
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${containerClassName}`}>
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 skeleton-loader bg-[#0047FF]/10" />
      )}
      
      {/* Blur placeholder */}
      {!isLoaded && isInView && (
        <div 
          className="absolute inset-0 bg-[#0047FF]/5 backdrop-blur-sm transition-opacity duration-500"
          style={{ opacity: isLoaded ? 0 : 1 }}
        />
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-all duration-700 ${
            isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'
          }`}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
};

export default ImageWithLoader;
