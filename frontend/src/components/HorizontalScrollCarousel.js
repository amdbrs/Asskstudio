import { useRef, useState, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

// RevealImage component for smooth image reveal effect
const RevealImage = ({ src, alt, className = '', index = 0 }) => {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), index * 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="relative overflow-hidden w-full h-full">
      {/* Blue reveal overlay */}
      <div 
        className="absolute inset-0 bg-[#0047FF] z-10 origin-left"
        style={{
          transform: isRevealed ? 'scaleX(0)' : 'scaleX(1)',
          transformOrigin: 'right',
          transition: 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)'
        }}
      />
      <img
        src={src}
        alt={alt}
        className={`${className} transition-all duration-700`}
        style={{
          transform: isRevealed ? 'scale(1)' : 'scale(1.2)',
          opacity: isRevealed ? 1 : 0,
          transition: 'transform 0.8s cubic-bezier(0.33, 1, 0.68, 1) 0.2s, opacity 0.5s ease 0.3s'
        }}
        loading="lazy"
      />
    </div>
  );
};

export const HorizontalScrollCarousel = ({ items = [] }) => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollability = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    
    // Calculate active index for dots
    const cardWidth = 320; // Approximate card width on mobile
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, items.length - 1));
  };

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const scrollAmount = 420; // Card width + gap
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(checkScrollability, 400);
  };

  return (
    <section 
      id="realisations" 
      className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-[#0047FF]/5"
      data-testid="portfolio-section"
      aria-labelledby="portfolio-title"
    >
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

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border-2 border-[#0047FF] flex items-center justify-center transition-all duration-300 hover:bg-[#0047FF] hover:text-white group ${
            !canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:scale-110'
          }`}
          disabled={!canScrollLeft}
          aria-label="Précédent"
          data-cursor-text="←"
        >
          <ChevronLeft className="w-6 h-6 text-[#0047FF] group-hover:text-white transition-colors" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border-2 border-[#0047FF] flex items-center justify-center transition-all duration-300 hover:bg-[#0047FF] hover:text-white group ${
            !canScrollRight ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:scale-110'
          }`}
          disabled={!canScrollRight}
          aria-label="Suivant"
          data-cursor-text="→"
        >
          <ChevronRight className="w-6 h-6 text-[#0047FF] group-hover:text-white transition-colors" />
        </button>

        {/* Carousel Track */}
        <div 
          ref={trackRef}
          className="flex gap-6 px-4 sm:px-6 lg:px-12 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={checkScrollability}
        >
          {items.map((item, index) => (
            <a
              key={item.id}
              href={item.link || '#'}
              target={item.link ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="group flex-shrink-0 w-[300px] sm:w-[350px] lg:w-[400px]"
              data-testid={`carousel-portfolio-${item.id}`}
              data-cursor-text="Voir"
              aria-label={`Voir le projet ${item.title} - ${item.category} réalisé par ASSK Studio graphiste Clermont-Ferrand`}
            >
              <article className="relative overflow-hidden bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,71,255,0.25)] transform hover:-translate-y-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <RevealImage
                    src={item.image_url}
                    alt={`${item.title} - ${item.description} - Création ${item.category} par ASSK Studio, graphiste freelance à Clermont-Ferrand, Vichy et Moulins en Auvergne`}
                    className="w-full h-full object-cover group-hover:scale-110"
                    index={index}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0047FF] via-[#0047FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white font-futura text-[10px] sm:text-xs text-[#0047FF] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0 z-20">
                    {item.category}
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
                    <ExternalLink className="w-4 h-4 text-[#0047FF]" />
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="font-anton text-lg sm:text-xl text-[#0047FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-futura text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-4 h-0.5 bg-[#0047FF]/10 overflow-hidden">
                    <div className="h-full w-0 bg-[#0047FF] group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>

        {/* Mobile dots indicator */}
        <div className="carousel-dots md:hidden mt-4">
          {items.slice(0, 6).map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                if (trackRef.current) {
                  const cardWidth = 320;
                  trackRef.current.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                  });
                }
              }}
              aria-label={`Voir projet ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 sm:px-6 lg:px-12 mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <a
            href="https://www.amdbrs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 sm:px-10 py-3 sm:py-5 bg-[#0047FF] text-white font-anton text-sm sm:text-lg uppercase transition-all duration-500 hover:gap-5 hover:shadow-[0_30px_60px_-15px_rgba(0,71,255,0.5)] active:scale-95 touch-feedback"
            data-cursor-text="Go!"
          >
            Voir tout le portfolio
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
