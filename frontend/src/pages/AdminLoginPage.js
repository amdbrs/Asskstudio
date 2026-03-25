import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Connexion réussie');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0047FF] flex items-center justify-center px-4" data-testid="admin-login-page">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img
              src={LOGO_URL}
              alt="Assk Studio"
              className="h-20 w-auto mx-auto brightness-0 invert"
            />
          </Link>
          <h1 className="font-anton text-3xl text-white mt-4">
            ADMINISTRATION
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-white p-8 shadow-[8px_8px_0_0_rgba(255,255,255,0.3)]"
          data-testid="admin-login-form"
        >
          <div className="mb-6">
            <label className="font-futura text-sm text-[#0047FF] block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura focus:shadow-[4px_4px_0_0_#0047FF] outline-none"
              placeholder="admin@assk.studio"
              data-testid="admin-email-input"
            />
          </div>

          <div className="mb-8">
            <label className="font-futura text-sm text-[#0047FF] block mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura focus:shadow-[4px_4px_0_0_#0047FF] outline-none"
              placeholder="••••••••"
              data-testid="admin-password-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#0047FF] text-white font-anton text-xl uppercase border-2 border-[#0047FF] shadow-[6px_6px_0_0_#0047FF] hover:bg-white hover:text-[#0047FF] transition-colors duration-200 disabled:opacity-50"
            data-testid="admin-submit-button"
          >
            {loading ? 'CHARGEMENT...' : 'SE CONNECTER'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="font-futura text-white/80 hover:text-white">
            ← Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}
