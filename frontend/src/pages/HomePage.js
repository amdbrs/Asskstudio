import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { ArrowRight, Palette, Box, Mail, Phone, Instagram, Send, ExternalLink, PenTool, Layers, FileText, Printer, Star, Check, Sparkles, Globe, Layout, Code, Heart, ChevronDown, HelpCircle, MapPin, MessageSquare, Lightbulb, Pencil, Rocket } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { toast } from 'sonner';
import { useScrollAnimation, AnimatedSection } from '@/hooks/useScrollAnimation';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

const servicesGraphisme = [
  { name: 'Pack Logo Signature', description: 'Logo professionnel + déclinaisons', icon: PenTool },
  { name: 'Identité Visuelle Complète', description: 'Logo, charte graphique, supports', icon: Layers },
  { name: 'Papeterie & Édition', description: 'Cartes de visite, flyers, brochures', icon: FileText }
];

const servicesWeb = [
  { name: 'Site Vitrine', description: 'Landing page ou site one-page responsive', icon: Layout },
  { name: 'Site Web Multi-pages', description: 'Site complet avec SEO optimisé', icon: Globe },
  { name: 'E-commerce', description: 'Boutique en ligne avec paiement sécurisé', icon: Code }
];

const services3D = [
  { name: 'Modélisation 3D', description: 'Création de personnages et objets sur ZBrush', icon: Box },
  { name: 'Impression 3D Filament', description: 'Porte-clés, totems, objets sur demande', icon: Printer },
  { name: 'Pack Art Toy Custom', description: 'Design + modélisation + impression', icon: Star }
];

const testimonials = [
  { name: 'Liberty Van', quote: "Un logo et une identité qui nous ressemblent parfaitement." },
  { name: 'Sellerie Garcia', quote: "Notre site web nous apporte des clients chaque semaine." },
  { name: 'Club Football Laforest', quote: "Des maillots et un branding dont on est fiers." },
  { name: 'Kates Agency', quote: "Professionnalisme et créativité au rendez-vous." }
];

const whyUs = [
  { title: 'Design Sur-Mesure', desc: 'Chaque projet est unique, créé pour votre marque' },
  { title: 'On Travaille en Famille', desc: 'Relation de confiance et proximité avec nos clients' },
  { title: 'Support Continu', desc: 'Accompagnement même après livraison' },
  { title: 'Qualité Premium', desc: 'Finitions soignées, résultats pro' }
];

const processSteps = [
  { 
    step: '01', 
    title: 'Brief & Échange', 
    desc: 'On discute de ton projet, tes objectifs et ta vision. Un café virtuel pour bien comprendre tes besoins.',
    icon: MessageSquare
  },
  { 
    step: '02', 
    title: 'Création & Recherche', 
    desc: 'On explore les pistes créatives, on teste des directions et on te présente les premières idées.',
    icon: Lightbulb
  },
  { 
    step: '03', 
    title: 'Révisions & Ajustements', 
    desc: 'On affine ensemble jusqu\'à ce que le résultat corresponde parfaitement à tes attentes.',
    icon: Pencil
  },
  { 
    step: '04', 
    title: 'Livraison & Support', 
    desc: 'Tu reçois tous les fichiers sources et on reste dispo pour t\'accompagner après livraison.',
    icon: Rocket
  }
];

const trustedClients = [
  { name: 'Liberty Van', logo: null },
  { name: 'Sellerie Garcia', logo: null },
  { name: 'Club Football Laforest', logo: null },
  { name: 'Kates Agency', logo: null },
  { name: 'IRIS', logo: null },
  { name: 'César Events', logo: null }
];

// Animated counter hook
const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration, start]);

  return { count, ref };
};

