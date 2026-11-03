import React, { useState, useMemo } from 'react';
import { ProductItem } from '../config/company';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  SlidersHorizontal, 
  ArrowUpDown, 
  PlusCircle, 
  CheckCircle, 
  Info,
  ChevronRight
} from 'lucide-react';
import { ProductDetailModal } from './ProductDetailModal';

interface ShopSectionProps {
  products: ProductItem[];
  onAddToCart: (product: ProductItem, quantity: number) => void;
  onOpenAdmin: () => void;
  onOpenQuoteModal: (productName?: string) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  onAddToCart,
  onOpenAdmin,
  onOpenQuoteModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(350000);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'corredizos', label: 'Motores Corredizos' },
    { id: 'levadizos', label: 'Motores Levadizos' },
    { id: 'batientes', label: 'Motores Batientes' },
    { id: 'controles', label: 'Controles y Placas' },
    { id: 'seguridad', label: 'CCTV y Alarmas' },
    { id: 'repuestos', label: 'Accesorios y Cremalleras' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
        const matchesSearch = 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = item.price <= maxPriceFilter;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy, maxPriceFilter]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="tienda" className="py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white">
              <ShoppingBag className="w-3.5 h-3.5 text-red-500" />
              Catálogo de Equipos y Repuestos
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
              Tienda de Automatismos y Seguridad
            </h2>
            <p className="text-base text-zinc-600">
              Kits para portones, centrales, cremalleras y sistemas de seguridad con retiro en local en San Juan o envío coordinado.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-700 shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4 text-red-600" />
              <span>Cargar Producto Nuevo (Admin)</span>
            </button>
          </div>
        </div>

        {/* Notice of Example Prices & Data Rule */}
        <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold">Aviso de precios y marcas:</span>
            <p className="text-amber-800">
              Los productos que figuran a continuación son de <strong>ejemplo orientativo («A CONFIRMAR»)</strong> para que el titular cargue sus marcas oficiales, listas de precios vigentes y stock en el panel de administración.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200 space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por motor, control, cremallera, alarma..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-300 rounded-lg text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all shadow-sm"
              />
            </div>

            {/* Sort Options */}
            <div className="md:col-span-4 flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-zinc-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-white border border-zinc-300 rounded-lg text-xs sm:text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm"
              >
                <option value="default">Ordenar: Destacados primero</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Alfabético: Nombre (A-Z)</option>
              </select>
            </div>

            {/* Price Filter slider */}
            <div className="md:col-span-3 flex flex-col justify-center px-2">
              <div className="flex justify-between text-[11px] font-medium text-zinc-600 mb-1">
                <span>Precio máx:</span>
                <span className="font-bold text-zinc-900">{formatCurrency(maxPriceFilter)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="350000"
                step="10000"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer h-1.5 bg-zinc-200 rounded-lg"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar border-t border-zinc-200">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white text-zinc-700 hover:bg-zinc-200 border border-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 rounded-2xl border border-zinc-200 p-8 space-y-4">
            <p className="text-zinc-600 font-medium">No encontramos productos con esos criterios de búsqueda.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
                setMaxPriceFilter(350000);
              }}
              className="px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-bold"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl bg-white border border-zinc-200 hover:border-zinc-400 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
              >
                <div>
                  {/* Photo container */}
                  <div 
                    onClick={() => setSelectedProduct(product)}
                    className="relative aspect-square rounded-xl bg-zinc-900 overflow-hidden cursor-pointer flex items-center justify-center p-4 mb-4"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-zinc-950 shadow">
                        {product.badge || "Ejemplo - A CONFIRMAR"}
                      </span>
                    </div>

                    {/* Stock pill */}
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-950/80 text-zinc-200 backdrop-blur-sm border border-zinc-800">
                        <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        {product.inStock ? 'En stock' : 'A pedido'}
                      </span>
                    </div>
                  </div>

                  {/* Category & Title */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                      {product.categoryLabel}
                    </span>
                    <h3 
                      onClick={() => setSelectedProduct(product)}
                      className="text-sm font-bold text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Price and Add button */}
                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold">Precio orientativo</span>
                    <span className="text-base sm:text-lg font-black text-zinc-900">
                      {formatCurrency(product.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg text-xs font-semibold"
                      title="Ver ficha técnica"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onAddToCart(product, 1)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-lg transition-colors shadow-sm active:scale-95 cursor-pointer"
                      title="Agregar al carrito"
                      aria-label={`Agregar ${product.name} al carrito`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
