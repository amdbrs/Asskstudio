import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { SEO } from '@/components/SEO';
import { ArrowRight, Mail, Phone, Instagram, Linkedin, ExternalLink, Palette, Globe, Box, Video, Camera, Sparkles } from 'lucide-react';

const AVATAR_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/tba01jo4_IMG_0173.jpeg';

const skills = [
  { name: 'Illustrator', category: 'Design' },
  { name: 'Photoshop', category: 'Design' },
  { name: 'InDesign', category: 'Design' },
  { name: 'Figma', category: 'Design' },
  { name: 'Premiere Pro', category: 'Vidéo' },
  { name: 'After Effects', category: 'Vidéo' },
  { name: 'Blender', category: '3D' },
  { name: 'WordPress', category: 'Web' },
  { name: 'Outils IA', category: 'Tech' }
];

const services = [
  { icon: Palette, title: 'Design Graphique', desc: 'Logos, identités visuelles, supports print & digital' },
  { icon: Globe, title: 'Sites Web', desc: 'Sites vitrine, e-commerce, landing pages' },
  { icon: Box, title: '3D & Art Toys', desc: 'Modélisation, impression 3D, figurines' },
  { icon: Video, title: 'Motion Design', desc: 'Animations de logos et textes' },
  { icon: Camera, title: 'Photographie', desc: 'Shooting produits et portraits' },
  { icon: Sparkles, title: 'IA Créative', desc: 'Génération d\'images et prompts créatifs' }
];

const experiences = [
  { 
    period: '2023 - Présent', 
    title: 'Freelance', 
    company: 'ASSK Studio',
    desc: 'Création d\'identités visuelles, sites web, supports print & digital, signalétique, animation de logos'
  },
  { 
    period: '2024', 
    title: 'Designer Graphique', 
    company: 'Agence de Graphisme & Imprimerie',
    desc: 'Création de visuels pour print et digital, préparation de fichiers pour impression'
  },
  { 
    period: '2023 - 2024', 
    title: 'Designer Graphique / Marketing', 
    company: 'GSM55 (Alternance)',
    desc: 'Créations graphiques, mise à jour du site web, campagnes publicitaires, UX/UI Design'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="about-page">
      <SEO page="aPropos" />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#0047FF]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Avatar */}
            <div className="flex justify-center lg:justify-start order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#0047FF]/10 rounded-full blur-2xl" />
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-white border-4 border-[#0047FF] rounded-full overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,71,255,0.3)]">
                  <img 
                    src={AVATAR_URL} 
                    alt="Amaury De Barros"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-4">À Propos</p>
              <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-[#0047FF] leading-tight">
                Studio créé par<br />
                <span className="text-[#0047FF]/70">Amaury De Barros</span>
              </h1>
              <p className="font-futura text-[#0047FF]/70 text-base sm:text-lg mt-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Designer graphique multidisciplinaire passionné par la création visuelle. 
                ASSK Studio est né de l'envie d'accompagner les entreprises et particuliers 
                dans la création de leur identité visuelle, en alliant <strong>créativité</strong>, 
                <strong> rigueur</strong> et <strong>proximité</strong>.
              </p>
              <p className="font-futura text-[#0047FF]/60 text-sm sm:text-base mt-4 max-w-xl mx-auto lg:mx-0">
                Basé en Auvergne (Clermont-Ferrand, Vichy, Moulins), je travaille avec des clients 
                dans toute la France pour donner vie à leurs projets créatifs.
              </p>

              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-[#0047FF] text-white font-anton text-base uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(0,71,255,0.4)]"
                >
                  Me contacter
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://www.amdbrs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-6 py-3 border-2 border-[#0047FF] text-[#0047FF] font-anton text-base uppercase transition-all duration-300 hover:bg-[#0047FF] hover:text-white"
                >
                  Portfolio complet
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0047FF]">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-white/60 text-xs sm:text-sm uppercase tracking-widest mb-3">Ce que je fais</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-white">Mes Compétences</h2>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="group p-6 sm:p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:border-white transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-white/20 group-hover:bg-[#0047FF] flex items-center justify-center mb-4 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-anton text-xl text-white group-hover:text-[#0047FF] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-futura text-white/70 group-hover:text-[#0047FF]/70 text-sm mt-2 transition-colors duration-300">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-widest mb-3">Outils</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">Mes Logiciels</h2>
          </header>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="px-5 sm:px-6 py-3 bg-[#0047FF]/5 border border-[#0047FF]/10 hover:border-[#0047FF] hover:bg-[#0047FF] hover:text-white text-[#0047FF] font-futura text-sm sm:text-base transition-all duration-300 cursor-default"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0047FF]/5">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-widest mb-3">Parcours</p>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">Expériences</h2>
          </header>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="group p-6 sm:p-8 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] hover:shadow-[0_20px_60px_-15px_rgba(0,71,255,0.15)] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-anton text-xl text-[#0047FF]">{exp.title}</h3>
                    <p className="font-futura text-[#0047FF]/70 text-sm">{exp.company}</p>
                  </div>
                  <span className="font-futura text-[#0047FF]/50 text-sm">{exp.period}</span>
                </div>
                <p className="font-futura text-[#0047FF]/60 text-sm">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0047FF]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl text-white">
            Travaillons ensemble !
          </h2>
          <p className="font-futura text-white/70 text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Un projet en tête ? Discutons-en autour d'un café (virtuel ou non).
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <a href="mailto:amaurydebarros1607@gmail.com" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
              <Mail className="w-5 h-5" />
              <span className="font-futura">amaurydebarros1607@gmail.com</span>
            </a>
            <a href="tel:+33665097008" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
              <Phone className="w-5 h-5" />
              <span className="font-futura">06 65 09 70 08</span>
            </a>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <a 
              href="https://instagram.com/amau.psd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white hover:text-[#0047FF] text-white transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.amdbrs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white hover:text-[#0047FF] text-white transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
