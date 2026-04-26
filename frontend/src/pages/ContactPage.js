import { useState } from 'react';
import { Mail, Phone, Instagram, ArrowRight, Check, MapPin } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.3, 1] } }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Message envoyé avec succès !');
        setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
      } else {
        throw new Error('Erreur');
      }
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = ['Graphisme', 'Site Web', '3D & Toys', 'Pack Complet', 'Autre'];
  const budgets = ['< 500€', '500€ - 1000€', '1000€ - 2500€', '2500€ - 5000€', '> 5000€'];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" data-testid="contact-page">
      <SEO 
        title="Contact | ASSK Studio"
        description="Contactez ASSK Studio pour vos projets de graphisme, création de sites web et modélisation 3D en Auvergne. Devis gratuit sous 24h."
      />
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-sm text-white/40">(Contact)</span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mt-2 mb-6">
                Discutons de
                <br />
                <span className="text-[#0047FF]">votre projet</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-lg mb-12">
                Une idée en tête ? Un projet qui vous tient à cœur ? Contactez-nous et transformons votre vision en réalité.
              </p>

              {/* Contact cards */}
              <div className="space-y-4">
                <a href="mailto:amaurydebarros1607@gmail.com" className="group flex items-center gap-4 p-5 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-[#0047FF]/20 transition-colors">
                    <Mail className="w-5 h-5 text-white/70 group-hover:text-[#0047FF]" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/40 uppercase mb-1">Email</p>
                    <p className="font-medium">amaurydebarros1607@gmail.com</p>
                  </div>
                </a>
                <a href="tel:+33665097008" className="group flex items-center gap-4 p-5 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-[#0047FF]/20 transition-colors">
                    <Phone className="w-5 h-5 text-white/70 group-hover:text-[#0047FF]" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/40 uppercase mb-1">Téléphone</p>
                    <p className="font-medium">06 65 09 70 08</p>
                  </div>
                </a>
                <a href="https://instagram.com/amau.psd" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-5 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-[#0047FF]/20 transition-colors">
                    <Instagram className="w-5 h-5 text-white/70 group-hover:text-[#0047FF]" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/40 uppercase mb-1">Instagram</p>
                    <p className="font-medium">@amau.psd</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-5 border border-white/10">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/40 uppercase mb-1">Localisation</p>
                    <p className="font-medium text-white/70">Clermont-Ferrand, Vichy, Moulins</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#171717] border border-white/10 p-8 md:p-10"
            >
              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-[#0047FF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-[#0047FF]" />
                  </div>
                  <h3 className="font-heading text-2xl font-medium mb-4">Message envoyé !</h3>
                  <p className="text-white/60">Nous vous répondrons sous 24h.</p>
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-2xl font-medium mb-2">Demande de devis</h2>
                  <p className="text-white/50 text-sm mb-8">Réponse personnalisée sous 24h</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="font-mono text-xs text-white/40 uppercase mb-2 block">Nom *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:border-[#0047FF] transition-colors"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-xs text-white/40 uppercase mb-2 block">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:border-[#0047FF] transition-colors"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-xs text-white/40 uppercase mb-2 block">Téléphone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:border-[#0047FF] transition-colors"
                        placeholder="06 00 00 00 00"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs text-white/40 uppercase mb-2 block">Service souhaité *</label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white focus:border-[#0047FF] transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Sélectionnez un service</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-xs text-white/40 uppercase mb-2 block">Budget estimé</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white focus:border-[#0047FF] transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Sélectionnez un budget</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-xs text-white/40 uppercase mb-2 block">Votre message *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:border-[#0047FF] transition-colors resize-none"
                        placeholder="Décrivez votre projet..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] font-heading font-medium text-base transition-all duration-300 hover:bg-[#0047FF] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
