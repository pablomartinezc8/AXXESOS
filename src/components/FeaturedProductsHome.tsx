import React, { useState } from 'react';
import { ProductItem } from '../config/company';
import { 
  ShoppingBag, 
  ArrowRight, 
  Timer, 
  Scale, 
  Zap, 
  RotateCw, 
  FileText, 
  PhoneCall 
} from 'lucide-react';
import { ProductDetailModal } from './ProductDetailModal';

interface FeaturedProductsHomeProps {
  products: ProductItem[];
  onAddToCart: (product: ProductItem, quantity: number) => void;
  onNavigateToProducts: () => void;
  onOpenQuoteModal: (productName?: string) => void;
}

export const FeaturedProductsHome: React.FC<FeaturedProductsHomeProps> = ({
  products,
  onAddToCart,
  onNavigateToProducts,
  onOpenQuoteModal
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Take featured products or top 4
  const featured = products.filter((p) => p.featured).slice(0, 4);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="py-20 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/10 text-red-600 border border-red-600/20">
              <ShoppingBag className="w-3.5 h-3.5" />
              Equipos Destacados AXXESOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
              Automatismos y Seguridad con Respaldo en San Juan
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base">
              Selección de nuestros motores más solicitados, con garantía oficial, repuestos disponibles y colocación técnica especializada.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToProducts}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-4 h-4 text-red-500" />
          </button>
        </div>

        {/* 4 Featured Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => {
            const perf = product.performance;

            return (
              <div
                key={product.id}
                className="group rounded-3xl bg-white border border-zinc-200 hover:border-zinc-400 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
              >
                <div>
                  {/* Photo */}
                  <div 
                    onClick={() => setSelectedProduct(product)}
                    className="relative aspect-square rounded-2xl bg-zinc-950 overflow-hidden cursor-pointer flex items-center justify-center p-5 mb-4 group/img"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover/img:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-red-600 text-white shadow">
                        {product.badge || "Destacado"}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-zinc-900/90 text-zinc-200 border border-zinc-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Stock San Juan
                      </span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                      {product.subcategoryLabel || product.categoryLabel}
                    </span>
                    <h3 
                      onClick={() => setSelectedProduct(product)}
                      className="text-sm font-extrabold text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Performance Specs */}
                  {perf && (
                    <div className="my-3 grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] font-bold text-zinc-700">
                      {perf.openingTime && (
                        <div className="flex items-center gap-1">
                          <Timer className="w-3 h-3 text-red-600 shrink-0" />
                          <span className="truncate">{perf.openingTime}</span>
                        </div>
                      )}
                      {perf.maxWeight && (
                        <div className="flex items-center gap-1">
                          <Scale className="w-3 h-3 text-red-600 shrink-0" />
                          <span className="truncate">{perf.maxWeight}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Price & Button */}
                <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-600 uppercase font-bold">Referencia</span>
                    <span className="text-base font-black text-zinc-900">
                      {formatCurrency(product.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 text-zinc-600 hover:text-red-600 hover:bg-zinc-100 rounded-lg text-xs font-semibold"
                      title="Ver ficha técnica"
                    >
                      <FileText className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onAddToCart(product, 1)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                      title="Agregar al carrito"
                      aria-label={`Agregar ${product.name} al carrito`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

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
