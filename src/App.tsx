import React, { useState, useEffect } from 'react';
import { 
  CompanyConfig, 
  ProjectItem, 
  ProductItem, 
  INITIAL_COMPANY_CONFIG,
  CATALOG_CATEGORIES
} from './config/company';
import { 
  StorageService, 
  CarouselSlide, 
  CustomerOrder 
} from './services/storage';

// Modular Components
import { Header } from './components/Header';
import { HeroVideoSection } from './components/HeroVideoSection';
import { ValuesMissionSection } from './components/ValuesMissionSection';
import { FeaturedProductsHome } from './components/FeaturedProductsHome';
import { SmartWifiSection } from './components/SmartWifiSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { ShopSection } from './components/ShopSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals & Overlays
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminModal } from './components/AdminModal';
import { FastQuoteModal } from './components/FastQuoteModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Icons
import { 
  ArrowLeft, 
  ChevronRight, 
  Wifi, 
  ShieldCheck, 
  Maximize2, 
  Lock, 
  Sliders, 
  Disc, 
  PhoneCall, 
  ArrowRight,
  FolderGit2
} from 'lucide-react';

export default function App() {
  // App data state
  const [config, setConfig] = useState<CompanyConfig>(() => StorageService.getCompanyConfig());
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>(() => StorageService.getCarouselSlides());
  const [projects, setProjects] = useState<ProjectItem[]>(() => StorageService.getProjects());
  const [products, setProducts] = useState<ProductItem[]>(() => StorageService.getProducts());

  // Active module view ('inicio' | 'productos' | 'wifi' | 'servicios' | 'trabajos' | 'nosotros' | 'contacto')
  const [activeModule, setActiveModule] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (['inicio', 'productos', 'wifi', 'servicios', 'trabajos', 'nosotros', 'contacto'].includes(hash)) {
      return hash;
    }
    return 'inicio';
  });

  // Selected filters when jumping to 'productos'
  const [targetCategory, setTargetCategory] = useState<string>('todos');
  const [targetSubcategory, setTargetSubcategory] = useState<string>('todos');

  // Cart state: array of { product, quantity }
  const [cart, setCart] = useState<{ product: ProductItem; quantity: number }[]>(() => {
    const rawCart = StorageService.getCart();
    const currentProducts = StorageService.getProducts();
    const resolved: { product: ProductItem; quantity: number }[] = [];
    rawCart.forEach((item) => {
      const p = currentProducts.find((prod) => prod.id === item.productId);
      if (p) {
        resolved.push({ product: p, quantity: item.quantity });
      }
    });
    return resolved;
  });

  // Modal visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteInitialService, setQuoteInitialService] = useState<string>('');

  // Synchronize cart with localStorage
  useEffect(() => {
    const serialized = cart.map((c) => ({
      productId: c.product.id,
      quantity: c.quantity,
    }));
    StorageService.saveCart(serialized);
  }, [cart]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') {
        setIsAdminOpen(true);
      } else if (['inicio', 'productos', 'wifi', 'servicios', 'trabajos', 'nosotros', 'contacto'].includes(hash)) {
        setActiveModule(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Sync config across window events
  useEffect(() => {
    const handleConfigUpdated = (e: Event) => {
      const custom = e as CustomEvent<CompanyConfig>;
      if (custom.detail) {
        setConfig(custom.detail);
      } else {
        setConfig(StorageService.getCompanyConfig());
      }
    };
    window.addEventListener('axxesos_config_updated', handleConfigUpdated);
    window.addEventListener('storage', handleConfigUpdated);
    return () => {
      window.removeEventListener('axxesos_config_updated', handleConfigUpdated);
      window.removeEventListener('storage', handleConfigUpdated);
    };
  }, []);

  // Navigation module switcher
  const handleSelectModule = (moduleId: string, categoryId?: string, subcategoryId?: string) => {
    setActiveModule(moduleId);
    if (categoryId) setTargetCategory(categoryId);
    else if (moduleId === 'productos') setTargetCategory('todos');

    if (subcategoryId) setTargetSubcategory(subcategoryId);
    else setTargetSubcategory('todos');

    window.location.hash = `#${moduleId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product: ProductItem, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOrderSuccess = (order: CustomerOrder) => {
    setCart([]);
    StorageService.saveCart([]);
  };

  // State savers for Admin panel
  const handleSaveConfig = (newConfig: CompanyConfig) => {
    setConfig(newConfig);
    StorageService.saveCompanyConfig(newConfig);
  };

  const handleSaveProjects = (newProjects: ProjectItem[]) => {
    setProjects(newProjects);
    StorageService.saveProjects(newProjects);
  };

  const handleSaveProducts = (newProducts: ProductItem[]) => {
    setProducts(newProducts);
    StorageService.saveProducts(newProducts);
    setCart((prev) => prev.filter((item) => newProducts.some((p) => p.id === item.product.id)));
  };

  const handleSaveCarouselSlides = (newSlides: CarouselSlide[]) => {
    setCarouselSlides(newSlides);
    StorageService.saveCarouselSlides(newSlides);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const openQuoteWithService = (serviceName?: string) => {
    setQuoteInitialService(serviceName || '');
    setIsQuoteModalOpen(true);
  };

  const moduleTitles: { [key: string]: string } = {
    productos: 'Catálogo de Equipos y Repuestos',
    wifi: 'Tecnología Portones con WiFi',
    servicios: 'Servicios Técnicos Especializados',
    trabajos: 'Trabajos Realizados en San Juan',
    nosotros: 'Quiénes Somos — 28 Años de Trayectoria',
    contacto: 'Contacto y Solicitud de Presupuesto'
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col antialiased">
      
      {/* Fixed Sticky Header with Modular Navigation & Categories Dropdown */}
      <Header
        config={config}
        cartCount={totalCartCount}
        activeModule={activeModule}
        onSelectModule={handleSelectModule}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenQuoteModal={() => openQuoteWithService()}
      />

      {/* Main Content Rendered by Active Module */}
      <main className="flex-1">

        {/* Breadcrumb strip when inside a dedicated module */}
        {activeModule !== 'inicio' && (
          <div className="bg-zinc-900 border-b border-zinc-800 text-white pt-24 pb-6 px-4">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <button
                  type="button"
                  onClick={() => handleSelectModule('inicio')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-red-500" />
                  <span>Inicio</span>
                </button>
                <span>/</span>
                <span className="text-white font-bold">{moduleTitles[activeModule] || activeModule}</span>
              </div>

              <button
                type="button"
                onClick={() => handleSelectModule('inicio')}
                className="text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg transition-colors border border-zinc-700 flex items-center gap-1.5 cursor-pointer"
              >
                <span>← Volver a Inicio</span>
              </button>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 1: MÓDULO INICIO (Home Page with Video, Values & Highlights) */}
        {/* ============================================================== */}
        {activeModule === 'inicio' && (
          <div>
            {/* 1. Hero with Gate Video & Overlay */}
            <HeroVideoSection
              config={config}
              onNavigateToModule={handleSelectModule}
              onOpenQuoteModal={() => openQuoteWithService()}
            />

            {/* 2. Quick Category Cards Shortcut Bar */}
            <section className="bg-white py-12 border-b border-zinc-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                      Explorá por Categoría
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-zinc-950">
                      Sistemas para Portones y Seguridad
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectModule('productos')}
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver todo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
                  {CATALOG_CATEGORIES.map((cat) => {
                    const iconMap: { [key: string]: any } = {
                      Maximize2,
                      ShieldAlert: ShieldCheck,
                      Disc,
                      Lock,
                      Sliders
                    };
                    const IconComp = iconMap[cat.iconName] || Maximize2;

                    return (
                      <div
                        key={cat.id}
                        onClick={() => handleSelectModule('productos', cat.id)}
                        className="p-4 rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-red-500/50 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                      >
                        <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-extrabold text-zinc-900 group-hover:text-red-600 transition-colors">
                            {cat.label}
                          </h4>
                          <span className="text-[10px] text-zinc-600 line-clamp-1 mt-0.5">
                            {cat.subcategories.length} subcategorías
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 3. Values and Mission Section (Inspired by image_edb1d6ec.png) */}
            <ValuesMissionSection
              config={config}
              onOpenQuoteModal={() => openQuoteWithService()}
              onNavigateToAbout={() => handleSelectModule('nosotros')}
            />

            {/* 4. Featured Products Grid (with Performance metrics) */}
            <FeaturedProductsHome
              products={products}
              onAddToCart={handleAddToCart}
              onNavigateToProducts={() => handleSelectModule('productos')}
              onOpenQuoteModal={(productName) => openQuoteWithService(productName)}
            />

            {/* 5. Smart WiFi Banner Callout */}
            <section className="py-16 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white border-y border-zinc-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30">
                    <Wifi className="w-3.5 h-3.5" />
                    Innovación en San Juan
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    Convertí tu Portón Actual en Inteligente
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300">
                    Abrí y cerrá desde el celular, recibí notificaciones si quedó abierto y compartí llaves virtuales con tu familia. Compatible con motores de cualquier marca.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => handleSelectModule('wifi')}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Ver Módulo Smart WiFi</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => openQuoteWithService('Conversión de Portón a WiFi')}
                    className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-zinc-200 px-6 py-3.5 rounded-xl text-xs font-bold transition-all border border-zinc-700 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>Consultar por WhatsApp</span>
                  </button>
                </div>
              </div>
            </section>

            {/* 6. Preview of Trabajos Realizados */}
            <section className="py-16 bg-white border-b border-zinc-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                      Instalaciones Reales
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-zinc-950">
                      Trabajos Realizados en San Juan
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectModule('trabajos')}
                    className="text-xs font-bold text-zinc-900 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver Galería Completa</span>
                    <ChevronRight className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                {/* 3 Project previews */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {projects.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectModule('trabajos')}
                      className="group rounded-3xl bg-zinc-950 overflow-hidden border border-zinc-200 hover:border-zinc-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                          {p.location}
                        </div>
                      </div>

                      <div className="p-5 bg-white flex-1 flex flex-col justify-between space-y-2 border-t border-zinc-100">
                        <div>
                          <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                            {p.serviceType}
                          </span>
                          <h4 className="text-sm font-extrabold text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-1 mt-0.5">
                            {p.title}
                          </h4>
                          <p className="text-xs text-zinc-500 line-clamp-2 mt-1">
                            {p.description}
                          </p>
                        </div>

                        <div className="pt-2 text-xs font-bold text-red-600 flex items-center gap-1">
                          <span>Ver detalle y fotos</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: MÓDULO PRODUCTOS (Catálogo Categorizado estilo BBS Motion) */}
        {/* ============================================================== */}
        {activeModule === 'productos' && (
          <div>
            <ShopSection
              products={products}
              onAddToCart={handleAddToCart}
              onOpenAdmin={() => setIsAdminOpen(true)}
              onOpenQuoteModal={(productName) => openQuoteWithService(productName)}
              initialCategory={targetCategory}
              initialSubcategory={targetSubcategory}
              isStandaloneView={true}
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: MÓDULO SMART WIFI (Control por Celular) */}
        {/* ============================================================== */}
        {activeModule === 'wifi' && (
          <div>
            <SmartWifiSection
              config={config}
              onOpenQuoteModal={(interest) => openQuoteWithService(interest || 'Módulo WiFi para Portón')}
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 4: MÓDULO SERVICIOS */}
        {/* ============================================================== */}
        {activeModule === 'servicios' && (
          <div>
            <ServicesSection
              onSelectServiceForQuote={(serviceTitle) => openQuoteWithService(serviceTitle)}
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 5: MÓDULO TRABAJOS REALIZADOS (Galería Abierto/Cerrado) */}
        {/* ============================================================== */}
        {activeModule === 'trabajos' && (
          <div>
            <GallerySection
              projects={projects}
              onOpenAdmin={() => setIsAdminOpen(true)}
              onOpenQuoteModal={(workTitle) => openQuoteWithService(workTitle)}
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 6: MÓDULO QUIÉNES SOMOS (28 Años y Valores) */}
        {/* ============================================================== */}
        {activeModule === 'nosotros' && (
          <div>
            <ValuesMissionSection
              config={config}
              onOpenQuoteModal={() => openQuoteWithService()}
            />
            <AboutSection
              config={config}
              onOpenAdmin={() => setIsAdminOpen(true)}
              onOpenQuoteModal={() => openQuoteWithService()}
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 7: MÓDULO CONTACTO */}
        {/* ============================================================== */}
        {activeModule === 'contacto' && (
          <div>
            <ContactSection
              config={config}
              prefilledInterest={quoteInitialService}
            />
          </div>
        )}

      </main>

      {/* Footer with Modular Navigation Links */}
      <Footer
        config={config}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectModule={handleSelectModule}
      />

      {/* Floating WhatsApp CTA */}
      <FloatingWhatsApp config={config} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          items={cart.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            imageUrl: i.product.imageUrl,
          }))}
          subtotal={cartSubtotal}
          config={config}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* Fast Quote Modal */}
      <FastQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        config={config}
        initialService={quoteInitialService}
      />

      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        projects={projects}
        onSaveProjects={handleSaveProjects}
        products={products}
        onSaveProducts={handleSaveProducts}
        carouselSlides={carouselSlides}
        onSaveCarouselSlides={handleSaveCarouselSlides}
      />

    </div>
  );
}
