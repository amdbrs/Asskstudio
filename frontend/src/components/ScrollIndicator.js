import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide after scrolling 100px
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToServices}
      className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#0047FF] animate-bounce cursor-pointer z-20 group"
      aria-label="Défiler vers le bas"
      data-cursor-text="↓"
    >
      <span className="font-futura text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
        Découvrir
      </span>
      <div className="w-10 h-10 border-2 border-[#0047FF]/30 rounded-full flex items-center justify-center group-hover:border-[#0047FF] group-hover:bg-[#0047FF]/5 transition-all duration-300">
        <ChevronDown className="w-5 h-5 animate-pulse" />
      </div>
    </button>
  );
};

export default ScrollIndicator;
