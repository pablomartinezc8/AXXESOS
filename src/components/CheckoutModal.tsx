import React, { useState } from 'react';
import { CustomerOrder, OrderItem, StorageService } from '../services/storage';
import { CompanyConfig } from '../config/company';
import { 
  X, 
  Send, 
  MapPin, 
  Phone, 
  User, 
  Store, 
  Truck, 
  MessageSquare, 
  CreditCard, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface CheckoutModalProps {
  items: OrderItem[];
  subtotal: number;
  config: CompanyConfig;
  onClose: () => void;
  onOrderSuccess: (order: CustomerOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  items,
  subtotal,
  config,
  onClose,
  onOrderSuccess
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerLocation, setCustomerLocation] = useState('San Juan Capital');
  const [deliveryMethod, setDeliveryMethod] = useState<'retiro' | 'envio'>('retiro');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CustomerOrder | null>(null);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Por favor completá tu nombre y teléfono de contacto.");
      return;
    }

    setIsSubmitting(true);

    // Save order in local storage / CRM
    const newOrder = StorageService.addOrder({
      customerName,
      customerPhone,
      customerLocation,
      deliveryMethod,
      notes,
      items,
      subtotal
    });

    setCompletedOrder(newOrder);
    setIsSubmitting(false);
    onOrderSuccess(newOrder);

    // Construct WhatsApp message preformatted
    const itemsList = items.map(i => `• ${i.quantity}x ${i.name} (${formatPrice(i.price * i.quantity)})`).join('%0A');
    const deliveryText = deliveryMethod === 'retiro' 
      ? 'Retiro por local (Mariano Moreno Este 297, San Juan)' 
      : 'Envío a coordinar';

    const whatsappMessage = `*NUEVO PEDIDO DESDE LA WEB AXXESOS*%0A` +
      `*Orden:* %23${newOrder.id}%0A` +
      `*Cliente:* ${encodeURIComponent(customerName)}%0A` +
      `*Teléfono:* ${encodeURIComponent(customerPhone)}%0A` +
      `*Localidad:* ${encodeURIComponent(customerLocation)}%0A` +
      `*Entrega:* ${encodeURIComponent(deliveryText)}%0A` +
      (notes ? `*Observaciones:* ${encodeURIComponent(notes)}%0A` : '') +
      `%0A*DETALLE DEL PEDIDO:*%0A${itemsList}%0A%0A` +
      `*TOTAL ESTIMADO:* ${encodeURIComponent(formatPrice(subtotal))}%0A%0A` +
      `_Aguardamos su confirmación de stock y tiempo de entrega. Muchas gracias._`;

    const targetPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${targetPhone}?text=${whatsappMessage}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 my-8 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          aria-label="Cerrar pedido"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Confirmation Success State */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-zinc-900">¡Pedido Enviado a AXXESOS!</h3>
              <p className="text-sm text-zinc-600">
                Se generó la orden de cotización <span className="font-mono font-bold text-red-600">#{completedOrder.id}</span> y se abrió tu WhatsApp para enviarla al local.
              </p>
            </div>

            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-left text-xs space-y-1 text-zinc-700">
              <div><strong>Cliente:</strong> {completedOrder.customerName} ({completedOrder.customerPhone})</div>
              <div><strong>Entrega:</strong> {completedOrder.deliveryMethod === 'retiro' ? 'Retiro en Mariano Moreno Este 297' : 'Envío en San Juan'}</div>
              <div><strong>Total orientativo:</strong> {formatPrice(completedOrder.subtotal)}</div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onClose}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-lg text-sm font-bold tracking-wide transition-colors"
              >
                Volver a la tienda
              </button>
            </div>
          </div>
        ) : (
          /* Order Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                Cierre de Pedido / Cotización
              </span>
              <h2 className="text-2xl font-black text-zinc-900">
                Datos para coordinar tu compra
              </h2>
              <p className="text-xs text-zinc-500">
                No solicitamos datos de tarjeta ni pagos por la web. El pedido se confirma directamente con nuestro personal en San Juan.
              </p>
            </div>

            {/* Resumen express de productos */}
            <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200 space-y-2 max-h-36 overflow-y-auto">
              <div className="text-xs font-bold text-zinc-700 flex justify-between">
                <span>Productos ({items.length}):</span>
                <span className="text-zinc-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="divide-y divide-zinc-200 text-xs text-zinc-600">
                {items.map(item => (
                  <div key={item.productId} className="py-1 flex justify-between">
                    <span className="truncate pr-2">{item.quantity}x {item.name}</span>
                    <span className="shrink-0 font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Nombre y Apellido *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded-lg text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Teléfono / WhatsApp de contacto *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 264 15-4123456"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded-lg text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Localidad / Barrio (San Juan)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Ej. Capital, Rivadavia, Santa Lucía, Rawson, Chimbas..."
                    value={customerLocation}
                    onChange={(e) => setCustomerLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded-lg text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Option */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-2">
                  Forma de entrega
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('retiro')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      deliveryMethod === 'retiro'
                        ? 'border-red-600 bg-red-50/60 ring-2 ring-red-600/20'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Store className={`w-4 h-4 ${deliveryMethod === 'retiro' ? 'text-red-600' : 'text-zinc-500'}`} />
                      <span className="text-xs font-bold text-zinc-900">Retiro en Local</span>
                    </div>
                    <span className="text-[11px] text-zinc-500">Mariano Moreno E. 297</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('envio')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      deliveryMethod === 'envio'
                        ? 'border-red-600 bg-red-50/60 ring-2 ring-red-600/20'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Truck className={`w-4 h-4 ${deliveryMethod === 'envio' ? 'text-red-600' : 'text-zinc-500'}`} />
                      <span className="text-xs font-bold text-zinc-900">Envío en San Juan</span>
                    </div>
                    <span className="text-[11px] text-zinc-500">A coordinar con el local</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Observaciones adicionales (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="¿Desea consultar por costo de instalación en su domicilio?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 bg-white border border-zinc-300 rounded-lg text-xs text-zinc-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Mercado Pago Ready Architecture Notice */}
            <div className="p-3 bg-zinc-100 rounded-xl border border-zinc-200 text-[11px] text-zinc-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-zinc-800">
                <CreditCard className="w-3.5 h-3.5 text-zinc-600" />
                <span>Pasarela Mercado Pago (Estructura lista para activar):</span>
              </div>
              <p>
                La integración con Checkout Pro de Mercado Pago se encuentra preparada a nivel de esquema (campo `MERCADO_PAGO_ACCESS_TOKEN` en variables de entorno Vercel). En esta etapa inicial el pedido se gestiona directamente vía WhatsApp oficial para garantizar confirmación de stock físico.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Procesando...' : 'Confirmar Pedido por WhatsApp'}</span>
              </button>
              <p className="text-center text-[11px] text-zinc-400 mt-2">
                Al confirmar, se abrirá WhatsApp con el detalle listo para enviar a AXXESOS.
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
