import { useRef, useEffect, useState } from 'react';
import { Check } from 'lucide-react';

export const StackingWhyUsCards = ({ items }) => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = containerRef.current.offsetHeight;
      
      // Calculate progress through section
      const startOffset = windowHeight * 0.5;
      const endOffset = -containerHeight * 0.5;
      const progress = (startOffset - rect.top) / (startOffset - endOffset);
      
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#0047FF]" 
      aria-labelledby="why-us-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="font-futura text-white/60 text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
            Pourquoi Nous ?
          </p>
          <h2 id="why-us-title" className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white">
            Ce qui nous différencie
          </h2>
        </header>

        {/* Mobile: Stacking Cards */}
        <div className="sm:hidden relative" style={{ minHeight: `${items.length * 120 + 200}px` }}>
          {items.map((item, index) => {
            // Calculate individual card progress
            const cardStart = index / items.length;
            const cardEnd = (index + 1) / items.length;
            const cardProgress = Math.max(0, Math.min(1, (scrollProgress - cardStart) / (cardEnd - cardStart)));
            
            // Calculate stacking offset
            const stackOffset = Math.max(0, (items.length - 1 - index) * 12 - scrollProgress * items.length * 12);
            const rotation = (items.length - 1 - index) * 1 - scrollProgress * items.length * 1;
            
            return (
              <article
                key={index}
                className="sticky top-24 p-6 bg-white border-2 border-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-all duration-300"
                style={{
                  transform: `translateY(${index * 8}px) rotate(${rotation}deg)`,
                  zIndex: index + 1,
                  marginBottom: index === items.length - 1 ? '0' : '-80%',
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0047FF] flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-anton text-xl text-[#0047FF]">{item.title}</h3>
                    <p className="font-futura text-gray-600 text-sm mt-2">{item.desc}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, index) => (
            <article 
              key={index} 
              className="group p-6 sm:p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:border-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.25)]"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 group-hover:bg-[#0047FF] flex items-center justify-center mb-4 sm:mb-6 transition-all duration-500 group-hover:scale-110">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="font-anton text-lg sm:text-xl text-white group-hover:text-[#0047FF] transition-colors duration-500">
                {item.title}
              </h3>
              <p className="font-futura text-white/70 group-hover:text-[#0047FF]/70 text-xs sm:text-sm mt-2 transition-colors duration-500">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackingWhyUsCards;
