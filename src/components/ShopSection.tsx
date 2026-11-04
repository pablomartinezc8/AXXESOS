import React, { useState, useMemo } from 'react';
import { 
  ProductItem, 
  CATALOG_CATEGORIES, 
  CatalogCategory 
} from '../config/company';
import { 
  Search, 
  ShoppingBag, 
  ArrowUpDown, 
  ChevronRight, 
  CheckCircle, 
  FileText, 
  PhoneCall, 
  Zap, 
  Scale, 
  Timer, 
  RotateCw,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProductDetailModal } from './ProductDetailModal';

interface ShopSectionProps {
  products: ProductItem[];
  onAddToCart: (product: ProductItem, quantity: number) => void;
  onOpenAdmin: () => void;
  onOpenQuoteModal: (productName?: string) => void;
  initialCategory?: string;
  initialSubcategory?: string;
  isStandaloneView?: boolean;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  onAddToCart,
  onOpenAdmin,
  onOpenQuoteModal,
  initialCategory = 'todos',
  initialSubcategory = 'todos',
  isStandaloneView = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Synchronize category when initialCategory prop changes (e.g. from Header dropdown menu)
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Synchronize subcategory when initialSubcategory prop changes
  React.useEffect(() => {
    if (initialSubcategory) {
      setSelectedSubcategory(initialSubcategory);
    }
  }, [initialSubcategory]);

