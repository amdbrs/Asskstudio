import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Grid, Mail } from 'lucide-react';

export const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Accueil', path: '/' },
    { icon: Briefcase, label: 'Services', path: '/#services' },
    { icon: Grid, label: 'Portfolio', path: '/realisations' },
    { icon: Mail, label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path.startsWith('/#')) return location.pathname === '/' && location.hash === path.substring(1);
    return location.pathname === path;
  };

  const handleClick = (path) => {
    if (path.startsWith('/#')) {
      const elementId = path.substring(2);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-[#0047FF]/10 shadow-[0_-4px_20px_rgba(0,71,255,0.1)]"
      data-testid="bottom-navigation"
    >
      <div className="flex items-center justify-around py-2 px-2 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return item.path.startsWith('/#') ? (
            <button
              key={item.path}
              onClick={() => handleClick(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-300 active:scale-95 ${
                active ? 'text-[#0047FF]' : 'text-[#0047FF]/50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 transition-transform duration-300 ${active ? 'scale-110' : ''}`} />
              <span className="font-futura text-[10px] uppercase tracking-wider">{item.label}</span>
              {active && <span className="absolute bottom-1 w-1 h-1 bg-[#0047FF] rounded-full" />}
            </button>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-300 active:scale-95 ${
                active ? 'text-[#0047FF]' : 'text-[#0047FF]/50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 transition-transform duration-300 ${active ? 'scale-110' : ''}`} />
              <span className="font-futura text-[10px] uppercase tracking-wider">{item.label}</span>
              {active && <span className="absolute bottom-1 w-1 h-1 bg-[#0047FF] rounded-full" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
