import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, X } from 'lucide-react';

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const location = useLocation();
  
  // Don't show on contact page or admin pages
  const shouldShow = !location.pathname.includes('/contact') && 
                     !location.pathname.includes('/admin');

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!shouldShow || isDismissed || !isVisible) return null;

  return (
    <div 
      className="fixed bottom-24 right-6 z-40 animate-fadeInUp"
      style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
    >
      {/* Dismiss button */}
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-[#0047FF]/20 rounded-full flex items-center justify-center text-[#0047FF]/60 hover:text-[#0047FF] hover:border-[#0047FF] transition-all duration-300 z-10"
        aria-label="Fermer"
      >
        <X className="w-3 h-3" />
      </button>
      
      {/* CTA Button */}
      <Link
        to="/contact"
        className="group flex items-center gap-3 px-5 py-3 bg-[#0047FF] text-white font-anton text-sm uppercase shadow-[0_10px_40px_-10px_rgba(0,71,255,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(0,71,255,0.6)] transition-all duration-500 hover:-translate-y-1"
        data-testid="floating-cta"
      >
        <FileText className="w-4 h-4" />
        <span>Demander un devis</span>
      </Link>
      
      {/* Pulse effect */}
      <div className="absolute inset-0 bg-[#0047FF] animate-ping opacity-20 -z-10" style={{ animationDuration: '2s' }} />
    </div>
  );
};

export default FloatingCTA;
