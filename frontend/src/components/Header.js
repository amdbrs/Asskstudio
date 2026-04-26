import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Studio', path: '/' },
    { name: 'Réalisations', path: '/realisations' },
    { name: 'À propos', path: '/a-propos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          !isHomePage
            ? 'bg-white shadow-[0_4px_30px_rgba(0,71,255,0.1)]'
            : scrolled 
              ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,71,255,0.1)]' 
              : 'bg-transparent'
        } ${scrolled ? 'header-compact' : ''}`}
        data-testid="main-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'py-2 sm:py-3' : 'py-4'}`}>
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center group relative z-50 touch-feedback"
              data-testid="logo-link"
            >
              <img
                src={LOGO_URL}
                alt="ASSK Studio - Logo"
                className={`w-auto transition-all duration-300 group-hover:scale-105 ${scrolled ? 'h-8' : 'h-10'}`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-futura font-medium text-sm uppercase tracking-wider transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-[#0047FF]'
                      : 'text-[#0047FF]/60 hover:text-[#0047FF]'
                  }`}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#0047FF]" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button - Animated Hamburger (j) */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center relative z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-button"
              aria-label="Menu de navigation"
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span 
                  className={`block h-0.5 bg-[#0047FF] transition-all duration-300 origin-center ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`} 
                />
                <span 
                  className={`block h-0.5 bg-[#0047FF] transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0 scale-0' : ''
                  }`} 
                />
                <span 
                  className={`block h-0.5 bg-[#0047FF] transition-all duration-300 origin-center ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Full Screen Overlay (j) */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-[#0047FF]/10 backdrop-blur-sm transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <nav 
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-[-10px_0_40px_rgba(0,71,255,0.1)] transition-transform duration-500 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-24 px-8 pb-8 h-full flex flex-col">
            {/* Nav Links */}
            <div className="flex-1 space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-4 font-anton text-2xl uppercase transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-[#0047FF]'
                      : 'text-[#0047FF]/60 hover:text-[#0047FF] hover:translate-x-2'
                  }`}
                  style={{ 
                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(20px)'
                  }}
                  data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="block w-12 h-1 bg-[#0047FF] mt-2" />
                  )}
                </Link>
              ))}
            </div>
            
            {/* CTA Button */}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-8 block w-full py-4 bg-[#0047FF] text-white font-anton text-lg text-center uppercase transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,71,255,0.5)]"
              style={{ 
                transitionDelay: mobileMenuOpen ? '250ms' : '0ms',
                opacity: mobileMenuOpen ? 1 : 0
              }}
            >
              Demander un devis
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};
