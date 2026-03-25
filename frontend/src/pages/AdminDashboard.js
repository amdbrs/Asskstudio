import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Image,
  MessageSquare,
  Package,
  LogOut,
  Menu,
  X,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_leave-your-mark/artifacts/9qutly5o_assk-logo.png';
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Dashboard Overview
const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API}/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        setStats(await response.json());
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div data-testid="admin-dashboard-overview">
      <h1 className="font-anton text-4xl text-[#0047FF] mb-8">TABLEAU DE BORD</h1>
      
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border-2 border-[#0047FF] p-6 bg-white">
            <p className="font-futura text-[#0047FF]/70 text-sm">Produits</p>
            <p className="font-anton text-4xl text-[#0047FF]">{stats.total_products}</p>
          </div>
          <div className="border-2 border-[#0047FF] p-6 bg-white">
            <p className="font-futura text-[#0047FF]/70 text-sm">Commandes</p>
            <p className="font-anton text-4xl text-[#0047FF]">{stats.total_orders}</p>
          </div>
          <div className="border-2 border-[#0047FF] p-6 bg-white">
            <p className="font-futura text-[#0047FF]/70 text-sm">Portfolio</p>
            <p className="font-anton text-4xl text-[#0047FF]">{stats.total_portfolio}</p>
          </div>
          <div className="border-2 border-[#0047FF] p-6 bg-white">
            <p className="font-futura text-[#0047FF]/70 text-sm">Revenus</p>
            <p className="font-anton text-4xl text-[#0047FF]">{stats.total_revenue?.toFixed(2)} €</p>
          </div>
        </div>
      )}

      {stats?.unread_contacts > 0 && (
        <div className="mt-8 border-2 border-[#0047FF] p-6 bg-white">
          <p className="font-futura text-[#0047FF]">
            <strong>{stats.unread_contacts}</strong> nouveau(x) message(s) non lu(s)
          </p>
          <Link
            to="/admin/messages"
            className="font-anton text-[#0047FF] hover:underline mt-2 inline-block"
          >
            VOIR LES MESSAGES →
          </Link>
        </div>
      )}
    </div>
  );
};

