import React, { useState } from 'react';
import { ProductItem } from '../config/company';
import { 
  X, 
  ShoppingBag, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Printer, 
  Zap, 
  Scale, 
  Timer, 
  RotateCw,
  PhoneCall
} from 'lucide-react';

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

  const handlePrint = () => {
    window.print();
  };

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-zinc-200 my-6 flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-zinc-900/10 hover:bg-zinc-900 hover:text-white text-zinc-700 transition-colors cursor-pointer"
          aria-label="Cerrar detalle"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Image & Badges */}
        <div className="w-full md:w-5/12 bg-zinc-950 relative flex flex-col items-center justify-between p-6 sm:p-8 min-h-[320px]">
          
          {/* Top Badges */}
          <div className="w-full flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white shadow-md">
              {product.badge || "Equipo Oficial AXXESOS"}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
              {product.subcategoryLabel || product.categoryLabel}
            </span>
          </div>

          {/* Product Center Photo */}
          <div className="my-auto py-4 flex items-center justify-center w-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-[260px] w-auto max-w-full object-contain rounded-xl drop-shadow-2xl"
            />
          </div>

          {/* Bottom San Juan Guarantee Tag */}
          <div className="w-full text-center pt-2">
            <span className="text-[11px] text-zinc-400 bg-zinc-900/80 px-3 py-1 rounded-full border border-zinc-800 inline-block font-medium">
              Garantía y servicio técnico en San Juan (28 años de trayectoria)
            </span>
          </div>
        </div>

        {/* Right Column: Information, Specs Table & Performance Metrics */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
          
          <div className="space-y-5">
            {/* Category Breadcrumb & Title */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
                <span>{product.categoryLabel}</span>
                <span>•</span>
                <span className="text-zinc-600">{product.subcategoryLabel}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 leading-snug mt-1">
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-black text-zinc-950">
                  {formattedPrice}
                </span>
                <span className="text-xs text-zinc-600 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-full font-medium">
                  Precio de lista / orientativo
                </span>
              </div>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className={product.inStock ? 'text-emerald-700' : 'text-amber-700'}>
                {product.stockCountText || (product.inStock ? 'En stock en el local de Mariano Moreno Este 297' : 'Consultar disponibilidad')}
              </span>
            </div>

            {/* Performance Metrics Badges (PUNTO 1: Ficha técnica ampliada) */}
            {product.performance && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {product.performance.openingTime && (
                  <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col">
                    <span className="text-[10px] text-zinc-600 uppercase font-bold flex items-center gap-1">
                      <Timer className="w-3 h-3 text-red-500" />
                      Velocidad
                    </span>
                    <span className="text-xs font-black text-zinc-900 mt-0.5">
                      {product.performance.openingTime}
                    </span>
                  </div>
                )}

                {product.performance.maxWeight && (
                  <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col">
                    <span className="text-[10px] text-zinc-600 uppercase font-bold flex items-center gap-1">
                      <Scale className="w-3 h-3 text-red-500" />
                      Peso Máx.
                    </span>
                    <span className="text-xs font-black text-zinc-900 mt-0.5">
                      {product.performance.maxWeight}
                    </span>
                  </div>
                )}

                {product.performance.power && (
                  <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col">
                    <span className="text-[10px] text-zinc-600 uppercase font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-red-500" />
                      Potencia
                    </span>
                    <span className="text-xs font-black text-zinc-900 mt-0.5">
                      {product.performance.power}
                    </span>
                  </div>
                )}

                {product.performance.cyclesPerHour && (
                  <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col">
                    <span className="text-[10px] text-zinc-600 uppercase font-bold flex items-center gap-1">
                      <RotateCw className="w-3 h-3 text-red-500" />
                      Ciclos
                    </span>
                    <span className="text-xs font-black text-zinc-900 mt-0.5">
                      {product.performance.cyclesPerHour}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {product.fullDescription || product.shortDescription}
            </p>

            {/* Specifications Detailed Table */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-zinc-50">
                <div className="px-4 py-2.5 bg-zinc-100 flex items-center justify-between border-b border-zinc-200">
                  <span className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider">
                    Ficha Técnica Completa
                  </span>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="text-[11px] font-semibold text-zinc-600 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Imprimir o guardar como PDF"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir Ficha</span>
                  </button>
                </div>
                <div className="divide-y divide-zinc-200 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="px-4 py-2.5 flex justify-between gap-4">
                      <span className="font-semibold text-zinc-500 shrink-0">{key}:</span>
                      <span className="text-zinc-900 text-right font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons: Quantity + Add to Cart + WhatsApp Quote */}
          <div className="space-y-3 pt-4 border-t border-zinc-200">
            {addedNotice && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>¡Producto agregado al carrito con éxito! Podés finalizar tu pedido o seguir navegando.</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-zinc-300 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-zinc-600 hover:bg-zinc-100 font-bold"
                  aria-label="Restar uno"
                >
                  -
                </button>
                <span className="px-3 py-3 font-bold text-sm text-zinc-900 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-zinc-600 hover:bg-zinc-100 font-bold"
                  aria-label="Sumar uno"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3.5 px-4 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al Carrito</span>
              </button>
            </div>

            {/* Direct Consultation Button */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onDirectQuote(product.name);
              }}
              className="w-full text-center text-xs font-semibold text-zinc-600 hover:text-red-600 py-2 flex items-center justify-center gap-1.5 cursor-pointer bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>¿Tenés dudas técnicas o querés presupuesto con colocación? Consultanos por WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
