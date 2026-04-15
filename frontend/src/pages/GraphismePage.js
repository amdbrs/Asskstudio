import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { ArrowRight, PenTool, Layers, FileText, Palette, Eye, Target, Sparkles, CheckCircle, Zap } from 'lucide-react';

const services = [
  {
    icon: PenTool,
    title: 'Création de Logo',
    description: 'Un logo unique qui incarne l\'essence de votre marque. Recherches, esquisses, et déclinaisons pour tous vos supports.',
    features: ['3 propositions créatives', 'Révisions illimitées', 'Fichiers sources (AI, EPS, PNG, SVG)', 'Charte d\'utilisation']
  },
  {
    icon: Layers,
    title: 'Identité Visuelle',
    description: 'Une identité cohérente et mémorable. Du logo aux supports de communication, créez une image de marque forte.',
    features: ['Logo + déclinaisons', 'Palette de couleurs', 'Typographies', 'Charte graphique complète']
  },
  {
    icon: FileText,
    title: 'Supports Print',
    description: 'Cartes de visite, flyers, brochures, affiches... Des supports imprimés qui font la différence.',
    features: ['Design sur-mesure', 'Préparation pour impression', 'Suivi avec l\'imprimeur', 'Formats optimisés']
  },
  {
    icon: Palette,
    title: 'Design Digital',
    description: 'Visuels pour réseaux sociaux, bannières web, newsletters. Une présence digitale cohérente.',
    features: ['Templates réseaux sociaux', 'Bannières publicitaires', 'Visuels email marketing', 'Kits de communication']
  }
];

const process = [
  { step: '01', title: 'Brief', desc: 'On échange sur votre projet, vos valeurs et vos objectifs.' },
  { step: '02', title: 'Recherche', desc: 'Analyse de votre secteur, benchmarks et pistes créatives.' },
  { step: '03', title: 'Création', desc: 'Développement des concepts et présentation des propositions.' },
  { step: '04', title: 'Finalisation', desc: 'Ajustements et livraison de tous les fichiers.' }
];

export default function GraphismePage() {
  return (
    <div className="min-h-screen bg-white" data-testid="graphisme-page">
      <SEO page="graphisme" />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#0047FF]/5 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#0047FF]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0047FF]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0047FF]/10 text-[#0047FF] font-futura text-xs sm:text-sm mb-6">
              <PenTool className="w-4 h-4" />
              <span>Service Graphisme</span>
            </div>
            
            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#0047FF] leading-tight">
              Design graphique<br />
              <span className="text-[#0047FF]/50">qui marque les esprits</span>
            </h1>
            
            <p className="font-futura text-[#0047FF]/70 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed">
              De l'identité visuelle aux supports de communication, je crée des designs 
              uniques et percutants qui reflètent l'essence de votre marque.
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
                Voir les services
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
              <p className="font-anton text-3xl sm:text-4xl text-white">75%</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">jugent sur l'identité visuelle</p>
            </div>
            <div>
              <p className="font-anton text-3xl sm:text-4xl text-white">72%</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">jugent sur les supports print</p>
            </div>
            <div>
              <p className="font-anton text-3xl sm:text-4xl text-white">50+</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">projets réalisés</p>
            </div>
            <div>
              <p className="font-anton text-3xl sm:text-4xl text-white">100%</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">clients satisfaits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Ce que je propose</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">Services Graphisme</h2>
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

      {/* Process */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0047FF]/5">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Comment ça marche</p>
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

      {/* Why Choose Me */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Pourquoi me choisir</p>
              <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">
                Un design qui vous ressemble
              </h2>
              <p className="font-futura text-[#0047FF]/70 text-base sm:text-lg mt-6 leading-relaxed">
                Je ne crée pas juste des visuels, je raconte votre histoire. Chaque projet est unique, 
                pensé pour refléter vos valeurs et toucher votre audience.
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#0047FF] flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-anton text-lg text-[#0047FF]">Vision créative</h4>
                    <p className="font-futura text-[#0047FF]/60 text-sm">Des designs originaux qui sortent du lot</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#0047FF] flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-anton text-lg text-[#0047FF]">Approche stratégique</h4>
                    <p className="font-futura text-[#0047FF]/60 text-sm">Chaque création a un objectif précis</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#0047FF] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-anton text-lg text-[#0047FF]">Réactivité</h4>
                    <p className="font-futura text-[#0047FF]/60 text-sm">Des délais respectés et une communication fluide</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[#0047FF]/5 blur-2xl" />
              <div className="relative bg-[#0047FF] p-8 sm:p-12">
                <Sparkles className="w-12 h-12 text-white/50 mb-6" />
                <p className="font-anton text-2xl sm:text-3xl text-white leading-tight">
                  "Le design est la première chose que les gens voient. Faites en sorte qu'il soit mémorable."
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
            Prêt à créer votre identité ?
          </h2>
          <p className="font-futura text-white/70 text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Discutons de votre projet et donnons vie à votre vision.
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
    </div>
  );
}
