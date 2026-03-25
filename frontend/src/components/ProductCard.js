import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} ajouté au panier`);
  };

  return (
    <div
      className="border-2 border-[#0047FF] bg-white product-card group"
      data-testid={`product-card-${product.id}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden border-b-2 border-[#0047FF]">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-[#0047FF] text-white font-futura text-xs px-2 py-1">
            Plus que {product.stock} !
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-white text-[#0047FF] border-2 border-[#0047FF] font-futura text-xs px-2 py-1">
            Rupture de stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-anton text-xl text-[#0047FF] uppercase">
          {product.name}
        </h3>
        <p className="font-futura text-[#0047FF]/70 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-anton text-2xl text-[#0047FF]">
            {product.price.toFixed(2)} €
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[#0047FF] text-white font-futura font-semibold border-2 border-[#0047FF] hover:bg-white hover:text-[#0047FF] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid={`add-to-cart-${product.id}`}
          >
            <ShoppingBag className="w-4 h-4" />
            AJOUTER
          </button>
        </div>
      </div>
    </div>
  );
};
