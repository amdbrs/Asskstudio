import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Mail, Phone } from 'lucide-react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10" data-testid="footer">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Main footer content */}
        <div className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <img src={LOGO_URL} alt="ASSK Studio" className="h-16 w-auto" />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Studio créatif spécialisé en graphisme, développement web et modélisation 3D. Basé en Auvergne, travaillant dans toute la France.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/amau.psd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#0047FF] hover:border-[#0047FF] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="mailto:amaurydebarros1607@gmail.com"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#0047FF] hover:border-[#0047FF] transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="tel:+33665097008"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#0047FF] hover:border-[#0047FF] transition-all duration-300"
                aria-label="Téléphone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-6">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {[
                { name: 'Studio', href: '/' },
                { name: 'Réalisations', href: '/realisations' },
                { name: 'À propos', href: '/a-propos' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link 
                  key={link.name}
                  to={link.href}
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-6">Services</h4>
            <nav className="flex flex-col gap-3">
              {[
                { name: 'Graphisme', href: '/graphisme' },
                { name: 'Sites Web', href: '/sites-web' },
                { name: '3D & Toys', href: '/modelisation-3d' },
              ].map((link) => (
                <Link 
                  key={link.name}
                  to={link.href}
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-6">Contact</h4>
            <div className="space-y-4">
              <a 
                href="mailto:amaurydebarros1607@gmail.com"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
              >
                amaurydebarros1607@gmail.com
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a 
                href="tel:+33665097008"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
              >
                06 65 09 70 08
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <p className="text-white/40 text-sm">
                Clermont-Ferrand, Vichy, Moulins
                <br />
                Auvergne, France
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {currentYear} ASSK Studio. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/mentions-legales" className="text-white/40 hover:text-white text-xs transition-colors">
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite" className="text-white/40 hover:text-white text-xs transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
