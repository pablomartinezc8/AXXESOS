import React, { useState } from 'react';
import { CompanyConfig } from '../config/company';
import { StorageService } from '../services/storage';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Star, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface ContactSectionProps {
  config: CompanyConfig;
  prefilledInterest?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  config,
  prefilledInterest = ''
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceInterest, setServiceInterest] = useState(prefilledInterest || 'Presupuesto de Portón');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Por favor completá al menos tu nombre y teléfono.");
      return;
    }

    // Save inquiry to local CRM
    StorageService.addInquiry({
      name,
      phone,
      email,
      serviceInterest,
      message
    });

    setSubmitted(true);

    // Format WhatsApp query
    const waText = `*CONSULTA DESDE LA WEB AXXESOS*%0A` +
      `*Nombre:* ${encodeURIComponent(name)}%0A` +
      `*Teléfono:* ${encodeURIComponent(phone)}%0A` +
      (email ? `*Email:* ${encodeURIComponent(email)}%0A` : '') +
      `*Interés:* ${encodeURIComponent(serviceInterest)}%0A` +
      (message ? `*Mensaje:* ${encodeURIComponent(message)}%0A` : '') +
      `%0A_Agradezco su pronta respuesta y asesoramiento técnico._`;

    const targetPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${targetPhone}?text=${waText}`;

    // Open WhatsApp
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contacto" className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30">
            <MessageSquare className="w-3.5 h-3.5" />
            Atención Inmediata
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Contactanos y Pedí tu Presupuesto
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Estamos en Mariano Moreno Este 297, San Juan. Consultanos por WhatsApp o completá el formulario para coordinar una visita técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Verified Company Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Cards */}
            <div className="bg-zinc-900/90 rounded-2xl border border-zinc-800 p-6 sm:p-7 space-y-6">
              
              <h3 className="text-lg font-black text-white border-b border-zinc-800 pb-3 flex items-center justify-between">
                <span>Datos de la Empresa</span>
                <span className="text-[10px] font-mono font-normal text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Verificado San Juan
                </span>
              </h3>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 text-red-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 text-xs sm:text-sm">
                    <div className="font-bold text-white">Dirección de Atención</div>
                    <div className="text-zinc-300">{config.address}</div>
                    <div className="text-zinc-400 text-xs">{config.postalCode}, {config.city}, {config.province}, Argentina</div>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 text-red-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 text-xs sm:text-sm">
                    <div className="font-bold text-white">Teléfonos de Contacto</div>
                    <div className="text-zinc-300 font-mono font-medium">
                      <a href={`tel:${config.phonePrimary}`} className="hover:text-red-400 transition-colors">
                        {config.phonePrimary}
                      </a>
                    </div>
                    <div className="text-zinc-400 font-mono text-xs">
                      <a href={`tel:${config.phoneSecondary}`} className="hover:text-red-400 transition-colors">
                        Otro teléfono: {config.phoneSecondary}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours with lunch break */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 text-red-500">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 text-xs sm:text-sm">
                    <div className="font-bold text-white">Horario de Atención</div>
                    <div className="text-zinc-300">{config.workingHoursSchedule}</div>
                    <div className="text-[11px] text-amber-400 italic">
                      {config.workingHoursDaysNotice}
                    </div>
                  </div>
                </div>

                {/* Social & Google */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 text-red-500">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-bold text-white">Redes Sociales</div>
                    <div>
                      <a 
                        href={config.instagramUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-400 hover:text-red-300 font-medium inline-flex items-center gap-1"
                      >
                        <span>{config.instagram} en Instagram</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 pt-1">
                      <div className="flex text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                      </div>
                      <span>Calificación Google: <strong>{config.googleRating}</strong> ({config.googleReviewCount} opiniones)</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Embedded Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 h-64 shadow-xl">
              <iframe
                title="Ubicación de AXXESOS en San Juan"
                src={config.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-300"
              />
            </div>

          </div>

          {/* Right Column: Contact & Quote Form */}
          <div className="lg:col-span-7 bg-zinc-900/90 rounded-2xl border border-zinc-800 p-6 sm:p-8">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">¡Muchas Gracias!</h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto">
                  Tu consulta fue guardada y transferida a nuestro WhatsApp oficial para que un técnico de San Juan te responda a la brevedad.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">Envianos tu Consulta Directa</h3>
                  <p className="text-xs text-zinc-400">
                    Completá tus datos y te responderemos con el presupuesto sin cargo.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 264 406-2942"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Correo Electrónico (Opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="ejemplo@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Tipo de Servicio o Interés
                    </label>
                    <select
                      value={serviceInterest}
                      onChange={(e) => setServiceInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                    >
                      <option value="Automatización Portón Corredizo">Automatización Portón Corredizo</option>
                      <option value="Automatización Portón Levadizo">Automatización Portón Levadizo</option>
                      <option value="Automatización Portón Batiente">Automatización Portón Batiente</option>
                      <option value="Reparación o Servicio Técnico">Reparación o Servicio Técnico</option>
                      <option value="Cámaras de Seguridad CCTV">Cámaras de Seguridad CCTV</option>
                      <option value="Alarmas Domiciliarias o Industriales">Alarmas Domiciliarias o Industriales</option>
                      <option value="Compra de Repuestos o Controles">Compra de Repuestos o Controles</option>
                      <option value="Otro tipo de consulta">Otro tipo de consulta</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    Detalle de lo que necesitás
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Contanos las medidas aproximadas de tu portón, zona en San Juan, o qué tipo de trabajo querés realizar..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all shadow-lg shadow-red-950/50 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Consulta por WhatsApp</span>
                </button>

                <div className="text-[11px] text-zinc-500 text-center flex items-center justify-center gap-1.5 pt-1">
                  <span>Atención directa de técnicos sanjuaninos</span>
                  <span>•</span>
                  <span>Presupuestos sin cargo</span>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
