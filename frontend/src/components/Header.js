import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'STUDIO', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'RÉALISATIONS', path: '/realisations' },
    { name: 'CONTACT', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-white border-b-2 border-[#0047FF]"
        data-testid="main-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3"
              data-testid="logo-link"
            >
              <img
                src={LOGO_URL}
                alt="Assk Studio"
                className="h-12 w-auto"
              />
              <span className="font-anton text-2xl text-[#0047FF] hidden sm:block">
                ASSK
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-anton text-lg tracking-wide transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-[#0047FF] border-b-2 border-[#0047FF]'
                      : 'text-[#0047FF] hover:opacity-70'
                  }`}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 border-2 border-[#0047FF] bg-white text-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
                data-testid="cart-button"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#0047FF] text-white text-xs font-bold w-5 h-5 flex items-center justify-center cart-badge">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className="md:hidden p-2 border-2 border-[#0047FF] text-[#0047FF]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="mobile-menu-button"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t-2 border-[#0047FF]">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 font-anton text-lg ${
                    isActive(link.path)
                      ? 'text-[#0047FF] bg-white'
                      : 'text-[#0047FF]'
                  }`}
                  data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
      <CartDrawer />
    </>
  );
};
