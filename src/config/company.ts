/**
 * CONFIGURACIÓN CENTRAL DE AXXESOS
 * 
 * Regla de negocio:
 * - Datos reales: nombre, dirección en San Juan, teléfonos, horario con corte al mediodía,
 *   Instagram @axxesos, calificación Google 4.4 con 27 opiniones, y fotos reales adjuntadas.
 * - Todos los demás datos (historia completa, marcas de motores, precios de catálogo,
 *   número exacto de WhatsApp y días de atención específicos) están claramente marcados como «A CONFIRMAR»
 *   para que el titular de la empresa los ajuste directamente desde el Panel de Administración o este archivo.
 */

export interface CompanyConfig {
  name: string;
  slogan: string;
  logoUrl: string;
  logoBadgeUrl: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  phonePrimary: string;
  phoneSecondary: string;
  phoneMobile?: string;
  yearsOfExperience?: number;
  whatsappDisplay: string;
  whatsappNumber: string; // Para enlace wa.me (formato internacional numérico)
  emailDisplay: string;
  emailDestination: string;
  instagram: string;
  instagramUrl: string;
  googleRating: number;
  googleReviewCount: number;
  googleMapsEmbedUrl: string;
  workingHoursSchedule: string;
  workingHoursDaysNotice: string;
  aboutShort: string;
  aboutFull: string;
  experienceBadgeText: string;
  statusNotes: {
    historyStatus: string;
    whatsappStatus: string;
    scheduleDaysStatus: string;
    catalogPricingStatus: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'portones' | 'alarmas' | 'cctv' | 'mantenimiento' | 'accesorios';
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  highlightTag: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  serviceType: string;
  category: 'levadizos' | 'corredizos' | 'batientes' | 'cctv_alarmas' | 'mantenimiento';
  location: string;
  description: string;
  imageUrl: string;
  galleryImages?: { label: string; url: string }[];
  isRealWorkPhoto: boolean;
  dateAdded?: string;
}

export interface ProductPerformance {
  openingTime?: string;
  maxWeight?: string;
  power?: string;
  cyclesPerHour?: string;
  voltage?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string; // 'automatizadores' | 'seguridad' | 'ruedas' | 'electrocerraduras' | 'estabilizadores' | 'controles'
  subcategory: string; // 'corredizos' | 'levadizos' | 'batientes' | 'motores_wifi' | 'cortinas' | 'centrales' | 'controles' | 'camaras' | 'cercos' | 'alarmas' | 'ruedas_v' | 'ruedas_v_soporte' | 'ruedas_redondo' | 'ruedas_doble_ruleman' | 'rieles_cremalleras' | 'electrocerradura_perno' | 'cerradura_digital' | 'cierrapuertas' | 'rodillos' | 'estabilizadores_l' | 'estabilizadores_u'
  categoryLabel: string;
  subcategoryLabel: string;
  price: number;
  inStock: boolean;
  stockCountText: string;
  isExample: boolean;
  badge?: string;
  shortDescription: string;
  fullDescription: string;
  specs: { [key: string]: string };
  performance?: ProductPerformance;
  imageUrl: string;
  featured?: boolean;
}

/**
 * Sanitiza cualquier formato de teléfono ingresado (ej. "1162575805", "11 6257-5805", "011...", "+54 9 11...")
 * a formato internacional oficial para la API de WhatsApp (wa.me): "5491162575805".
 */
export function sanitizeWhatsAppNumber(rawPhone?: string): string {
  if (!rawPhone) return "5491162575805";
  let digits = rawPhone.replace(/\D/g, '');
  
  // Si empieza con 549 y tiene longitud completa de celular argentino (13 dígitos)
  if (digits.startsWith('549') && digits.length >= 12) {
    return digits;
  }
  // Si empieza con 54 seguido de 10 dígitos (falta el 9 móvil de Argentina)
  if (digits.startsWith('54') && digits.length === 12) {
    return '549' + digits.slice(2);
  }
  // Si empieza con 0 (código interurbano nacional: ej. 011... o 0264...)
  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  // Si empieza con 15 (prefijo móvil local argentino: ej. 1562575805)
  if (digits.startsWith('15') && digits.length === 10) {
    digits = digits.slice(2);
  }
  // Si ya es un número de 10 dígitos (ej. 1162575805 o 2644062942), anteponer 549
  if (!digits.startsWith('54')) {
    digits = '549' + digits;
  }
  return digits;
}

/**
 * Devuelve un formato visual prolijo y legible para mostrar al cliente (ej. "+54 9 11 6257-5805")
 */
export function formatWhatsAppDisplay(rawPhone?: string): string {
  const sanitized = sanitizeWhatsAppNumber(rawPhone);
  if (sanitized.startsWith('54911') && sanitized.length === 13) {
    return `+54 9 11 ${sanitized.slice(5, 9)}-${sanitized.slice(9)}`;
  }
  if (sanitized.startsWith('549264') && sanitized.length === 13) {
    return `+54 9 264 ${sanitized.slice(6, 9)}-${sanitized.slice(9)}`;
  }
  return `+${sanitized}`;
}

export const INITIAL_COMPANY_CONFIG: CompanyConfig = {
  name: "AXXESOS",
  slogan: "Portones Automáticos y Sistemas de Seguridad",
  logoUrl: "/axxesos_logo_dark.png",
  logoBadgeUrl: "/axxesos_badge_round.png",
  address: "Mariano Moreno Este 297",
  city: "San Juan",
  province: "San Juan",
  country: "Argentina",
  postalCode: "J5402",
  phonePrimary: "0264 406-2942", // Teléfono fijo en San Juan (solo llamadas)
  phoneSecondary: "(0264) 422-5531", // Teléfono fijo en San Juan (solo llamadas)
  phoneMobile: "264-443-3000", // Celular directo oficial (PDF 2024-2025)
  yearsOfExperience: 28, // 28 años ininterrumpidos en San Juan (desde 1998)
  whatsappDisplay: "+54 9 11 6257-5805", // WhatsApp exclusivo para mensajes y presupuestos
  whatsappNumber: "5491162575805", // wa.me/5491162575805
  emailDisplay: "contacto@axxesos.com.ar",
  emailDestination: "pablomartinezc8@gmail.com",
  instagram: "@axxesos",
  instagramUrl: "https://www.instagram.com/axxesos",
  googleRating: 4.4,
  googleReviewCount: 27,
  workingHoursSchedule: "Mañana hasta 12:30 hs | Tarde reabre 16:30 hs (Corte al mediodía)",
  workingHoursDaysNotice: "Días de atención: Lunes a Viernes (sábados medio día)",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.088921208945!2d-68.52844512351239!3d-31.54920260401826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9681403e1e075677%3A0x64fa5880486c91a7!2sMariano%20Moreno%20Este%20297%2C%20J5402%20San%20Juan%2C%20Argentina!5e0!3m2!1ses!2sar!4v1709472000000!5m2!1ses!2sar",
  aboutShort: "Empresa sanjuanina con 28 años de trayectoria dedicada a la seguridad electrónica y automatización de portones, con atención técnica especializada y soluciones a medida para residencias, comercios e industrias.",
  aboutFull: "Con 28 años de trayectoria ininterrumpida en San Juan (desde 1998), en AXXESOS brindamos soluciones integrales de automatización para todo tipo de portones (corredizos, levadizos y batientes), además de la instalación y configuración de alarmas domiciliarias e industriales y sistemas de cámaras CCTV. Nuestro compromiso es brindar tranquilidad, seguridad y comodidad con equipamiento confiable y respaldo técnico en San Juan.",
  experienceBadgeText: "28 Años de Trayectoria en San Juan (1998 — 2026)",
  statusNotes: {
    historyStatus: "28 años de trayectoria ininterrumpida en San Juan (1998 — 2026)",
    whatsappStatus: "WhatsApp directo habilitado: +54 9 11 6257-5805 (editable en Admin)",
    scheduleDaysStatus: "Días de atención: Lunes a Viernes con corte al mediodía",
    catalogPricingStatus: "Precios de tienda y catálogo: editables desde el Panel de Administración",
  }
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "portones-corredizos",
    title: "Automatización de Portones Corredizos",
    category: "portones",
    iconName: "Maximize2",
    highlightTag: "Rápido y Seguro",
    shortDesc: "Kits de cremallera de alto rendimiento para portones corredizos rectos, residenciales y de consorcios.",
    fullDesc: "Solución ideal para entradas con espacio lateral. Motores con freno electrónico, desacople manual por corte de energía y opción de velocidad rápida para mayor seguridad al ingresar a su propiedad.",
    bullets: [
      "Motores rápidos y de uso continuo",
      "Destrabador manual con llave de seguridad",
      "Cremalleras de alta resistencia",
      "Compatible con fotocélulas anti-aplastamiento"
    ]
  },
  {
    id: "portones-levadizos",
    title: "Automatización de Portones Levadizos",
    category: "portones",
    iconName: "ChevronsUp",
    highlightTag: "Apertura Suave",
    shortDesc: "Sistemas contrapesados con sinfín o torsión para cocheras residenciales y comerciales en San Juan.",
    fullDesc: "Apertura suave y silenciosa que optimiza el espacio de su garaje. Equipos con fin de carrera regulables, balanceo perfecto y compatibilidad con luz de cortesía.",
    bullets: [
      "Brazos mecánicos y herrajes reforzados",
      "Motor silencioso con reductor en baño de grasa/aceite",
      "Maniobra de emergencia sencilla",
      "Instalación prolija adaptada a su estructura"
    ]
  },
  {
    id: "portones-batientes",
    title: "Automatización de Portones Batientes",
    category: "portones",
    iconName: "Columns",
    highlightTag: "Una o Dos Hojas",
    shortDesc: "Pistones electromecánicos o hidráulicos para portones de abrir hacia adentro o afuera.",
    fullDesc: "Especialmente recomendados para portones de estilo colonial, rejas de hierro o portones dobles. Movimiento sincronizado de ambas hojas con desaceleración electrónica en cierre.",
    bullets: [
      "Pistones lineales para una o dos hojas",
      "Cierre suave para preservar bisagras y herrería",
      "Apertura peatonal parcial desde el control",
      "Bloqueo seguro sin necesidad de cerradura adicional"
    ]
  },
  {
    id: "cctv-camaras",
    title: "Circuitos Cerrados de TV (CCTV)",
    category: "cctv",
    iconName: "Camera",
    highlightTag: "Monitoreo 24/7",
    shortDesc: "Cámaras de seguridad de alta resolución para ver tu casa o negocio desde el celular en tiempo real.",
    fullDesc: "Instalación profesional de cámaras para interior y exterior con visión nocturna, detección de movimiento y grabación digital. Acceso directo desde tu smartphone estés donde estés.",
    bullets: [
      "Visualización en vivo desde celular o computadora",
      "Cámaras aptas para intemperie (lluvia, polvo y sol sanjuanino)",
      "Grabación continua o por eventos de movimiento",
      "Configuración completa y capacitación al usuario"
    ]
  },
  {
    id: "alarmas-seguridad",
    title: "Alarmas Domiciliarias e Industriales",
    category: "alarmas",
    iconName: "ShieldAlert",
    highlightTag: "Protección Total",
    shortDesc: "Sistemas cableados e inalámbricos con sensores de apertura, movimiento e impacto.",
    fullDesc: "Protección perimetral e interior con aviso sonoro y notificación al teléfono. Diseñamos el esquema de seguridad adaptado a la distribución de su vivienda, galpón o comercio.",
    bullets: [
      "Sensores de movimiento inmunes a mascotas",
      "Magnéticos para puertas, portones y ventanas",
      "Sirena exterior de alta potencia con flash",
      "Avisos instantáneos ante disparos o corte de luz"
    ]
  },
  {
    id: "mantenimiento-repuestos",
    title: "Reparación y Mantenimiento Técnico",
    category: "mantenimiento",
    iconName: "Wrench",
    highlightTag: "Atención Rápida",
    shortDesc: "Servicio técnico oficial para portones trabados, cambio de cables, placas quemadas y mandos.",
    fullDesc: "Diagnóstico preciso y reparación de fallas mecánicas y electrónicas en San Juan. Copia y programación de controles remotos, calibración de finales de carrera y lubricación técnica.",
    bullets: [
      "Cambio de cables de acero y poleas de portones levadizos",
      "Reparación o reemplazo de plaquetas electrónicas",
      "Grabación y unificación de controles remotos",
      "Mantenimiento preventivo para consorcios y particulares"
    ]
  }
];

