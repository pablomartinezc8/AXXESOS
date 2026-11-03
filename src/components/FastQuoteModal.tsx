import React, { useState, useEffect } from 'react';
import { CompanyConfig } from '../config/company';
import { StorageService } from '../services/storage';
import { X, Send, PhoneCall, CheckCircle2, Shield } from 'lucide-react';

interface FastQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  initialService?: string;
}

export const FastQuoteModal: React.FC<FastQuoteModalProps> = ({
  isOpen,
  onClose,
  config,
  initialService = ''
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService || 'Automatización Portón Levadizo');
  const [zone, setZone] = useState('San Juan Capital');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Por favor completá tu nombre y teléfono.");
      return;
    }

    // Save to CRM
    StorageService.addInquiry({
      name,
      phone,
      email: '',
      serviceInterest: `[PRESUPUESTO] ${service} - Zona: ${zone}`,
      message: notes || 'Solicitud de presupuesto rápido desde la web.'
    });

    setSubmitted(true);

    // Format WhatsApp
    const waText = `*SOLICITUD DE PRESUPUESTO - AXXESOS*%0A` +
      `*Cliente:* ${encodeURIComponent(name)}%0A` +
      `*Teléfono:* ${encodeURIComponent(phone)}%0A` +
      `*Servicio de interés:* ${encodeURIComponent(service)}%0A` +
      `*Zona / Localidad:* ${encodeURIComponent(zone)}%0A` +
      (notes ? `*Detalles:* ${encodeURIComponent(notes)}%0A` : '') +
      `%0A_Hola, quisiera consultar presupuesto y asesoramiento para este trabajo en San Juan._`;

    const targetPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${targetPhone}?text=${waText}`;

    window.open(waUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 my-8 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900">¡Presupuesto Enviado!</h3>
            <p className="text-xs sm:text-sm text-zinc-600">
              Se abrió la conversación de WhatsApp con AXXESOS. Nuestro equipo técnico responderá tu consulta a la brevedad.
            </p>
            <button
              onClick={onClose}
              className="mt-2 w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                Presupuesto Sin Cargo
              </span>
              <h3 className="text-2xl font-black text-zinc-900">
                Pedí tu Presupuesto a Medida
              </h3>
              <p className="text-xs text-zinc-500">
                Instalación, recambio de motor o reparación técnica en San Juan.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Nombre Completo *</label>
              <input
                type="text"
                required
                placeholder="Ej. Martín González"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-300 rounded-lg text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Teléfono / WhatsApp *</label>
              <input
                type="tel"
                required
                placeholder="Ej. 264 406-2942"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-300 rounded-lg text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Servicio de Interés</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-lg text-xs text-zinc-900 focus:ring-2 focus:ring-red-600"
                >
                  <option value="Automatización Portón Levadizo">Portón Levadizo</option>
                  <option value="Automatización Portón Corredizo">Portón Corredizo</option>
                  <option value="Automatización Portón Batiente">Portón Batiente</option>
                  <option value="Reparación o Servicio Técnico">Reparación / Mantenimiento</option>
                  <option value="Cámaras CCTV y Vigilancia">Cámaras CCTV</option>
                  <option value="Alarmas Residenciales / Negocio">Alarmas</option>
                  <option value="Otro">Otro servicio</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Zona en San Juan</label>
                <input
                  type="text"
                  placeholder="Ej. Capital, Rivadavia..."
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-lg text-xs text-zinc-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Observaciones / Medidas</label>
              <textarea
                rows={3}
                placeholder="Ej. Portón de chapa existente de 3 metros de ancho, necesito automatizarlo con 2 controles."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg text-xs text-zinc-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar por WhatsApp a AXXESOS</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 pt-1">
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
              <span>Atención local en Mariano Moreno Este 297, San Juan</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
