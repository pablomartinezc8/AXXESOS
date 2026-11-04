import React from 'react';

export interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'badge' | 'round';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  variant = 'full',
  size = 'md',
  lightText = false 
}) => {
  // Proporciones adaptadas para la identidad oficial de AXXESOS (PDF 2024-2025)
  const sizeClasses = {
    sm: {
      full: 'h-8 sm:h-9 w-auto',
      icon: 'h-7 w-auto',
      badge: 'w-20 h-20'
    },
    md: {
      full: 'h-10 sm:h-11 w-auto',
      icon: 'h-9 w-auto',
      badge: 'w-24 h-24'
    },
    lg: {
      full: 'h-12 sm:h-14 w-auto',
      icon: 'h-12 w-auto',
      badge: 'w-32 h-32'
    },
    xl: {
      full: 'h-16 sm:h-20 w-auto',
      icon: 'h-16 w-auto',
      badge: 'w-40 h-40'
    }
  }[size];

  // Variante: Solo el símbolo o isotipo
  if (variant === 'icon') {
    const iconSrc = lightText ? '/axxesos_icon_white.png' : '/axxesos_icon_dark.png';
    return (
      <div className={`inline-flex items-center shrink-0 ${className}`}>
        <img 
          src={iconSrc} 
          alt="AXXESOS Isotipo" 
          className={`${sizeClasses.icon} object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm`}
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // Variante: Emblema redondo oficial con sello de trayectoria (28 años)
  if (variant === 'badge' || variant === 'round') {
    return (
      <div className={`inline-flex flex-col items-center p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 text-center shadow-xl backdrop-blur-sm ${className}`}>
        <div className="relative mb-3 flex items-center justify-center">
          <img 
            src="/axxesos_badge_round.png" 
            alt="Sello Oficial AXXESOS" 
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.35)]"
            loading="eager"
          />
        </div>
        <span className="text-[11px] font-bold text-red-500 tracking-wider uppercase">Trayectoria Comprobada</span>
        <span className="text-xl sm:text-2xl font-black text-white tracking-tight">28 AÑOS</span>
        <span className="text-[10px] text-zinc-400 font-mono tracking-widest mt-0.5">1998 — 2026 • SAN JUAN</span>
      </div>
    );
  }

  // Variante principal: Logotipo Completo (Isotipo + Nombre Estilizado + Subtítulo Oficial)
  // Utiliza el logo vectorial/raster de ultra alta definición extraído directamente del PDF oficial
  const logoSrc = lightText ? '/axxesos_logo_white.png' : '/axxesos_logo_dark.png';

  return (
    <div className={`group inline-flex items-center select-none ${className}`}>
      <img 
        src={logoSrc} 
        alt="AXXESOS - Portones Automáticos y Sistemas de Seguridad" 
        className={`${sizeClasses.full} object-contain transition-all duration-300 group-hover:brightness-110 drop-shadow-sm`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