export const INITIAL_REAL_PROJECTS: ProjectItem[] = [
  {
    id: "trabajo-1-levadizo-chapa",
    title: "Portón levadizo de chapa automatizado",
    serviceType: "Automatización de Portón Levadizo",
    category: "levadizos",
    location: "San Juan Capital",
    description: "Trabajo real compartido en @axxesos. Instalación de sistema levadizo con rejas superiores e inferiores y paños ciegos, accionado con control remoto a distancia.",
    imageUrl: "/assets/aistudio/dd7b3dbf-077d-4688-8f70-81155689c7c2_777b42ff.jpg",
    isRealWorkPhoto: true
  },
  {
    id: "trabajo-2-levadizo-simil-madera",
    title: "Portón levadizo residencial con detalle símil madera",
    serviceType: "Portones Automáticos y Herrería",
    category: "levadizos",
    location: "Rivadavia, San Juan",
    description: "Instalación y automatización en fachada moderna con zócalo de piedra laja y franja decorativa símil madera. Movimiento suave y silencioso.",
    imageUrl: "/assets/aistudio/5ee94a8d-7f20-4aac-a73c-ea125f482811_fa473fbb.jpg",
    isRealWorkPhoto: true
  },
  {
    id: "trabajo-3-mecanismo-interior",
    title: "Automatización interior con estructura de madera",
    serviceType: "Mecanismo y Motor Levadizo",
    category: "levadizos",
    location: "Santa Lucía, San Juan",
    description: "Vista técnica interna de cochera con techo rústico de tirantes de madera. Montaje de brazos de palanca, cableado reforzado y central electrónica con parada suave.",
    imageUrl: "/assets/aistudio/68aceb0f-088b-43c9-97c9-604bbbcc318c_f55cddb1.jpg",
    isRealWorkPhoto: true
  },
  {
    id: "trabajo-4-levadizo-abierto-cerrado",
    title: "Portón levadizo en cochera de ladrillo visto (Abierto y Cerrado)",
    serviceType: "Montaje electromecánico y terminación",
    category: "levadizos",
    location: "San Juan Capital",
    description: "Mismo trabajo integral de portón levadizo contrapesado visto en sus dos estados: en posición abierta con detalle del pistón electromecánico lateral y brazos telescópicos, y en posición cerrada con ajuste hermético y terminación gris grafito mate.",
    imageUrl: "/assets/aistudio/c8c8da8a-ffaf-4fe8-82fd-ed3c386f6ad8_f519ec85.jpg",
    galleryImages: [
      {
        label: "Portón Cerrado (Fachada)",
        url: "/assets/aistudio/c8c8da8a-ffaf-4fe8-82fd-ed3c386f6ad8_f519ec85.jpg"
      },
      {
        label: "Portón Abierto (Mecanismo)",
        url: "/assets/aistudio/ea261b5f-4068-4d3f-9323-af85db0e676b_5aa9995c.jpg"
      }
    ],
    isRealWorkPhoto: true
  }
];

