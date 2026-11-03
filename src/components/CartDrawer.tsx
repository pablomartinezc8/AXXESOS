import React from 'react';
import { ProductItem } from '../config/company';
import { OrderItem } from '../services/storage';
import { X, Trash2, ShoppingBag, ArrowRight, Store, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { product: ProductItem; quantity: number }[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-950 text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-black tracking-tight">Tu Carrito de Compras</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-zinc-900">El carrito está vacío</h3>
                  <p className="text-xs text-zinc-500 max-w-xs">
                    Podés explorar nuestro catálogo de automatismos, controles, repuestos y kits de seguridad.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                >
                  Explorar la Tienda
                </button>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="py-3.5 flex gap-3 items-center">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-zinc-900 shrink-0 overflow-hidden flex items-center justify-center p-1 border border-zinc-200">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-zinc-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        {product.categoryLabel}
                      </p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-xs font-black text-zinc-900">
                          {formatPrice(product.price)}
                        </span>
                        {quantity > 1 && (
                          <span className="text-[10px] text-zinc-500">
                            (Total: {formatPrice(product.price * quantity)})
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="inline-flex items-center border border-zinc-300 rounded-md bg-white">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            className="px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-100"
                            aria-label="Restar 1"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-zinc-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-100"
                            aria-label="Sumar 1"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          className="text-zinc-400 hover:text-red-600 p-1 rounded transition-colors"
                          title="Eliminar del carrito"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Totals & Action */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-zinc-50 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-medium text-zinc-600">Subtotal estimado:</span>
                <span className="text-xl font-black text-zinc-950">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                Precios de ejemplo «A CONFIRMAR» sujetos a stock físico en el local de Mariano Moreno Este 297.
              </div>

              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Iniciar Cierre de Compra</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Atención directa y personalizada en San Juan</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
