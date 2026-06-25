import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { ArrowRight, ArrowLeft, Palette, Box, Mail, Phone, Instagram, Send, ExternalLink, PenTool, Layers, FileText, Printer, Star, Check, Sparkles, Globe, Layout, Code, Heart, ChevronDown, HelpCircle, MapPin, MessageSquare, Lightbulb, Pencil, Rocket } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';
import { useScrollAnimation, AnimatedSection } from '@/hooks/useScrollAnimation';
import { MouseParallax, TiltCard, ParallaxLayer } from '@/hooks/useParallax';
import { MagneticButton } from '@/components/MagneticButton';
import { ScrollIndicator } from '@/components/ScrollIndicator';
import { AnimatedProcessSection } from '@/components/AnimatedProcessSection';
import { QuoteForm } from '@/components/QuoteForm';
import { StackingWhyUsCards } from '@/components/StackingWhyUsCards';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';
const HERO_BANNER_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/mz2obg6m_pexels-jakubzerdzicki-19124461.jpg';

// Client Projects for Carousel
const CLIENT_PROJECTS = [
  {
    id: 'sellerie-garcia',
    title: 'Sellerie Garcia',
    category: 'Identité Visuelle & Site Web',
    description: 'Artisan sellier garnisseur',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/0mi6c65b_carte-visite-garcia.jpg',
    link: '/sellerie-garcia',
    color: 'from-emerald-800 to-emerald-900'
  },
  {
    id: 'coachella-2k24',
    title: 'Coachella 2K24',
    category: 'Direction Artistique',
    description: 'Soirée à thème festival',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/agi6m675_tshirt-coachella.png',
    link: '/coachella-2k24',
    color: 'from-pink-500 to-red-500'
  },
  {
    id: 'liberty-van',
    title: 'Liberty Van',
    category: 'Identité Visuelle',
    description: 'Location de vans - Allier 03',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/nq51eqoq_Business-Card-Mockup.png',
    link: '/liberty-van',
    color: 'from-cyan-500 to-teal-500'
  },
  {
    id: 'entreprise-lesly',
    title: 'Entreprise Lesly',
    category: 'Identité Visuelle',
    description: 'Peintre & Décorateur',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/x4fbkh4y_mockup%20cdv1.png',
    link: '/entreprise-lesly',
    color: 'from-blue-700 to-blue-900'
  },
  {
    id: 'club-football-laforest',
    title: 'Club Football Laforest',
    category: 'Logo & Textile',
    description: 'Stage de football',
    image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/b013fktk_REPLACE-THIS-SCREEN11112111131.jpg',
    link: '/club-football-laforest',
    color: 'from-teal-600 to-teal-800'
  }
];

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
          <p className="font-futura text-gray-600 text-xs sm:text-sm" itemProp="description">{service.description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-[#0047FF]/30 group-hover:text-[#0047FF] group-hover:translate-x-2 transition-all duration-500 flex-shrink-0" />
      </div>
    </article>
  );
};