export interface CatalogSubcategory {
  id: string;
  label: string;
  parentCategoryId: string;
}

export interface CatalogCategory {
  id: string;
  label: string;
  shortDesc: string;
  iconName: string;
  subcategories: CatalogSubcategory[];
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: 'automatizadores',
    label: 'Automatizadores',
    shortDesc: 'Motores para portones corredizos, levadizos, batientes y cortinas',
    iconName: 'Maximize2',
    subcategories: [
      { id: 'corredizos', label: 'Corredizos', parentCategoryId: 'automatizadores' },
      { id: 'levadizos', label: 'Levadizos', parentCategoryId: 'automatizadores' },
      { id: 'batientes', label: 'Pivotantes / Batientes', parentCategoryId: 'automatizadores' },
      { id: 'motores_wifi', label: 'Motores y Módulos WiFi', parentCategoryId: 'automatizadores' },
      { id: 'centrales', label: 'Centrales Electrónicas', parentCategoryId: 'automatizadores' },
      { id: 'controles', label: 'Controles Remotos', parentCategoryId: 'automatizadores' },
      { id: 'accesorios', label: 'Accesorios y Fotocélulas', parentCategoryId: 'automatizadores' }
    ]
  },
  {
    id: 'seguridad',
    label: 'Seguridad y CCTV',
    shortDesc: 'Cámaras de vigilancia, alarmas y cercos eléctricos perimetrales',
    iconName: 'ShieldAlert',
    subcategories: [
      { id: 'camaras', label: 'Cámaras de Seguridad (CCTV)', parentCategoryId: 'seguridad' },
      { id: 'cercos', label: 'Cercos Eléctricos y Concertinas', parentCategoryId: 'seguridad' },
      { id: 'alarmas', label: 'Alarmas Domiciliarias e Industriales', parentCategoryId: 'seguridad' }
    ]
  },
  {
    id: 'ruedas',
    label: 'Ruedas y Herrajes',
    shortDesc: 'Ruedas de acero, perfiles guía, cremalleras y rodamientos reforzados',
    iconName: 'Disc',
    subcategories: [
      { id: 'ruedas_v', label: 'Canal en V', parentCategoryId: 'ruedas' },
      { id: 'ruedas_v_soporte', label: 'Con Soporte Canal en V', parentCategoryId: 'ruedas' },
      { id: 'ruedas_redondo', label: 'Canal Redondo', parentCategoryId: 'ruedas' },
      { id: 'ruedas_doble_ruleman', label: 'Doble Rulemán', parentCategoryId: 'ruedas' },
      { id: 'rieles_cremalleras', label: 'Cremalleras y Perfiles Riel', parentCategoryId: 'ruedas' }
    ]
  },
  {
    id: 'electrocerraduras',
    label: 'Electrocerraduras y Cierrapuertas',
    shortDesc: 'Cerraduras electromecánicas, inteligentes y cierrapuertas hidráulicos',
    iconName: 'Lock',
    subcategories: [
      { id: 'electrocerradura_perno', label: 'Electrocerradura de Perno', parentCategoryId: 'electrocerraduras' },
      { id: 'cerradura_digital', label: 'Cerradura Digital Inteligente', parentCategoryId: 'electrocerraduras' },
      { id: 'cierrapuertas', label: 'Cierrapuertas Hidráulicos', parentCategoryId: 'electrocerraduras' }
    ]
  },
  {
    id: 'estabilizadores',
    label: 'Estabilizadores',
    shortDesc: 'Rodillos de nylon y guías antivibración en L y U para portones',
    iconName: 'Sliders',
    subcategories: [
      { id: 'rodillos', label: 'Rodillos de Guía', parentCategoryId: 'estabilizadores' },
      { id: 'estabilizadores_l', label: 'Estabilizadores en L', parentCategoryId: 'estabilizadores' },
      { id: 'estabilizadores_u', label: 'Estabilizadores en U', parentCategoryId: 'estabilizadores' }
    ]
  }
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1-kit-corredizo-std",
    name: "Kit Motor Portón Corredizo Residencial AXXESOS 400",
    category: "automatizadores",
    subcategory: "corredizos",
    categoryLabel: "Automatizadores",
    subcategoryLabel: "Corredizos",
    price: 185000,
    inStock: true,
    stockCountText: "En stock para entrega o colocación",
    isExample: true,
    badge: "Más Vendido",
    shortDescription: "Kit completo para portones corredizos de hasta 400 kg. Marcha suave, embrague electrónico y desacople manual por corte de luz.",
    fullDescription: "Solución completa y confiable para residencias en San Juan. Motorreductor lubricado de alta durabilidad, desacople manual mediante llave codificada, final de carrera magnético y parada suave programable.",
    performance: {
      voltage: "220V AC (50Hz)",
      power: "1/4 HP (180W)",
      maxWeight: "Hasta 400 kg",
      openingTime: "12 segundos (tramo de 3m)",
      cyclesPerHour: "25 ciclos / hora (Residencial)"
    },
    specs: {
      "Tensión nominal": "220V AC - 50 Hz",
      "Potencia nominal": "180 W (1/4 HP)",
      "Peso máx. portón": "400 kg",
      "Tiempo de apertura (3m)": "12 segundos",
      "Ciclos por hora": "25 ciclos/h (Uso residencial)",
      "Incluye en kit": "2 Controles remotos + 3m de cremallera de acero + Placa de comando",
      "Desacople de emergencia": "Llave metálica personalizada",
      "Garantía": "12 meses con respaldo técnico en San Juan"
    },
    imageUrl: "/products/axxesos_sliding_motor.jpg",
    featured: true
  },
  {
    id: "prod-corredizo-fast-turbo",
    name: "Kit Motor Corredizo Rápido Turbo Fast 800 kg (Apertura 7 Seg)",
    category: "automatizadores",
    subcategory: "corredizos",
    categoryLabel: "Automatizadores",
    subcategoryLabel: "Corredizos",
    price: 245000,
    inStock: true,
    stockCountText: "En stock permanente",
    isExample: true,
    badge: "Apertura Rápida 7s",
    shortDescription: "Motor de alta velocidad que abre 3 metros en tan solo 7 segundos. Máxima seguridad al ingresar al hogar.",
    fullDescription: "Ideal para cocheras sobre calles transitadas de San Juan donde se requiere ingresar en tiempo récord para prevenir entraderas. Motorreductor con engranaje de acero y rampa de desaceleración electrónica.",
    performance: {
      voltage: "220V AC (50Hz)",
      power: "1/3 HP (280W)",
      maxWeight: "Hasta 800 kg",
      openingTime: "7 segundos (tramo de 3m)",
      cyclesPerHour: "40 ciclos / hora (Semi-intensivo)"
    },
    specs: {
      "Tensión nominal": "220V AC - 50 Hz",
      "Potencia nominal": "280 W (1/3 HP)",
      "Peso máx. portón": "800 kg",
      "Tiempo de apertura (3m)": "7 segundos (Tecnología Fast)",
      "Ciclos por hora": "40 ciclos/h",
      "Engranaje de arrastre": "Acero maquinado endurecido",
      "Incluye": "Central con freno electrónico + 2 controles rolling code + 3m cremallera",
      "Garantía": "12 meses oficial AXXESOS"
    },
    imageUrl: "/products/axxesos_sliding_motor.jpg",
    featured: true
  },
  {
    id: "prod-wifi-smart-gate",
    name: "Módulo WiFi AXXESOS Smart (Control por Celular)",
    category: "automatizadores",
    subcategory: "motores_wifi",
    categoryLabel: "Automatizadores",
    subcategoryLabel: "Motores y Módulos WiFi",
    price: 38500,
    inStock: true,
    stockCountText: "En stock en Mariano Moreno 297",
    isExample: true,
    badge: "Tecnología WiFi",
    shortDescription: "Abrí y cerrá tu portón desde cualquier parte del mundo con tu smartphone (Android / iOS). Estado en tiempo real y notificaciones.",
    fullDescription: "Convertí tu portón actual en inteligente sin importar la marca de tu motor. Recibí alertas en el teléfono si el portón queda abierto, creá llaves virtuales para visitas y compartí el acceso con toda tu familia.",
    performance: {
      voltage: "12V - 24V AC/DC o 220V",
      power: "Consumo mínimo < 1W en reposo",
      maxWeight: "Compatible con todo portón automático",
      openingTime: "Instantáneo vía Internet / WiFi 2.4 GHz",
      cyclesPerHour: "Ilimitado"
    },
    specs: {
      "Conectividad": "WiFi 2.4 GHz b/g/n",
      "Compatibilidad": "Motores corredizos, levadizos y batientes de cualquier marca",
      "Aplicación móvil": "Tuya Smart / Smart Life (Gratis para Android y iPhone)",
      "Sensores de estado": "Sensor magnético de apertura incluido para saber si está abierto o cerrado",
      "Usuarios": "Hasta 20 usuarios autorizados simultáneos",
      "Notificaciones": "Avisos inmediatos de apertura, cierre y advertencia de portón abierto"
    },
    imageUrl: "/products/axxesos_wifi_module.jpg",
    featured: true
  },
  {
    id: "prod-2-kit-levadizo-sinfin",
    name: "Kit Motor Portón Levadizo a Sinfín Residencial",
    category: "automatizadores",
    subcategory: "levadizos",
    categoryLabel: "Automatizadores",
    subcategoryLabel: "Levadizos",
    price: 215000,
    inStock: true,
    stockCountText: "En stock para instalación",
    isExample: true,
    badge: "Silencioso",
    shortDescription: "Sistema electromecánico de elevación lateral para portones levadizos contrapesados. Marcha ultrasuave y sin vibraciones.",
    fullDescription: "Diseñado para portones contrapesados de chapa, madera o hierro en viviendas de San Juan. Tracción a sinfín que asegura traba mecánica natural en posición de cierre y destrabe de emergencia interior.",
    performance: {
      voltage: "220V AC (50Hz)",
      power: "1/3 HP (250W)",
      maxWeight: "Hasta 400 kg equilibrados",
      openingTime: "14 segundos",
      cyclesPerHour: "25 ciclos / hora"
    },
    specs: {
      "Tipo de portón": "Levadizo contrapesado",
      "Tensión nominal": "220V AC",
      "Potencia": "1/3 HP",
      "Recorrido del vástago": "1,50 m con buje de bronce",
      "Accesorios incluidos": "Brazo telescópico, vaina, 2 controles remotos y herrajes",
      "Seguridad": "Parada suave electrónica para preservar cables y poleas"
    },
    imageUrl: "/assets/aistudio/68aceb0f-088b-43c9-97c9-604bbbcc318c_f55cddb1.jpg",
    featured: true
  },
  {
    id: "prod-3-kit-batiente-doble",
    name: "Kit Automatizador Batiente Doble Hoja (Pistones Lineales)",
    category: "automatizadores",
    subcategory: "batientes",
    categoryLabel: "Automatizadores",
    subcategoryLabel: "Pivotantes / Batientes",
    price: 295000,
    inStock: true,
    stockCountText: "Disponible con colocación",
    isExample: true,
    badge: "2 Hojas",
    shortDescription: "Par de pistones electromecánicos para portones batientes de dos hojas (hasta 2,5 metros por hoja).",
    fullDescription: "Automatismo de diseño estilizado para rejas coloniales o portones ciegos de dos hojas. Central electrónica inteligente que coordina el retardo entre hojas para un traslape perfecto.",
    performance: {
      voltage: "220V AC",
      power: "1/4 HP por motor",
      maxWeight: "Hasta 250 kg por hoja",
      openingTime: "12 a 16 segundos a 90°",
      cyclesPerHour: "25 ciclos / hora"
    },
    specs: {
      "Hojas admisibles": "Hasta 2,5 m por hoja (Total vano 5 m)",
      "Mecanismo": "Pistón electromecánico lineal con vástago de acero inoxidable",
      "Central": "Con retardo programable de hoja y desaceleración",
      "Desacople": "Llave con cerradura en el pistón"
    },
    imageUrl: "/assets/aistudio/5ee94a8d-7f20-4aac-a73c-ea125f482811_fa473fbb.jpg",
    featured: false
  },
  {
    id: "prod-rueda-v-soporte",
    name: "Rueda de Acero Canal en V con Soporte Soldable (80mm)",
    category: "ruedas",
    subcategory: "ruedas_v_soporte",
    categoryLabel: "Ruedas y Herrajes",
    subcategoryLabel: "Con Soporte Canal en V",
    price: 18500,
    inStock: true,
    stockCountText: "Stock permanente en el local",
    isExample: true,
    badge: "Reforzada",
    shortDescription: "Rueda de acero torneado con caja/soporte para soldar directo al bastidor del portón corredizo.",
    fullDescription: "Fabricada en acero macizo con rulemán blindado de alta carga. Su caja envolvente facilita la alineación y soldadura en la base del portón, reduciendo la fricción y el esfuerzo del motor.",
    performance: {
      voltage: "Mecánico",
      power: "Carga estática hasta 350 kg por rueda",
      maxWeight: "350 kg por rueda (700 kg en par)",
      openingTime: "Desplazamiento fluido",
      cyclesPerHour: "Apto uso continuo"
    },
    specs: {
      "Diámetro": "80 mm (Canal en V a 90°)",
      "Material": "Acero zincado anticorrosivo",
      "Rodamiento": "Rulemán blindado 6204-2RS",
      "Soporte": "Chapa plegada de 3.2 mm soldable",
      "Compatibilidad": "Ángulo o perfil de guía en V"
    },
    imageUrl: "/products/axxesos_gate_wheel.jpg",
    featured: true
  },
  {
    id: "prod-rueda-doble-ruleman",
    name: "Rueda para Portón Corredizo Doble Rulemán (100mm)",
    category: "ruedas",
    subcategory: "ruedas_doble_ruleman",
    categoryLabel: "Ruedas y Herrajes",
    subcategoryLabel: "Doble Rulemán",
    price: 24000,
    inStock: true,
    stockCountText: "En stock",
    isExample: true,
    badge: "Pesado",
    shortDescription: "Rueda de acero torneado con 2 rulemanes concéntricos para portones industriales o de consorcios.",
    fullDescription: "Especial para portones de gran porte o alto tránsito de vehículos. La distribución en dos rodamientos blindados evita el juego axial y garantiza años de deslizamiento liviano.",
    performance: {
      voltage: "Mecánico",
      power: "Carga hasta 600 kg por rueda",
      maxWeight: "600 kg por unidad",
      openingTime: "Rodado ultrasilencioso",
      cyclesPerHour: "Industrial"
    },
    specs: {
      "Diámetro de rueda": "100 mm",
      "Tipo de canal": "Canal en V para perfil ángulo de 1 1/4\" o 1 1/2\"",
      "Rodamiento": "2 Rulemanes blindados independientes",
      "Eje": "Bulón de acero templado grado 8.8 con tuerca autofrenante"
    },
    imageUrl: "/products/axxesos_gate_wheel.jpg",
    featured: false
  },
  {
    id: "prod-electrocerradura-perno",
    name: "Electrocerradura de Perno Reforzada 12V con Llave",
    category: "electrocerraduras",
    subcategory: "electrocerradura_perno",
    categoryLabel: "Electrocerraduras y Cierrapuertas",
    subcategoryLabel: "Electrocerradura de Perno",
    price: 52000,
    inStock: true,
    stockCountText: "En stock en San Juan",
    isExample: true,
    badge: "Seguridad Reforzada",
    shortDescription: "Traba electromecánica de perno macizo que bloquea el portón automáticamente al cerrar y se destraba con el control.",
    fullDescription: "Evita que hagan palanca sobre portones levadizos, corredizos o batientes. Se conecta en paralelo a la central del motor con salida de electrocerradura o golpe de ariete. Incluye llaves de destrabe de emergencia.",
    performance: {
      voltage: "12V DC / AC",
      power: "Pulso de accionamiento 1.5A",
      maxWeight: "Resistencia al empuje > 800 kg",
      openingTime: "Destrabe en 0.3 segundos",
      cyclesPerHour: "Apto intemperie"
    },
    specs: {
      "Alimentación": "12V AC/DC por pulso de placa",
      "Perno": "Acero macizo de 16mm de diámetro",
      "Carcasa": "Aluminio inyectado sellado IP65 apto lluvia y sol",
      "Desbloqueo manual": "Cilindro con llave computada frontal",
      "Compatibilidad": "Todo automatismo de portón con salida para cerradura"
    },
    imageUrl: "/products/axxesos_electrolock.jpg",
    featured: true
  },
  {
    id: "prod-cerradura-digital-biometrica",
    name: "Cerradura Digital Inteligente Biométrica con Huella y Teclado",
    category: "electrocerraduras",
    subcategory: "cerradura_digital",
    categoryLabel: "Electrocerraduras y Cierrapuertas",
    subcategoryLabel: "Cerradura Digital Inteligente",
    price: 95000,
    inStock: true,
    stockCountText: "Consultar stock",
    isExample: true,
    badge: "Huella y Clave",
    shortDescription: "Apertura por huella dactilar, clave numérica, tarjeta RFID y llave mecánica para puertas peatonales.",
    fullDescription: "Seguridad sin llaves para puertas de acceso a cocheras y entradas principales. Conectividad Bluetooth / WiFi y registro de ingresos.",
    performance: {
      voltage: "4 Pilas AA (duración 1 año)",
      power: "Aviso de batería baja",
      maxWeight: "Para puertas de madera, chapa o aluminio",
      openingTime: "0.5 segundos de lectura biométrica",
      cyclesPerHour: "Residencial y oficinas"
    },
    specs: {
      "Métodos de acceso": "Huella dactilar, PIN numérico, Tarjeta RFID, Llave mecánica",
      "Capacidad de huellas": "Hasta 100 huellas registradas",
      "Alarma anti-manipulación": "Sonido disuasivo tras intentos fallidos",
      "Puerto de emergencia": "Micro-USB para batería externa si se agotan las pilas"
    },
    imageUrl: "/products/axxesos_electrolock.jpg",
    featured: false
  },
  {
    id: "prod-estabilizador-u-rodillos",
    name: "Estabilizador en U con Doble Rodillo de Nylon Antivibración",
    category: "estabilizadores",
    subcategory: "estabilizadores_u",
    categoryLabel: "Estabilizadores",
    subcategoryLabel: "Estabilizadores en U",
    price: 16500,
    inStock: true,
    stockCountText: "En stock",
    isExample: true,
    badge: "Guía Superior",
    shortDescription: "Puente estabilizador para fijar a la pared o pilar que mantiene recto el portón corredizo durante el recorrido.",
    fullDescription: "Compuesto por una estructura de chapa gruesa y dos rodillos de nylon blanco de alta resistencia que abrazan el caño superior del portón, impidiendo que el viento lo golpee o lo descarrile.",
    performance: {
      voltage: "Mecánico",
      power: "N/A",
      maxWeight: "Apto portones livianos y pesados",
      openingTime: "Rodado suave",
      cyclesPerHour: "Uso continuo"
    },
    specs: {
      "Estructura": "Chapa plegada de 4 mm con correderas de ajuste",
      "Rodillos": "2 Rodillos de nylon técnico diámetro 40mm con eje roscado",
      "Rango de ajuste": "Para caños de 30 mm hasta 80 mm de espesor",
      "Fijación": "Para abulonar sobre columna de mampostería o estructura metálica"
    },
    imageUrl: "/assets/aistudio/dd7b3dbf-077d-4688-8f70-81155689c7c2_777b42ff.jpg",
    featured: false
  },
  {
    id: "prod-4-control-remoto",
    name: "Control Remoto Rolling Code 433 MHz (4 Canales)",
    category: "automatizadores",
    subcategory: "controles",
    categoryLabel: "Automatizadores",
    subcategoryLabel: "Controles Remotos",
    price: 14500,
    inStock: true,
    stockCountText: "Disponible en el local",
    isExample: true,
    badge: "Anticopia",
    shortDescription: "Transmisor ergonómico de 4 canales con código rotativo de alta seguridad para comandar hasta 4 portones distintos.",
    fullDescription: "Gabinete engomado con clip para parasol del auto o llavero. Programación rápida en el local en Mariano Moreno Este 297 o en su domicilio sobre la receptora.",
    performance: {
      voltage: "Pila 12V 27A (incluida)",
      power: "Frecuencia 433.92 MHz",
      maxWeight: "Alcance 40 metros",
      openingTime: "Instantáneo",
      cyclesPerHour: "Alta autonomía"
    },
    specs: {
      "Frecuencia de transmisión": "433.92 MHz Rolling Code",
      "Canales": "4 Botones independientes de pulsación firme",
      "Alcance operativo": "30 a 50 metros en línea abierta",
      "Batería": "Pila de litio 12V incluida"
    },
    imageUrl: "/assets/aistudio/image_5692190c.png",
    featured: false
  },
  {
    id: "prod-5-central-comando",
    name: "Central de Comando Electrónica Multimarca AXXESOS",
    category: "automatizadores",
    subcategory: "centrales",
    categoryLabel: "Automatizadores",
    subcategoryLabel: "Centrales Electrónicas",
    price: 48000,
    inStock: true,
    stockCountText: "En stock permanente",
    isExample: true,
    badge: "Universal",
    shortDescription: "Plaqueta electrónica para motores monofásicos con receptor incorporado, embrague electrónico y cierre automático.",
    fullDescription: "Ideal para reparaciones rápidas en San Juan cuando una tormenta quema la placa original. Soporta finales de carrera magnéticos o mecánicos y botoneras cableadas.",
    performance: {
      voltage: "220V AC",
      power: "Para motores hasta 1/2 HP",
      maxWeight: "Multimarca",
      openingTime: "Rampa de desaceleración ajustable",
      cyclesPerHour: "Uso continuo"
    },
    specs: {
      "Compatibilidad": "Motores monofásicos de 220V hasta 1/2 HP",
      "Memoria": "Hasta 120 controles remotos grabados",
      "Salidas": "Luz de cortesía (220V) y semáforo vehicular",
      "Entradas": "Fotocélula de seguridad, botonera y finales de carrera"
    },
    imageUrl: "/assets/aistudio/ea261b5f-4068-4d3f-9323-af85db0e676b_5aa9995c.jpg",
    featured: false
  },
  {
    id: "prod-6-fotocelulas-seguridad",
    name: "Juego de Fotocélulas Infrarrojas Anti-Aplastamiento",
    category: "automatizadores",
    subcategory: "accesorios",
    categoryLabel: "Automatizadores",
    subcategoryLabel: "Accesorios y Fotocélulas",
    price: 26000,
    inStock: true,
    stockCountText: "En stock",
    isExample: true,
    badge: "Seguridad",
    shortDescription: "Sensor óptico emisor y receptor que detiene e invierte la marcha del portón ante la presencia de un auto, persona o mascota.",
    fullDescription: "Accesorio indispensable de seguridad. Evita abolladuras en el automóvil y protege a niños y mascotas si el portón comienza a cerrar accidentalmente.",
    performance: {
      voltage: "12V / 24V AC/DC",
      power: "Haz infrarrojo modulado",
      maxWeight: "Alcance hasta 15 metros",
      openingTime: "Respuesta en milisegundos",
      cyclesPerHour: "Apto intemperie UV"
    },
    specs: {
      "Alcance del haz": "Hasta 15 metros entre emisor y receptor",
      "Alimentación": "12V o 24V AC/DC",
      "Gabinete": "Protección contra lluvia, polvo y rayos solares UV",
      "Contacto": "Relé conmutador NA y NC"
    },
    imageUrl: "/assets/aistudio/c8c8da8a-ffaf-4fe8-82fd-ed3c386f6ad8_f519ec85.jpg",
    featured: true
  },
  {
    id: "prod-7-cremallera-acero",
    name: "Tramo de Cremallera de Acero Galvanizado Módulo 4 (1 Metro)",
    category: "ruedas",
    subcategory: "rieles_cremalleras",
    categoryLabel: "Ruedas y Herrajes",
    subcategoryLabel: "Cremalleras y Perfiles Riel",
    price: 18000,
    inStock: true,
    stockCountText: "En stock",
    isExample: true,
    badge: "Acero Galvanizado",
    shortDescription: "Barra dentada de acero macizo con 3 separadores roscados para soldar en el bastidor del portón.",
    fullDescription: "Cremallera de paso estándar módulo 4 para portones corredizos residenciales, comerciales e industriales en San Juan. Resiste el sol, polvo y granizo sin deformarse ni oxidarse.",
    performance: {
      voltage: "Mecánico",
      power: "Paso Módulo 4",
      maxWeight: "Apto portones pesados",
      openingTime: "Tracción uniforme",
      cyclesPerHour: "Alta resistencia"
    },
    specs: {
      "Longitud": "1.000 mm (1 metro)",
      "Material": "Acero con baño de galvanizado en caliente",
      "Espesor": "Chapa plegada de alta rigidez",
      "Fijaciones": "3 Separadores cilíndricos con bulones incluidos"
    },
    imageUrl: "/products/axxesos_sliding_motor.jpg",
    featured: false
  },
  {
    id: "prod-8-kit-cctv-4-camaras",
    name: "Kit Circuito Cerrado CCTV (DVR + 4 Cámaras Full HD)",
    category: "seguridad",
    subcategory: "camaras",
    categoryLabel: "Seguridad y CCTV",
    subcategoryLabel: "Cámaras de Seguridad (CCTV)",
    price: 240000,
    inStock: true,
    stockCountText: "Consultar modelos disponibles",
    isExample: true,
    badge: "Monitoreo 24/7",
    shortDescription: "Sistema de videovigilancia completo con 4 cámaras infrarrojas aptas intemperie y visualización en tu celular.",
    fullDescription: "Vigila tu portón, patio delantero y accesos desde cualquier lugar con tu teléfono. Incluye grabador DVR de 4 canales, cables, fuente y configuración remota.",
    performance: {
      voltage: "12V DC (fuente incluida)",
      power: "Visión nocturna IR 20m",
      maxWeight: "Exterior IP66",
      openingTime: "Transmisión en vivo sin demora",
      cyclesPerHour: "Grabación continua 24/7"
    },
    specs: {
      "Resolución": "1080p Full HD",
      "Cámaras": "4 Cámaras tipo bullet o domo para intemperie",
      "Visión nocturna": "Infrarrojo inteligente hasta 20 metros",
      "App móvil": "Acceso remoto gratuito para Android y iOS"
    },
    imageUrl: "/assets/aistudio/image_5692190c.png",
    featured: true
  },
  {
    id: "prod-cerco-electrico-perimetral",
    name: "Central de Cerco Eléctrico de Seguridad Perimetral",
    category: "seguridad",
    subcategory: "cercos",
    categoryLabel: "Seguridad y CCTV",
    subcategoryLabel: "Cercos Eléctricos y Concertinas",
    price: 165000,
    inStock: true,
    stockCountText: "Equipos certificados para instalación",
    isExample: true,
    badge: "Disuasión Total",
    shortDescription: "Electrificador de alta tensión no letal con alarma sonora ante corte de alambre o intento de intrusión.",
    fullDescription: "La barrera perimetral más efectiva para evitar que trepen muros y rejas. Emite pulsos de alto voltaje disuasivos cumpliendo con las normas de seguridad eléctrica vigentes.",
    performance: {
      voltage: "220V con batería de respaldo 12V",
      power: "Pulsos de 8.000V a 12.000V no letales",
      maxWeight: "Perímetros hasta 1.500 metros",
      openingTime: "Disparo de alarma instantáneo",
      cyclesPerHour: "Operación 24/7 ininterrumpida"
    },
    specs: {
      "Tensión de salida": "Regulable hasta 12.000 Volts",
      "Batería de emergencia": "Garantiza funcionamiento ante cortes de luz",
      "Sirena": "Salida para sirena de 120 dB exterior con flash",
      "Normativa": "Homologado para uso en seguridad perimetral"
    },
    imageUrl: "/assets/aistudio/dd7b3dbf-077d-4688-8f70-81155689c7c2_777b42ff.jpg",
    featured: false
  }
];