// Products Management
const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    stock: '10',
    active: true
  });
  const { token } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API}/products?active_only=false`);
      if (response.ok) {
        setProducts(await response.json());
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct
        ? `${API}/products/${editingProduct.id}`
        : `${API}/products`;
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock)
        })
      });

      if (response.ok) {
        toast.success(editingProduct ? 'Produit mis à jour' : 'Produit créé');
        fetchProducts();
        resetForm();
      } else {
        const error = await response.json();
        toast.error(error.detail);
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try {
      const response = await fetch(`${API}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        toast.success('Produit supprimé');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image_url: product.image_url,
      stock: product.stock.toString(),
      active: product.active
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image_url: '',
      stock: '10',
      active: true
    });
  };

  return (
    <div data-testid="admin-products">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-anton text-4xl text-[#0047FF]">PRODUITS</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-[#0047FF] text-white font-anton border-2 border-[#0047FF] hover:bg-white hover:text-[#0047FF] transition-colors duration-200"
          data-testid="add-product-button"
        >
          <Plus className="w-5 h-5" />
          AJOUTER
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border-2 border-[#0047FF] p-6 bg-white mb-8" data-testid="product-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nom du produit"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none"
              required
            />
            <input
              type="text"
              placeholder="Catégorie"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Prix (€)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none"
              required
            />
            <input
              type="url"
              placeholder="URL de l'image"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none md:col-span-2"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none md:col-span-2 resize-none"
              rows={3}
              required
            />
            <label className="flex items-center gap-2 font-futura text-[#0047FF]">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-5 h-5 border-2 border-[#0047FF]"
              />
              Produit actif
            </label>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-[#0047FF] text-white font-anton border-2 border-[#0047FF] hover:bg-white hover:text-[#0047FF] transition-colors duration-200"
            >
              {editingProduct ? 'METTRE À JOUR' : 'CRÉER'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-white text-[#0047FF] font-anton border-2 border-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
            >
              ANNULER
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border-2 border-[#0047FF] bg-white">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover border-b-2 border-[#0047FF]"
            />
            <div className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-anton text-lg text-[#0047FF]">{product.name}</h3>
                {!product.active && (
                  <EyeOff className="w-4 h-4 text-[#0047FF]/50" />
                )}
              </div>
              <p className="font-futura text-[#0047FF] text-lg">{product.price.toFixed(2)} €</p>
              <p className="font-futura text-[#0047FF]/70 text-sm">Stock: {product.stock}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2 border-2 border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 border-2 border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Portfolio Management
const PortfolioManagement = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    link: ''
  });
  const { token } = useAuth();

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`${API}/portfolio`);
      if (response.ok) {
        setItems(await response.json());
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem
        ? `${API}/portfolio/${editingItem.id}`
        : `${API}/portfolio`;
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(editingItem ? 'Projet mis à jour' : 'Projet créé');
        fetchPortfolio();
        resetForm();
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce projet ?')) return;
    try {
      const response = await fetch(`${API}/portfolio/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        toast.success('Projet supprimé');
        fetchPortfolio();
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image_url: item.image_url,
      link: item.link || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      image_url: '',
      link: ''
    });
  };

  return (
    <div data-testid="admin-portfolio">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-anton text-4xl text-[#0047FF]">PORTFOLIO</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-[#0047FF] text-white font-anton border-2 border-[#0047FF] hover:bg-white hover:text-[#0047FF] transition-colors duration-200"
          data-testid="add-portfolio-button"
        >
          <Plus className="w-5 h-5" />
          AJOUTER
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border-2 border-[#0047FF] p-6 bg-white mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Titre"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none"
              required
            />
            <input
              type="text"
              placeholder="Catégorie"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none"
              required
            />
            <input
              type="url"
              placeholder="URL de l'image"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none"
              required
            />
            <input
              type="url"
              placeholder="Lien externe (optionnel)"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="px-4 py-3 border-2 border-[#0047FF] bg-white text-[#0047FF] placeholder-[#0047FF]/50 font-futura outline-none md:col-span-2 resize-none"
              rows={3}
              required
            />
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-[#0047FF] text-white font-anton border-2 border-[#0047FF] hover:bg-white hover:text-[#0047FF] transition-colors duration-200"
            >
              {editingItem ? 'METTRE À JOUR' : 'CRÉER'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-white text-[#0047FF] font-anton border-2 border-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
            >
              ANNULER
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border-2 border-[#0047FF] bg-white">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-48 object-cover border-b-2 border-[#0047FF]"
            />
            <div className="p-4">
              <span className="font-futura text-xs text-[#0047FF]/70 uppercase">{item.category}</span>
              <h3 className="font-anton text-lg text-[#0047FF]">{item.title}</h3>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 border-2 border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 border-2 border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Messages Management
const MessagesManagement = () => {
  const [messages, setMessages] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API}/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        setMessages(await response.json());
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await fetch(`${API}/contacts/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce message ?')) return;
    try {
      await fetch(`${API}/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Message supprimé');
      fetchMessages();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <div data-testid="admin-messages">
      <h1 className="font-anton text-4xl text-[#0047FF] mb-8">MESSAGES</h1>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="font-futura text-[#0047FF]/70">Aucun message</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`border-2 border-[#0047FF] p-6 bg-white ${!msg.read ? 'shadow-[4px_4px_0_0_#0047FF]' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-anton text-xl text-[#0047FF]">{msg.subject}</h3>
                  <p className="font-futura text-[#0047FF]/70 text-sm">
                    De: {msg.name} ({msg.email})
                  </p>
                  <p className="font-futura text-[#0047FF]/50 text-xs">
                    {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!msg.read && (
                    <button
                      onClick={() => handleMarkRead(msg.id)}
                      className="p-2 border-2 border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
                      title="Marquer comme lu"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 border-2 border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="font-futura text-[#0047FF] whitespace-pre-wrap">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Orders Management
const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        setOrders(await response.json());
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-[#0047FF] text-white';
      case 'pending':
        return 'bg-white text-[#0047FF] border-2 border-[#0047FF]';
      default:
        return 'bg-white text-[#0047FF]/50 border-2 border-[#0047FF]/50';
    }
  };

  return (
    <div data-testid="admin-orders">
      <h1 className="font-anton text-4xl text-[#0047FF] mb-8">COMMANDES</h1>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="font-futura text-[#0047FF]/70">Aucune commande</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border-2 border-[#0047FF] p-6 bg-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-anton text-xl text-[#0047FF]">
                    Commande #{order.id.slice(0, 8)}
                  </h3>
                  <p className="font-futura text-[#0047FF]/70 text-sm">
                    {order.customer_name} ({order.customer_email})
                  </p>
                  <p className="font-futura text-[#0047FF]/50 text-xs">
                    {new Date(order.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <span className={`px-3 py-1 font-futura text-sm uppercase ${getStatusColor(order.payment_status)}`}>
                  {order.payment_status}
                </span>
              </div>
              <div className="border-t-2 border-[#0047FF]/20 pt-4 mt-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between font-futura text-[#0047FF] text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{item.subtotal?.toFixed(2)} €</span>
                  </div>
                ))}
                <div className="flex justify-between font-anton text-lg text-[#0047FF] mt-4 pt-4 border-t-2 border-[#0047FF]/20">
                  <span>TOTAL</span>
                  <span>{order.total?.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Main Admin Dashboard
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, loading, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0047FF] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Produits', icon: ShoppingBag },
    { path: '/admin/portfolio', label: 'Portfolio', icon: Image },
    { path: '/admin/orders', label: 'Commandes', icon: Package },
    { path: '/admin/messages', label: 'Messages', icon: MessageSquare }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white" data-testid="admin-dashboard">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r-2 border-[#0047FF] transform transition-transform duration-200 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b-2 border-[#0047FF]">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Assk" className="h-10 w-auto" />
            <span className="font-anton text-xl text-[#0047FF]">ADMIN</span>
          </Link>
        </div>

        <nav className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 mb-2 font-futura admin-nav-item ${
                isActive(item.path) ? 'active' : 'text-[#0047FF]'
              }`}
              data-testid={`admin-nav-${item.label.toLowerCase()}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-[#0047FF]">
          <p className="font-futura text-[#0047FF]/70 text-sm mb-2">
            {admin?.name}
          </p>
          <button
            onClick={logout}
            className="flex items-center gap-2 font-futura text-[#0047FF] hover:underline"
            data-testid="logout-button"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b-2 border-[#0047FF] p-4 z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 border-2 border-[#0047FF] text-[#0047FF]"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#0047FF]/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-12 pt-20 lg:pt-12">
        <Routes>
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="portfolio" element={<PortfolioManagement />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="messages" element={<MessagesManagement />} />
          <Route path="*" element={<DashboardOverview />} />
        </Routes>
      </main>
    </div>
  );
}
