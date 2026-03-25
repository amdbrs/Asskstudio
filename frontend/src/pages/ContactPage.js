import { useState } from 'react';
import { Mail, Phone, Instagram, Send } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      toast.success('Message envoyé avec succès !');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white" data-testid="contact-page">
      <Header />

      {/* Hero */}
      <section className="bg-[#0047FF] py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl text-white uppercase">
            DISCUTONS DE TON PROJET
          </h1>
          <p className="font-futura text-white/80 text-lg mt-4 max-w-xl">
            Une idée ? Un projet ? Contacte-nous et donnons vie à ta vision.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-anton text-3xl text-[#0047FF] mb-8">
                COORDONNÉES
              </h2>
              
              <div className="space-y-6">
                <a
                  href="mailto:amaurydebarros1607@gmail.com"
                  className="flex items-center gap-4 p-6 border-2 border-[#0047FF] bg-white service-card"
                  data-testid="contact-email"
                >
                  <div className="p-3 bg-[#0047FF]">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-futura text-sm text-[#0047FF]/70">Email</span>
                    <p className="font-anton text-lg text-[#0047FF]">
                      amaurydebarros1607@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+33665097008"
                  className="flex items-center gap-4 p-6 border-2 border-[#0047FF] bg-white service-card"
                  data-testid="contact-phone"
                >
                  <div className="p-3 bg-[#0047FF]">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-futura text-sm text-[#0047FF]/70">Téléphone</span>
                    <p className="font-anton text-lg text-[#0047FF]">
                      06 65 09 70 08
                    </p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/amau.psd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 border-2 border-[#0047FF] bg-white service-card"
                  data-testid="contact-instagram"
                >
                  <div className="p-3 bg-[#0047FF]">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-futura text-sm text-[#0047FF]/70">Instagram</span>
                    <p className="font-anton text-lg text-[#0047FF]">
                      @amau.psd
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-anton text-3xl text-[#0047FF] mb-8">
                ENVOYER UN MESSAGE
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <label className="font-futura text-sm text-[#0047FF] block mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura focus:shadow-[4px_4px_0_0_#0047FF] outline-none"
                    placeholder="Jean Dupont"
                    data-testid="contact-name-input"
                  />
                </div>

                <div>
                  <label className="font-futura text-sm text-[#0047FF] block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura focus:shadow-[4px_4px_0_0_#0047FF] outline-none"
                    placeholder="jean@exemple.com"
                    data-testid="contact-email-input"
                  />
                </div>

                <div>
                  <label className="font-futura text-sm text-[#0047FF] block mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura focus:shadow-[4px_4px_0_0_#0047FF] outline-none"
                    placeholder="Demande de devis"
                    data-testid="contact-subject-input"
                  />
                </div>

                <div>
                  <label className="font-futura text-sm text-[#0047FF] block mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura focus:shadow-[4px_4px_0_0_#0047FF] outline-none resize-none"
                    placeholder="Décrivez votre projet..."
                    data-testid="contact-message-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#0047FF] text-white font-anton text-xl uppercase border-2 border-[#0047FF] shadow-[6px_6px_0_0_#0047FF] hover:bg-white hover:text-[#0047FF] transition-colors duration-200 disabled:opacity-50"
                  data-testid="contact-submit-button"
                >
                  {loading ? 'ENVOI EN COURS...' : 'ENVOYER'}
                  <Send className="w-5 h-5" />
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
