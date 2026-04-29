import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export const HorizontalScrollCarousel = ({ items = [] }) => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const checkScrollability = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    
    const cardWidth = trackRef.current.querySelector('article')?.offsetWidth || 320;
    const gap = 24;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(newIndex, items.length - 1));
  };

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector('article')?.offsetWidth || 320;
    const scrollAmount = cardWidth + 24;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(checkScrollability, 400);
  };

  // Touch/Mouse drag functionality
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
    setScrollStart(trackRef.current?.scrollLeft || 0);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !trackRef.current) return;
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = startX - x;
    trackRef.current.scrollLeft = scrollStart + diff;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    checkScrollability();
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <section 
      id="realisations" 
      className="py-12 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-[#0047FF]/5 to-white overflow-hidden"
      data-testid="portfolio-section"
      aria-labelledby="portfolio-title"
    >
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-12 mb-8 sm:mb-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8">
            <div>
              <p className="font-futura text-[#0047FF] text-[10px] sm:text-sm uppercase tracking-[0.25em] mb-2 sm:mb-4">Portfolio</p>
              <h2 id="portfolio-title" className="font-anton text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#0047FF] leading-tight">
                Nos dernières
                <span className="text-[#0047FF]/30 block sm:inline"> créations</span>
              </h2>
            </div>
            <Link 
              to="/realisations" 
              className="group inline-flex items-center gap-2 text-[#0047FF] font-futura text-sm hover:gap-3 transition-all duration-300"
            >
              Voir tout
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative group/carousel">
        {/* Navigation Arrows - Hidden on mobile, visible on hover for desktop */}
        <button
          onClick={() => scroll('left')}
          className={`hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-sm border-2 border-[#0047FF] items-center justify-center transition-all duration-300 hover:bg-[#0047FF] hover:scale-110 group shadow-lg ${
            !canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/carousel:opacity-100'
          }`}
          disabled={!canScrollLeft}
          aria-label="Projet précédent"
        >
          <ChevronLeft className="w-6 h-6 text-[#0047FF] group-hover:text-white transition-colors" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className={`hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-sm border-2 border-[#0047FF] items-center justify-center transition-all duration-300 hover:bg-[#0047FF] hover:scale-110 group shadow-lg ${
            !canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/carousel:opacity-100'
          }`}
          disabled={!canScrollRight}
          aria-label="Projet suivant"
        >
          <ChevronRight className="w-6 h-6 text-[#0047FF] group-hover:text-white transition-colors" />
        </button>

        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Carousel Track */}
        <div 
          ref={trackRef}
          className={`flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-12 overflow-x-auto scrollbar-hide scroll-smooth ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={checkScrollability}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {items.map((item, index) => (
            <article
              key={item.id}
              className="group flex-shrink-0 w-[280px] sm:w-[350px] lg:w-[420px] relative"
              data-testid={`carousel-portfolio-${item.id}`}
            >
              <div className="relative overflow-hidden bg-white border border-[#0047FF]/10 hover:border-[#0047FF]/30 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,71,255,0.2)] transform hover:-translate-y-2">
                {/* Image container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0047FF]/5">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    draggable="false"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0047FF] via-[#0047FF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Category badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/95 backdrop-blur-sm font-futura text-[9px] sm:text-xs text-[#0047FF] uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  
                  {/* View icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500">
                      <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-[#0047FF]" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-anton text-base sm:text-xl text-[#0047FF] mb-1 sm:mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="font-futura text-gray-500 text-xs sm:text-sm line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Progress bar on hover */}
                  <div className="mt-3 sm:mt-4 h-0.5 bg-[#0047FF]/10 overflow-hidden">
                    <div className="h-full w-0 bg-[#0047FF] group-hover:w-full transition-all duration-700 ease-out" />
                  </div>
                </div>
              </div>
              
              {/* Card number */}
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-[#0047FF] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                <span className="font-anton text-white text-xs sm:text-sm">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile dots indicator */}
        <div className="flex justify-center gap-2 mt-6 sm:hidden">
          {items.slice(0, Math.min(items.length, 8)).map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-6 bg-[#0047FF]' 
                  : 'w-1.5 bg-[#0047FF]/20'
              }`}
              onClick={() => {
                if (trackRef.current) {
                  const cardWidth = 280 + 16; // card width + gap
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

      {/* CTA - Desktop only */}
      <div className="hidden sm:block px-4 sm:px-6 lg:px-12 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <Link
            to="/realisations"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0047FF] text-white font-anton text-base uppercase transition-all duration-500 hover:gap-5 hover:shadow-[0_30px_60px_-15px_rgba(0,71,255,0.5)] active:scale-95"
          >
            Voir toutes les réalisations
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
