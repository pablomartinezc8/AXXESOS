import React from 'react';
import { INITIAL_SERVICES, ServiceItem } from '../config/company';
import { 
  Maximize2, 
  ChevronsUp, 
  Columns, 
  Camera, 
  ShieldAlert, 
  Wrench, 
  CheckCircle2, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForQuote
}) => {
  // Mapping of icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Maximize2':
        return <Maximize2 className="w-6 h-6 text-red-600" />;
      case 'ChevronsUp':
        return <ChevronsUp className="w-6 h-6 text-red-600" />;
      case 'Columns':
        return <Columns className="w-6 h-6 text-red-600" />;
      case 'Camera':
        return <Camera className="w-6 h-6 text-red-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-red-600" />;
      case 'Wrench':
      default:
        return <Wrench className="w-6 h-6 text-red-600" />;
    }
  };

  return (
    <section id="servicios" className="py-24 bg-zinc-900 text-white relative overflow-hidden">
      {/* Decorative subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Especialistas Técnicos
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Soluciones Integrales en Automatización y Seguridad
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-normal">
            Equipamiento de máxima resistencia para el clima sanjuanino, instalado con respaldo técnico, repuestos y garantía.
          </p>
        </div>

        {/* Services Grid (6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INITIAL_SERVICES.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-red-600/60 p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/30 hover:-translate-y-1.5 relative"
            >
              <div className="space-y-5">
                {/* Header of card: Icon + Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-red-600/10 group-hover:border-red-600/30 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800 group-hover:text-red-400 group-hover:border-red-900/50 transition-colors">
                    {service.highlightTag}
                  </span>
                </div>

                {/* Title & Short Desc */}
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white group-hover:text-red-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Bullets List */}
                <div className="pt-2 border-t border-zinc-900 space-y-2">
                  {service.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-zinc-900/80">
                <button
                  onClick={() => onSelectServiceForQuote(service.title)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-red-600 text-zinc-200 hover:text-white text-xs font-bold tracking-wider uppercase transition-all group/btn cursor-pointer"
                >
                  <span>Consultar Servicio</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover/btn:text-white transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for custom gates or queries */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white">¿Tenés un portón existente y querés automatizarlo?</h4>
            <p className="text-sm text-zinc-400">
              Evaluamos si es corredizo, levadizo o batiente para instalar el kit más conveniente sin modificar tu herrería.
            </p>
          </div>
          <button
            onClick={() => onSelectServiceForQuote('Evaluación de Portón Existente')}
            className="shrink-0 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Solicitar Evaluación Técnica
          </button>
        </div>

      </div>
    </section>
  );
};
