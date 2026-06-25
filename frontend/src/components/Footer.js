import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

// Accordion component for mobile footer
const FooterAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-[#0047FF]/10 md:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 md:hidden"
      >
        <h3 className="font-anton text-lg text-[#0047FF]">{title}</h3>
        <ChevronDown className={`w-5 h-5 text-[#0047FF] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <h3 className="font-anton text-lg text-[#0047FF] mb-4 hidden md:block">{title}</h3>
      <div className={`overflow-hidden transition-all duration-300 md:overflow-visible md:max-h-none ${isOpen ? 'max-h-96 pb-4' : 'max-h-0 md:max-h-none'}`}>
        {children}
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#0047FF]/10 pb-20 md:pb-0" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2 pb-6 md:pb-0 border-b border-[#0047FF]/10 md:border-none">
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Assk Studio" className="h-10 sm:h-12 w-auto" />
              <span className="font-anton text-xl sm:text-2xl text-[#0047FF]">ASSK STUDIO</span>
            </div>
            <p className="font-futura text-[#0047FF]/60 text-sm max-w-sm">
              Studio créatif spécialisé en graphisme, modélisation 3D et création d'art toys uniques.
            </p>
            <div className="flex gap-3 mt-4 sm:mt-6">
              <a href="https://instagram.com/amau.psd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#0047FF]/10 flex items-center justify-center hover:bg-[#0047FF] hover:text-white text-[#0047FF] transition-all duration-300 active:scale-95 touch-feedback">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:amaurydebarros1607@gmail.com" className="w-10 h-10 bg-[#0047FF]/10 flex items-center justify-center hover:bg-[#0047FF] hover:text-white text-[#0047FF] transition-all duration-300 active:scale-95 touch-feedback">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation - Accordion on mobile */}
          <FooterAccordion title="Navigation">
            <nav className="space-y-3">
              {[
                { name: 'Accueil', path: '/' },
                { name: 'À Propos', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group flex items-center gap-2 font-futura text-[#0047FF]/60 hover:text-[#0047FF] transition-colors duration-200 py-1 touch-feedback"
                >
                  {link.name}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" aria-hidden="true" />
                </Link>
              ))}
              <a
                href="https://www.amdbrs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-futura text-[#0047FF]/60 hover:text-[#0047FF] transition-colors duration-200 py-1 touch-feedback"
              >
                Portfolio complet
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" aria-hidden="true" />
              </a>
            </nav>
          </FooterAccordion>

          {/* Contact - Accordion on mobile */}
          <FooterAccordion title="Contact">
            <div className="space-y-3">
              <a href="mailto:amaurydebarros1607@gmail.com" className="block font-futura text-[#0047FF]/60 hover:text-[#0047FF] transition-colors duration-200 text-sm py-1 touch-feedback">
                amaurydebarros1607@gmail.com
              </a>
              <a href="tel:+33665097008" className="block font-futura text-[#0047FF]/60 hover:text-[#0047FF] transition-colors duration-200 text-sm py-1 touch-feedback">
                06 65 09 70 08
              </a>
              <a href="https://instagram.com/amau.psd" target="_blank" rel="noopener noreferrer" className="block font-futura text-[#0047FF]/60 hover:text-[#0047FF] transition-colors duration-200 text-sm py-1 touch-feedback">
                @amau.psd
              </a>
            </div>
          </FooterAccordion>
        </div>

        {/* Copyright */}
        <div className="mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-[#0047FF]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-futura text-[#0047FF]/40 text-xs sm:text-sm">
            © 2024 Assk Studio. Tous droits réservés.
          </p>
          <p className="font-anton text-[#0047FF]/60 text-xs sm:text-sm">
            LAISSE TA MARQUE.
          </p>
        </div>
      </div>
    </footer>
  );
};
