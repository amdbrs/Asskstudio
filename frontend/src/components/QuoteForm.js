import { useState } from 'react';
import { Send, CheckCircle, Palette, Globe, Box, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const projectTypes = [
  { 
    id: 'logo', 
    label: 'Création de Logo', 
    icon: Palette,
    category: 'graphisme'
  },
  { 
    id: 'identite', 
    label: 'Identité Visuelle Complète', 
    icon: Palette,
    category: 'graphisme'
  },
  { 
    id: 'papeterie', 
    label: 'Papeterie & Édition', 
    icon: Palette,
    category: 'graphisme'
  },
  { 
    id: 'site-vitrine', 
    label: 'Site Web Vitrine', 
    icon: Globe,
    category: 'web'
  },
  { 
    id: 'site-complet', 
    label: 'Site Web 5-10 pages', 
    icon: Globe,
    category: 'web'
  },
  { 
    id: 'ecommerce', 
    label: 'Site E-commerce', 
    icon: Globe,
    category: 'web'
  },
  { 
    id: 'modelisation', 
    label: 'Modélisation 3D', 
    icon: Box,
    category: '3d'
  },
  { 
    id: 'impression', 
    label: 'Impression 3D', 
    icon: Box,
    category: '3d'
  },
  { 
    id: 'art-toy', 
    label: 'Art Toy Personnalisé', 
    icon: Box,
    category: '3d'
  },
];

const budgetRanges = [
  { id: 'small', label: '< 500€' },
  { id: 'medium', label: '500€ - 1500€' },
  { id: 'large', label: '1500€ - 3000€' },
  { id: 'xlarge', label: '> 3000€' },
  { id: 'unknown', label: 'Je ne sais pas encore' },
];

const deadlines = [
  { id: 'urgent', label: 'Urgent (< 2 semaines)' },
  { id: 'normal', label: 'Normal (2-4 semaines)' },
  { id: 'flexible', label: 'Flexible (1-2 mois)' },
  { id: 'no-rush', label: 'Pas de deadline' },
];

export const QuoteForm = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    projectTypes: [],
    budget: '',
    deadline: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    description: '',
  });

  const handleProjectTypeToggle = (typeId) => {
    setFormData(prev => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(typeId)
        ? prev.projectTypes.filter(id => id !== typeId)
        : [...prev.projectTypes, typeId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format the message for the contact API
      const selectedProjects = formData.projectTypes
        .map(id => projectTypes.find(p => p.id === id)?.label)
        .join(', ');
      
      const budgetLabel = budgetRanges.find(b => b.id === formData.budget)?.label || '';
      const deadlineLabel = deadlines.find(d => d.id === formData.deadline)?.label || '';

      const message = `
DEMANDE DE DEVIS

Projets souhaités: ${selectedProjects}
Budget: ${budgetLabel}
Délai: ${deadlineLabel}
${formData.company ? `Entreprise: ${formData.company}` : ''}
${formData.phone ? `Téléphone: ${formData.phone}` : ''}

Description du projet:
${formData.description}
      `.trim();

      const response = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Demande de devis - ${selectedProjects}`,
          message: message
        })
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success('Demande envoyée ! Réponse sous 24h.');
        if (onSuccess) onSuccess();
      } else {
        throw new Error('Erreur serveur');
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi. Réessayez ou contactez-nous par WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.projectTypes.length > 0;
    if (step === 2) return formData.budget && formData.deadline;
    if (step === 3) return formData.name && formData.email && formData.description;
    return false;
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scaleIn">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="font-anton text-2xl text-[#0047FF] mb-2">Demande envoyée !</h3>
        <p className="font-futura text-gray-600">
          Nous vous répondrons sous 24h avec une proposition personnalisée.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center font-anton text-sm transition-all duration-300 ${
                step >= s ? 'bg-[#0047FF] text-white' : 'bg-[#0047FF]/10 text-[#0047FF]/50'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                step > s ? 'bg-[#0047FF]' : 'bg-[#0047FF]/10'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Project Types */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-anton text-xl text-[#0047FF] mb-2">Quel type de projet ?</h3>
            <p className="font-futura text-gray-600 text-sm">Sélectionnez un ou plusieurs services</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {projectTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.projectTypes.includes(type.id);
              
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleProjectTypeToggle(type.id)}
                  className={`p-4 text-left border-2 transition-all duration-300 ${
                    isSelected 
                      ? 'border-[#0047FF] bg-[#0047FF]/5 shadow-lg' 
                      : 'border-[#0047FF]/10 hover:border-[#0047FF]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#0047FF] text-white' : 'bg-[#0047FF]/10 text-[#0047FF]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="font-anton text-[#0047FF] text-sm flex-1">{type.label}</p>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-[#0047FF]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Budget & Timeline */}
      {step === 2 && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h3 className="font-anton text-xl text-[#0047FF] mb-4">Votre budget ?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {budgetRanges.map((range) => (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, budget: range.id }))}
                  className={`p-3 text-center border-2 transition-all duration-300 ${
                    formData.budget === range.id 
                      ? 'border-[#0047FF] bg-[#0047FF] text-white' 
                      : 'border-[#0047FF]/10 text-[#0047FF] hover:border-[#0047FF]/30'
                  }`}
                >
                  <span className="font-futura text-sm">{range.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-anton text-xl text-[#0047FF] mb-4">Vos délais ?</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {deadlines.map((deadline) => (
                <button
                  key={deadline.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, deadline: deadline.id }))}
                  className={`p-3 text-center border-2 transition-all duration-300 ${
                    formData.deadline === deadline.id 
                      ? 'border-[#0047FF] bg-[#0047FF] text-white' 
                      : 'border-[#0047FF]/10 text-[#0047FF] hover:border-[#0047FF]/30'
                  }`}
                >
                  <span className="font-futura text-sm">{deadline.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Contact Info */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-anton text-xl text-[#0047FF] mb-2">Vos coordonnées</h3>
            <p className="font-futura text-gray-600 text-sm">Pour vous envoyer le devis personnalisé</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-futura text-[#0047FF] text-sm mb-2">Nom *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-[#0047FF]/20 focus:border-[#0047FF] outline-none font-futura transition-colors"
                placeholder="Votre nom"
                required
              />
            </div>
            <div>
              <label className="block font-futura text-[#0047FF] text-sm mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-[#0047FF]/20 focus:border-[#0047FF] outline-none font-futura transition-colors"
                placeholder="votre@email.com"
                required
              />
            </div>
            <div>
              <label className="block font-futura text-[#0047FF] text-sm mb-2">Téléphone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-[#0047FF]/20 focus:border-[#0047FF] outline-none font-futura transition-colors"
                placeholder="06 00 00 00 00"
              />
            </div>
            <div>
              <label className="block font-futura text-[#0047FF] text-sm mb-2">Entreprise</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-[#0047FF]/20 focus:border-[#0047FF] outline-none font-futura transition-colors"
                placeholder="Nom de votre entreprise"
              />
            </div>
          </div>

          <div>
            <label className="block font-futura text-[#0047FF] text-sm mb-2">Décrivez votre projet *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-[#0047FF]/20 focus:border-[#0047FF] outline-none font-futura transition-colors resize-none"
              rows={4}
              placeholder="Parlez-nous de votre projet, vos attentes, votre vision..."
              required
            />
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6 border-t border-[#0047FF]/10">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            className="px-6 py-3 font-anton text-[#0047FF] border-2 border-[#0047FF] hover:bg-[#0047FF]/5 transition-colors"
          >
            Retour
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep(s => s + 1)}
            disabled={!canProceed()}
            className={`px-8 py-3 font-anton text-white transition-all duration-300 ${
              canProceed() 
                ? 'bg-[#0047FF] hover:shadow-lg hover:-translate-y-1' 
                : 'bg-[#0047FF]/30 cursor-not-allowed'
            }`}
          >
            Continuer
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canProceed() || loading}
            className={`px-8 py-3 font-anton text-white flex items-center gap-2 transition-all duration-300 ${
              canProceed() && !loading
                ? 'bg-[#0047FF] hover:shadow-lg hover:-translate-y-1' 
                : 'bg-[#0047FF]/30 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                Envoi...
              </>
            ) : (
              <>
                Envoyer ma demande
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default QuoteForm;
