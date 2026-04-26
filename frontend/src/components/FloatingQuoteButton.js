import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export const FloatingQuoteButton = () => {
  // Hidden on mobile, only visible on desktop
  return (
    <Link
      to="/contact"
      className="fixed bottom-20 right-6 z-40 hidden md:flex items-center gap-2 px-5 py-3 bg-[#0047FF] text-white font-anton text-sm uppercase shadow-[0_10px_40px_-10px_rgba(0,71,255,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(0,71,255,0.7)] hover:-translate-y-1 transition-all duration-300"
      data-testid="floating-quote-btn"
      aria-label="Demander un devis"
    >
      <FileText className="w-4 h-4" />
      Devis
    </Link>
  );
};

export default FloatingQuoteButton;
