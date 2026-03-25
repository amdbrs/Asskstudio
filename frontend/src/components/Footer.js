import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone } from 'lucide-react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

export const Footer = () => {
  return (
    <footer
      className="bg-[#0047FF] text-white border-t-4 border-[#0047FF]"
      data-testid="main-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="Assk Studio"
                className="h-16 w-auto brightness-0 invert"
              />
              <span className="font-anton text-3xl">ASSK STUDIO</span>
            </div>
            <p className="font-futura text-white/80">
              Studio créatif spécialisé en graphisme, 3D et art toys.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-anton text-xl mb-4">NAVIGATION</h3>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="font-futura hover:underline"
                data-testid="footer-link-studio"
              >
                Studio
              </Link>
              <Link
                to="/shop"
                className="font-futura hover:underline"
                data-testid="footer-link-shop"
              >
                Shop
              </Link>
              <Link
                to="/realisations"
                className="font-futura hover:underline"
                data-testid="footer-link-realisations"
              >
                Réalisations
              </Link>
              <Link
                to="/contact"
                className="font-futura hover:underline"
                data-testid="footer-link-contact"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-anton text-xl mb-4">CONTACT</h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:amaurydebarros1607@gmail.com"
                className="flex items-center gap-2 font-futura hover:underline"
                data-testid="footer-email"
              >
                <Mail className="w-5 h-5" />
                amaurydebarros1607@gmail.com
              </a>
              <a
                href="tel:+33665097008"
                className="flex items-center gap-2 font-futura hover:underline"
                data-testid="footer-phone"
              >
                <Phone className="w-5 h-5" />
                06 65 09 70 08
              </a>
              <a
                href="https://instagram.com/amau.psd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-futura hover:underline"
                data-testid="footer-instagram"
              >
                <Instagram className="w-5 h-5" />
                @amau.psd
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t-2 border-white/30 text-center">
          <p className="font-futura text-white/80">
            Assk Studio © 2024 — Laisse ta marque.
          </p>
        </div>
      </div>
    </footer>
  );
};
