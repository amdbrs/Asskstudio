import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { ArrowRight, Palette, Box, ShoppingBag, Mail, Phone, Instagram, Send, ExternalLink, PenTool, Layers, FileText, Monitor, Printer, Star, Check, X, Download, ChevronRight, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

const services2D = [
  { name: 'Pack Logo Signature', price: '350', description: 'Logo professionnel + déclinaisons', icon: PenTool },
  { name: 'Identité Visuelle Complète', price: '750', description: 'Logo, charte graphique, supports', icon: Layers },
  { name: 'Papeterie & Édition', price: '150', description: 'Cartes de visite, flyers, brochures', icon: FileText },
  { name: 'Site Web Vitrine', price: '950', description: 'Design + développement responsive', icon: Monitor }
];

const services3D = [
  { name: 'Modélisation 3D (ZBrush)', price: '200', description: 'Création de personnages et objets', icon: Box },
  { name: 'Impression Résine 4K', price: '50', description: 'Prototypage haute définition', icon: Printer },
  { name: 'Pack Art Toy Custom', price: '390', description: 'Design + modélisation + impression', icon: Star }
];

const whyUs = [
  { title: 'Design Sur-Mesure', desc: 'Chaque projet est unique, créé spécifiquement pour votre marque' },
  { title: 'Prix Transparents', desc: 'Pas de surprises, vous connaissez le coût dès le départ' },
  { title: 'Support Continu', desc: 'On ne disparaît pas après livraison, on vous accompagne' },
  { title: 'Qualité Premium', desc: 'Impressions haute définition et finitions soignées' }
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

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  
  const stats1 = useCountUp(150, 2000);
  const stats2 = useCountUp(98, 2000);
  const stats3 = useCountUp(50, 2000);

  useEffect(() => {
    fetch(`${API}/seed`, { method: 'POST' }).catch(() => {});
    fetch(`${API}/products`).then(r => r.json()).then(setProducts).catch(() => {});
    fetch(`${API}/portfolio`).then(r => r.json()).then(setPortfolio).catch(() => {});
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} ajouté au panier`);
  };

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
      <section className="relative min-h-screen bg-white flex items-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#0047FF]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0047FF]/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#0047FF]/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#0047FF]/10 rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fadeInUp">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0047FF]/10 text-[#0047FF] font-futura text-sm mb-6 animate-fadeInUp">
                <Sparkles className="w-4 h-4" />
                Studio Créatif Graphisme & 3D
              </div>
              
              <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#0047FF] leading-[0.95] uppercase tracking-tight" data-testid="hero-title">
                On crée.<br />
                <span className="text-[#0047FF]/30">Tu marques.</span>
              </h1>
              
              <p className="font-futura text-[#0047FF]/70 text-lg sm:text-xl mt-8 max-w-lg leading-relaxed">
                Studio créatif spécialisé en identité visuelle, modélisation 3D et création d'art toys uniques. On s'occupe du design, tu t'occupes de briller.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-10">
                <a href="#contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0047FF] text-white font-anton text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(0,71,255,0.4)]" data-testid="hero-cta-button">
                  Démarrer un projet
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#shop" className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-[#0047FF] font-anton text-lg uppercase border-2 border-[#0047FF] transition-all duration-300 hover:bg-[#0047FF] hover:text-white">
                  Explorer le shop
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-[#0047FF]/20">
                <div ref={stats1.ref}>
                  <p className="font-anton text-4xl text-[#0047FF]">{stats1.count}+</p>
                  <p className="font-futura text-[#0047FF]/60 text-sm mt-1">Projets réalisés</p>
                </div>
                <div ref={stats2.ref}>
                  <p className="font-anton text-4xl text-[#0047FF]">{stats2.count}%</p>
                  <p className="font-futura text-[#0047FF]/60 text-sm mt-1">Clients satisfaits</p>
                </div>
                <div ref={stats3.ref}>
                  <p className="font-anton text-4xl text-[#0047FF]">{stats3.count}+</p>
                  <p className="font-futura text-[#0047FF]/60 text-sm mt-1">Art toys créés</p>
                </div>
              </div>
            </div>

            {/* Hero Image/Logo */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-[400px] h-[400px] animate-float">
                <div className="absolute inset-0 bg-[#0047FF] rounded-full opacity-10 animate-ping-slow" />
                <img src={LOGO_URL} alt="ASSK Studio" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-futura text-[#0047FF]/50 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#0047FF] to-transparent" />
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#0047FF] py-4 overflow-hidden">
        <Marquee gradient={false} speed={60}>
          {['GRAPHISME', 'MODÉLISATION 3D', 'ART TOYS', 'IMPRESSION RÉSINE', 'IDENTITÉ VISUELLE', 'WEB DESIGN', 'MOCKUPS', 'BRANDING'].map((item, i) => (
            <span key={i} className="font-anton text-2xl text-white mx-12 opacity-80">{item}</span>
          ))}
        </Marquee>
      </div>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="py-32 px-4 sm:px-6 lg:px-12 bg-white" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-futura text-[#0047FF] text-sm uppercase tracking-widest mb-4">Nos Services</p>
            <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-[#0047FF]">
              Tout ce qu'il te faut.<br />
              <span className="text-[#0047FF]/30">Rien de superflu.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pôle Graphisme */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#0047FF] flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-anton text-2xl text-[#0047FF]">PÔLE GRAPHISME</h3>
              </div>
              {services2D.map((service, index) => (
                <div key={index} className="group p-6 border border-[#0047FF]/20 bg-white hover:border-[#0047FF] hover:shadow-[0_10px_40px_-10px_rgba(0,71,255,0.2)] transition-all duration-300 cursor-pointer" data-testid={`service-2d-${index}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 border border-[#0047FF]/20 flex items-center justify-center group-hover:bg-[#0047FF] group-hover:border-[#0047FF] transition-all duration-300">
                      <service.icon className="w-5 h-5 text-[#0047FF] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-anton text-lg text-[#0047FF]">{service.name}</h4>
                      <p className="font-futura text-[#0047FF]/60 text-sm">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-anton text-2xl text-[#0047FF]">{service.price}€</span>
                      <p className="font-futura text-[#0047FF]/40 text-xs">À partir de</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pôle 3D & Toys */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#0047FF] flex items-center justify-center">
                  <Box className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-anton text-2xl text-[#0047FF]">PÔLE 3D & TOYS</h3>
              </div>
              {services3D.map((service, index) => (
                <div key={index} className="group p-6 border border-[#0047FF]/20 bg-white hover:border-[#0047FF] hover:shadow-[0_10px_40px_-10px_rgba(0,71,255,0.2)] transition-all duration-300 cursor-pointer" data-testid={`service-3d-${index}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 border border-[#0047FF]/20 flex items-center justify-center group-hover:bg-[#0047FF] group-hover:border-[#0047FF] transition-all duration-300">
                      <service.icon className="w-5 h-5 text-[#0047FF] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-anton text-lg text-[#0047FF]">{service.name}</h4>
                      <p className="font-futura text-[#0047FF]/60 text-sm">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-anton text-2xl text-[#0047FF]">{service.price}€</span>
                      <p className="font-futura text-[#0047FF]/40 text-xs">À partir de</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* CTA Card */}
              <a href="#contact" className="group block p-6 bg-[#0047FF] text-white hover:shadow-[0_20px_40px_-10px_rgba(0,71,255,0.4)] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-anton text-lg">Besoin d'un devis ?</h4>
                    <p className="font-futura text-white/70 text-sm">Discutons de ton projet</p>
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY US SECTION ===== */}
      <section className="py-32 px-4 sm:px-6 lg:px-12 bg-[#0047FF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-futura text-white/60 text-sm uppercase tracking-widest mb-4">Pourquoi Nous ?</p>
            <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-white">
              Ce qui nous différencie
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, index) => (
              <div key={index} className="group p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:border-white transition-all duration-500">
                <div className="w-12 h-12 bg-white/20 group-hover:bg-[#0047FF] flex items-center justify-center mb-6 transition-all duration-300">
                  <Check className="w-6 h-6 text-white group-hover:text-white" />
                </div>
                <h3 className="font-anton text-xl text-white group-hover:text-[#0047FF] transition-colors duration-300">{item.title}</h3>
                <p className="font-futura text-white/70 group-hover:text-[#0047FF]/70 text-sm mt-2 transition-colors duration-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHOP SECTION ===== */}
      <section id="shop" className="py-32 px-4 sm:px-6 lg:px-12 bg-white" data-testid="shop-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
            <div>
              <p className="font-futura text-[#0047FF] text-sm uppercase tracking-widest mb-4">Le Drop ASSK</p>
              <h2 className="font-anton text-4xl sm:text-5xl text-[#0047FF]">Shop</h2>
            </div>
            <Link to="/shop" className="group inline-flex items-center gap-2 font-futura text-[#0047FF] hover:gap-4 transition-all duration-300">
              Voir tous les produits <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="group border border-[#0047FF]/20 bg-white hover:border-[#0047FF] hover:shadow-[0_20px_40px_-10px_rgba(0,71,255,0.15)] transition-all duration-300" data-testid={`home-product-${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-[#f8f9ff]">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.is_digital && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-[#0047FF] text-white font-futura text-xs flex items-center gap-1">
                      <Download className="w-3 h-3" /> DIGITAL
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-anton text-lg text-[#0047FF]">{product.name}</h3>
                  <p className="font-futura text-[#0047FF]/60 text-sm mt-1 line-clamp-1">{product.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-anton text-2xl text-[#0047FF]">{product.price.toFixed(0)}€</span>
                    <button onClick={() => handleAddToCart(product)} className="w-10 h-10 bg-[#0047FF] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200" data-testid={`home-add-cart-${product.id}`}>
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION ===== */}
      <section id="realisations" className="py-32 px-4 sm:px-6 lg:px-12 bg-[#fafbff]" data-testid="portfolio-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
            <div>
              <p className="font-futura text-[#0047FF] text-sm uppercase tracking-widest mb-4">Notre Travail</p>
              <h2 className="font-anton text-4xl sm:text-5xl text-[#0047FF]">Réalisations</h2>
            </div>
            <Link to="/realisations" className="group inline-flex items-center gap-2 font-futura text-[#0047FF] hover:gap-4 transition-all duration-300">
              Voir tout le portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolio.slice(0, 3).map((item) => (
              <a key={item.id} href={item.link || '#'} target={item.link ? '_blank' : '_self'} rel="noopener noreferrer" className="group block overflow-hidden" data-testid={`home-portfolio-${item.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0047FF]/5">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/0047FF/FFFFFF?text=${encodeURIComponent(item.title)}`; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0047FF] to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <span className="font-futura text-white/70 text-xs uppercase tracking-wider">{item.category}</span>
                      <h3 className="font-anton text-2xl text-white">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-12 bg-white" data-testid="contact-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="font-futura text-[#0047FF] text-sm uppercase tracking-widest mb-4">Contact</p>
              <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-[#0047FF] leading-tight">
                Discutons de<br />ton projet
              </h2>
              <p className="font-futura text-[#0047FF]/70 text-lg mt-6 max-w-md">
                Une idée en tête ? Un projet qui te tient à cœur ? Contacte-nous et transformons ta vision en réalité.
              </p>

              <div className="space-y-4 mt-12">
                <a href="mailto:amaurydebarros1607@gmail.com" className="group flex items-center gap-4 p-5 border border-[#0047FF]/20 hover:border-[#0047FF] hover:shadow-[0_10px_40px_-10px_rgba(0,71,255,0.15)] transition-all duration-300">
                  <div className="w-12 h-12 bg-[#0047FF] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-futura text-[#0047FF]/50 text-xs uppercase">Email</p>
                    <p className="font-anton text-[#0047FF]">amaurydebarros1607@gmail.com</p>
                  </div>
                </a>
                <a href="tel:+33665097008" className="group flex items-center gap-4 p-5 border border-[#0047FF]/20 hover:border-[#0047FF] hover:shadow-[0_10px_40px_-10px_rgba(0,71,255,0.15)] transition-all duration-300">
                  <div className="w-12 h-12 bg-[#0047FF] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-futura text-[#0047FF]/50 text-xs uppercase">Téléphone</p>
                    <p className="font-anton text-[#0047FF]">06 65 09 70 08</p>
                  </div>
                </a>
                <a href="https://instagram.com/amau.psd" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-5 border border-[#0047FF]/20 hover:border-[#0047FF] hover:shadow-[0_10px_40px_-10px_rgba(0,71,255,0.15)] transition-all duration-300">
                  <div className="w-12 h-12 bg-[#0047FF] flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-futura text-[#0047FF]/50 text-xs uppercase">Instagram</p>
                    <p className="font-anton text-[#0047FF]">@amau.psd</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-[#fafbff] p-8 lg:p-12">
              <form onSubmit={handleContactSubmit} className="space-y-6" data-testid="home-contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-futura text-[#0047FF]/60 text-xs uppercase tracking-wider block mb-2">Nom</label>
                    <input type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="w-full px-4 py-4 bg-white border border-[#0047FF]/20 text-[#0047FF] font-futura focus:border-[#0047FF] focus:outline-none transition-colors duration-200" data-testid="home-contact-name" />
                  </div>
                  <div>
                    <label className="font-futura text-[#0047FF]/60 text-xs uppercase tracking-wider block mb-2">Email</label>
                    <input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full px-4 py-4 bg-white border border-[#0047FF]/20 text-[#0047FF] font-futura focus:border-[#0047FF] focus:outline-none transition-colors duration-200" data-testid="home-contact-email-input" />
                  </div>
                </div>
                <div>
                  <label className="font-futura text-[#0047FF]/60 text-xs uppercase tracking-wider block mb-2">Sujet</label>
                  <input type="text" value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} className="w-full px-4 py-4 bg-white border border-[#0047FF]/20 text-[#0047FF] font-futura focus:border-[#0047FF] focus:outline-none transition-colors duration-200" data-testid="home-contact-subject" />
                </div>
                <div>
                  <label className="font-futura text-[#0047FF]/60 text-xs uppercase tracking-wider block mb-2">Message</label>
                  <textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} rows={5} className="w-full px-4 py-4 bg-white border border-[#0047FF]/20 text-[#0047FF] font-futura resize-none focus:border-[#0047FF] focus:outline-none transition-colors duration-200" data-testid="home-contact-message" />
                </div>
                <button type="submit" disabled={loading} className="group w-full flex items-center justify-center gap-3 py-5 bg-[#0047FF] text-white font-anton text-lg uppercase transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(0,71,255,0.4)] disabled:opacity-50" data-testid="home-contact-submit">
                  {loading ? 'Envoi...' : 'Envoyer le message'}
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-32 px-4 sm:px-6 lg:px-12 bg-[#0047FF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,...')] opacity-5" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            Prêt à laisser<br />ta marque ?
          </h2>
          <p className="font-futura text-white/70 text-lg mt-6 max-w-lg mx-auto">
            Plus tu attends, plus tes concurrents avancent. Changeons ça ensemble.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a href="#contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0047FF] font-anton text-lg uppercase transition-all duration-300 hover:gap-5 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]">
              Commencer maintenant
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
