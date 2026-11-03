import React, { useState } from 'react';
import { ProductItem } from '../config/company';
import { X, ShoppingBag, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, quantity: number) => void;
  onDirectQuote: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectQuote
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-zinc-200 my-8 flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-zinc-900/10 hover:bg-zinc-900 hover:text-white text-zinc-700 transition-colors cursor-pointer"
          aria-label="Cerrar detalle"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Image & Badges */}
        <div className="w-full md:w-1/2 bg-zinc-900 relative flex items-center justify-center min-h-[280px] p-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-[300px] w-auto max-w-full object-contain rounded-lg drop-shadow-xl"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-zinc-950 shadow">
              {product.badge || "Ejemplo - A CONFIRMAR"}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-zinc-950/80 text-zinc-300 border border-zinc-800">
              {product.categoryLabel}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-center">
            <span className="text-[11px] text-zinc-400 bg-zinc-950/80 px-2.5 py-1 rounded border border-zinc-800 inline-block">
              Foto y ficha técnica referencial para cotización
            </span>
          </div>
        </div>

        {/* Right Column: Information, Specs & Buy CTA */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            {/* Title & Price */}
            <div>
              <span className="text-xs font-bold text-red-600 tracking-wider uppercase">
                {product.categoryLabel}
              </span>
              <h2 className="text-2xl font-black text-zinc-900 leading-snug mt-1">
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-black text-zinc-950">
                  {formattedPrice}
                </span>
                <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium">
                  Precio orientativo «A CONFIRMAR»
                </span>
              </div>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className={product.inStock ? 'text-emerald-700' : 'text-amber-700'}>
                {product.stockCountText || (product.inStock ? 'En stock en el local' : 'Consultar disponibilidad')}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {product.fullDescription || product.shortDescription}
            </p>

            {/* Specifications Table */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50">
                <div className="px-3 py-2 bg-zinc-100 text-[11px] font-bold text-zinc-700 uppercase tracking-wider border-b border-zinc-200">
                  Ficha Técnica Resumida
                </div>
                <div className="divide-y divide-zinc-200 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="px-3 py-2 flex justify-between gap-4">
                      <span className="font-medium text-zinc-500 shrink-0">{key}:</span>
                      <span className="text-zinc-800 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons: Quantity + Add to Cart */}
          <div className="space-y-3 pt-4 border-t border-zinc-200">
            {addedNotice && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>¡Producto agregado al carrito con éxito!</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-zinc-600 hover:bg-zinc-100 font-bold"
                  aria-label="Restar uno"
                >
                  -
                </button>
                <span className="px-3 py-2 font-bold text-sm text-zinc-900 min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-zinc-600 hover:bg-zinc-100 font-bold"
                  aria-label="Sumar uno"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al Carrito</span>
              </button>
            </div>

            {/* Quick Consult CTA */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onDirectQuote(product.name);
              }}
              className="w-full text-center text-xs font-semibold text-zinc-600 hover:text-red-600 py-1 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>¿Tenés dudas técnicas sobre este equipo? Consultanos por WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
