import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  PhoneCall, 
  ChevronRight, 
  ChevronDown, 
  Wifi, 
  Layers, 
  Wrench, 
  FolderGit2, 
  Building2, 
  Mail,
  Home
} from 'lucide-react';
import { CompanyConfig, CATALOG_CATEGORIES } from '../config/company';

interface HeaderProps {
  config: CompanyConfig;
  cartCount: number;
  activeModule: string;
  onSelectModule: (moduleId: string, categoryId?: string, subcategoryId?: string) => void;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  onOpenQuoteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  cartCount,
  activeModule,
  onSelectModule,
  onOpenCart,
  onOpenAdmin,
  onOpenQuoteModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'productos', label: 'Productos', hasDropdown: true },
    { id: 'wifi', label: 'Smart WiFi', icon: Wifi, badge: 'WiFi' },
    { id: 'servicios', label: 'Servicios', icon: Wrench },
    { id: 'trabajos', label: 'Trabajos', icon: FolderGit2 },
    { id: 'nosotros', label: 'Quiénes somos', icon: Building2 },
    { id: 'contacto', label: 'Contacto', icon: Mail },
  ];

  const handleNavClick = (moduleId: string, catId?: string, subId?: string) => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    onSelectModule(moduleId, catId, subId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 shadow-2xl py-3' 
          : 'bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-900 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            type="button"
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-2 group transition-transform active:scale-95 cursor-pointer"
            aria-label="AXXESOS Inicio"
          >
            <Logo variant="full" size="md" lightText={true} />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeModule === item.id;

              if (item.hasDropdown) {
                return (
                  <div key={item.id} className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => handleNavClick('productos')}
                      onMouseEnter={() => setProductsDropdownOpen(true)}
                      className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isActive 
                          ? 'text-white bg-zinc-800 shadow-sm border border-zinc-700' 
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsDropdownOpen ? 'rotate-180 text-red-500' : 'text-zinc-400'}`} />
                    </button>

                    {/* Mega Dropdown Menu for Products Categories (Estilo BBS Motion) */}
                    {productsDropdownOpen && (
                      <div 
                        onMouseLeave={() => setProductsDropdownOpen(false)}
                        className="absolute top-full left-0 mt-2 w-[580px] bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-2xl grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-150 z-50"
                      >
                        <div className="col-span-2 flex items-center justify-between border-b border-zinc-800 pb-2">
                          <span className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            Categorías del Catálogo
                          </span>
                          <button
                            type="button"
                            onClick={() => handleNavClick('productos')}
                            className="text-[11px] font-bold text-zinc-400 hover:text-white flex items-center gap-1"
                          >
                            <span>Ver todo el catálogo</span>
                            <ChevronRight className="w-3 h-3 text-red-500" />
                          </button>
                        </div>

                        {CATALOG_CATEGORIES.map((cat) => (
                          <div 
                            key={cat.id} 
                            className="p-2.5 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer group"
                            onClick={() => handleNavClick('productos', cat.id)}
                          >
                            <span className="text-xs font-bold text-white group-hover:text-red-400 flex items-center justify-between">
                              {cat.label}
                              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-red-500 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                            <span className="text-[11px] text-zinc-400 block line-clamp-1 mt-0.5">
                              {cat.shortDesc}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {cat.subcategories.slice(0, 3).map((sub) => (
                                <span 
                                  key={sub.id} 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNavClick('productos', cat.id, sub.id);
                                  }}
                                  className="text-[9px] bg-zinc-900 hover:bg-red-600/30 text-zinc-300 hover:text-white px-1.5 py-0.5 rounded border border-zinc-800 transition-colors"
                                >
                                  {sub.label}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'text-white bg-zinc-800 shadow-sm border border-zinc-700' 
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {item.badge && (
                    <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                      {item.badge}
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center space-x-3">
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-zinc-200 hover:text-white hover:bg-zinc-900 rounded-xl transition-all border border-zinc-800 group cursor-pointer"
              aria-label={`Ver carrito con ${cartCount} productos`}
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform text-zinc-300 group-hover:text-red-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-md shadow-red-900/50">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Presupuesto Button */}
            <button
              onClick={onOpenQuoteModal}
              className="hidden sm:inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-xs xl:text-sm font-bold tracking-wide transition-all shadow-md shadow-red-950/40 hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Pedí tu presupuesto</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-zinc-300 hover:text-white lg:hidden rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                    isActive 
                      ? 'bg-zinc-800 text-white font-bold border border-zinc-700' 
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                        {item.badge}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-sm font-bold tracking-wide shadow-md cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Pedí tu presupuesto</span>
            </button>

            <div className="flex items-center justify-between pt-2 px-1 text-xs text-zinc-400">
              <span>San Juan, Argentina</span>
              <span>{config.phonePrimary}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
