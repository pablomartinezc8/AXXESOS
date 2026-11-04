import React, { useState, useEffect } from 'react';
import { CompanyConfig } from '../config/company';
import { 
  Wifi, 
  Smartphone, 
  ShieldCheck, 
  Bell, 
  Users, 
  Clock, 
  Key, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall,
  Power,
  RotateCw
} from 'lucide-react';

interface SmartWifiSectionProps {
  config: CompanyConfig;
  onOpenQuoteModal: (interest?: string) => void;
}

type GateState = 'closed' | 'opening' | 'open' | 'closing';

export const SmartWifiSection: React.FC<SmartWifiSectionProps> = ({
  config,
  onOpenQuoteModal
}) => {
  const [gateState, setGateState] = useState<GateState>('closed');
  const [lastActionTime, setLastActionTime] = useState<string>('Hoy a las 14:15 hs');
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const handleToggleGate = () => {
    if (gateState === 'closed') {
      setGateState('opening');
      setNotificationToast('Enviando comando: Abriendo portón...');
      setTimeout(() => {
        setGateState('open');
        const now = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
        setLastActionTime(`Hoy a las ${now} hs`);
        setNotificationToast('¡Portón totalmente abierto!');
        setTimeout(() => setNotificationToast(null), 3500);
      }, 3000);
    } else if (gateState === 'open') {
      setGateState('closing');
      setNotificationToast('Enviando comando: Cerrando portón...');
      setTimeout(() => {
        setGateState('closed');
        const now = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
        setLastActionTime(`Hoy a las ${now} hs`);
        setNotificationToast('Portón cerrado de forma segura.');
        setTimeout(() => setNotificationToast(null), 3500);
      }, 3000);
    }
  };

  const isTransitioning = gateState === 'opening' || gateState === 'closing';

  const benefits = [
    {
      icon: Smartphone,
      title: 'Apertura desde Cualquier Lugar',
      description: 'Accioná tu portón desde el centro de San Juan o de viaje. Recibí encomiendas o abrile a familiares sin estar en casa.'
    },
    {
      icon: Bell,
      title: 'Avisos y Notificaciones Push',
      description: 'Tu celular te avisa en tiempo real cada vez que el portón se abre y te alerta si quedó abierto por descuido.'
    },
    {
      icon: Users,
      title: 'Llaves Virtuales para la Familia',
      description: 'Compartí el acceso con los miembros de tu hogar con un solo click. No más gastos en duplicados de controles físicos.'
    },
    {
      icon: Key,
      title: 'Accesos Temporales a Medida',
      description: 'Creá permisos temporales con fecha y franja horaria para personal doméstico, jardineros o albañiles.'
    },
    {
      icon: ShieldCheck,
      title: 'Compatible con tu Motor Actual',
      description: 'Se acopla a tu portón existente (corredizo, levadizo o batiente) sin necesidad de cambiar de motor ni desinstalar nada.'
    },
    {
      icon: Power,
      title: 'Mantiene tus Controles Actuales',
      description: 'La tecnología WiFi convive perfectamente con tus mandos a distancia de siempre. Nada deja de funcionar.'
    }
  ];

  const whatsappMessage = encodeURIComponent(
    `Hola AXXESOS, me interesa el Módulo de Portón con WiFi para abrir desde el celular. ¿Podrían asesorarme sobre costos y compatibilidad con mi portón?`
  );
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="wifi" className="py-20 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30">
            <Wifi className="w-4 h-4 text-red-500 animate-pulse" />
            <span>Tecnología Smart WiFi AXXESOS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Controlá tu Portón desde el Celular
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            Olvidate de los controles rotos o sin pila. Con el módulo WiFi de AXXESOS abrís, cerrás y monitoreás el estado de tu portón desde cualquier parte del mundo con tu teléfono inteligente.
          </p>
        </div>

        {/* Interactive Showcase & Smartphone Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Interactive Phone Simulator */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="w-full max-w-[320px] bg-zinc-900 p-4 rounded-[40px] border-4 border-zinc-700 shadow-2xl relative">
              {/* Phone Speaker & Camera Notch */}
              <div className="w-24 h-4 bg-zinc-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-950" />
              </div>

              {/* Phone Screen Container */}
              <div className="bg-zinc-950 rounded-[28px] p-5 border border-zinc-800 text-white min-h-[460px] flex flex-col justify-between relative overflow-hidden">
                
                {/* App Status Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-zinc-800/80 pb-2">
                    <span className="font-bold text-white flex items-center gap-1">
                      <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                      AXXESOS Smart
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                      En Línea
                    </span>
                  </div>

                  {/* Notification Toast simulation */}
                  {notificationToast && (
                    <div className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <Bell className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="text-[11px] font-medium leading-tight">{notificationToast}</span>
                    </div>
                  )}

                  {/* Gate State Visual Graphic */}
                  <div className="py-6 flex flex-col items-center justify-center text-center">
                    
                    {/* Animated Gate Graphic Box */}
                    <div className="w-32 h-28 rounded-2xl bg-zinc-900 border-2 border-zinc-700 flex flex-col justify-between p-2 mb-3 relative overflow-hidden">
                      {/* Top Header Rail */}
                      <div className="h-2 bg-zinc-700 rounded w-full" />

                      {/* Moving Leaf / Panel */}
                      <div className="h-14 flex items-center justify-center relative">
                        {gateState === 'closed' && (
                          <div className="w-full h-full bg-gradient-to-r from-zinc-800 to-zinc-700 rounded border border-zinc-600 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">Cerrado</span>
                          </div>
                        )}

                        {gateState === 'opening' && (
                          <div className="w-full h-full flex items-center justify-center relative">
                            <div className="w-1/2 h-full bg-red-600/40 rounded border border-red-500 animate-pulse flex items-center justify-center">
                              <RotateCw className="w-4 h-4 text-white animate-spin" />
                            </div>
                          </div>
                        )}

                        {gateState === 'open' && (
                          <div className="w-full h-full border-2 border-dashed border-emerald-500/50 rounded flex items-center justify-center">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Abierto Total</span>
                          </div>
                        )}

                        {gateState === 'closing' && (
                          <div className="w-full h-full flex items-center justify-center relative">
                            <div className="w-3/4 h-full bg-amber-600/40 rounded border border-amber-500 animate-pulse flex items-center justify-center">
                              <RotateCw className="w-4 h-4 text-white animate-spin" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Floor Guide */}
                      <div className="h-2 bg-zinc-800 rounded w-full flex items-center justify-center">
                        <div className="w-12 h-1 bg-red-600 rounded" />
                      </div>
                    </div>

                    {/* Status Text Badge */}
                    <div className="space-y-1">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        gateState === 'closed' 
                          ? 'bg-zinc-800 text-zinc-300 border border-zinc-700' 
                          : gateState === 'open' 
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' 
                            : 'bg-red-600 text-white animate-pulse'
                      }`}>
                        {gateState === 'closed' && 'Portón Cerrado'}
                        {gateState === 'opening' && 'Abriendo Portón...'}
                        {gateState === 'open' && 'Portón Abierto'}
                        {gateState === 'closing' && 'Cerrando Portón...'}
                      </span>
                      <p className="text-[10px] text-zinc-400">
                        Último evento: {lastActionTime}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Big Action Trigger Button */}
                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <button
                    type="button"
                    disabled={isTransitioning}
                    onClick={handleToggleGate}
                    className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                      isTransitioning
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : gateState === 'closed'
                          ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/60'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                    }`}
                  >
                    <Power className={`w-5 h-5 ${isTransitioning ? 'animate-spin' : ''}`} />
                    <span>
                      {isTransitioning 
                        ? 'Ejecutando...' 
                        : gateState === 'closed' 
                          ? 'Tocar para Abrir' 
                          : 'Tocar para Cerrar'}
                    </span>
                  </button>

                  <p className="text-center text-[10px] text-zinc-400">
                    Probá la simulación haciendo click en el botón
                  </p>
                </div>

              </div>
            </div>

            <span className="text-xs text-zinc-400 mt-3 font-medium">
              Simulador interactivo de la App Móvil AXXESOS
            </span>
          </div>

          {/* Right Column: Key Features & Equipment Package */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                ¿Cómo funciona la apertura con WiFi?
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-4">
                Instalamos un módulo receptor de grado industrial conectado a la central de tu motor y a tu red WiFi hogareña (o de comercio). Desde una app gratuita en tu smartphone (Android o iPhone), enviás la orden de apertura con máxima velocidad y encriptación de seguridad.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-200">Sensor de posición magnético que informa si el portón está físicamente cerrado o abierto</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-200">No interfiere con tus controles remotos convencionales, siguen funcionando en paralelo</span>
                </div>
              </div>
            </div>

            {/* Grid of 6 Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b) => {
                const IconComponent = b.icon;
                return (
                  <div 
                    key={b.title}
                    className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white">{b.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{b.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Direct Commercial CTAs */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-zinc-900 border border-red-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
                  Instalación en San Juan
                </span>
                <h4 className="text-lg font-black text-white">
                  ¿Querés sumar WiFi a tu portón?
                </h4>
                <p className="text-xs text-zinc-400">
                  Presupuesto sin cargo. Vamos a tu domicilio o coordinamos en nuestro local de Mariano Moreno Este 297.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl text-xs font-bold tracking-wide shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Consultar por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenQuoteModal('Módulo WiFi Inteligente para Portón')}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl text-xs font-bold tracking-wide shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pedir Cotización</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
