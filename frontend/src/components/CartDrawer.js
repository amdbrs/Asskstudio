import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CartDrawer = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    clearCart
  } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!customerName.trim() || !customerEmail.trim()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/checkout/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            product_id: item.id,
            quantity: item.quantity
          })),
          customer_name: customerName,
          customer_email: customerEmail,
          origin_url: window.location.origin
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Erreur lors du checkout');
      }

      const data = await response.json();
      clearCart();
      window.location.href = data.url;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50" data-testid="cart-drawer">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#0047FF]/20"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white border-l-4 border-[#0047FF] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-[#0047FF]">
          <h2 className="font-anton text-2xl text-[#0047FF]">PANIER</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 border-2 border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
            data-testid="close-cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <p className="text-[#0047FF] font-futura text-center py-12">
              Votre panier est vide
            </p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border-2 border-[#0047FF]"
                  data-testid={`cart-item-${item.id}`}
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover border-2 border-[#0047FF]"
                  />
                  <div className="flex-1">
                    <h3 className="font-anton text-[#0047FF]">{item.name}</h3>
                    <p className="font-futura text-[#0047FF]">
                      {item.price.toFixed(2)} €
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 border-2 border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
                        data-testid={`decrease-${item.id}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-futura text-[#0047FF] w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 border-2 border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
                        data-testid={`increase-${item.id}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 ml-auto text-[#0047FF] hover:text-red-500 transition-colors duration-200"
                        data-testid={`remove-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Form */}
        {cartItems.length > 0 && (
          <div className="border-t-2 border-[#0047FF] p-6 space-y-4">
            <input
              type="text"
              placeholder="Votre nom"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura focus:shadow-[4px_4px_0_0_#0047FF] outline-none"
              data-testid="customer-name-input"
            />
            <input
              type="email"
              placeholder="Votre email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura focus:shadow-[4px_4px_0_0_#0047FF] outline-none"
              data-testid="customer-email-input"
            />

            <div className="flex justify-between items-center py-4 border-t-2 border-[#0047FF]">
              <span className="font-anton text-xl text-[#0047FF]">TOTAL</span>
              <span className="font-anton text-2xl text-[#0047FF]">
                {cartTotal.toFixed(2)} €
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 bg-[#0047FF] text-white font-anton text-xl uppercase shadow-[6px_6px_0_0_#0047FF] border-2 border-[#0047FF] hover:bg-white hover:text-[#0047FF] transition-colors duration-200 disabled:opacity-50"
              data-testid="checkout-button"
            >
              {loading ? 'CHARGEMENT...' : 'COMMANDER'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
