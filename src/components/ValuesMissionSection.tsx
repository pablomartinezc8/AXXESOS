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
          
          {/* Left Column: Word Cloud of Core Values around AXXESOS Emblem */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200/80 shadow-lg flex flex-col items-center justify-center relative min-h-[380px] overflow-hidden">
            {/* Background subtle radial pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)] pointer-events-none" />

            {/* Circular scattered values layout */}
            <div className="relative w-full max-w-[420px] h-[320px] flex items-center justify-center">
              
              {/* Words positioned around center */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-widest text-zinc-800">
                  ORDEN
                </span>
              </div>

              <div className="absolute top-16 left-3 text-left">
                <span className="text-lg sm:text-2xl font-bold tracking-tight text-zinc-700">
                  COMPROMISO
                </span>
              </div>

              <div className="absolute top-14 right-4 text-right">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-red-600">
                  PASIÓN
                </span>
              </div>

              <div className="absolute top-36 left-0 text-left">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
                  SERVICIO
                </span>
              </div>

              <div className="absolute top-36 right-2 text-right">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-red-600">
                  VOCACIÓN
                </span>
              </div>

              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center">
                <span className="text-lg sm:text-xl font-bold tracking-widest text-zinc-700 uppercase">
                  EXCELENCIA
                </span>
              </div>

              {/* Decorative dots matching the visual */}
              <span className="absolute top-10 left-16 text-zinc-400 text-xs">✦</span>
              <span className="absolute top-8 right-24 text-red-400 text-sm">✦</span>
              <span className="absolute bottom-28 left-20 text-zinc-400 text-xs">○</span>
              <span className="absolute bottom-24 right-16 text-zinc-400 text-xs">○</span>
              <span className="absolute bottom-6 left-12 text-red-400 text-xs">✦</span>

              {/* Center Emblem: AXXESOS Emblem */}
              <div className="relative z-10 flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-zinc-200 shadow-md">
                <img
                  src={config.logoUrl || "/axxesos_logo_dark.png"}
                  alt="AXXESOS Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>

            </div>

            <div className="mt-4 pt-4 border-t border-zinc-100 text-center text-xs font-semibold text-zinc-500">
              Valores que guían cada instalación y servicio técnico en San Juan
            </div>
          </div>

          {/* Right Column: Mission Card in AXXESOS colors (Dark/Red theme) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Top red glow accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Nosotros
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white tracking-wider uppercase">
                  1998 — 2026
                </span>
              </div>

              <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
                En <strong className="text-white font-bold">AXXESOS</strong> estamos convencidos que innovar es una rutina diaria. Por eso, nuestro objetivo no sólo es brindar productos de calidad y un servicio del que podamos sentirnos orgullosos, sino que también nuestra meta es encontrar cada día un desafío que nos permita ir siempre un poco más allá.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <span className="text-2xl sm:text-3xl font-black text-red-500 block">28 Años</span>
                  <span className="text-xs text-zinc-400 font-medium">De trayectoria técnica continua en San Juan</span>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <span className="text-2xl sm:text-3xl font-black text-white block">100% Real</span>
                  <span className="text-xs text-zinc-400 font-medium">Garantía, repuestos y servicio en local propio</span>
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
