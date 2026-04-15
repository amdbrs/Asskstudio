import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { SEO } from '@/components/SEO';
import { ArrowRight, Globe, Layout, Code, Smartphone, Search, Zap, Shield, Clock, CheckCircle, Sparkles, BarChart } from 'lucide-react';

const services = [
  {
    icon: Layout,
    title: 'Site Vitrine',
    description: 'Une présence en ligne professionnelle pour présenter votre activité. Design moderne, responsive et optimisé SEO.',
    features: ['Design sur-mesure', 'Responsive (mobile, tablette, PC)', 'Optimisation SEO', 'Formulaire de contact']
  },
  {
    icon: Globe,
    title: 'Site Multi-pages',
    description: 'Un site complet pour présenter tous vos services, votre équipe et vos réalisations. Structure optimisée pour la conversion.',
    features: ['5 à 10 pages', 'Blog intégré', 'Google Analytics', 'Maintenance incluse']
  },
  {
    icon: Code,
    title: 'Site E-commerce',
    description: 'Vendez vos produits en ligne avec une boutique performante et sécurisée. Gestion simple de votre catalogue.',
    features: ['Paiement sécurisé', 'Gestion des stocks', 'Tableau de bord', 'Livraison configurée']
  },
  {
    icon: Smartphone,
    title: 'Landing Page',
    description: 'Une page unique et percutante pour convertir vos visiteurs. Idéal pour une campagne ou un produit spécifique.',
    features: ['Design conversion-optimisé', 'Animations fluides', 'Chargement rapide', 'A/B testing ready']
  }
];

const process = [
  { step: '01', title: 'Analyse', desc: 'Étude de vos besoins, votre cible et vos objectifs.' },
  { step: '02', title: 'Maquette', desc: 'Création des wireframes et du design sur Figma.' },
  { step: '03', title: 'Développement', desc: 'Intégration et développement de votre site.' },
  { step: '04', title: 'Lancement', desc: 'Mise en ligne et formation à la gestion.' }
];

const technologies = [
  'React', 'WordPress', 'Shopify', 'Figma', 'Tailwind CSS', 'SEO'
];

export default function SiteWebPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="siteweb-page">
      <SEO page="sitesWeb" />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#0047FF]/5 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#0047FF]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0047FF]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0047FF]/10 text-[#0047FF] font-futura text-xs sm:text-sm mb-6">
              <Globe className="w-4 h-4" />
              <span>Service Sites Web</span>
            </div>
            
            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#0047FF] leading-tight">
              Sites web<br />
              <span className="text-[#0047FF]/50">qui convertissent</span>
            </h1>
            
            <p className="font-futura text-[#0047FF]/70 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed">
              Des sites modernes, rapides et optimisés pour transformer vos visiteurs en clients. 
              Du simple site vitrine à la boutique e-commerce complète.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#0047FF] text-white font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(0,71,255,0.4)]"
              >
                Demander un devis
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#0047FF] text-[#0047FF] font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:bg-[#0047FF] hover:text-white"
              >
                Découvrir les offres
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 bg-[#0047FF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <p className="font-anton text-3xl sm:text-4xl text-white">94%</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">premières impressions = design</p>
            </div>
            <div>
              <p className="font-anton text-3xl sm:text-4xl text-white">x2.6</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">engagement avec bon design</p>
            </div>
            <div>
              <p className="font-anton text-3xl sm:text-4xl text-white">3s</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">pour convaincre un visiteur</p>
            </div>
            <div>
              <p className="font-anton text-3xl sm:text-4xl text-white">100%</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">responsive mobile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Mes offres</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">Types de sites</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="group p-6 sm:p-8 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] hover:shadow-[0_30px_60px_-15px_rgba(0,71,255,0.15)] transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#0047FF]/10 group-hover:bg-[#0047FF] flex items-center justify-center transition-all duration-300">
                      <IconComponent className="w-7 h-7 text-[#0047FF] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-anton text-xl sm:text-2xl text-[#0047FF]">{service.title}</h3>
                    </div>
                  </div>
                  
                  <p className="font-futura text-[#0047FF]/70 text-sm sm:text-base leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 font-futura text-[#0047FF]/60 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#0047FF]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0047FF]/5">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Inclus dans chaque site</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">Ce que vous obtenez</h2>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-300 text-center">
              <Search className="w-10 h-10 text-[#0047FF] mx-auto mb-4" />
              <h3 className="font-anton text-lg text-[#0047FF]">SEO Optimisé</h3>
              <p className="font-futura text-[#0047FF]/60 text-sm mt-2">Pour être trouvé sur Google</p>
            </div>
            <div className="p-6 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-300 text-center">
              <Zap className="w-10 h-10 text-[#0047FF] mx-auto mb-4" />
              <h3 className="font-anton text-lg text-[#0047FF]">Performance</h3>
              <p className="font-futura text-[#0047FF]/60 text-sm mt-2">Chargement ultra-rapide</p>
            </div>
            <div className="p-6 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-300 text-center">
              <Shield className="w-10 h-10 text-[#0047FF] mx-auto mb-4" />
              <h3 className="font-anton text-lg text-[#0047FF]">Sécurité</h3>
              <p className="font-futura text-[#0047FF]/60 text-sm mt-2">HTTPS et protection</p>
            </div>
            <div className="p-6 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-300 text-center">
              <Clock className="w-10 h-10 text-[#0047FF] mx-auto mb-4" />
              <h3 className="font-anton text-lg text-[#0047FF]">Support</h3>
              <p className="font-futura text-[#0047FF]/60 text-sm mt-2">Accompagnement continu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">De l'idée au site</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">Mon processus</h2>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div key={index} className="relative group">
                <div className="p-6 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-300">
                  <span className="font-anton text-5xl text-[#0047FF]/10 group-hover:text-[#0047FF]/20 transition-colors">{step.step}</span>
                  <h3 className="font-anton text-xl text-[#0047FF] mt-2">{step.title}</h3>
                  <p className="font-futura text-[#0047FF]/60 text-sm mt-2">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0047FF]/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-6">Technologies utilisées</p>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-6 py-3 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] font-futura text-[#0047FF] text-sm sm:text-base transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio teaser */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Réalisation récente</p>
              <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">
                Sellerie Garcia
              </h2>
              <p className="font-futura text-[#0047FF]/70 text-base sm:text-lg mt-6 leading-relaxed">
                Site vitrine réalisé pour un artisan sellier garnisseur. Design élégant mettant en valeur 
                le savoir-faire et les réalisations de l'atelier.
              </p>
              <a
                href="https://selleriegarcia.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 mt-6 font-anton text-[#0047FF] uppercase hover:gap-5 transition-all"
              >
                Voir le site
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[#0047FF]/5 blur-2xl" />
              <div className="relative bg-[#0047FF] p-8 sm:p-12">
                <BarChart className="w-12 h-12 text-white/50 mb-6" />
                <p className="font-anton text-2xl sm:text-3xl text-white leading-tight">
                  "Un site web, c'est votre vitrine 24h/24. Faites-en un argument de vente."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0047FF]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-white">
            Prêt à lancer votre site ?
          </h2>
          <p className="font-futura text-white/70 text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Discutons de votre projet et trouvons la solution adaptée à vos besoins.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 mt-8 px-8 sm:px-10 py-4 sm:py-5 bg-white text-[#0047FF] font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
          >
            Demander un devis gratuit
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
