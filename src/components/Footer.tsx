import React from 'react';
import { Logo } from './Logo';
import { CompanyConfig, sanitizeWhatsAppNumber, formatWhatsAppDisplay } from '../config/company';
import { MapPin, Phone, Clock, Instagram, ShieldCheck, ArrowUp, MessageCircle } from 'lucide-react';

interface FooterProps {
  config: CompanyConfig;
  onOpenAdmin: () => void;
  onSelectModule?: (moduleId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenAdmin, onSelectModule }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (e: React.MouseEvent, modId: string) => {
    e.preventDefault();
    if (onSelectModule) {
      onSelectModule(modId);
      scrollToTop();
    }
  };

  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          
          {/* Brand & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="full" size="lg" lightText={true} />
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Automatización de portones y sistemas de seguridad electrónica en San Juan. Calidad, respaldo técnico y atención personalizada.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-red-600 flex items-center justify-center text-zinc-400 hover:text-white transition-colors border border-zinc-800"
                aria-label="Instagram de AXXESOS"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-xs text-zinc-400 font-mono">{config.instagram}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#inicio" onClick={(e) => handleLink(e, 'inicio')} className="hover:text-red-400 transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#productos" onClick={(e) => handleLink(e, 'productos')} className="hover:text-red-400 transition-colors">Catálogo de Productos</a>
              </li>
              <li>
                <a href="#wifi" onClick={(e) => handleLink(e, 'wifi')} className="hover:text-red-400 transition-colors">Portones con WiFi</a>
              </li>
              <li>
                <a href="#servicios" onClick={(e) => handleLink(e, 'servicios')} className="hover:text-red-400 transition-colors">Servicios Técnicos</a>
              </li>
              <li>
                <a href="#trabajos" onClick={(e) => handleLink(e, 'trabajos')} className="hover:text-red-400 transition-colors">Trabajos Realizados</a>
              </li>
              <li>
                <a href="#nosotros" onClick={(e) => handleLink(e, 'nosotros')} className="hover:text-red-400 transition-colors">Quiénes Somos (28 Años)</a>
              </li>
              <li>
                <a href="#contacto" onClick={(e) => handleLink(e, 'contacto')} className="hover:text-red-400 transition-colors">Contacto y Ubicación</a>
              </li>
            </ul>
          </div>

          {/* Services list */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Especialidades
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>Portones corredizos rectos y curvos</li>
              <li>Portones levadizos contrapesados</li>
              <li>Portones batientes de 1 y 2 hojas</li>
              <li>Cámaras CCTV con visualización en app</li>
              <li>Alarmas domiciliarias e industriales</li>
              <li>Venta de controles remotos y cremalleras</li>
            </ul>
          </div>

          {/* Real Contact Details */}
          <div className="lg:col-span-3 space-y-3 text-xs text-zinc-400">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              San Juan, Argentina
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{config.address}, {config.postalCode}, San Juan</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  {config.phoneMobile && (
                    <div className="font-mono text-white font-semibold">CEL: {config.phoneMobile}</div>
                  )}
                  <div className="font-mono text-zinc-300">TEL: {config.phonePrimary}</div>
                  <div className="font-mono text-zinc-400 text-[11px]">TEL: {config.phoneSecondary}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/${sanitizeWhatsAppNumber(config.whatsappNumber)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-mono font-medium text-emerald-400"
                >
                  WhatsApp: {config.whatsappDisplay || formatWhatsAppDisplay(config.whatsappNumber)}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{config.workingHoursSchedule}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {config.name}. Todos los derechos reservados. San Juan, Argentina.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-red-400 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>Acceso Administrador</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
            >
              <span>Volver arriba</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
