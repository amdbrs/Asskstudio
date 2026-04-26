import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { ArrowRight, ArrowUpRight, Plus, Mail, Phone, Instagram, Palette, Globe, Box, Check } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

// Fallback portfolio
const FALLBACK_PORTFOLIO = [
  { id: '1', title: 'Sellerie Garcia', description: 'Site vitrine artisan sellier', category: 'Site Web', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/xbxushaa_IMG_0412.png' },
  { id: '2', title: 'Liberty Van', description: 'Location de Vans - Allier', category: 'Graphisme', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/1aifryat_IMG_0347.png' },
  { id: '3', title: 'Club Football Laforest', description: 'Logo et t-shirts vintage', category: 'Graphisme', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9zz84ry3_IMG_0348.jpeg' },
  { id: '4', title: 'IRIS', description: 'Identité visuelle prêt-à-porter', category: 'Graphisme', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/lq95pan1_IMG_0349.png' },
  { id: '5', title: 'Rappeur Figurine', description: 'Figurines 3D de rappeurs', category: '3D', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/t8ve9seo_IMG_0333.jpg' },
  { id: '6', title: 'Sneakers Design', description: 'Visuels graphiques sneakers', category: 'Graphisme', image_url: 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/zlk12w3k_IMG_0356.png' },
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// Animated counter
const AnimatedNumber = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function HomePage() {
  const [portfolio, setPortfolio] = useState(FALLBACK_PORTFOLIO);

  useEffect(() => {
    fetch(`${API}/portfolio`)
      .then(r => r.json())
      .then(data => { if (data?.length > 0) setPortfolio(data); })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden" data-testid="home-page">
      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12" data-testid="hero-section">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#0047FF]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#0047FF]/3 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Left content */}
            <div className="lg:col-span-7">
              {/* Stats row */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 mb-10">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl md:text-4xl font-medium text-white"><AnimatedNumber value={50} suffix="+" /></span>
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Projets</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl md:text-4xl font-medium text-white"><AnimatedNumber value={5} suffix="+" /></span>
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Années</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl md:text-4xl font-medium text-white"><AnimatedNumber value={98} suffix="%" /></span>
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Satisfaction</span>
                </div>
              </motion.div>

              {/* Main headline */}
              <motion.h1 
                variants={fadeInUp}
                className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.95] mb-8"
                data-testid="hero-title"
              >
                On crée des
                <br />
                <span className="text-white/30">marques qui</span>
                <br />
                <span className="text-[#0047FF]">marquent.</span>
              </motion.h1>

              {/* Description */}
              <motion.p variants={fadeInUp} className="text-white/60 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                Studio créatif spécialisé en identité visuelle, sites web et modélisation 3D. On transforme vos idées en expériences mémorables.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] font-heading font-medium text-base transition-all duration-300 hover:bg-[#0047FF] hover:text-white"
                  data-testid="hero-cta-button"
                >
                  Démarrer un projet
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a 
                  href="#work" 
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-heading font-medium text-base transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] hover:border-white"
                >
                  Voir les projets
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </motion.div>
            </div>

            {/* Right - Logo */}
            <motion.div 
              variants={fadeInUp}
              className="lg:col-span-5 flex items-center justify-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-[#0047FF]/20 rounded-full blur-3xl animate-pulse" />
                <img 
                  src={LOGO_URL} 
                  alt="ASSK Studio" 
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="py-6 border-y border-white/10 overflow-hidden">
        <Marquee gradient={false} speed={50}>
          {['GRAPHISME', 'SITES WEB', '3D & TOYS', 'IDENTITÉ VISUELLE', 'E-COMMERCE', 'BRANDING', 'IMPRESSION 3D'].map((item, i) => (
            <span key={i} className="font-heading text-2xl md:text-3xl text-white/20 mx-8 md:mx-16 tracking-tight">{item}</span>
          ))}
        </Marquee>
      </div>

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12" id="about">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-4">
              <span className="font-mono text-sm text-white/40">(01)</span>
              <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight mt-2">À propos</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8">
                Je suis Amaury De Barros, designer graphique passionné par la création visuelle. ASSK Studio est né de l'envie d'accompagner les entreprises et particuliers dans la création de leur identité visuelle, en alliant <span className="text-white">créativité</span>, <span className="text-white">rigueur</span> et <span className="text-white">proximité</span>.
              </p>
              <p className="text-white/50 text-base leading-relaxed mb-10">
                Basé en Auvergne (Clermont-Ferrand, Vichy, Moulins), je travaille avec des clients dans toute la France pour donner vie à leurs projets créatifs.
              </p>
              <Link 
                to="/a-propos" 
                className="link-arrow inline-flex items-center gap-2 text-white font-medium border-b border-white/20 pb-1 hover:border-[#0047FF] transition-colors"
              >
                En savoir plus
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0d0d0d]" id="services" data-testid="services-section">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
            <div>
              <span className="font-mono text-sm text-white/40">(02)</span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mt-2">
                Services
              </h2>
            </div>
            <p className="text-white/50 max-w-md text-base md:text-lg">
              Des solutions complètes pour votre identité visuelle et votre présence digitale.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Service 1 - Graphisme */}
            <Link to="/graphisme" className="group p-8 md:p-10 bg-[#171717] border border-white/10 hover:border-white/25 transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-white/5 flex items-center justify-center group-hover:bg-[#0047FF]/20 transition-colors">
                  <Palette className="w-7 h-7 text-white/70 group-hover:text-[#0047FF]" />
                </div>
                <span className="font-mono text-sm text-white/30">01</span>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-medium mb-4 tracking-tight">Graphisme</h3>
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
                Logo, identité visuelle, charte graphique, supports print et design digital sur-mesure.
              </p>
              <div className="flex items-center gap-2 text-white/60 group-hover:text-[#0047FF] transition-colors">
                <span className="font-mono text-sm">Découvrir</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>

            {/* Service 2 - Sites Web */}
            <Link to="/sites-web" className="group p-8 md:p-10 bg-[#171717] border border-white/10 hover:border-white/25 transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-white/5 flex items-center justify-center group-hover:bg-[#0047FF]/20 transition-colors">
                  <Globe className="w-7 h-7 text-white/70 group-hover:text-[#0047FF]" />
                </div>
                <span className="font-mono text-sm text-white/30">02</span>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-medium mb-4 tracking-tight">Sites Web</h3>
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
                Sites vitrine, e-commerce et applications web performantes, optimisées SEO.
              </p>
              <div className="flex items-center gap-2 text-white/60 group-hover:text-[#0047FF] transition-colors">
                <span className="font-mono text-sm">Découvrir</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>

            {/* Service 3 - 3D & Toys */}
            <Link to="/modelisation-3d" className="group p-8 md:p-10 bg-[#171717] border border-white/10 hover:border-white/25 transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-white/5 flex items-center justify-center group-hover:bg-[#0047FF]/20 transition-colors">
                  <Box className="w-7 h-7 text-white/70 group-hover:text-[#0047FF]" />
                </div>
                <span className="font-mono text-sm text-white/30">03</span>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-medium mb-4 tracking-tight">3D & Toys</h3>
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
                Modélisation 3D, impression filament et création d'art toys personnalisés.
              </p>
              <div className="flex items-center gap-2 text-white/60 group-hover:text-[#0047FF] transition-colors">
                <span className="font-mono text-sm">Découvrir</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12" id="work" data-testid="portfolio-section">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
            <div>
              <span className="font-mono text-sm text-white/40">(03)</span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mt-2">
                Réalisations
              </h2>
            </div>
            <Link 
              to="/realisations" 
              className="link-arrow inline-flex items-center gap-2 text-white font-medium border-b border-white/20 pb-1 hover:border-[#0047FF] transition-colors"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Portfolio grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {portfolio.slice(0, 6).map((item, index) => (
              <article 
                key={item.id}
                className="group relative overflow-hidden bg-[#171717] border border-white/10 hover:border-white/25 transition-all duration-500"
                data-testid={`portfolio-item-${index}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#0047FF]">{item.category}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#0047FF] transition-colors" />
                  </div>
                  <h3 className="font-heading text-xl font-medium tracking-tight">{item.title}</h3>
                  <p className="text-white/50 text-sm mt-2">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US SECTION ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0d0d0d]" data-testid="why-us-section">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-5">
              <span className="font-mono text-sm text-white/40">(04)</span>
              <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight mt-2 mb-6">
                Pourquoi
                <br />
                <span className="text-white/30">nous choisir ?</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed">
                Une approche unique centrée sur la qualité, la proximité et des résultats qui comptent.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="space-y-6">
                {[
                  { title: 'Design Sur-Mesure', desc: 'Chaque projet est unique, créé spécifiquement pour votre marque et vos objectifs.' },
                  { title: 'Relation Familiale', desc: 'On travaille en famille, garantissant confiance et proximité avec chaque client.' },
                  { title: 'Support Continu', desc: 'Accompagnement même après livraison, pour que votre projet évolue avec vous.' },
                  { title: 'Qualité Premium', desc: 'Finitions soignées et attention aux détails pour des résultats professionnels.' },
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="group flex gap-6 p-6 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#0047FF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0047FF]/20 transition-colors">
                      <Check className="w-5 h-5 text-[#0047FF]" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-medium mb-2">{item.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-y border-white/10" id="contact" data-testid="contact-section">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            {/* Left - CTA */}
            <div>
              <span className="font-mono text-sm text-white/40">(05)</span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mt-2 mb-6">
                Prêt à créer
                <br />
                <span className="text-[#0047FF]">quelque chose ?</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-lg">
                Design clair, développement solide, stratégie ciblée — travaillons ensemble sur votre prochain projet.
              </p>
              <a 
                href="mailto:amaurydebarros1607@gmail.com" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] font-heading font-medium text-base transition-all duration-300 hover:bg-[#0047FF] hover:text-white"
              >
                Discutons
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Right - Contact info */}
            <div className="space-y-6">
              <a href="mailto:amaurydebarros1607@gmail.com" className="group flex items-center gap-4 p-6 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-300">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-[#0047FF]/20 transition-colors">
                  <Mail className="w-5 h-5 text-white/70 group-hover:text-[#0047FF]" />
                </div>
                <div>
                  <p className="font-mono text-xs text-white/40 uppercase mb-1">Email</p>
                  <p className="font-medium">amaurydebarros1607@gmail.com</p>
                </div>
              </a>
              <a href="tel:+33665097008" className="group flex items-center gap-4 p-6 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-300">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-[#0047FF]/20 transition-colors">
                  <Phone className="w-5 h-5 text-white/70 group-hover:text-[#0047FF]" />
                </div>
                <div>
                  <p className="font-mono text-xs text-white/40 uppercase mb-1">Téléphone</p>
                  <p className="font-medium">06 65 09 70 08</p>
                </div>
              </a>
              <a href="https://instagram.com/amau.psd" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-6 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-300">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-[#0047FF]/20 transition-colors">
                  <Instagram className="w-5 h-5 text-white/70 group-hover:text-[#0047FF]" />
                </div>
                <div>
                  <p className="font-mono text-xs text-white/40 uppercase mb-1">Instagram</p>
                  <p className="font-medium">@amau.psd</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
