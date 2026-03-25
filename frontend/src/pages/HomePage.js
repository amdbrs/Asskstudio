import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { ArrowRight, Palette, Box, ShoppingBag, Mail, Phone, Instagram, Send, ExternalLink, PenTool, Layers, FileText, Monitor, Printer, Star } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const services2D = [
  { name: 'Pack Logo Signature', price: '350', description: 'Logo professionnel + déclinaisons', icon: 'PenTool' },
  { name: 'Identité Visuelle Complète', price: '750', description: 'Logo, charte graphique, supports', icon: 'Layers' },
  { name: 'Papeterie & Édition', price: '150', description: 'Cartes de visite, flyers, brochures', icon: 'FileText' },
  { name: 'Site Web Vitrine', price: '950', description: 'Design + développement responsive', icon: 'Monitor' }
];

const services3D = [
  { name: 'Modélisation 3D (ZBrush)', price: '200', description: 'Création de personnages et objets', icon: 'Box' },
  { name: 'Impression Résine 4K', price: '50', description: 'Prototypage haute définition', icon: 'Printer' },
  { name: 'Pack Art Toy Custom', price: '390', description: 'Design + modélisation + impression', icon: 'Star' }
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    // Seed data on first load
    fetch(`${API}/seed`, { method: 'POST' }).catch(() => {});
    // Fetch products and portfolio
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
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] bg-[#0047FF] flex items-center overflow-hidden">
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
            <h1 className="font-anton text-6xl sm:text-7xl lg:text-[8rem] text-white leading-none uppercase" data-testid="hero-title">
              LAISSE<br />TA MARQUE.
            </h1>
            <p className="font-futura text-white/80 text-lg sm:text-xl mt-8 max-w-xl">
              Studio créatif spécialisé en graphisme, modélisation 3D et création d'art toys sur mesure.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0047FF] font-anton text-xl uppercase border-2 border-white shadow-[6px_6px_0_0_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-transform duration-200" data-testid="hero-cta-button">
                DÉMARRER <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#shop" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-anton text-xl uppercase border-2 border-white hover:bg-white hover:text-[#0047FF] transition-colors duration-200">
                VOIR LE SHOP
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white border-y-2 border-[#0047FF] py-3">
          <Marquee gradient={false} speed={50}>
            <span className="font-anton text-2xl text-[#0047FF] mx-8">GRAPHISME</span>
            <span className="text-[#0047FF] mx-4">•</span>
            <span className="font-anton text-2xl text-[#0047FF] mx-8">MODÉLISATION 3D</span>
            <span className="text-[#0047FF] mx-4">•</span>
            <span className="font-anton text-2xl text-[#0047FF] mx-8">ART TOYS</span>
            <span className="text-[#0047FF] mx-4">•</span>
            <span className="font-anton text-2xl text-[#0047FF] mx-8">IMPRESSION RÉSINE</span>
            <span className="text-[#0047FF] mx-4">•</span>
            <span className="font-anton text-2xl text-[#0047FF] mx-8">IDENTITÉ VISUELLE</span>
            <span className="text-[#0047FF] mx-4">•</span>
          </Marquee>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-12" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-anton text-5xl sm:text-6xl text-[#0047FF] mb-16">NOS SERVICES</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Pôle Graphisme */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 border-2 border-[#0047FF]">
                  <Palette className="w-6 h-6 text-[#0047FF]" />
                </div>
                <h3 className="font-anton text-3xl text-[#0047FF]">PÔLE GRAPHISME</h3>
              </div>
              <div className="space-y-4">
                {services2D.map((service, index) => {
                  const IconComponent = { PenTool, Layers, FileText, Monitor }[service.icon];
                  return (
                    <div key={index} className="border-2 border-[#0047FF] bg-white service-card overflow-hidden" data-testid={`service-2d-${index}`}>
                      <div className="flex items-center p-4">
                        <div className="w-12 h-12 border-2 border-[#0047FF] flex items-center justify-center mr-4 flex-shrink-0">
                          {IconComponent && <IconComponent className="w-6 h-6 text-[#0047FF]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-anton text-lg text-[#0047FF]">{service.name}</h4>
                          <p className="font-futura text-[#0047FF]/70 text-sm">{service.description}</p>
                        </div>
                        <span className="font-anton text-2xl text-[#0047FF] ml-4 flex-shrink-0">{service.price} €</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pôle 3D & Toys */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 border-2 border-[#0047FF]">
                  <Box className="w-6 h-6 text-[#0047FF]" />
                </div>
                <h3 className="font-anton text-3xl text-[#0047FF]">PÔLE 3D & TOYS</h3>
              </div>
              <div className="space-y-4">
                {services3D.map((service, index) => {
                  const IconComponent = { Box, Printer, Star }[service.icon];
                  return (
                    <div key={index} className="border-2 border-[#0047FF] bg-white service-card overflow-hidden" data-testid={`service-3d-${index}`}>
                      <div className="flex items-center p-4">
                        <div className="w-12 h-12 border-2 border-[#0047FF] flex items-center justify-center mr-4 flex-shrink-0">
                          {IconComponent && <IconComponent className="w-6 h-6 text-[#0047FF]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-anton text-lg text-[#0047FF]">{service.name}</h4>
                          <p className="font-futura text-[#0047FF]/70 text-sm">{service.description}</p>
                        </div>
                        <span className="font-anton text-2xl text-[#0047FF] ml-4 flex-shrink-0">{service.price} €</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SHOP SECTION (LE DROP ASSK) ===== */}
      <section id="shop" className="py-24 px-4 sm:px-6 lg:px-12 bg-[#0047FF]" data-testid="shop-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-anton text-5xl sm:text-6xl text-white">LE DROP ASSK</h2>
              <p className="font-futura text-white/70 mt-2">Éditions limitées, prints exclusifs et merch studio</p>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0047FF] font-anton uppercase border-2 border-white hover:-translate-y-1 transition-transform duration-200">
              VOIR TOUT <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="border-2 border-white bg-white product-card group" data-testid={`home-product-${product.id}`}>
                <div className="relative aspect-square overflow-hidden border-b-2 border-[#0047FF]">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-anton text-lg text-[#0047FF] uppercase">{product.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-anton text-2xl text-[#0047FF]">{product.price.toFixed(2)} €</span>
                    <button onClick={() => handleAddToCart(product)} className="flex items-center gap-2 px-4 py-2 bg-[#0047FF] text-white font-futura font-semibold border-2 border-[#0047FF] hover:bg-white hover:text-[#0047FF] transition-colors duration-200" data-testid={`home-add-cart-${product.id}`}>
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0047FF] font-anton uppercase">
              VOIR TOUT <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION (RÉALISATIONS) ===== */}
      <section id="realisations" className="py-24 px-4 sm:px-6 lg:px-12" data-testid="portfolio-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-anton text-5xl sm:text-6xl text-[#0047FF]">RÉALISATIONS</h2>
              <p className="font-futura text-[#0047FF]/70 mt-2">Nos derniers projets en graphisme et 3D</p>
            </div>
            <Link to="/realisations" className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-[#0047FF] text-white font-anton uppercase border-2 border-[#0047FF] hover:-translate-y-1 transition-transform duration-200">
              VOIR TOUT <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.slice(0, 3).map((item) => (
              <a key={item.id} href={item.link || '#'} target={item.link ? '_blank' : '_self'} rel="noopener noreferrer" className="border-2 border-[#0047FF] bg-white portfolio-item group block" data-testid={`home-portfolio-${item.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-[#0047FF] bg-[#0047FF]/10">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/0047FF/FFFFFF?text=${encodeURIComponent(item.title)}`; }} />
                  {item.link && (
                    <div className="absolute top-3 right-3 p-2 bg-white border-2 border-[#0047FF] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ExternalLink className="w-4 h-4 text-[#0047FF]" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <span className="font-futura text-xs text-[#0047FF]/70 uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-anton text-xl text-[#0047FF] uppercase mt-1">{item.title}</h3>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/realisations" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0047FF] text-white font-anton uppercase">
              VOIR TOUT <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-12 bg-[#0047FF]" data-testid="contact-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-anton text-5xl sm:text-6xl text-white mb-12">DISCUTONS DE TON PROJET</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <div className="space-y-6">
                <a href="mailto:amaurydebarros1607@gmail.com" className="flex items-center gap-4 p-6 border-2 border-white bg-white service-card" data-testid="home-contact-email">
                  <div className="p-3 bg-[#0047FF]">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-futura text-sm text-[#0047FF]/70">Email</span>
                    <p className="font-anton text-lg text-[#0047FF]">amaurydebarros1607@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+33665097008" className="flex items-center gap-4 p-6 border-2 border-white bg-white service-card" data-testid="home-contact-phone">
                  <div className="p-3 bg-[#0047FF]">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-futura text-sm text-[#0047FF]/70">Téléphone</span>
                    <p className="font-anton text-lg text-[#0047FF]">06 65 09 70 08</p>
                  </div>
                </a>

                <a href="https://instagram.com/amau.psd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 border-2 border-white bg-white service-card" data-testid="home-contact-instagram">
                  <div className="p-3 bg-[#0047FF]">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-futura text-sm text-[#0047FF]/70">Instagram</span>
                    <p className="font-anton text-lg text-[#0047FF]">@amau.psd</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleContactSubmit} className="space-y-6" data-testid="home-contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Nom" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="px-4 py-3 border-2 border-white bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none focus:shadow-[4px_4px_0_0_rgba(255,255,255,0.5)]" data-testid="home-contact-name" />
                  <input type="email" placeholder="Email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="px-4 py-3 border-2 border-white bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none focus:shadow-[4px_4px_0_0_rgba(255,255,255,0.5)]" data-testid="home-contact-email-input" />
                </div>
                <input type="text" placeholder="Sujet" value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} className="w-full px-4 py-3 border-2 border-white bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none focus:shadow-[4px_4px_0_0_rgba(255,255,255,0.5)]" data-testid="home-contact-subject" />
                <textarea placeholder="Message" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} rows={5} className="w-full px-4 py-3 border-2 border-white bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none resize-none focus:shadow-[4px_4px_0_0_rgba(255,255,255,0.5)]" data-testid="home-contact-message" />
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-4 bg-white text-[#0047FF] font-anton text-xl uppercase border-2 border-white shadow-[6px_6px_0_0_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-transform duration-200 disabled:opacity-50" data-testid="home-contact-submit">
                  {loading ? 'ENVOI...' : 'ENVOYER'} <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
