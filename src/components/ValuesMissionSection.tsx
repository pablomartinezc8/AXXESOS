import React from 'react';
import { CompanyConfig } from '../config/company';
import { Award, ShieldCheck, Wrench, CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react';

interface ValuesMissionSectionProps {
  config: CompanyConfig;
  onOpenQuoteModal: () => void;
  onNavigateToAbout?: () => void;
}

export const ValuesMissionSection: React.FC<ValuesMissionSectionProps> = ({
  config,
  onOpenQuoteModal,
  onNavigateToAbout
}) => {
  const values = [
    { word: 'ORDEN', size: 'text-2xl sm:text-3xl font-extrabold tracking-wider text-zinc-900', top: 'top-2', left: 'left-1/2 -translate-x-1/2' },
    { word: 'COMPROMISO', size: 'text-xl sm:text-2xl font-black text-red-600 tracking-wide', top: 'top-16', left: 'left-4' },
    { word: 'PASIÓN', size: 'text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight', top: 'top-14', right: 'right-4' },
    { word: 'SERVICIO', size: 'text-3xl sm:text-4xl font-black text-red-600 tracking-tight', top: 'top-32', left: 'left-2' },
    { word: 'VOCACIÓN', size: 'text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-wide', top: 'top-48', right: 'right-6' },
    { word: 'EXCELENCIA', size: 'text-xl sm:text-2xl font-bold text-zinc-800 tracking-widest', bottom: 'bottom-4', left: 'left-1/2 -translate-x-1/2' },
  ];

  return (
    <section className="py-20 bg-zinc-100 border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title pill */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/10 text-red-600 border border-red-600/20">
            <Award className="w-3.5 h-3.5" />
            Identidad y Filosofía AXXESOS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-2">
            28 Años de Compromiso con la Seguridad en San Juan
          </h2>
        </div>

        {/* Two Column Layout inspired by BBS Motion design pattern, adapted with AXXESOS branding */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Word Cloud of Core Values occupying the full module height */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-zinc-200/80 shadow-lg flex flex-col justify-between relative overflow-hidden">
            {/* Background subtle radial pattern and watermark */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_75%)] pointer-events-none" />

            {/* Word cloud layout filling the full height of the module */}
            <div className="relative z-10 flex-1 w-full flex flex-col justify-between py-4 select-none min-h-[460px]">
              
              {/* Decorative graphic marks dispersed across the whole area */}
              <span className="absolute top-2 left-10 text-zinc-300 text-sm select-none pointer-events-none">✦</span>
              <span className="absolute top-1 right-16 text-red-400 text-base select-none pointer-events-none">✦</span>
              <span className="absolute top-24 left-3 text-zinc-300 text-base select-none pointer-events-none">○</span>
              <span className="absolute top-28 right-8 text-zinc-300 text-sm select-none pointer-events-none">✦</span>
              <span className="absolute top-1/2 left-8 -translate-y-1/2 text-red-300 text-xs select-none pointer-events-none">✦</span>
              <span className="absolute top-1/2 right-4 -translate-y-1/2 text-zinc-300 text-base select-none pointer-events-none">○</span>
              <span className="absolute bottom-28 left-6 text-zinc-300 text-sm select-none pointer-events-none">○</span>
              <span className="absolute bottom-24 right-10 text-red-400 text-sm select-none pointer-events-none">✦</span>
              <span className="absolute bottom-12 left-14 text-zinc-300 text-xs select-none pointer-events-none">✦</span>

              {/* 1. ORDEN */}
              <div className="text-center pt-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[0.25em] text-zinc-900 uppercase inline-block drop-shadow-sm">
                  ORDEN
                </span>
              </div>

              {/* 2. COMPROMISO & PASIÓN */}
              <div className="flex items-baseline justify-between px-2 sm:px-6 my-2">
                <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-zinc-700 uppercase">
                  COMPROMISO
                </span>
                <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-red-600 uppercase">
                  PASIÓN
                </span>
              </div>

              {/* 3. SERVICIO (Centerpiece) */}
              <div className="px-2 sm:px-4 my-2 text-left">
                <span className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-zinc-950 uppercase inline-block leading-none">
                  SERVICIO
                </span>
              </div>

              {/* 4. SEGURIDAD & VOCACIÓN */}
              <div className="flex items-baseline justify-between px-2 sm:px-6 my-2">
                <span className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-wider text-zinc-500 uppercase">
                  SEGURIDAD
                </span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-red-600 uppercase">
                  VOCACIÓN
                </span>
              </div>

              {/* 5. EXCELENCIA */}
              <div className="text-center my-3">
                <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-[0.3em] text-zinc-800 uppercase inline-block">
                  EXCELENCIA
                </span>
              </div>

              {/* 6. Signature Logo Pill (Anchored with presence at base of cloud) */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-white border border-zinc-200/90 shadow-md hover:shadow-lg transition-all hover:scale-105">
                  <img
                    src={config.logoUrl || "/axxesos_logo_dark.png"}
                    alt="AXXESOS Portones & Seguridad"
                    className="h-7 sm:h-8 w-auto object-contain max-w-[190px]"
                  />
                </div>
              </div>

            </div>

            <div className="w-full mt-6 pt-4 border-t border-zinc-100 text-center text-xs sm:text-sm font-semibold text-zinc-500">
              Valores que guían cada instalación y servicio técnico en San Juan
            </div>
          </div>

          {/* Right Column: Mission Card in AXXESOS colors (Dark/Red theme with 100% original copy) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Top red glow accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    Nosotros
                  </h3>
                  <p className="text-xs text-red-400 font-semibold tracking-wider uppercase mt-1">
                    San Juan, Argentina
                  </p>
                </div>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-red-600 text-white tracking-wider uppercase shadow-sm">
                  1998 — 2026 • 28 Años
                </span>
              </div>

              {/* Brand new original copy tailored specifically to AXXESOS */}
              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <p>
                  En <strong className="text-white font-bold">AXXESOS</strong> entendemos que la tranquilidad de una familia y el funcionamiento diario de una empresa comienzan por un acceso seguro, ágil y duradero.
                </p>
                <p>
                  Desde hace más de <strong className="text-white font-bold">28 años</strong> brindamos soluciones integrales en automatización de portones y seguridad electrónica en toda la provincia. No improvisamos: unimos la robustez de nuestra herrería propia con motores y tecnologías de primera línea, acompañados siempre por un servicio postventa real y repuestos originales en nuestro local de <strong className="text-white font-semibold">Mariano Moreno Este 297</strong>.
                </p>
              </div>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
                  <span className="text-2xl sm:text-3xl font-black text-red-500 block">28 Años</span>
                  <span className="text-xs text-zinc-400 font-medium">De experiencia técnica ininterrumpida</span>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
                  <span className="text-2xl sm:text-3xl font-black text-white block">Taller Propio</span>
                  <span className="text-xs text-zinc-400 font-medium">Herrería a medida y repuestos garantizados</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 mt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 relative z-10">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Pedí tu presupuesto</span>
              </button>

              {onNavigateToAbout && (
                <button
                  type="button"
                  onClick={onNavigateToAbout}
                  className="text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer py-2"
                >
                  <span>Conocer más sobre AXXESOS</span>
                  <ChevronRight className="w-4 h-4 text-red-500" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
