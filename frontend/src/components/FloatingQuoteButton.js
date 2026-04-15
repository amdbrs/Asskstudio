import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export const FloatingQuoteButton = () => {
  return (
    <Link
      to="/contact"
      className="fixed bottom-20 right-4 z-40 md:hidden flex items-center gap-2 px-5 py-3 bg-[#0047FF] text-white font-anton text-sm uppercase shadow-[0_10px_40px_-10px_rgba(0,71,255,0.6)] active:scale-95 transition-transform duration-200"
      data-testid="floating-quote-btn"
      aria-label="Demander un devis"
    >
      <FileText className="w-4 h-4" />
      Devis
    </Link>
  );
};

export default FloatingQuoteButton;