// Service Card Component
const ServiceCard = ({ service, index }) => {
  const IconComponent = service.icon;
  return (
    <article 
      className="group p-4 sm:p-6 border border-[#0047FF]/20 bg-white hover:border-[#0047FF] hover:shadow-[0_20px_50px_-15px_rgba(0,71,255,0.25)] transition-all duration-500 cursor-pointer hover:-translate-y-2" 
      data-testid={`service-${index}`}
      itemScope 
      itemType="https://schema.org/Service"
    >
      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#0047FF]/20 flex items-center justify-center group-hover:bg-[#0047FF] group-hover:border-[#0047FF] transition-all duration-500 flex-shrink-0 group-hover:scale-110">
          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047FF] group-hover:text-white transition-colors duration-300" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-anton text-base sm:text-lg text-[#0047FF] group-hover:text-[#0047FF]" itemProp="name">{service.name}</h4>
          <p className="font-futura text-[#0047FF]/60 text-xs sm:text-sm" itemProp="description">{service.description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-[#0047FF]/30 group-hover:text-[#0047FF] group-hover:translate-x-2 transition-all duration-500 flex-shrink-0" />
      </div>
    </article>
  );
};

export default function HomePage() {
  const [portfolio, setPortfolio] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  const stats1 = useCountUp(50, 2000);
  const stats2 = useCountUp(98, 2000);
  const stats3 = useCountUp(10, 2000);

  useEffect(() => {
    fetch(`${API}/seed`, { method: 'POST' }).catch(() => {});
    fetch(`${API}/portfolio`).then(r => r.json()).then(setPortfolio).catch(() => {});
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (response.ok) {
        toast.success('Message envoyé avec succès !');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      toast.error('Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" data-testid="home-page">
      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[100svh] bg-white flex items-center overflow-hidden pt-16" aria-label="Présentation ASSK Studio">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#0047FF]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#0047FF]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] border border-[#0047FF]/10 rounded-full hidden sm:block animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] border border-[#0047FF]/5 rounded-full hidden sm:block animate-[spin_45s_linear_infinite_reverse]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#0047FF]/10 text-[#0047FF] font-futura text-xs sm:text-sm mb-4 sm:mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" aria-hidden="true" />
                <span>Studio Créatif Graphisme & 3D</span>
              </div>
              
              <h1 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#0047FF] leading-[0.95] uppercase tracking-tight animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }} data-testid="hero-title">
                On crée.<br />
                <span className="text-[#0047FF]/30">Tu marques.</span>
              </h1>
              
              <p className="font-futura text-[#0047FF]/70 text-base sm:text-lg lg:text-xl mt-6 sm:mt-8 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                Studio créatif spécialisé en identité visuelle, sites web, modélisation 3D et création d'art toys uniques.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 justify-center lg:justify-start animate-fadeInUp" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                <a href="#contact" className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#0047FF] text-white font-anton text-base sm:text-lg uppercase transition-all duration-500 hover:gap-5 hover:shadow-[0_25px_50px_-12px_rgba(0,71,255,0.5)] hover:-translate-y-1 active:scale-95" data-testid="hero-cta-button" aria-label="Démarrer un projet avec ASSK Studio">
                  Démarrer un projet
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
                <a href="#realisations" className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-[#0047FF] font-anton text-base sm:text-lg uppercase border-2 border-[#0047FF] transition-all duration-500 hover:bg-[#0047FF] hover:text-white hover:-translate-y-1 active:scale-95" aria-label="Voir nos réalisations">
                  Nos réalisations
                </a>
              </div>

              {/* Stats removed - new stats section below */}
            </div>

            {/* Hero Image/Logo */}
            <div className="relative hidden lg:flex items-center justify-center animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'both' }} aria-hidden="true">
              <div className="relative w-[300px] xl:w-[400px] h-[300px] xl:h-[400px] animate-float">
                <div className="absolute inset-0 bg-[#0047FF] rounded-full opacity-10 animate-ping-slow" />
                <img 
                  src={LOGO_URL} 
                  alt="Logo ASSK Studio - Personnage bleu avec coeur, mascotte du studio créatif" 
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105" 
                  width="400"
                  height="400"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex flex-col items-center gap-2 animate-bounce" style={{ animationDuration: '2s' }} aria-hidden="true">
          <span className="font-futura text-[#0047FF]/50 text-[10px] sm:text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-[#0047FF] to-transparent" />
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#0047FF] py-3 sm:py-4 overflow-hidden" aria-hidden="true">
        <Marquee gradient={false} speed={60}>
          {['GRAPHISME', 'SITES WEB', 'MODÉLISATION 3D', 'ART TOYS', 'IMPRESSION 3D', 'IDENTITÉ VISUELLE', 'E-COMMERCE', 'BRANDING'].map((item, i) => (
            <span key={i} className="font-anton text-lg sm:text-2xl text-white mx-6 sm:mx-12 opacity-80">{item}</span>
          ))}
        </Marquee>
      </div>

      {/* ===== STATS BANNER - COMPACT ===== */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-12 bg-[#0047FF]/10" id="stats-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 items-center">
            {/* Stat 1 */}
            <div className="text-center">
              <p className="font-anton text-2xl sm:text-3xl text-[#0047FF] leading-none">75%</p>
              <p className="font-futura text-[#0047FF]/70 text-[10px] sm:text-xs mt-1 leading-tight">
                jugent sur l'identité visuelle
              </p>
            </div>
            
            {/* Stat 2 */}
            <div className="text-center">
              <p className="font-anton text-2xl sm:text-3xl text-[#0047FF] leading-none">x2.6</p>
              <p className="font-futura text-[#0047FF]/70 text-[10px] sm:text-xs mt-1 leading-tight">
                plus d'engagement
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <p className="font-anton text-2xl sm:text-3xl text-[#0047FF] leading-none">72%</p>
              <p className="font-futura text-[#0047FF]/70 text-[10px] sm:text-xs mt-1 leading-tight">
                jugent sur les supports print
              </p>
            </div>

            {/* Stat 4 */}
            <div className="text-center">
              <p className="font-anton text-2xl sm:text-3xl text-[#0047FF] leading-none">94%</p>
              <p className="font-futura text-[#0047FF]/70 text-[10px] sm:text-xs mt-1 leading-tight">
                premières impressions = design
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white" data-testid="services-section" aria-labelledby="services-title">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12 sm:mb-16 lg:mb-20">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">Nos Services</p>
            <h2 id="services-title" className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#0047FF]">
              Tout ce qu'il te faut.<br />
              <span className="text-[#0047FF]/30">Rien de superflu.</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Pôle Graphisme */}
            <AnimatedSection animation="fadeInUp" delay={0}>
              <div className="space-y-3 sm:space-y-4">
                <Link to="/graphisme" className="flex items-center gap-3 mb-4 sm:mb-6 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0047FF] group-hover:bg-[#0047FF]/80 flex items-center justify-center transition-all duration-500 group-hover:scale-110" aria-hidden="true">
                    <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-anton text-xl sm:text-2xl text-[#0047FF] group-hover:text-[#0047FF]/80 transition-colors">GRAPHISME</h3>
                  <ArrowRight className="w-5 h-5 text-[#0047FF] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                </Link>
                {servicesGraphisme.map((service, index) => (
                  <ServiceCard key={index} service={service} index={`graphisme-${index}`} />
                ))}
                <Link to="/graphisme" className="inline-flex items-center gap-2 font-futura text-sm text-[#0047FF] hover:gap-4 transition-all duration-500 mt-2 group">
                  En savoir plus <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Pôle Web */}
            <AnimatedSection animation="fadeInUp" delay={150}>
              <div className="space-y-3 sm:space-y-4">
                <Link to="/sites-web" className="flex items-center gap-3 mb-4 sm:mb-6 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0047FF] group-hover:bg-[#0047FF]/80 flex items-center justify-center transition-all duration-500 group-hover:scale-110" aria-hidden="true">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-anton text-xl sm:text-2xl text-[#0047FF] group-hover:text-[#0047FF]/80 transition-colors">SITES WEB</h3>
                  <ArrowRight className="w-5 h-5 text-[#0047FF] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                </Link>
                {servicesWeb.map((service, index) => (
                  <ServiceCard key={index} service={service} index={`web-${index}`} />
                ))}
                <Link to="/sites-web" className="inline-flex items-center gap-2 font-futura text-sm text-[#0047FF] hover:gap-4 transition-all duration-500 mt-2 group">
                  En savoir plus <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Pôle 3D & Toys */}
            <AnimatedSection animation="fadeInUp" delay={300}>
              <div className="space-y-3 sm:space-y-4">
                <Link to="/modelisation-3d" className="flex items-center gap-3 mb-4 sm:mb-6 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0047FF] group-hover:bg-[#0047FF]/80 flex items-center justify-center transition-all duration-500 group-hover:scale-110" aria-hidden="true">
                    <Box className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-anton text-xl sm:text-2xl text-[#0047FF] group-hover:text-[#0047FF]/80 transition-colors">3D & TOYS</h3>
                  <ArrowRight className="w-5 h-5 text-[#0047FF] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                </Link>
                {services3D.map((service, index) => (
                  <ServiceCard key={index} service={service} index={`3d-${index}`} />
                ))}
                <Link to="/modelisation-3d" className="inline-flex items-center gap-2 font-futura text-sm text-[#0047FF] hover:gap-4 transition-all duration-500 mt-2 group">
                  En savoir plus <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* CTA */}
          <AnimatedSection animation="fadeInUp" delay={450} className="mt-12 sm:mt-16 text-center">
            <a href="#contact" className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#0047FF] text-white font-anton text-base sm:text-lg uppercase transition-all duration-500 hover:gap-5 hover:shadow-[0_25px_50px_-12px_rgba(0,71,255,0.5)] hover:-translate-y-1 active:scale-95" aria-label="Demander un devis personnalisé">
              Demander un devis
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHY US SECTION ===== */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#0047FF]" aria-labelledby="why-us-title">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12 sm:mb-16 lg:mb-20">
            <p className="font-futura text-white/60 text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">Pourquoi Nous ?</p>
            <h2 id="why-us-title" className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white">
              Ce qui nous différencie
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyUs.map((item, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                <article className="group p-6 sm:p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:border-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.25)]">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 group-hover:bg-[#0047FF] flex items-center justify-center mb-4 sm:mb-6 transition-all duration-500 group-hover:scale-110" aria-hidden="true">
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-anton text-lg sm:text-xl text-white group-hover:text-[#0047FF] transition-colors duration-500">{item.title}</h3>
                  <p className="font-futura text-white/70 group-hover:text-[#0047FF]/70 text-xs sm:text-sm mt-2 transition-colors duration-500">{item.desc}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section id="process" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white relative overflow-hidden" aria-labelledby="process-title">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#0047FF]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#0047FF]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <header className="text-center mb-12 sm:mb-16 lg:mb-24">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">Notre Processus</p>
            <h2 id="process-title" className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#0047FF]">
              Comment on travaille
            </h2>
            <p className="font-futura text-[#0047FF]/60 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
              Un processus simple et transparent pour des résultats qui dépassent tes attentes
            </p>
          </header>

          {/* Mobile/Tablet view */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <article key={index} className="relative group">
                  <div className="p-6 sm:p-8 bg-[#0047FF]/5 border border-[#0047FF]/10 hover:border-[#0047FF] hover:shadow-[0_20px_60px_-15px_rgba(0,71,255,0.15)] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#0047FF] flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <span className="font-anton text-4xl text-[#0047FF]/20">{step.step}</span>
                    </div>
                    <h3 className="font-anton text-xl text-[#0047FF] mb-2">{step.title}</h3>
                    <p className="font-futura text-[#0047FF]/70 text-sm">{step.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Desktop view - Timeline style */}
          <div className="hidden lg:block relative">
            {/* Central timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0047FF] via-[#0047FF] to-[#0047FF]/20 -translate-x-1/2" />
            
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div key={index} className={`relative flex items-center mb-16 last:mb-0 ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  {/* Content card */}
                  <div className={`w-[calc(50%-60px)] ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <article className="group relative p-8 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] hover:shadow-[0_25px_80px_-20px_rgba(0,71,255,0.2)] transition-all duration-500 transform hover:-translate-y-2">
                      {/* Step number badge */}
                      <div className={`absolute top-8 ${isLeft ? '-right-4' : '-left-4'} w-8 h-8 bg-[#0047FF] flex items-center justify-center shadow-lg`}>
                        <span className="font-anton text-white text-sm">{step.step}</span>
                      </div>
                      
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0047FF] to-[#0047FF]/80 mb-6 group-hover:scale-110 transition-transform duration-300 ${isLeft ? 'ml-auto' : 'mr-auto'}`}>
                        <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-anton text-2xl text-[#0047FF] mb-3 group-hover:text-[#0047FF] transition-colors">
                        {step.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="font-futura text-[#0047FF]/60 text-base leading-relaxed">
                        {step.desc}
                      </p>

                      {/* Decorative corner */}
                      <div className={`absolute bottom-0 ${isLeft ? 'left-0' : 'right-0'} w-16 h-16 border-b-4 border-l-4 border-[#0047FF]/0 group-hover:border-[#0047FF] transition-all duration-300 ${isLeft ? 'border-l-4' : 'border-r-4 border-l-0'}`} style={{ borderLeftWidth: isLeft ? '4px' : '0', borderRightWidth: isLeft ? '0' : '4px' }} />
                    </article>
                  </div>

                  {/* Center circle on timeline */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-[#0047FF] rounded-full z-10 shadow-lg">
                    <div className="absolute inset-1 bg-[#0047FF] rounded-full animate-pulse" />
                  </div>

                  {/* Connector line to card */}
                  <div className={`absolute top-1/2 h-0.5 bg-[#0047FF]/30 ${isLeft ? 'left-[calc(50%+12px)] right-[50%+60px] w-[48px]' : 'right-[calc(50%+12px)] left-[50%+60px] w-[48px]'}`} 
                    style={{ 
                      left: isLeft ? 'calc(50% + 12px)' : 'auto',
                      right: isLeft ? 'auto' : 'calc(50% + 12px)',
                      width: '48px'
                    }} 
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TRUSTED BY SECTION - SLIDER ===== */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-[#0047FF]/5 overflow-hidden" aria-labelledby="trusted-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#0047FF]/30" />
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] text-center" id="trusted-title">
              Ils nous font confiance
            </p>
            <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#0047FF]/30" />
          </div>
        </div>

        {/* First row - left to right */}
        <div className="mb-4">
          <Marquee gradient={true} gradientColor="#ffffff" gradientWidth={100} speed={35} pauseOnHover={true}>
            {[...trustedClients, ...trustedClients, ...trustedClients].map((client, index) => (
              <div 
                key={index}
                className="group flex items-center justify-center mx-3 sm:mx-4"
              >
                <div className="relative px-8 sm:px-10 py-4 sm:py-5 bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] hover:shadow-[0_10px_40px_-10px_rgba(0,71,255,0.2)] transition-all duration-500 transform hover:-translate-y-1">
                  <span className="font-anton text-lg sm:text-xl text-[#0047FF]/50 group-hover:text-[#0047FF] transition-all duration-300 whitespace-nowrap">
                    {client.name}
                  </span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0047FF] group-hover:w-full transition-all duration-300" />
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Second row - right to left */}
        <div>
          <Marquee gradient={true} gradientColor="#f8fafc" gradientWidth={100} speed={25} direction="right" pauseOnHover={true}>
            {[...trustedClients, ...trustedClients, ...trustedClients].map((client, index) => (
              <div 
                key={index}
                className="group flex items-center justify-center mx-3 sm:mx-4"
              >
                <div className="relative px-8 sm:px-10 py-4 sm:py-5 bg-[#0047FF]/5 border-2 border-transparent hover:border-[#0047FF]/30 hover:bg-white transition-all duration-500 transform hover:-translate-y-1">
                  <span className="font-anton text-lg sm:text-xl text-[#0047FF]/40 group-hover:text-[#0047FF] transition-all duration-300 whitespace-nowrap">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION ===== */}
      <section id="realisations" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-white to-[#0047FF]/5" data-testid="portfolio-section" aria-labelledby="portfolio-title">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12 sm:mb-16">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">Notre Travail</p>
            <h2 id="portfolio-title" className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">Réalisations</h2>
            <p className="font-futura text-[#0047FF]/60 text-sm sm:text-base mt-4 max-w-xl mx-auto">
              Découvrez nos derniers projets en graphisme, web et 3D
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {portfolio.slice(0, 6).map((item, index) => (
              <AnimatedSection key={item.id} animation="fadeInUp" delay={index * 100}>
                <a 
                  href={item.link || '#'} 
                  target={item.link ? '_blank' : '_self'} 
                  rel="noopener noreferrer" 
                  className="group block" 
                  data-testid={`home-portfolio-${item.id}`}
                  aria-label={`Voir le projet ${item.title}`}
                >
                  <article className="relative overflow-hidden bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF] transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,71,255,0.25)] hover:-translate-y-3">
                    {/* Image container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={item.image_url} 
                        alt={`${item.title} - ${item.description} - Projet ${item.category} par ASSK Studio`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        loading="lazy"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/0047FF/FFFFFF?text=${encodeURIComponent(item.title)}`; }} 
                      />
                      
                      {/* Overlay with gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0047FF] via-[#0047FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      
                      {/* Category tag */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white font-futura text-[10px] sm:text-xs text-[#0047FF] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
                        {item.category}
                      </div>
                      
                      {/* View icon */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <ExternalLink className="w-4 h-4 text-[#0047FF]" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 sm:p-6">
                      <h3 className="font-anton text-lg sm:text-xl text-[#0047FF] group-hover:text-[#0047FF] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-futura text-[#0047FF]/60 text-xs sm:text-sm mt-1 line-clamp-1">
                        {item.description}
                      </p>
                      
                      {/* Animated underline */}
                      <div className="mt-4 h-0.5 bg-[#0047FF]/10 overflow-hidden">
                        <div className="h-full w-0 bg-[#0047FF] group-hover:w-full transition-all duration-700" />
                      </div>
                    </div>
                  </article>
                </a>
              </AnimatedSection>
            ))}
          </div>

          {/* Voir plus button */}
          <AnimatedSection animation="fadeInUp" delay={600} className="text-center mt-12 sm:mt-16">
            <a 
              href="https://www.amdbrs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[#0047FF] text-white font-anton text-base sm:text-lg uppercase transition-all duration-500 hover:gap-5 hover:shadow-[0_30px_60px_-15px_rgba(0,71,255,0.5)] hover:-translate-y-1 active:scale-95"
              aria-label="Voir plus de réalisations sur amdbrs.com"
            >
              Voir tout le portfolio
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white" data-testid="contact-section" aria-labelledby="contact-title">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <AnimatedSection animation="slideLeft">
              <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-4">Contact</p>
              <h2 id="contact-title" className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#0047FF] leading-tight">
                Discutons de<br />ton projet
              </h2>
              <p className="font-futura text-[#0047FF]/70 text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 max-w-md">
                Une idée en tête ? Un projet qui te tient à cœur ? Contacte-nous et transformons ta vision en réalité.
              </p>

              <address className="space-y-3 sm:space-y-4 mt-8 sm:mt-12 not-italic">
                <a href="mailto:amaurydebarros1607@gmail.com" className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border border-[#0047FF]/20 hover:border-[#0047FF] hover:shadow-[0_15px_40px_-10px_rgba(0,71,255,0.2)] transition-all duration-500 hover:-translate-y-1" aria-label="Envoyer un email à ASSK Studio">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0047FF] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-futura text-[#0047FF]/50 text-[10px] sm:text-xs uppercase">Email</p>
                    <p className="font-anton text-sm sm:text-base text-[#0047FF] truncate">amaurydebarros1607@gmail.com</p>
                  </div>
                </a>
                <a href="tel:+33665097008" className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border border-[#0047FF]/20 hover:border-[#0047FF] hover:shadow-[0_15px_40px_-10px_rgba(0,71,255,0.2)] transition-all duration-500 hover:-translate-y-1" aria-label="Appeler ASSK Studio">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0047FF] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-futura text-[#0047FF]/50 text-[10px] sm:text-xs uppercase">Téléphone</p>
                    <p className="font-anton text-sm sm:text-base text-[#0047FF]">06 65 09 70 08</p>
                  </div>
                </a>
                <a href="https://instagram.com/amau.psd" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border border-[#0047FF]/20 hover:border-[#0047FF] hover:shadow-[0_15px_40px_-10px_rgba(0,71,255,0.2)] transition-all duration-500 hover:-translate-y-1" aria-label="Suivre ASSK Studio sur Instagram">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0047FF] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-futura text-[#0047FF]/50 text-[10px] sm:text-xs uppercase">Instagram</p>
                    <p className="font-anton text-sm sm:text-base text-[#0047FF]">@amau.psd</p>
                  </div>
                </a>
              </address>
            </AnimatedSection>

            <AnimatedSection animation="slideRight">
              <div className="bg-[#fafbff] p-6 sm:p-8 lg:p-12">
                <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6" data-testid="home-contact-form" aria-label="Formulaire de contact">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="contact-name" className="font-futura text-[#0047FF]/60 text-[10px] sm:text-xs uppercase tracking-wider block mb-2">Nom</label>
                      <input 
                        type="text" 
                        id="contact-name"
                        name="name"
                        value={contactForm.name} 
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} 
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border border-[#0047FF]/20 text-[#0047FF] font-futura text-sm sm:text-base focus:border-[#0047FF] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,71,255,0.1)] transition-all duration-300" 
                        data-testid="home-contact-name"
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="font-futura text-[#0047FF]/60 text-[10px] sm:text-xs uppercase tracking-wider block mb-2">Email</label>
                      <input 
                        type="email" 
                        id="contact-email"
                        name="email"
                        value={contactForm.email} 
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} 
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border border-[#0047FF]/20 text-[#0047FF] font-futura text-sm sm:text-base focus:border-[#0047FF] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,71,255,0.1)] transition-all duration-300" 
                        data-testid="home-contact-email-input"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="font-futura text-[#0047FF]/60 text-[10px] sm:text-xs uppercase tracking-wider block mb-2">Sujet</label>
                    <input 
                      type="text" 
                      id="contact-subject"
                      name="subject"
                      value={contactForm.subject} 
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} 
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border border-[#0047FF]/20 text-[#0047FF] font-futura text-sm sm:text-base focus:border-[#0047FF] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,71,255,0.1)] transition-all duration-300" 
                      data-testid="home-contact-subject"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="font-futura text-[#0047FF]/60 text-[10px] sm:text-xs uppercase tracking-wider block mb-2">Message</label>
                    <textarea 
                      id="contact-message"
                      name="message"
                      value={contactForm.message} 
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} 
                      rows={4} 
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white border border-[#0047FF]/20 text-[#0047FF] font-futura text-sm sm:text-base resize-none focus:border-[#0047FF] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,71,255,0.1)] transition-all duration-300" 
                      data-testid="home-contact-message"
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="group w-full flex items-center justify-center gap-3 py-4 sm:py-5 bg-[#0047FF] text-white font-anton text-base sm:text-lg uppercase transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,71,255,0.5)] hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 active:scale-[0.98]" 
                    data-testid="home-contact-submit"
                  >
                    {loading ? 'Envoi...' : 'Envoyer le message'}
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#0047FF] relative overflow-hidden" aria-labelledby="cta-title">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 id="cta-title" className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight">
            Prêt à laisser<br />ta marque ?
          </h2>
          <p className="font-futura text-white/70 text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 max-w-lg mx-auto">
            Plus tu attends, plus tes concurrents avancent. Changeons ça ensemble.
          </p>
          <div className="mt-8 sm:mt-10">
            <a href="#contact" className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#0047FF] font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]" aria-label="Commencer un projet maintenant">
              Commencer maintenant
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION - SEO ===== */}
      <section id="faq" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white" data-testid="faq-section" aria-labelledby="faq-title" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#0047FF]/10 text-[#0047FF] font-futura text-xs sm:text-sm mb-4">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span>Clermont-Ferrand • Vichy • Moulins • Allier • Auvergne</span>
            </div>
            <h2 id="faq-title" className="font-anton text-3xl sm:text-4xl lg:text-5xl text-[#0047FF]">
              Questions Fréquentes
            </h2>
            <p className="font-futura text-[#0047FF]/60 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur nos services de graphisme, création de sites web et impression 3D en Auvergne
            </p>
          </header>

          <div className="space-y-4">
            {[
              {
                question: "Quels services de graphisme proposez-vous à Clermont-Ferrand et en Auvergne ?",
                answer: "Nous proposons des services complets de graphisme : création de logo, identité visuelle, charte graphique, design de supports print (cartes de visite, flyers, brochures) et design digital. Basés en Auvergne, nous intervenons sur Clermont-Ferrand, Vichy, Moulins et tout le département de l'Allier."
              },
              {
                question: "Combien coûte la création d'un site web vitrine ?",
                answer: "Nos sites web vitrine démarrent à 1200€ pour une landing page responsive. Pour un site complet de 5 à 10 pages avec optimisation SEO, comptez à partir de 2200€. Nous créons également des sites e-commerce à partir de 3000€. Chaque projet est personnalisé selon vos besoins."
              },
              {
                question: "Proposez-vous des services d'impression 3D dans l'Allier ?",
                answer: "Oui ! Nous réalisons de l'impression 3D filament sur demande : porte-clés personnalisés, totems, figurines, prototypes et objets sur-mesure. Pour la modélisation 3D avec ZBrush, les tarifs démarrent à 250€. Contactez-nous pour un devis personnalisé."
              },
              {
                question: "Pourquoi choisir un studio créatif familial plutôt qu'une grande agence ?",
                answer: "On travaille en famille, ce qui garantit une relation de confiance et une proximité avec nos clients. Vous avez un interlocuteur unique de A à Z, des tarifs transparents sans intermédiaire, et un suivi personnalisé. Avec plus de 50 projets réalisés, nous allions qualité professionnelle et accompagnement humain."
              },
              {
                question: "Quels sont vos délais de livraison pour un logo ou une identité visuelle ?",
                answer: "Pour un pack logo signature, comptez environ 1 à 2 semaines. Une identité visuelle complète (logo, charte graphique, supports) nécessite 3 à 4 semaines. Nous privilégions la qualité et les échanges avec nos clients plutôt que la rapidité à tout prix."
              },
              {
                question: "Intervenez-vous en dehors de l'Auvergne ?",
                answer: "Absolument ! Bien que basés près de Clermont-Ferrand, Vichy et Moulins, nous travaillons avec des clients dans toute la France. La majorité de nos échanges se font en visio et par email. Seules les impressions 3D nécessitent une livraison ou un retrait sur place."
              },
              {
                question: "Comment se déroule un projet de création de site web ?",
                answer: "Nous commençons par un brief pour comprendre vos besoins, votre cible et vos objectifs. Ensuite, nous créons des maquettes que vous validez. Une fois le design approuvé, nous développons votre site responsive et optimisé SEO. Vous bénéficiez d'un support continu même après la livraison."
              },
              {
                question: "Faites-vous des Art Toys et figurines personnalisées ?",
                answer: "Oui, c'est notre spécialité ! Avec plus de 10 Art Toys créés, nous proposons des packs complets incluant design, modélisation 3D et impression. Chaque création est unique et réalisée sur-mesure selon vos envies."
              }
            ].map((faq, index) => (
              <details 
                key={index} 
                className="group border border-[#0047FF]/20 bg-white hover:border-[#0047FF] transition-colors duration-300"
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer list-none font-anton text-base sm:text-lg text-[#0047FF]">
                  <span itemProp="name">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-[#0047FF] transition-transform duration-300 group-open:rotate-180 flex-shrink-0 ml-4" aria-hidden="true" />
                </summary>
                <div 
                  className="px-4 sm:px-6 pb-4 sm:pb-6 font-futura text-[#0047FF]/70 text-sm sm:text-base leading-relaxed"
                  itemScope 
                  itemProp="acceptedAnswer" 
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="font-futura text-[#0047FF]/60 text-sm mb-4">Une autre question ?</p>
            <a href="#contact" className="group inline-flex items-center gap-3 px-6 py-3 bg-[#0047FF] text-white font-anton text-base uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(0,71,255,0.4)]">
              Contactez-nous
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