// Services Carousel for Mobile - Optimized for fluidity
const ServicesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const scrollTimeout = useRef(null);

  const services = [
    { id: 'graphisme', title: 'GRAPHISME', description: 'Logo, identité visuelle, supports print & digital', icon: Palette, link: '/graphisme' },
    { id: 'sites-web', title: 'SITES WEB', description: 'Sites vitrines, e-commerce, applications web', icon: Globe, link: '/sites-web' },
    { id: '3d', title: '3D', description: 'Modélisation, impression 3D, art toys', icon: Box, link: '/modelisation-3d' }
  ];

  // Debounced scroll handler for better performance
  const handleScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      if (!trackRef.current) return;
      const { scrollLeft, clientWidth } = trackRef.current;
      const cardWidth = clientWidth * 0.75;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, services.length - 1)));
    }, 50);
  };

  const scrollToIndex = (index) => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  return (
    <div className="relative">
      {/* Carousel Track - Native scroll for maximum fluidity */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-2 px-[12.5%] snap-x snap-mandatory"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x'
        }}
        onScroll={handleScroll}
      >
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <Link
              key={service.id}
              to={service.link}
              className="services-card flex-shrink-0 w-[75vw] p-6 bg-white border-2 border-[#0047FF]/20 snap-center active:scale-[0.98]"
              data-testid={`mobile-service-${service.id}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#0047FF] flex items-center justify-center mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-anton text-2xl text-[#0047FF] mb-2">{service.title}</h3>
                <p className="font-futura text-gray-500 text-sm mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 font-futura text-sm text-[#0047FF]">
                  Découvrir <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {services.map((_, index) => (
          <button
            key={index}
            className={`rounded-full ${
              index === activeIndex 
                ? 'w-6 h-2 bg-[#0047FF]' 
                : 'w-2 h-2 bg-[#0047FF]/20'
            }`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Voir service ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  const stats1 = useCountUp(50, 2000);
  const stats2 = useCountUp(98, 2000);
  const stats3 = useCountUp(10, 2000);

  useEffect(() => {
    fetch(`${API}/seed`, { method: 'POST' }).catch(() => {});
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
      <section className="relative min-h-[100svh] bg-[#0a0a0a] flex items-center overflow-hidden pt-16" aria-label="Présentation ASSK Studio">
        {/* Background Banner Image */}
        <div className="absolute inset-0">
          <img 
            src={HERO_BANNER_URL} 
            alt="" 
            className="w-full h-full object-cover opacity-60"
            aria-hidden="true"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          {/* Blue accent glow */}
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#0047FF]/20 blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#0047FF]/20 backdrop-blur-sm text-[#0047FF] font-futura text-xs sm:text-sm mb-4 sm:mb-6 animate-fadeInUp border border-[#0047FF]/30" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" aria-hidden="true" />
                <span>Studio Créatif Graphisme & 3D</span>
              </div>
              
              <h1 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.95] uppercase tracking-tight animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }} data-testid="hero-title">
                On crée.<br />
                <span className="text-[#0047FF]">Tu marques.</span>
              </h1>
              
              <p className="font-futura text-gray-300 text-base sm:text-lg lg:text-xl mt-6 sm:mt-8 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                Studio créatif spécialisé en identité visuelle, sites web, modélisation 3D et création d'art toys uniques.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 justify-center lg:justify-start animate-fadeInUp" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                <MagneticButton 
                  as="a" 
                  href="#contact" 
                  strength={0.3}
                  className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#0047FF] text-white font-anton text-base sm:text-lg uppercase transition-all duration-500 hover:gap-5 hover:shadow-[0_25px_50px_-12px_rgba(0,71,255,0.5)] active:scale-95" 
                  data-testid="hero-cta-button" 
                  data-cursor-text="Go!" 
                  aria-label="Démarrer un projet avec ASSK Studio"
                >
                  Démarrer un projet
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </MagneticButton>
              </div>
            </div>

            {/* Empty space to show banner */}
            <div className="hidden lg:block" aria-hidden="true" />
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* Marquee */}
      <div className="bg-[#0047FF] py-3 sm:py-4 overflow-hidden" aria-hidden="true">
        <Marquee gradient={false} speed={60}>
          {['GRAPHISME', 'SITES WEB', 'MODÉLISATION 3D', 'ART TOYS', 'IMPRESSION 3D', 'IDENTITÉ VISUELLE', 'E-COMMERCE', 'BRANDING'].map((item, i) => (
            <span key={i} className="font-anton text-lg sm:text-2xl text-white mx-6 sm:mx-12 opacity-80">{item}</span>
          ))}
        </Marquee>
      </div>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="py-16 sm:py-24 lg:py-32 bg-white" data-testid="services-section" aria-labelledby="services-title">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeInUp" className="text-center mb-10 sm:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-12">
            <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">Nos Services</p>
            <h2 id="services-title" className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#0047FF]">
              Tout ce qu'il te faut.<br />
              <span className="text-[#0047FF]/30">Rien de superflu.</span>
            </h2>
          </AnimatedSection>

          {/* Mobile: Horizontal Carousel */}
          <div className="sm:hidden">
            <ServicesCarousel />
          </div>

          {/* Desktop: Grid */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-12">
            {/* Graphisme */}
            <AnimatedSection animation="fadeInUp" delay={0}>
              <Link 
                to="/graphisme" 
                className="group relative block p-6 sm:p-8 lg:p-10 bg-white border-2 border-[#0047FF]/20 hover:border-[#0047FF] transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,71,255,0.25)] hover:-translate-y-2"
                data-testid="service-graphisme"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0047FF] flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="font-anton text-2xl sm:text-3xl lg:text-4xl text-[#0047FF] mb-2 sm:mb-3">GRAPHISME</h3>
                  <p className="font-futura text-gray-500 text-sm sm:text-base mb-4">Logo, identité visuelle, supports print & digital</p>
                  <span className="inline-flex items-center gap-2 font-futura text-sm text-[#0047FF] group-hover:gap-4 transition-all duration-300">
                    Découvrir <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-[#0047FF] border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </AnimatedSection>

            {/* Sites Web */}
            <AnimatedSection animation="fadeInUp" delay={150}>
              <Link 
                to="/sites-web" 
                className="group relative block p-6 sm:p-8 lg:p-10 bg-white border-2 border-[#0047FF]/20 hover:border-[#0047FF] transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,71,255,0.25)] hover:-translate-y-2"
                data-testid="service-sites-web"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0047FF] flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="font-anton text-2xl sm:text-3xl lg:text-4xl text-[#0047FF] mb-2 sm:mb-3">SITES WEB</h3>
                  <p className="font-futura text-gray-500 text-sm sm:text-base mb-4">Sites vitrines, e-commerce, applications web</p>
                  <span className="inline-flex items-center gap-2 font-futura text-sm text-[#0047FF] group-hover:gap-4 transition-all duration-300">
                    Découvrir <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-[#0047FF] border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </AnimatedSection>

            {/* 3D */}
            <AnimatedSection animation="fadeInUp" delay={300}>
              <Link 
                to="/modelisation-3d" 
                className="group relative block p-6 sm:p-8 lg:p-10 bg-white border-2 border-[#0047FF]/20 hover:border-[#0047FF] transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,71,255,0.25)] hover:-translate-y-2"
                data-testid="service-3d"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0047FF] flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Box className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="font-anton text-2xl sm:text-3xl lg:text-4xl text-[#0047FF] mb-2 sm:mb-3">3D</h3>
                  <p className="font-futura text-gray-500 text-sm sm:text-base mb-4">Modélisation, impression 3D, art toys</p>
                  <span className="inline-flex items-center gap-2 font-futura text-sm text-[#0047FF] group-hover:gap-4 transition-all duration-300">
                    Découvrir <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-[#0047FF] border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </AnimatedSection>
          </div>

          {/* CTA */}
          <AnimatedSection animation="fadeInUp" delay={450} className="mt-12 sm:mt-16 text-center px-4 sm:px-6 lg:px-12">
            <MagneticButton 
              as="a" 
              href="#contact" 
              strength={0.3}
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#0047FF] text-white font-anton text-base sm:text-lg uppercase transition-all duration-500 hover:gap-5 hover:shadow-[0_25px_50px_-12px_rgba(0,71,255,0.5)] active:scale-95" 
              data-cursor-text="Go!"
              aria-label="Demander un devis personnalisé"
            >
              Demander un devis
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== PROJETS CLIENTS CAROUSEL ===== */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white overflow-hidden" data-testid="projets-clients-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection animation="fadeUp">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 sm:w-20 bg-[#0047FF]/30" />
              <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-[0.2em] text-center">
                Portfolio
              </p>
              <div className="h-px w-12 sm:w-20 bg-[#0047FF]/30" />
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#0047FF] text-center mb-4">
              Projets Clients
            </h2>
            <p className="font-futura text-gray-600 text-sm sm:text-base lg:text-lg text-center max-w-2xl mx-auto mb-8">
              Découvrez nos dernières réalisations en graphisme, web et événementiel.
            </p>
          </AnimatedSection>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Desktop */}
          <button 
            onClick={() => {
              const carousel = document.getElementById('projects-carousel');
              if (carousel) carousel.scrollBy({ left: -400, behavior: 'smooth' });
            }}
            className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white border-2 border-[#0047FF]/20 hover:border-[#0047FF] hover:bg-[#0047FF] items-center justify-center transition-all duration-300 group shadow-lg"
            aria-label="Projet précédent"
          >
            <ArrowLeft className="w-6 h-6 text-[#0047FF] group-hover:text-white transition-colors" />
          </button>
          <button 
            onClick={() => {
              const carousel = document.getElementById('projects-carousel');
              if (carousel) carousel.scrollBy({ left: 400, behavior: 'smooth' });
            }}
            className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white border-2 border-[#0047FF]/20 hover:border-[#0047FF] hover:bg-[#0047FF] items-center justify-center transition-all duration-300 group shadow-lg"
            aria-label="Projet suivant"
          >
            <ArrowRight className="w-6 h-6 text-[#0047FF] group-hover:text-white transition-colors" />
          </button>

          {/* Scrollable Carousel */}
          <div 
            id="projects-carousel"
            className="flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-20 xl:px-32 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {CLIENT_PROJECTS.map((project) => (
              <Link 
                key={project.id}
                to={project.link}
                className="group flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[500px] relative overflow-hidden bg-white border-2 border-[#0047FF]/10 hover:border-[#0047FF]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,71,255,0.2)] snap-center"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white font-futura text-xs uppercase tracking-wider mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-anton text-2xl sm:text-3xl lg:text-4xl text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="font-futura text-white/70 text-sm sm:text-base">
                    {project.description}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                    <span className="font-futura text-sm uppercase tracking-wider">Voir le projet</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Dots Indicator - Mobile */}
          <div className="flex justify-center gap-2 mt-6 lg:hidden px-4">
            {CLIENT_PROJECTS.map((project, index) => (
              <button
                key={project.id}
                onClick={() => {
                  const carousel = document.getElementById('projects-carousel');
                  const cardWidth = carousel?.firstChild?.offsetWidth || 300;
                  if (carousel) carousel.scrollTo({ left: index * (cardWidth + 24), behavior: 'smooth' });
                }}
                className="w-2 h-2 rounded-full bg-[#0047FF]/30 hover:bg-[#0047FF] transition-colors"
                aria-label={`Aller au projet ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" delay={400}>
            <div className="text-center mt-12">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[#0047FF] text-white font-anton text-base sm:text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(0,71,255,0.4)]"
              >
                Démarrer votre projet
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHY US SECTION - STACKING ON MOBILE ===== */}
      <StackingWhyUsCards items={whyUs} />

      {/* ===== PROCESS SECTION - ANIMATED ===== */}
      <AnimatedProcessSection steps={processSteps} />

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

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white" data-testid="contact-section" aria-labelledby="contact-title">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <AnimatedSection animation="slideLeft">
              <p className="font-futura text-[#0047FF] text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-4">Contact</p>
              <h2 id="contact-title" className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#0047FF] leading-tight">
                Discutons de<br />ton projet
              </h2>
              <p className="font-futura text-gray-700 text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 max-w-md">
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
              <div className="bg-[#fafbff] p-6 sm:p-8 lg:p-10">
                <div className="mb-6">
                  <h3 className="font-anton text-xl sm:text-2xl text-[#0047FF]">Demande de devis</h3>
                  <p className="font-futura text-gray-600 text-sm mt-1">Réponse personnalisée sous 24h</p>
                </div>
                <QuoteForm />
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
            <p className="font-futura text-gray-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
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
                  className="px-4 sm:px-6 pb-4 sm:pb-6 font-futura text-gray-700 text-sm sm:text-base leading-relaxed"
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
            <p className="font-futura text-gray-600 text-sm mb-4">Une autre question ?</p>
            <a href="#contact" className="group inline-flex items-center gap-3 px-6 py-3 bg-[#0047FF] text-white font-anton text-base uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(0,71,255,0.4)]">
              Contactez-nous
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
