import { useRef, useEffect, useState } from 'react';
import { Check, Heart, Users, Headphones, Award } from 'lucide-react';

// Icon mapping for variety
const iconMap = [Heart, Users, Headphones, Award];

export const StackingWhyUsCards = ({ items }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = containerRef.current.offsetHeight;
      
      // Calculate which card should be active based on scroll
      const scrollProgress = (windowHeight * 0.4 - rect.top) / (containerHeight * 0.7);
      const newIndex = Math.floor(scrollProgress * items.length);
      setActiveIndex(Math.max(0, Math.min(items.length - 1, newIndex)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items.length]);

  return (
    <section 
      ref={containerRef}
      className="py-12 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#0047FF]" 
      aria-labelledby="why-us-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header - Compact on mobile */}
        <header className="text-center mb-8 sm:mb-16 lg:mb-20">
          <p className="font-futura text-white/60 text-[10px] sm:text-sm uppercase tracking-widest mb-2 sm:mb-4">
            Pourquoi Nous ?
          </p>
          <h2 id="why-us-title" className="font-anton text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight">
            Ce qui nous<br className="sm:hidden" /> différencie
          </h2>
        </header>

        {/* Mobile: Horizontal scroll cards */}
        <div className="sm:hidden">
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {items.map((item, index) => {
              const IconComponent = iconMap[index % iconMap.length];
              return (
                <article
                  key={index}
                  className="flex-shrink-0 w-[280px] p-5 bg-white/10 backdrop-blur-sm border border-white/20 snap-center"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/20 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-anton text-base text-white leading-tight">{item.title}</h3>
                      <p className="font-futura text-white/70 text-xs mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            {items.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-white w-6' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, index) => {
            const IconComponent = iconMap[index % iconMap.length];
            return (
              <article 
                key={index} 
                className="group p-6 sm:p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:border-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.25)]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 group-hover:bg-[#0047FF] flex items-center justify-center mb-4 sm:mb-6 transition-all duration-500 group-hover:scale-110">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-anton text-lg sm:text-xl text-white group-hover:text-[#0047FF] transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="font-futura text-white/70 group-hover:text-[#0047FF]/70 text-xs sm:text-sm mt-2 transition-colors duration-500">
                  {item.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StackingWhyUsCards;
