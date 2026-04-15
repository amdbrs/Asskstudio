import { useRef, useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

export const HorizontalScrollCarousel = ({ items = [] }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = container.offsetHeight;
      
      // Calculate how far through the section we've scrolled
      const startScroll = rect.top - windowHeight;
      const endScroll = rect.bottom;
      const totalScrollDistance = endScroll - startScroll;
      const currentScroll = -startScroll;
      
      // Progress from 0 to 1
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollDistance));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate the horizontal translation based on scroll progress
  const trackWidth = items.length * 420; // Approximate card width + gap
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const maxTranslate = Math.max(0, trackWidth - viewportWidth + 100);
  const translateX = -scrollProgress * maxTranslate;

  return (
    <section 
      ref={containerRef}
      id="realisations" 
      className="relative min-h-[200vh] bg-gradient-to-b from-white to-[#0047FF]/5"
      data-testid="portfolio-section"
      aria-labelledby="portfolio-title"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-12 mb-8 sm:mb-12">
          <div className="max-w-7xl mx-auto">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">Notre Travail</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 id="portfolio-title" className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#0047FF]">
                Réalisations
              </h2>
              <p className="font-futura text-gray-600 text-sm sm:text-base max-w-md">
                Découvrez nos derniers projets en graphisme, web et 3D
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Track */}
        <div className="relative w-full overflow-visible">
          <div 
            ref={trackRef}
            className="flex gap-6 pl-4 sm:pl-6 lg:pl-12 pr-32 will-change-transform"
            style={{ 
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.1s linear'
            }}
          >
            {items.map((item, index) => (
              <a
                key={item.id}
                href={item.link || '#'}
                target={item.link ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="group flex-shrink-0 w-[320px] sm:w-[380px] lg:w-[400px]"
                data-testid={`carousel-portfolio-${item.id}`}
                data-cursor-text="Voir"
                aria-label={`Voir le projet ${item.title}`}
              >
                <article className="relative overflow-hidden bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,71,255,0.25)] transform hover:-translate-y-2">
                  {/* Image container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={`${item.title} - ${item.description} - Projet ${item.category} par ASSK Studio`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x400/0047FF/FFFFFF?text=${encodeURIComponent(item.title)}`;
                      }}
                    />

                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0047FF] via-[#0047FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Category tag */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white font-futura text-[10px] sm:text-xs text-[#0047FF] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
                      {item.category}
                    </div>

                    {/* View icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <ExternalLink className="w-4 h-4 text-[#0047FF]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="font-anton text-lg sm:text-xl text-[#0047FF] group-hover:text-[#0047FF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-futura text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Animated underline */}
                    <div className="mt-4 h-0.5 bg-[#0047FF]/10 overflow-hidden">
                      <div className="h-full w-0 bg-[#0047FF] group-hover:w-full transition-all duration-700" />
                    </div>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="px-4 sm:px-6 lg:px-12 mt-8 sm:mt-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Progress bar */}
            <div className="flex-1 max-w-xs">
              <div className="h-0.5 bg-[#0047FF]/10 overflow-hidden">
                <div 
                  className="h-full bg-[#0047FF] transition-all duration-100"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-futura text-[#0047FF]/50 text-xs">Scroll</span>
                <span className="font-anton text-[#0047FF] text-xs">{Math.round(scrollProgress * 100)}%</span>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://www.amdbrs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-3 px-6 py-3 bg-[#0047FF] text-white font-anton text-sm uppercase transition-all duration-500 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(0,71,255,0.5)] hover:-translate-y-1"
              data-cursor-text="Go!"
            >
              Voir tout
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
