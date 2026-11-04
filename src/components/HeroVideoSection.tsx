import React, { useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  PhoneCall, 
  ShoppingBag, 
  Wifi, 
  ShieldCheck, 
  Star, 
  ChevronRight,
  Clock,
  MapPin
} from 'lucide-react';
import { CompanyConfig } from '../config/company';

interface HeroVideoSectionProps {
  config: CompanyConfig;
  onNavigateToModule: (moduleId: string) => void;
  onOpenQuoteModal: () => void;
}

export const HeroVideoSection: React.FC<HeroVideoSectionProps> = ({
  config,
  onNavigateToModule,
  onOpenQuoteModal
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative min-h-[85vh] sm:min-h-[90vh] bg-zinc-950 text-white flex flex-col justify-between overflow-hidden pt-20">
      
      {/* Background HTML5 Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/axxesos_gate_video.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-45 scale-105 filter brightness-90 contrast-110"
        />
        
        {/* Dark & Brand Gradients over the video for high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
        <div className="absolute -top-32 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Hero Video Controls (top right) */}
      <div className="absolute top-24 right-4 sm:right-8 z-20 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-700/80 text-xs">
        <button
          type="button"
          onClick={togglePlay}
          className="hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1"
          aria-label={isPlaying ? 'Pausar video de fondo' : 'Reproducir video de fondo'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline text-[11px] font-medium">{isPlaying ? 'Pausa' : 'Play'}</span>
        </button>

        <span className="text-zinc-600">|</span>

        <button
          type="button"
          onClick={toggleMute}
          className="hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1"
          aria-label={isMuted ? 'Activar audio del video' : 'Silenciar video'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline text-[11px] font-medium">{isMuted ? 'Mute' : 'Audio'}</span>
        </button>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          
          {/* Trajectory & Google Reviews Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-md shadow-red-950/60 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              28 Años de Trayectoria (1998 — 2026)
            </span>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900/90 text-zinc-200 border border-zinc-700 backdrop-blur-sm">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>Google 4.4</span>
              <span className="text-zinc-500 font-normal">({config.googleReviewCount} opiniones)</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Automatización de Portones y Seguridad Electrónica en San Juan
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-300 leading-relaxed max-w-2xl font-normal">
            Kits completos para portones corredizos, levadizos y batientes. Servicio técnico especializado, instalación con garantía y apertura inteligente con tecnología WiFi desde el celular.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            
            {/* Quote CTA */}
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-xl shadow-red-950/50 hover:shadow-2xl active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Pedí tu Presupuesto</span>
            </button>

            {/* Catalog CTA */}
            <button
              type="button"
              onClick={() => onNavigateToModule('productos')}
              className="bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 hover:text-white px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all border border-zinc-700 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-red-400" />
              <span>Ver Catálogo de Productos</span>
            </button>

            {/* WiFi Smart CTA */}
            <button
              type="button"
              onClick={() => onNavigateToModule('wifi')}
              className="bg-zinc-950/80 hover:bg-zinc-900 text-red-400 hover:text-red-300 px-5 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all border border-red-900/40 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>Portones con WiFi</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* Highlight features */}
          <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-400 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Presupuestos sin cargo en San Juan
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Repuestos y taller propio
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Atención Lunes a Viernes con corte al mediodía
            </span>
          </div>

        </div>
      </div>

      {/* Bottom Information Ticker Bar */}
      <div className="relative z-10 bg-zinc-950/90 border-t border-zinc-800/80 backdrop-blur-md py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-300">
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
            <span><strong>Local y Taller:</strong> {config.address}, {config.city}, San Juan</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
            <span><strong>Horario:</strong> Mañana hasta 12:30 hs | Tarde reabre 16:30 hs</span>
          </div>

          <div className="flex items-center gap-3">
            <span><strong>Teléfono:</strong> {config.phonePrimary}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-emerald-400 font-bold">WhatsApp: {config.whatsappDisplay}</span>
          </div>

        </div>
      </div>

    </div>
  );
};
