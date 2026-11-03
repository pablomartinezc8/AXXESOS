import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  variant = 'full',
  size = 'md',
  lightText = false 
}) => {
  // Proporciones optimizadas según tamaño
  const dimensions = {
    sm: { iconWidth: 40, iconHeight: 28, textMain: 'text-xl', textSub: 'text-[9px]' },
    md: { iconWidth: 48, iconHeight: 34, textMain: 'text-2xl', textSub: 'text-[10px]' },
    lg: { iconWidth: 64, iconHeight: 44, textMain: 'text-3xl', textSub: 'text-xs' },
    xl: { iconWidth: 84, iconHeight: 58, textMain: 'text-4xl sm:text-5xl', textSub: 'text-xs sm:text-sm' }
  }[size];

  /**
   * Emblema Oficial AXXESOS:
   * - Dos X rojas unidas («XX») con inclinación dinámica moderna (bastones itálicos en ángulo).
   * - Las dos X están interconectadas en el puente superior e inferior.
   * - Arco orbital negro/oscuro (swoosh) que nace abajo y asciende envolviendo la derecha de la segunda X.
   * - Trazo vectorial limpio, nítido y sin artefactos.
   */
  const RedXXIcon = (
    <div className={`relative inline-flex items-center justify-center shrink-0`}>
      <svg 
        width={dimensions.iconWidth} 
        height={dimensions.iconHeight} 
        viewBox="0 0 116 78" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
      >
        {/* Arco orbital / Swoosh negro envolvente inferior y derecho */}
        <path 
          d="M 40 68 C 62 70, 84 64, 93 47 C 98 37, 98 23, 91 14 C 95 24, 95 38, 88 50 C 79 61, 59 66, 40 68 Z" 
          fill="#09090B"
          className="dark:fill-zinc-200"
        />

        {/* Doble X estilizada en rojo intenso (AXXESOS) */}
        <g stroke="#DC2626" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="miter">
          {/* PRIMERA X (Izquierda) */}
          {/* Diagonal descendente izquierda-derecha de X1 */}
          <line x1="26" y1="19" x2="46" y2="57" />
          {/* Diagonal ascendente izquierda-derecha de X1 */}
          <line x1="44" y1="19" x2="20" y2="57" />

          {/* SEGUNDA X (Derecha) */}
          {/* Diagonal descendente izquierda-derecha de X2 */}
          <line x1="52" y1="19" x2="72" y2="57" />
          {/* Diagonal ascendente izquierda-derecha de X2 */}
          <line x1="70" y1="19" x2="48" y2="57" />

          {/* Puente de unión superior entre las dos X */}
          <line x1="42" y1="19" x2="54" y2="19" strokeWidth="7" />
          {/* Puente de unión inferior entre las dos X */}
          <line x1="44" y1="57" x2="50" y2="57" strokeWidth="7" />

          {/* Terminación horizontal superior derecha */}
          <line x1="68" y1="19" x2="74" y2="19" strokeWidth="7" />
          {/* Terminación horizontal inferior izquierda */}
          <line x1="18" y1="57" x2="24" y2="57" strokeWidth="7" />
        </g>
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{RedXXIcon}</div>;
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex flex-col items-center p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center shadow-xl ${className}`}>
        <div className="relative mb-2">
          {RedXXIcon}
        </div>
        <span className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">Celebrando</span>
        <span className="text-xl font-black text-white tracking-tight">25 ANIVERSARIO</span>
        <span className="text-[10px] text-red-500 font-bold tracking-widest">1998 — 2023</span>
      </div>
    );
  }

  return (
    <div className={`group inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {RedXXIcon}
      <div className="flex flex-col leading-none">
        {/* Nombre de la marca: 'a' en blanco/negro, las DOS 'xx' en rojo (#DC2626), 'esos' en blanco/negro */}
        <div className="flex items-center tracking-tight">
          <span className={`font-black ${dimensions.textMain} tracking-tighter ${lightText ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
            a<span className="text-red-600 font-black">xx</span>esos
          </span>
        </div>
        <span className={`font-bold uppercase tracking-wider ${dimensions.textSub} ${lightText ? 'text-zinc-300' : 'text-zinc-600 dark:text-zinc-400'}`}>
          Portones & Seguridad
        </span>
      </div>
    </div>
  );
};
