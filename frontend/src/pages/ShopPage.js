import { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = filter === 'all'
    ? products
    : products.filter((p) => p.category === filter);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-white" data-testid="shop-page">
      <Header />

      {/* Hero */}
      <section className="bg-[#0047FF] py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl text-white uppercase">
            LE DROP ASSK
          </h1>
          <p className="font-futura text-white/80 text-lg mt-4 max-w-xl">
            Éditions limitées, prints exclusifs et merch studio.
          </p>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-white border-y-2 border-[#0047FF] py-3">
        <Marquee gradient={false} speed={40}>
          <span className="font-anton text-xl text-[#0047FF] mx-8">
            ART TOYS
          </span>
          <span className="text-[#0047FF] mx-4">•</span>
          <span className="font-anton text-xl text-[#0047FF] mx-8">
            POSTERS
          </span>
          <span className="text-[#0047FF] mx-4">•</span>
          <span className="font-anton text-xl text-[#0047FF] mx-8">
            T-SHIRTS
          </span>
          <span className="text-[#0047FF] mx-4">•</span>
          <span className="font-anton text-xl text-[#0047FF] mx-8">
            HOODIES
          </span>
          <span className="text-[#0047FF] mx-4">•</span>
          <span className="font-anton text-xl text-[#0047FF] mx-8">
            ÉDITIONS LIMITÉES
          </span>
          <span className="text-[#0047FF] mx-4">•</span>
        </Marquee>
      </div>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-12 border-b-2 border-[#0047FF]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 font-anton uppercase border-2 border-[#0047FF] transition-colors duration-200 ${
                  filter === cat
                    ? 'bg-[#0047FF] text-white'
                    : 'bg-white text-[#0047FF] hover:bg-[#0047FF] hover:text-white'
                }`}
                data-testid={`filter-${cat}`}
              >
                {cat === 'all' ? 'TOUT' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-[#0047FF] border-t-transparent animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center font-futura text-[#0047FF] py-12">
              Aucun produit disponible
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
