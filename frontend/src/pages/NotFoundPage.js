import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col" data-testid="not-found-page">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-20">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <h1 className="font-anton text-[120px] sm:text-[180px] lg:text-[220px] text-[#0047FF]/10 leading-none select-none">
            404
          </h1>
          
          {/* Message */}
          <div className="-mt-12 sm:-mt-16 relative z-10">
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">
              Page introuvable
            </h2>
            <p className="font-futura text-[#0047FF]/70 text-base sm:text-lg mt-4 max-w-md mx-auto">
              Oups ! Cette page n'existe pas ou a été déplacée. 
              Pas de panique, on te ramène à la maison.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              to="/"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0047FF] text-white font-anton text-lg uppercase transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(0,71,255,0.4)] hover:-translate-y-1"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </Link>
            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#0047FF] text-[#0047FF] font-anton text-lg uppercase transition-all duration-300 hover:bg-[#0047FF] hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              Page précédente
            </button>
          </div>
          
          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-[#0047FF]/10">
            <p className="font-futura text-[#0047FF]/50 text-sm mb-4">Liens utiles</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/graphisme" className="font-futura text-[#0047FF] hover:underline">Graphisme</Link>
              <Link to="/sites-web" className="font-futura text-[#0047FF] hover:underline">Sites Web</Link>
              <Link to="/modelisation-3d" className="font-futura text-[#0047FF] hover:underline">3D & Toys</Link>
              <Link to="/contact" className="font-futura text-[#0047FF] hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