  // Smooth scroll to catalog filters when navigating directly to a category
  React.useEffect(() => {
    if (initialCategory && initialCategory !== 'todos') {
      setTimeout(() => {
        const el = document.getElementById('catalogo-filtros');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [initialCategory, initialSubcategory]);

  // When selectedCategory changes via tabs, reset subcategory to 'todos'
  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubcategory('todos');
  };

  // Find active category configuration object
  const activeCategoryObj = useMemo(() => {
    return CATALOG_CATEGORIES.find((c) => c.id === selectedCategory);
  }, [selectedCategory]);

  // Filtered & Sorted products
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category filter
        const matchesCategory = 
          selectedCategory === 'todos' || 
          item.category === selectedCategory;

        // Subcategory filter
        const matchesSubcategory = 
          selectedSubcategory === 'todos' || 
          item.subcategory === selectedSubcategory;

        // Search text matching
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = 
          !q ||
          item.name.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.subcategoryLabel?.toLowerCase().includes(q) ||
          Object.values(item.specs || {}).some((val) => val.toLowerCase().includes(q));

        return matchesCategory && matchesSubcategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        // Default: featured first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [products, selectedCategory, selectedSubcategory, searchQuery, sortBy]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="productos" className="py-16 sm:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white">
              <ShoppingBag className="w-3.5 h-3.5 text-red-500" />
              <span>Catálogo Técnico de Equipos y Repuestos</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
              Productos y Automatismos AXXESOS
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Kits para portones, motores de velocidad rápida, tecnología WiFi, herrajes, rodamientos y sistemas de seguridad con respaldo técnico y repuestos en San Juan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Pedir Presupuesto con Instalación</span>
            </button>
          </div>
        </div>

        {/* 1. Mega Category Tabs (PUNTO 2: Categorías de BBS Motion) */}
        <div id="catalogo-filtros" className="mb-6 scroll-mt-24">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {/* "Todos" button */}
            <button
              type="button"
              onClick={() => handleCategorySelect('todos')}
              className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                selectedCategory === 'todos'
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200'
              }`}
            >
              <Layers className="w-4 h-4 text-red-500" />
              <span>Todos los Productos ({products.length})</span>
            </button>

            {/* Main Category Tabs */}
            {CATALOG_CATEGORIES.map((cat) => {
              const count = products.filter((p) => p.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-zinc-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-red-700 text-white' : 'bg-zinc-200 text-zinc-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Subcategory Filter Chips (if category selected or todos) */}
        {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 mb-6 flex flex-wrap items-center gap-2 animate-in fade-in duration-150">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-red-500" />
              Subcategorías:
            </span>

            {/* Subcategory: Todas */}
            <button
              type="button"
              onClick={() => setSelectedSubcategory('todos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedSubcategory === 'todos'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-white text-zinc-700 hover:bg-zinc-200 border border-zinc-300'
              }`}
            >
              Todas en {activeCategoryObj.label}
            </button>

            {/* Subcategories list */}
            {activeCategoryObj.subcategories.map((sub) => {
              const isSubSelected = selectedSubcategory === sub.id;
              const subCount = products.filter((p) => p.subcategory === sub.id).length;

              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubcategory(sub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSubSelected
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-white text-zinc-700 hover:bg-zinc-200 border border-zinc-300'
                  }`}
                >
                  <span>{sub.label}</span>
                  {subCount > 0 && (
                    <span className={`text-[10px] px-1 rounded ${
                      isSubSelected ? 'bg-red-700 text-white' : 'bg-zinc-200 text-zinc-600'
                    }`}>
                      {subCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 3. Search Bar and Sort Selector */}
        <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 space-y-3 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por motor, control, cremallera, rueda, 7 segundos, peso..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-300 rounded-xl text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 hover:text-zinc-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Options */}
            <div className="md:col-span-4 flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-zinc-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-white border border-zinc-300 rounded-xl text-xs sm:text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm"
              >
                <option value="default">Ordenar: Destacados primero</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Alfabético: Nombre (A-Z)</option>
              </select>
            </div>

          </div>
        </div>

        {/* 4. Product Cards Grid with Performance Metrics (PUNTO 1) */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-zinc-200 p-8 space-y-4">
            <p className="text-zinc-600 font-medium">No encontramos productos con los filtros seleccionados.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
                setSelectedSubcategory('todos');
              }}
              className="px-5 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((product) => {
              const perf = product.performance;

              return (
                <div
                  key={product.id}
                  className="group rounded-3xl bg-white border border-zinc-200 hover:border-zinc-400 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
                >
                  <div>
                    {/* Photo Container */}
                    <div 
                      onClick={() => setSelectedProduct(product)}
                      className="relative aspect-[4/3] rounded-2xl bg-zinc-950 overflow-hidden cursor-pointer flex items-center justify-center p-6 mb-4 group/img"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover/img:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider bg-red-600 text-white shadow-md">
                          {product.badge || "Oficial AXXESOS"}
                        </span>
                      </div>

                      {/* Stock pill */}
                      <div className="absolute bottom-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-900/90 text-zinc-200 backdrop-blur-sm border border-zinc-800">
                          <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                          {product.inStock ? 'En stock' : 'A pedido'}
                        </span>
                      </div>
                    </div>

                    {/* Category & Title */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-600 uppercase tracking-wider">
                        <span>{product.categoryLabel}</span>
                        <span>•</span>
                        <span className="text-zinc-600">{product.subcategoryLabel}</span>
                      </div>

                      <h3 
                        onClick={() => setSelectedProduct(product)}
                        className="text-base font-extrabold text-zinc-950 group-hover:text-red-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    </div>

                    {/* PUNTO 1: Ficha técnica / Métricas de rendimiento en la tarjeta */}
                    {perf && (
                      <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                        {perf.openingTime && (
                          <div className="flex items-center gap-1.5 text-zinc-700">
                            <Timer className="w-3.5 h-3.5 text-red-600 shrink-0" />
                            <span className="text-[11px] font-bold truncate">{perf.openingTime}</span>
                          </div>
                        )}

                        {perf.maxWeight && (
                          <div className="flex items-center gap-1.5 text-zinc-700">
                            <Scale className="w-3.5 h-3.5 text-red-600 shrink-0" />
                            <span className="text-[11px] font-bold truncate">{perf.maxWeight}</span>
                          </div>
                        )}

                        {perf.power && (
                          <div className="flex items-center gap-1.5 text-zinc-700">
                            <Zap className="w-3.5 h-3.5 text-red-600 shrink-0" />
                            <span className="text-[11px] font-bold truncate">{perf.power}</span>
                          </div>
                        )}

                        {perf.cyclesPerHour && (
                          <div className="flex items-center gap-1.5 text-zinc-700">
                            <RotateCw className="w-3.5 h-3.5 text-red-600 shrink-0" />
                            <span className="text-[11px] font-bold truncate">{perf.cyclesPerHour}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Price & CTA Buttons */}
                  <div className="pt-4 border-t border-zinc-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-wider">Precio de lista</span>
                        <span className="text-xl font-black text-zinc-950">
                          {formatCurrency(product.price)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer py-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Ficha Técnica</span>
                      </button>
                    </div>

                    {/* Action buttons row */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onAddToCart(product, 1)}
                        className="flex-1 bg-zinc-950 hover:bg-zinc-800 text-white py-2.5 px-3 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                        title="Agregar al carrito"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-red-500" />
                        <span>Agregar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenQuoteModal(`Presupuesto con instalación para: ${product.name}`)}
                        className="bg-red-600 hover:bg-red-700 text-white py-2.5 px-3 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Cotizar con instalación en San Juan"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Cotizar</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
          onDirectQuote={(name) => {
            setSelectedProduct(null);
            onOpenQuoteModal(`Consulta técnica sobre: ${name}`);
          }}
        />
      )}

    </section>
  );
};
