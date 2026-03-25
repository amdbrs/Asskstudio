import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { ArrowRight, Palette, Box, Printer } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

const services2D = [
  {
    name: 'Pack Logo Signature',
    price: '350',
    description: 'Logo professionnel + déclinaisons'
  },
  {
    name: 'Identité Visuelle Complète',
    price: '750',
    description: 'Logo, charte graphique, supports'
  },
  {
    name: 'Papeterie & Édition',
    price: '150',
    description: 'Cartes de visite, flyers, brochures'
  },
  {
    name: 'Site Web Vitrine',
    price: '950',
    description: 'Design + développement responsive'
  }
];

const services3D = [
  {
    name: 'Modélisation 3D (ZBrush)',
    price: '200',
    description: 'Création de personnages et objets'
  },
  {
    name: 'Impression Résine 4K',
    price: '50',
    description: 'Prototypage haute définition'
  },
  {
    name: 'Pack Art Toy Custom',
    price: '390',
    description: 'Design + modélisation + impression'
  }
];

export default function HomePage() {
  useEffect(() => {
    // Seed data on first load
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/seed`, {
      method: 'POST'
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-[#0047FF] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-[#0047FF]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24">
          <div className="max-w-3xl">
            <h1
              className="font-anton text-6xl sm:text-7xl lg:text-[8rem] text-white leading-none uppercase"
              data-testid="hero-title"
            >
              LAISSE
              <br />
              TA MARQUE.
            </h1>
            <p className="font-futura text-white/80 text-lg sm:text-xl mt-8 max-w-xl">
              Studio créatif spécialisé en graphisme, modélisation 3D et création d'art toys sur mesure.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0047FF] font-anton text-xl uppercase border-2 border-white shadow-[6px_6px_0_0_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-transform duration-200"
                data-testid="hero-cta-button"
              >
                DÉMARRER
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-anton text-xl uppercase border-2 border-white hover:bg-white hover:text-[#0047FF] transition-colors duration-200"
                data-testid="hero-shop-button"
              >
                VOIR LE SHOP
              </Link>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-y-2 border-[#0047FF] py-3">
          <Marquee gradient={false} speed={50}>
            <span className="font-anton text-2xl text-[#0047FF] mx-8">
              GRAPHISME
            </span>
            <span className="text-[#0047FF] mx-4">•</span>
            <span className="font-anton text-2xl text-[#0047FF] mx-8">
              MODÉLISATION 3D
            </span>
            <span className="text-[#0047FF] mx-4">•</span>
            <span className="font-anton text-2xl text-[#0047FF] mx-8">
              ART TOYS
            </span>
            <span className="text-[#0047FF] mx-4">•</span>
            <span className="font-anton text-2xl text-[#0047FF] mx-8">
              IMPRESSION RÉSINE
            </span>
            <span className="text-[#0047FF] mx-4">•</span>
            <span className="font-anton text-2xl text-[#0047FF] mx-8">
              IDENTITÉ VISUELLE
            </span>
            <span className="text-[#0047FF] mx-4">•</span>
          </Marquee>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-12" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-anton text-5xl sm:text-6xl text-[#0047FF] mb-16">
            NOS SERVICES
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Pôle Graphisme */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 border-2 border-[#0047FF]">
                  <Palette className="w-6 h-6 text-[#0047FF]" />
                </div>
                <h3 className="font-anton text-3xl text-[#0047FF]">
                  PÔLE GRAPHISME
                </h3>
              </div>
              <div className="space-y-4">
                {services2D.map((service, index) => (
                  <div
                    key={index}
                    className="border-2 border-[#0047FF] p-6 bg-white service-card"
                    data-testid={`service-2d-${index}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-anton text-xl text-[#0047FF]">
                          {service.name}
                        </h4>
                        <p className="font-futura text-[#0047FF]/70 text-sm mt-1">
                          {service.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-anton text-3xl text-[#0047FF]">
                          {service.price} €
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pôle 3D & Toys */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 border-2 border-[#0047FF]">
                  <Box className="w-6 h-6 text-[#0047FF]" />
                </div>
                <h3 className="font-anton text-3xl text-[#0047FF]">
                  PÔLE 3D & TOYS
                </h3>
              </div>
              <div className="space-y-4">
                {services3D.map((service, index) => (
                  <div
                    key={index}
                    className="border-2 border-[#0047FF] p-6 bg-white service-card"
                    data-testid={`service-3d-${index}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-anton text-xl text-[#0047FF]">
                          {service.name}
                        </h4>
                        <p className="font-futura text-[#0047FF]/70 text-sm mt-1">
                          {service.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-anton text-3xl text-[#0047FF]">
                          {service.price} €
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0047FF] text-white font-anton text-xl uppercase border-2 border-[#0047FF] shadow-[6px_6px_0_0_#0047FF] hover:bg-white hover:text-[#0047FF] transition-colors duration-200"
              data-testid="services-cta"
            >
              DEMANDER UN DEVIS
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0047FF] py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            PRÊT À LAISSER TA MARQUE ?
          </h2>
          <p className="font-futura text-white/80 text-lg mb-8">
            Discutons de ton projet et créons ensemble quelque chose d'unique.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0047FF] font-anton text-xl uppercase border-2 border-white shadow-[6px_6px_0_0_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-transform duration-200"
            data-testid="cta-contact"
          >
            CONTACTEZ-NOUS
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
