import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ShoppingBag, Menu, X, PhoneCall, ShieldCheck, ChevronRight } from 'lucide-react';
import { CompanyConfig } from '../config/company';

interface HeaderProps {
  config: CompanyConfig;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  onOpenQuoteModal: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  cartCount,
  onOpenCart,
  onOpenAdmin,
  onOpenQuoteModal,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Quiénes somos', href: '#nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Trabajos', href: '#trabajos' },
    { label: 'Tienda', href: '#tienda' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 shadow-xl py-3' 
          : 'bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-900 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a 
            href="#inicio" 
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center gap-2 group transition-transform active:scale-95"
            aria-label="AXXESOS Inicio"
          >
            <Logo variant="full" size="md" lightText={true} />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-white bg-zinc-800/80 font-semibold' 
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center space-x-3">
            {/* Quick Admin Access */}
            <button
              onClick={onOpenAdmin}
              title="Panel de Administración del Propietario"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors border border-zinc-800 text-xs flex items-center gap-1.5"
              aria-label="Panel Admin"
            >
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span className="hidden xl:inline text-zinc-300 font-mono text-[11px]">Admin</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-zinc-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-all border border-zinc-800 group"
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
              className="hidden sm:inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all shadow-md shadow-red-950/40 hover:shadow-lg active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Pedí tu presupuesto</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-zinc-300 hover:text-white md:hidden rounded-lg bg-zinc-900 border border-zinc-800"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium text-zinc-200 hover:bg-zinc-900 hover:text-white border-b border-zinc-900/80"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </a>
            ))}
          </div>

          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-sm font-semibold tracking-wide shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              Pedí tu presupuesto
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
