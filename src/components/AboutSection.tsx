import React from 'react';
import { CompanyConfig } from '../config/company';
import { ShieldCheck, MapPin, Award, Clock, Star, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface AboutSectionProps {
  config: CompanyConfig;
  onOpenAdmin: () => void;
  onOpenQuoteModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  config,
  onOpenAdmin,
  onOpenQuoteModal
}) => {
  return (
    <section id="nosotros" className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Card / Brand Badge */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-950 p-8 text-white shadow-2xl border border-zinc-800">
              {/* Background gradient decorative glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-zinc-800/40 blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                    <span className="text-xs uppercase tracking-widest font-bold text-red-500">San Juan, Argentina</span>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">Desde 1998</span>
                </div>

                {/* 28 Años de Trayectoria Oficial */}
                <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-zinc-800 text-center space-y-3 shadow-inner">
                  <div className="flex justify-center">
                    <img 
                      src="/axxesos_badge_round.png" 
                      alt="AXXESOS 28 Años de Trayectoria en San Juan" 
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                      loading="eager"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/60">
                      <Award className="w-3.5 h-3.5 text-red-500" />
                      Trayectoria Comprobada
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tight pt-1">
                      28 AÑOS
                    </div>
                    <p className="text-xs text-zinc-200 font-medium tracking-wide">
                      Automatización y Seguridad en San Juan
                    </p>
                    <p className="text-[11px] text-zinc-400 font-mono">
                      1998 — 2026 • San Juan, Argentina
                    </p>
                  </div>
                </div>

                {/* Real Highlights Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="text-lg font-black text-white">{config.googleRating}</span>
                    </div>
                    <p className="text-xs text-zinc-400">27 opiniones verificadas en Google</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <div className="flex items-center gap-1.5 text-red-500 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-bold text-white">Local Propio</span>
                    </div>
                    <p className="text-xs text-zinc-400">Mariano Moreno E. 297</p>
                  </div>
                </div>

                {/* Horario con corte al mediodía verificado */}
                <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                  <div className="text-xs text-zinc-300 space-y-0.5">
                    <div className="font-semibold text-white">Horario Comercial</div>
                    <div>Corte al mediodía (cierra 12:30, reabre 16:30)</div>
                    <div className="text-[11px] text-zinc-400 italic">Días de atención: «A CONFIRMAR»</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Company Story & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600">
                <ShieldCheck className="w-4 h-4" />
                <span>Quiénes Somos</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                Seguridad electrónica y automatización confiable para San Juan
              </h2>
            </div>

            {/* Main prudent and verified text */}
            <div className="prose prose-zinc max-w-none text-zinc-700 space-y-4 leading-relaxed text-base">
              <p className="text-lg text-zinc-800 font-medium leading-relaxed">
                {config.aboutShort}
              </p>
              <p>
                {config.aboutFull}
              </p>
            </div>

            {/* Trust and Quality Commitment Card */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs space-y-2">
              <div className="font-bold flex items-center gap-2 text-zinc-900 text-sm">
                <Award className="w-4 h-4 text-red-600" />
                <span>Compromiso de Calidad y Servicio Técnico</span>
              </div>
              <p className="text-zinc-600 leading-relaxed">
                Realizamos visitas a domicilio para relevamiento técnico, presupuestos a medida de herrería y motores, y servicio postventa en toda la provincia de San Juan.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Solicitar Asesoramiento Técnico</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#servicios"
                className="inline-flex items-center gap-2 text-zinc-700 hover:text-zinc-900 px-4 py-3 rounded-lg text-sm font-semibold transition-colors hover:bg-zinc-100"
              >
                Ver servicios ofrecidos
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
