import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      pollPaymentStatus(sessionId);
    } else {
      setStatus('error');
    }
  }, [searchParams]);

  const pollPaymentStatus = async (sessionId, attempts = 0) => {
    const maxAttempts = 5;
    const pollInterval = 2000;

    if (attempts >= maxAttempts) {
      setStatus('timeout');
      return;
    }

    try {
      const response = await fetch(`${API}/checkout/status/${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to check status');
      }

      const data = await response.json();
      setPaymentData(data);

      if (data.payment_status === 'paid') {
        setStatus('success');
        return;
      } else if (data.status === 'expired') {
        setStatus('expired');
        return;
      }

      // Continue polling
      setTimeout(() => pollPaymentStatus(sessionId, attempts + 1), pollInterval);
    } catch (error) {
      console.error('Error checking payment status:', error);
      if (attempts < maxAttempts - 1) {
        setTimeout(() => pollPaymentStatus(sessionId, attempts + 1), pollInterval);
      } else {
        setStatus('error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white" data-testid="checkout-success-page">
      <Header />

      <section className="py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-xl mx-auto text-center">
          {status === 'loading' && (
            <div data-testid="payment-loading">
              <div className="w-20 h-20 mx-auto border-2 border-[#0047FF] flex items-center justify-center mb-8">
                <Loader2 className="w-10 h-10 text-[#0047FF] animate-spin" />
              </div>
              <h1 className="font-anton text-3xl text-[#0047FF] mb-4">
                VÉRIFICATION DU PAIEMENT...
              </h1>
              <p className="font-futura text-[#0047FF]/70">
                Veuillez patienter pendant que nous vérifions votre paiement.
              </p>
            </div>
          )}

          {status === 'success' && (
            <div data-testid="payment-success">
              <div className="w-20 h-20 mx-auto bg-[#0047FF] flex items-center justify-center mb-8">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-anton text-4xl text-[#0047FF] mb-4">
                MERCI POUR VOTRE COMMANDE !
              </h1>
              <p className="font-futura text-[#0047FF]/70 mb-8">
                Votre paiement a été confirmé. Vous recevrez un email de confirmation sous peu.
              </p>
              {paymentData && (
                <div className="border-2 border-[#0047FF] p-6 mb-8 text-left">
                  <p className="font-futura text-[#0047FF]">
                    <strong>Total :</strong>{' '}
                    {(paymentData.amount_total / 100).toFixed(2)} {paymentData.currency?.toUpperCase()}
                  </p>
                </div>
              )}
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0047FF] text-white font-anton text-xl uppercase border-2 border-[#0047FF] shadow-[6px_6px_0_0_#0047FF] hover:bg-white hover:text-[#0047FF] transition-colors duration-200"
                data-testid="back-to-shop"
              >
                RETOUR AU SHOP
              </Link>
            </div>
          )}

          {(status === 'error' || status === 'timeout' || status === 'expired') && (
            <div data-testid="payment-error">
              <div className="w-20 h-20 mx-auto border-2 border-[#0047FF] flex items-center justify-center mb-8">
                <XCircle className="w-10 h-10 text-[#0047FF]" />
              </div>
              <h1 className="font-anton text-3xl text-[#0047FF] mb-4">
                {status === 'expired' ? 'SESSION EXPIRÉE' : 'ERREUR DE PAIEMENT'}
              </h1>
              <p className="font-futura text-[#0047FF]/70 mb-8">
                {status === 'expired'
                  ? 'Votre session de paiement a expiré. Veuillez réessayer.'
                  : 'Une erreur est survenue lors de la vérification de votre paiement.'}
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0047FF] text-white font-anton text-xl uppercase border-2 border-[#0047FF] shadow-[6px_6px_0_0_#0047FF] hover:bg-white hover:text-[#0047FF] transition-colors duration-200"
              >
                RETOUR AU SHOP
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
