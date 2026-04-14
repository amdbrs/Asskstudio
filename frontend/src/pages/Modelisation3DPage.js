import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ArrowRight, Box, Printer, Star, Layers, Palette, Sparkles, CheckCircle, Lightbulb, Rocket, Package } from 'lucide-react';

const services = [
  {
    icon: Box,
    title: 'Modélisation 3D',
    description: 'Création de modèles 3D sur ZBrush, Blender ou autre logiciel. Personnages, objets, produits... Donnez forme à vos idées.',
    features: ['Personnages et mascottes', 'Objets et accessoires', 'Prototypes produits', 'Fichiers STL pour impression']
  },
  {
    icon: Printer,
    title: 'Impression 3D Filament',
    description: 'Impression de vos créations en filament (PLA, PETG). Idéal pour porte-clés, totems, figurines et objets personnalisés.',
    features: ['Porte-clés personnalisés', 'Totems et figurines', 'Prototypes fonctionnels', 'Petites séries']
  },
  {
    icon: Star,
    title: 'Art Toys Custom',
    description: 'Création complète d\'Art Toys uniques : du design à la figurine finale. Pièces collector à votre image.',
    features: ['Design original', 'Modélisation détaillée', 'Impression haute qualité', 'Finitions personnalisées']
  },
  {
    icon: Package,
    title: 'Packaging & Présentoirs',
    description: 'Conception de packaging 3D et présentoirs pour mettre en valeur vos produits. Design et prototypage inclus.',
    features: ['Design packaging', 'Prototypage rapide', 'Maquettes réalistes', 'Fichiers production']
  }
];

const process = [
  { step: '01', title: 'Brief créatif', desc: 'On définit ensemble votre vision et les contraintes techniques.' },
  { step: '02', title: 'Concept & Design', desc: 'Esquisses et validation du design avant modélisation.' },
  { step: '03', title: 'Modélisation 3D', desc: 'Création du modèle détaillé sur ZBrush/Blender.' },
  { step: '04', title: 'Impression & Livraison', desc: 'Impression, finitions et expédition de vos pièces.' }
];

const gallery = [
  { title: 'Art Toy César', category: 'Figurine' },
  { title: 'Porte-clés personnalisé', category: 'Accessoire' },
  { title: 'Totem événementiel', category: 'Décoration' },
  { title: 'Mascotte entreprise', category: 'Figurine' }
];

export default function Modelisation3DPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="modelisation3d-page">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#0047FF]/5 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#0047FF]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0047FF]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0047FF]/10 text-[#0047FF] font-futura text-xs sm:text-sm mb-6">
              <Box className="w-4 h-4" />
              <span>Service 3D & Art Toys</span>
            </div>
            
            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#0047FF] leading-tight">
              Modélisation 3D<br />
              <span className="text-[#0047FF]/50">& impression filament</span>
            </h1>
            
            <p className="font-futura text-[#0047FF]/70 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed">
              De l'idée à l'objet réel. Je crée des modèles 3D sur-mesure et les imprime 
              en filament pour donner vie à vos projets les plus créatifs.
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
                Découvrir les services
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
              <p className="font-anton text-3xl sm:text-4xl text-white">10+</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">Art Toys créés</p>
            </div>
            <div>
              <p className="font-anton text-3xl sm:text-4xl text-white">∞</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">possibilités créatives</p>
            </div>
            <div>
              <p className="font-anton text-3xl sm:text-4xl text-white">PLA</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">filament éco-responsable</p>
            </div>
            <div>
              <p className="font-anton text-3xl sm:text-4xl text-white">100%</p>
              <p className="font-futura text-white/60 text-xs sm:text-sm mt-1">sur-mesure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Ce que je propose</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">Services 3D</h2>
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

      {/* Materials */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0047FF]/5">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Matériaux & Technologies</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">Comment ça marche</h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-300">
              <Layers className="w-12 h-12 text-[#0047FF] mb-6" />
              <h3 className="font-anton text-xl text-[#0047FF]">Modélisation</h3>
              <p className="font-futura text-[#0047FF]/60 text-sm mt-4 leading-relaxed">
                Création sur <strong>ZBrush</strong> pour les sculptures organiques et <strong>Blender</strong> pour les objets techniques. 
                Exports en STL optimisés pour l'impression.
              </p>
            </div>
            <div className="p-8 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-300">
              <Printer className="w-12 h-12 text-[#0047FF] mb-6" />
              <h3 className="font-anton text-xl text-[#0047FF]">Impression FDM</h3>
              <p className="font-futura text-[#0047FF]/60 text-sm mt-4 leading-relaxed">
                Impression en <strong>filament PLA</strong> (biodégradable) ou PETG pour plus de résistance. 
                Idéal pour les pièces de taille moyenne à grande.
              </p>
            </div>
            <div className="p-8 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-300">
              <Palette className="w-12 h-12 text-[#0047FF] mb-6" />
              <h3 className="font-anton text-xl text-[#0047FF]">Finitions</h3>
              <p className="font-futura text-[#0047FF]/60 text-sm mt-4 leading-relaxed">
                Ponçage, apprêt et peinture disponibles sur demande. 
                Possibilité de couleurs personnalisées directement au filament.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">De l'idée à l'objet</p>
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

      {/* Use Cases */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0047FF]/5">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">Idées d'utilisation</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">Pour qui ? Pour quoi ?</h2>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-[#0047FF]/10 group-hover:bg-[#0047FF] rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                <Sparkles className="w-8 h-8 text-[#0047FF] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-anton text-lg text-[#0047FF]">Collectionneurs</h3>
              <p className="font-futura text-[#0047FF]/60 text-sm mt-2">Art Toys et figurines collector uniques</p>
            </div>
            <div className="p-6 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-[#0047FF]/10 group-hover:bg-[#0047FF] rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                <Lightbulb className="w-8 h-8 text-[#0047FF] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-anton text-lg text-[#0047FF]">Entrepreneurs</h3>
              <p className="font-futura text-[#0047FF]/60 text-sm mt-2">Prototypes produits et maquettes</p>
            </div>
            <div className="p-6 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-[#0047FF]/10 group-hover:bg-[#0047FF] rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                <Rocket className="w-8 h-8 text-[#0047FF] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-anton text-lg text-[#0047FF]">Événementiel</h3>
              <p className="font-futura text-[#0047FF]/60 text-sm mt-2">Totems, goodies et déco personnalisée</p>
            </div>
            <div className="p-6 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-[#0047FF]/10 group-hover:bg-[#0047FF] rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                <Star className="w-8 h-8 text-[#0047FF] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-anton text-lg text-[#0047FF]">Particuliers</h3>
              <p className="font-futura text-[#0047FF]/60 text-sm mt-2">Cadeaux personnalisés et créations uniques</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#0047FF] p-8 sm:p-12 text-center">
            <Box className="w-12 h-12 text-white/50 mx-auto mb-6" />
            <p className="font-anton text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
              "Tes idées méritent de prendre forme. Littéralement."
            </p>
            <p className="font-futura text-white/60 text-sm mt-6">— ASSK Studio</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0047FF]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-white">
            Une idée à concrétiser ?
          </h2>
          <p className="font-futura text-white/70 text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Décrivez-moi votre projet et recevez un devis personnalisé sous 48h.
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
