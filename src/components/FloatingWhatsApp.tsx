import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CompanyConfig, sanitizeWhatsAppNumber } from '../config/company';

interface FloatingWhatsAppProps {
  config: CompanyConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ config }) => {
  const [showBalloon, setShowBalloon] = useState(true);

  const cleanNumber = sanitizeWhatsAppNumber(config.whatsappNumber);
  const defaultMessage = encodeURIComponent("¡Hola AXXESOS! Quisiera hacer una consulta sobre automatización de portones y seguridad electrónica.");
  const waUrl = `https://wa.me/${cleanNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-none select-none">
      
      {/* Speech Balloon Bubble */}
      {showBalloon && (
        <div className="relative pointer-events-auto bg-zinc-900 border border-zinc-700 text-white p-3 rounded-2xl shadow-2xl max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-start gap-2.5">
          <div className="text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>AXXESOS San Juan en línea</span>
            </div>
            <p className="text-[11px] text-zinc-300">
              ¿Buscás presupuesto para automatizar tu portón o reparar un motor? Escribinos.
            </p>
          </div>
          <button
            onClick={() => setShowBalloon(false)}
            className="text-zinc-400 hover:text-white p-0.5 rounded transition-colors"
            aria-label="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto relative group flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Contactar por WhatsApp a AXXESOS"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">Contactar por WhatsApp</span>

        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-pulse pointer-events-none" />
      </a>
    </div>
  );
};