export const INITIAL_CAROUSEL_SLIDES = [
  {
    id: "slide-1",
    title: "Automatización de Portones en San Juan",
    subtitle: "Comodidad, rapidez y seguridad para entrar y salir de tu casa sin bajarte del vehículo.",
    badge: "28 Años de Trayectoria",
    imageUrl: "/assets/aistudio/dd7b3dbf-077d-4688-8f70-81155689c7c2_777b42ff.jpg",
    ctaText: "Pedir Presupuesto",
    ctaLink: "#contacto",
    secondaryText: "Ver Trabajos",
    secondaryLink: "#trabajos"
  },
  {
    id: "slide-2",
    title: "Portones Levadizos, Corredizos y Batientes",
    subtitle: "Instalación profesional, kits nuevos y mantenimiento técnico de herrajes y motores.",
    badge: "Tecnología Confiable",
    imageUrl: "/assets/aistudio/5ee94a8d-7f20-4aac-a73c-ea125f482811_fa473fbb.jpg",
    ctaText: "Conocer Servicios",
    ctaLink: "#servicios",
    secondaryText: "Visitar Tienda",
    secondaryLink: "#tienda"
  },
  {
    id: "slide-3",
    title: "Seguridad Electrónica, Alarmas y CCTV",
    subtitle: "Cámaras con monitoreo en tu celular y sistemas de alarma domiciliaria e industrial.",
    badge: "Protección Integral",
    imageUrl: "/assets/aistudio/68aceb0f-088b-43c9-97c9-604bbbcc318c_f55cddb1.jpg",
    ctaText: "Consultar por Cámaras",
    ctaLink: "#contacto",
    secondaryText: "Quiénes Somos",
    secondaryLink: "#nosotros"
  }
];
