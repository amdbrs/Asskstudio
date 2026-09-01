import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlignJustify, X } from 'lucide-react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

const navLinks = [
  { name: 'Studio', href: '/' },
  { name: 'Réalisations', href: '/realisations' },
  { name: 'À propos', href: '/a-propos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10' 
            : 'bg-transparent'
        }`}
        data-testid="header"
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" data-testid="header-logo">
              <img 
                src={LOGO_URL} 
                alt="ASSK Studio" 
                className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 font-body text-sm transition-colors duration-300 ${
                    location.pathname === link.href 
                      ? 'text-white' 
                      : 'text-white/50 hover:text-white'
                  }`}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                to="/contact"
                className="inline-flex items-center px-5 py-2.5 bg-white text-[#0a0a0a] font-heading font-medium text-sm transition-all duration-300 hover:bg-[#0047FF] hover:text-white"
                data-testid="header-cta"
              >
                Démarrer
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white"
              aria-label="Toggle menu"
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <AlignJustify className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu content */}
        <div className={`relative h-full flex flex-col pt-24 px-6 transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-8'
        }`}>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                className={`py-4 border-b border-white/10 font-heading text-3xl font-medium transition-all duration-300 ${
                  location.pathname === link.href 
                    ? 'text-[#0047FF]' 
                    : 'text-white hover:text-[#0047FF]'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                data-testid={`mobile-nav-${link.name.toLowerCase()}`}
              >
                <span className="font-mono text-sm text-white/30 mr-4">0{index + 1}</span>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pb-12">
            <Link
              to="/contact"
              className="block w-full py-4 bg-white text-[#0a0a0a] font-heading font-medium text-center text-lg"
              data-testid="mobile-cta"
            >
              Démarrer un projet
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
