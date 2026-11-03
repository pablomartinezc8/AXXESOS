import React, { useState, useEffect } from 'react';
import { 
  CompanyConfig, 
  ProjectItem, 
  ProductItem, 
  INITIAL_COMPANY_CONFIG 
} from './config/company';
import { 
  StorageService, 
  CarouselSlide, 
  CustomerOrder 
} from './services/storage';

// Components
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { ShopSection } from './components/ShopSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminModal } from './components/AdminModal';
import { FastQuoteModal } from './components/FastQuoteModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  // App data state
  const [config, setConfig] = useState<CompanyConfig>(() => StorageService.getCompanyConfig());
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>(() => StorageService.getCarouselSlides());
  const [projects, setProjects] = useState<ProjectItem[]>(() => StorageService.getProjects());
  const [products, setProducts] = useState<ProductItem[]>(() => StorageService.getProducts());

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

  // Active section tracking for navigation highlight
  const [activeSection, setActiveSection] = useState('inicio');

  // Synchronize cart with localStorage
  useEffect(() => {
    const serialized = cart.map((c) => ({
      productId: c.product.id,
      quantity: c.quantity,
    }));
    StorageService.saveCart(serialized);
  }, [cart]);

  // Handle URL hash routing (e.g. #admin or /admin)
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setIsAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Scroll spy to update active navigation item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'nosotros', 'servicios', 'trabajos', 'tienda', 'contacto'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    // Clear cart on successful order
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

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col antialiased">
      
      {/* Fixed Sticky Header */}
      <Header
        config={config}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenQuoteModal={() => openQuoteWithService()}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Carousel */}
        <HeroCarousel
          slides={carouselSlides}
          onOpenQuoteModal={() => openQuoteWithService()}
          googleRating={config.googleRating}
          googleReviewCount={config.googleReviewCount}
        />

        {/* 2. Quiénes Somos */}
        <AboutSection
          config={config}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenQuoteModal={() => openQuoteWithService()}
        />

        {/* 3. Servicios */}
        <ServicesSection
          onSelectServiceForQuote={(serviceTitle) => openQuoteWithService(serviceTitle)}
        />

        {/* 4. Trabajos Realizados (Galería) */}
        <GallerySection
          projects={projects}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenQuoteModal={(workTitle) => openQuoteWithService(workTitle)}
        />

        {/* 5. Tienda Online */}
        <ShopSection
          products={products}
          onAddToCart={handleAddToCart}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenQuoteModal={(productName) => openQuoteWithService(productName)}
        />

        {/* 6. Contacto y Ubicación */}
        <ContactSection
          config={config}
          prefilledInterest={quoteInitialService}
        />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenAdmin={() => setIsAdminOpen(true)}
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
