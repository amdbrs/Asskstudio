import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { ArrowRight } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="portfolio-page">
      <SEO 
        title="Réalisations | ASSK Studio"
        description="Portfolio ASSK Studio - Graphisme, Sites Web et Modélisation 3D en Auvergne."
      />
      
      <Header />

      {/* Page vide avec redirection vers contact */}
      <section className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF] mb-6">
            Portfolio en construction
          </h1>
          <p className="font-futura text-[#0047FF]/70 text-base sm:text-lg mb-8">
            Cette section sera bientôt disponible. En attendant, découvrez nos services ou contactez-nous pour discuter de votre projet.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#0047FF] text-white font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(0,71,255,0.4)]"
            >
              Nous contacter
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#0047FF] text-[#0047FF] font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:bg-[#0047FF] hover:text-white"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
