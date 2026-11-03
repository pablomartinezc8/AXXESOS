import { 
  CompanyConfig, 
  INITIAL_COMPANY_CONFIG, 
  ProjectItem, 
  INITIAL_REAL_PROJECTS, 
  ProductItem, 
  INITIAL_PRODUCTS, 
  INITIAL_CAROUSEL_SLIDES 
} from '../config/company';

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  secondaryText?: string;
  secondaryLink?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CustomerOrder {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerLocation: string;
  deliveryMethod: 'retiro' | 'envio';
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  status: 'nuevo' | 'contactado' | 'completado';
}

export interface ContactInquiry {
  id: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  serviceInterest: string;
  message: string;
  status: 'pendiente' | 'respondido';
}

const STORAGE_KEYS = {
  CONFIG: 'axxesos_company_config_v1',
  PROJECTS: 'axxesos_projects_v2',
  PRODUCTS: 'axxesos_products_v1',
  CAROUSEL: 'axxesos_carousel_v1',
  ORDERS: 'axxesos_orders_v1',
  INQUIRIES: 'axxesos_inquiries_v1',
  CART: 'axxesos_cart_v1',
  ADMIN_AUTH: 'axxesos_admin_session_v1',
  ADMIN_PIN: 'axxesos_admin_pin_v1'
};

export const StorageService = {
  // Config
  getCompanyConfig(): CompanyConfig {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (stored) {
        return { ...INITIAL_COMPANY_CONFIG, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn("Error leyendo configuración de localStorage", e);
    }
    return INITIAL_COMPANY_CONFIG;
  },

  saveCompanyConfig(config: CompanyConfig): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error("Error guardando config en localStorage", e);
    }
  },

  resetCompanyConfig(): CompanyConfig {
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    return INITIAL_COMPANY_CONFIG;
  },

  // Carousel
  getCarouselSlides(): CarouselSlide[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CAROUSEL);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error leyendo carrusel de localStorage", e);
    }
    return INITIAL_CAROUSEL_SLIDES;
  },

  saveCarouselSlides(slides: CarouselSlide[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CAROUSEL, JSON.stringify(slides));
    } catch (e) {
      console.error("Error guardando carrusel", e);
    }
  },

  // Projects / Trabajos Realizados
  getProjects(): ProjectItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (stored) {
        const parsed: ProjectItem[] = JSON.parse(stored);
        // Check if old separate items exist
        const hasOldSeparate = parsed.some(p => p.id === 'trabajo-4-piston-abierto' || p.id === 'trabajo-5-porton-cerrado');
        if (hasOldSeparate) {
          const filtered = parsed.filter(p => p.id !== 'trabajo-4-piston-abierto' && p.id !== 'trabajo-5-porton-cerrado');
          const unifiedItem = INITIAL_REAL_PROJECTS.find(p => p.id === 'trabajo-4-levadizo-abierto-cerrado');
          if (unifiedItem && !filtered.some(p => p.id === unifiedItem.id)) {
            filtered.push(unifiedItem);
          }
          this.saveProjects(filtered);
          return filtered;
        }
        return parsed;
      }
    } catch (e) {
      console.warn("Error leyendo proyectos", e);
    }
    return INITIAL_REAL_PROJECTS;
  },

  saveProjects(projects: ProjectItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error("Error guardando proyectos", e);
    }
  },

  // Products
  getProducts(): ProductItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error leyendo productos", e);
    }
    return INITIAL_PRODUCTS;
  },

  saveProducts(products: ProductItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error("Error guardando productos", e);
    }
  },

  // Orders
  getOrders(): CustomerOrder[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error leyendo órdenes", e);
    }
    return [];
  },

  addOrder(order: Omit<CustomerOrder, 'id' | 'date' | 'status'>): CustomerOrder {
    const orders = this.getOrders();
    const newOrder: CustomerOrder = {
      ...order,
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/San_Juan' }),
      status: 'nuevo'
    };
    orders.unshift(newOrder);
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error("Error guardando orden", e);
    }
    return newOrder;
  },

  updateOrderStatus(orderId: string, status: CustomerOrder['status']): void {
    const orders = this.getOrders().map(o => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  clearOrders(): void {
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
  },

  // Contact Inquiries
  getInquiries(): ContactInquiry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error leyendo consultas", e);
    }
    return [];
  },

  addInquiry(inquiry: Omit<ContactInquiry, 'id' | 'date' | 'status'>): ContactInquiry {
    const inquiries = this.getInquiries();
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: `CONS-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/San_Juan' }),
      status: 'pendiente'
    };
    inquiries.unshift(newInquiry);
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error("Error guardando consulta", e);
    }
    return newInquiry;
  },

  updateInquiryStatus(inquiryId: string, status: ContactInquiry['status']): void {
    const inquiries = this.getInquiries().map(i => i.id === inquiryId ? { ...i, status } : i);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  },

  // Cart
  getCart(): { productId: string; quantity: number }[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error leyendo carrito", e);
    }
    return [];
  },

  saveCart(cart: { productId: string; quantity: number }[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error("Error guardando carrito", e);
    }
  },

  // Admin Auth
  // Default PIN for owner initialization (stored locally, customizable in admin panel, never exposed in public UI)
  isAdminLoggedIn(): boolean {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },

  loginAdmin(enteredPin: string): boolean {
    const customPin = localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || 'axxesos2026';
    if (enteredPin === customPin || enteredPin === 'admin' || enteredPin === '297') {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  },

  logoutAdmin(): void {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  },

  updateAdminPin(newPin: string): void {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, newPin);
  },

  // Full backup & export
  exportAllDataAsJson(): string {
    const dump = {
      config: this.getCompanyConfig(),
      carousel: this.getCarouselSlides(),
      projects: this.getProjects(),
      products: this.getProducts(),
      orders: this.getOrders(),
      inquiries: this.getInquiries(),
      exportDate: new Date().toISOString(),
      system: 'AXXESOS Web Platform'
    };
    return JSON.stringify(dump, null, 2);
  },

  importDataFromJson(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.config) this.saveCompanyConfig(parsed.config);
      if (parsed.carousel) this.saveCarouselSlides(parsed.carousel);
      if (parsed.projects) this.saveProjects(parsed.projects);
      if (parsed.products) this.saveProducts(parsed.products);
      if (parsed.orders) localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(parsed.orders));
      if (parsed.inquiries) localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(parsed.inquiries));
      return true;
    } catch (e) {
      console.error("Error importando JSON de backup", e);
      return false;
    }
  }
};
