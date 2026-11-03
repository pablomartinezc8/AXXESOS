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
  // Dimensiones
  const dimensions = {
    sm: { height: 'h-8', iconSize: 28, textMain: 'text-lg', textSub: 'text-[9px]' },
    md: { height: 'h-10', iconSize: 36, textMain: 'text-2xl', textSub: 'text-[10px]' },
    lg: { height: 'h-14', iconSize: 48, textMain: 'text-3xl', textSub: 'text-xs' },
    xl: { height: 'h-20', iconSize: 64, textMain: 'text-4xl', textSub: 'text-sm' }
  }[size];

  // Icono SVG exacto de la "XX" estilizada en rojo con el arco/órbita dinámico
  const RedXXIcon = (
    <div className={`relative inline-flex items-center justify-center shrink-0`}>
      <svg 
        width={dimensions.iconSize} 
        height={dimensions.iconSize} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        {/* Arco orbital superior derecho a inferior izquierdo */}
        <path 
          d="M 52 8 C 76 10, 94 28, 92 52 C 90 74, 70 92, 46 92 C 34 92, 22 86, 15 76" 
          stroke="#1F2937" 
          strokeWidth="4" 
          strokeLinecap="round"
          className="dark:stroke-zinc-400"
        />
        {/* Doble X estilizada roja */}
        {/* Primera X */}
        <path 
          d="M 22 24 L 46 76" 
          stroke="#DC2626" 
          strokeWidth="11" 
          strokeLinecap="round"
        />
        <path 
          d="M 46 24 L 22 76" 
          stroke="#DC2626" 
          strokeWidth="11" 
          strokeLinecap="round"
        />
        {/* Segunda X entrelazada / gemela */}
        <path 
          d="M 44 24 L 68 76" 
          stroke="#EF4444" 
          strokeWidth="11" 
          strokeLinecap="round"
        />
        <path 
          d="M 68 24 L 44 76" 
          stroke="#DC2626" 
          strokeWidth="11" 
          strokeLinecap="round"
        />
        {/* Detalle de brillo en el cruce central */}
        <circle cx="45" cy="50" r="4.5" fill="#FFFFFF" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{RedXXIcon}</div>;
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex flex-col items-center p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center shadow-lg ${className}`}>
        <div className="relative mb-2">
          {RedXXIcon}
        </div>
        <span className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">Celebrando</span>
        <span className="text-xl font-black text-white tracking-tight">25 AÑOS</span>
        <span className="text-[10px] text-red-500 font-bold tracking-widest">1998 - 2023</span>
      </div>
    );
  }

  return (
    <div className={`group inline-flex items-center gap-3 select-none ${className}`}>
      {RedXXIcon}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tight">
          <span className={`font-black ${dimensions.textMain} tracking-tighter ${lightText ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
            ax<span className="text-red-600">x</span>esos
          </span>
        </div>
        <span className={`font-semibold uppercase tracking-wider ${dimensions.textSub} ${lightText ? 'text-zinc-300' : 'text-zinc-600 dark:text-zinc-400'}`}>
          Portones & Seguridad
        </span>
      </div>
    </div>
  );
};
