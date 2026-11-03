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

export interface ProductItem {
  id: string;
  name: string;
  category: 'corredizos' | 'levadizos' | 'batientes' | 'controles' | 'seguridad' | 'repuestos';
  categoryLabel: string;
  price: number;
  inStock: boolean;
  stockCountText: string;
  isExample: boolean;
  badge?: string;
  shortDescription: string;
  fullDescription: string;
  specs: { [key: string]: string };
  imageUrl: string;
  featured?: boolean;
}

export const INITIAL_COMPANY_CONFIG: CompanyConfig = {
  name: "AXXESOS",
  slogan: "Portones Automáticos y Sistemas de Seguridad",
  logoUrl: "/assets/aistudio/image_5692190c.png",
  logoBadgeUrl: "/assets/aistudio/image_5692190c.png",
  address: "Mariano Moreno Este 297",
  city: "San Juan",
  province: "San Juan",
  country: "Argentina",
  postalCode: "J5402",
  phonePrimary: "0264 406-2942",
  phoneSecondary: "(0264) 422-5531",
  whatsappDisplay: "0264 406-2942 (A CONFIRMAR número específico de WhatsApp)",
  whatsappNumber: "5492644062942", // Por defecto usa el teléfono verificado
  emailDisplay: "A CONFIRMAR (ej. contacto@axxesos.com.ar)",
  emailDestination: "pablomartinezc8@gmail.com",
  instagram: "@axxesos",
  instagramUrl: "https://www.instagram.com/axxesos",
  googleRating: 4.4,
  googleReviewCount: 27,
  workingHoursSchedule: "Mañana hasta 12:30 hs | Tarde reabre 16:30 hs (Corte al mediodía)",
  workingHoursDaysNotice: "Días de atención exactos: «A CONFIRMAR» (ej. Lunes a Viernes / Sábados mediodía)",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.088921208945!2d-68.52844512351239!3d-31.54920260401826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9681403e1e075677%3A0x64fa5880486c91a7!2sMariano%20Moreno%20Este%20297%2C%20J5402%20San%20Juan%2C%20Argentina!5e0!3m2!1ses!2sar!4v1709472000000!5m2!1ses!2sar",
  aboutShort: "Empresa sanjuanina dedicada a la seguridad electrónica y automatización de portones, con atención técnica especializada y soluciones a medida para residencias, comercios e industrias.",
  aboutFull: "En AXXESOS brindamos soluciones integrales de automatización para todo tipo de portones (corredizos, levadizos y batientes), además de la instalación y configuración de alarmas domiciliarias e industriales y sistemas de cámaras CCTV. Nuestro compromiso es brindar tranquilidad, seguridad y comodidad con equipamiento confiable y respaldo técnico en San Juan.",
  experienceBadgeText: "Trayectoria comprobada en San Juan (25° Aniversario 1998-2023 según distintivo institucional)",
  statusNotes: {
    historyStatus: "Historia detallada y años de trayectoria: «A CONFIRMAR» por el dueño",
    whatsappStatus: "Número exclusivo de WhatsApp: «A CONFIRMAR» (actualmente enrutado al 0264 406-2942)",
    scheduleDaysStatus: "Días de atención exactos: «A CONFIRMAR»",
    catalogPricingStatus: "Precios de tienda y marcas comerciales: «A CONFIRMAR» (los mostrados son ejemplos neutros)",
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

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1-kit-corredizo-std",
    name: "Kit Motor Portón Corredizo Residencial",
    category: "corredizos",
    categoryLabel: "Motores Corredizos",
    price: 185000,
    inStock: true,
    stockCountText: "Consultar disponibilidad en local",
    isExample: true,
    badge: "Ejemplo - A CONFIRMAR",
    shortDescription: "Kit base para portón corredizo de hasta 400 kg. Incluye central electrónica, 3 metros de cremallera y 2 controles.",
    fullDescription: "Solución completa y confiable para residencias. Cuenta con desacople manual por corte de energía mediante llave, desaceleración programable en los extremos del recorrido y entradas para fotocélula de seguridad.",
    specs: {
      "Capacidad máxima": "Hasta 400 kg (A CONFIRMAR)",
      "Velocidad aprox.": "12 a 15 seg por tramo de 3m (A CONFIRMAR)",
      "Alimentación": "220V AC",
      "Incluye": "2 Controles remotos + 3m cremallera + Placa de comando",
      "Garantía": "12 meses de garantía oficial (A CONFIRMAR)"
    },
    imageUrl: "/assets/aistudio/dd7b3dbf-077d-4688-8f70-81155689c7c2_777b42ff.jpg",
    featured: true
  },
  {
    id: "prod-2-kit-levadizo-sinfin",
    name: "Kit Motor Portón Levadizo Sinfín",
    category: "levadizos",
    categoryLabel: "Motores Levadizos",
    price: 215000,
    inStock: true,
    stockCountText: "En stock para instalación",
    isExample: true,
    badge: "Ejemplo - A CONFIRMAR",
    shortDescription: "Sistema de elevación lateral para portones levadizos contrapesados. Marcha suave y silenciosa.",
    fullDescription: "Ideal para portones contrapesados de chapa, madera o hierro. Su motorreductor con tracción a sinfín asegura un empuje constante, con palanca de destrabe rápido accesible desde el interior.",
    specs: {
      "Tipo de portón": "Levadizo contrapesado residencial (A CONFIRMAR)",
      "Recorrido del vástago": "1,50 m (según altura de hoja)",
      "Accesorios incluidos": "Brazo telescópico, vaina, 2 controles remotos",
      "Alimentación": "220V",
      "Seguridad": "Parada suave electrónica"
    },
    imageUrl: "/assets/aistudio/68aceb0f-088b-43c9-97c9-604bbbcc318c_f55cddb1.jpg",
    featured: true
  },
  {
    id: "prod-3-kit-batiente-doble",
    name: "Kit Motor Portones Batientes (Doble Hoja)",
    category: "batientes",
    categoryLabel: "Motores Batientes",
    price: 295000,
    inStock: true,
    stockCountText: "A pedido / Entrega coordinada",
    isExample: true,
    badge: "Ejemplo - A CONFIRMAR",
    shortDescription: "Par de pistones electromecánicos para portones batientes de dos hojas de hasta 2 metros por hoja.",
    fullDescription: "Automatismo diseñado para portones de abrir hacia el interior o exterior. Su central electrónica gestiona el retardo inteligente entre hojas para un cierre perfecto sin colisiones.",
    specs: {
      "Hojas": "2 Hojas de hasta 2 m cada una (A CONFIRMAR)",
      "Tipo": "Pistón electromecánico lineal",
      "Central de comando": "Con retardo de hoja y desaceleración",
      "Controles": "2 mandos a distancia incluidos"
    },
    imageUrl: "/assets/aistudio/5ee94a8d-7f20-4aac-a73c-ea125f482811_fa473fbb.jpg",
    featured: true
  },
  {
    id: "prod-4-control-remoto",
    name: "Control Remoto Rolling Code 433 MHz",
    category: "controles",
    categoryLabel: "Controles y Placas",
    price: 14500,
    inStock: true,
    stockCountText: "Disponible en el local",
    isExample: true,
    badge: "Ejemplo - A CONFIRMAR",
    shortDescription: "Transmisor de mano de 2 o 4 canales con código rotativo de alta seguridad anticopia.",
    fullDescription: "Control ergonómico resistente a caídas con clip de visera o llavero. Programación rápida en el local o en su domicilio sobre la receptora.",
    specs: {
      "Frecuencia": "433.92 MHz Rolling Code",
      "Canales": "Botones independientes para diferentes portones",
      "Alcance": "Aprox. 30 a 50 metros en línea abierta",
      "Batería": "Incluida"
    },
    imageUrl: "/assets/aistudio/image_5692190c.png",
    featured: false
  },
  {
    id: "prod-5-central-comando",
    name: "Central de Comando Electrónica Multimarca",
    category: "controles",
    categoryLabel: "Controles y Placas",
    price: 48000,
    inStock: true,
    stockCountText: "En stock permanente",
    isExample: true,
    badge: "Ejemplo - A CONFIRMAR",
    shortDescription: "Placa de reemplazo compatible con motores monofásicos de portones corredizos y levadizos.",
    fullDescription: "Plaqueta de repuesto para sustituir centrales dañadas por tormentas o picos de tensión. Receptor integrado, embrague electrónico, tiempo de pausa para cierre automático y conectores para luz y semáforo.",
    specs: {
      "Compatibilidad": "Motores monofásicos hasta 1/2 HP",
      "Memoria": "Hasta 100 controles remotos (A CONFIRMAR)",
      "Funciones": "Cierre automático, golpe de ariete, rampa",
      "Entradas": "Fotocélula, botonera de pared, fin de carrera"
    },
    imageUrl: "/assets/aistudio/ea261b5f-4068-4d3f-9323-af85db0e676b_5aa9995c.jpg",
    featured: false
  },
  {
    id: "prod-6-fotocelulas-seguridad",
    name: "Juego de Fotocélulas Infrarrojas de Seguridad",
    category: "seguridad",
    categoryLabel: "Accesorios y Seguridad",
    price: 26000,
    inStock: true,
    stockCountText: "En stock",
    isExample: true,
    badge: "Ejemplo - A CONFIRMAR",
    shortDescription: "Sensor óptico emisor y receptor que detiene o invierte la marcha del portón ante la presencia de un auto o persona.",
    fullDescription: "Accesorio indispensable para prevenir golpes contra vehículos, niños o mascotas. Si el haz infrarrojo es interrumpido mientras el portón está cerrando, se detiene inmediatamente.",
    specs: {
      "Alcance": "Hasta 15 metros",
      "Alimentación": "12V / 24V AC/DC",
      "Contacto": "Normal abierto / Normal cerrado",
      "Gabinete": "Apto intemperie con filtro solar UV"
    },
    imageUrl: "/assets/aistudio/c8c8da8a-ffaf-4fe8-82fd-ed3c386f6ad8_f519ec85.jpg",
    featured: true
  },
  {
    id: "prod-7-cremallera-acero",
    name: "Tramo de Cremallera de Acero Galvanizado (1 Metro)",
    category: "repuestos",
    categoryLabel: "Accesorios y Cremalleras",
    price: 18000,
    inStock: true,
    stockCountText: "En stock",
    isExample: true,
    badge: "Ejemplo - A CONFIRMAR",
    shortDescription: "Barra dentada de acero galvanizado con bulones separadores roscados para soldar en portón.",
    fullDescription: "Cremallera de paso estándar módulo 4 para portones corredizos pesados o de uso frecuente. Alta resistencia a la corrosión y desgaste por fricción.",
    specs: {
      "Longitud": "1.000 mm (1 metro)",
      "Espesor": "Acero reforzado con 3 orejas de fijación",
      "Paso": "Módulo 4 universal",
      "Tratamiento": "Galvanizado anticorrosivo"
    },
    imageUrl: "/assets/aistudio/dd7b3dbf-077d-4688-8f70-81155689c7c2_777b42ff.jpg",
    featured: false
  },
  {
    id: "prod-8-kit-cctv-4-camaras",
    name: "Kit CCTV Grabador DVR + 4 Cámaras HD",
    category: "seguridad",
    categoryLabel: "CCTV y Alarmas",
    price: 240000,
    inStock: true,
    stockCountText: "Consultar modelos disponibles",
    isExample: true,
    badge: "Ejemplo - A CONFIRMAR",
    shortDescription: "Sistema de videovigilancia completo con 4 cámaras infrarrojas aptas para exterior y aplicación móvil.",
    fullDescription: "Monitoreá tu hogar, cochera o empresa desde cualquier lugar. Incluye DVR de 4 canales, fuentes de alimentación, cables prearmados y configuración en su teléfono celular.",
    specs: {
      "Resolución": "Alta definición Full HD (A CONFIRMAR)",
      "Visión nocturna": "Infrarrojos inteligentes hasta 20m",
      "Acceso remoto": "App gratuita para Android y iPhone",
      "Instalación": "Presupuestada según cableado y distancias"
    },
    imageUrl: "/assets/aistudio/image_5692190c.png",
    featured: true
  }
];

export const INITIAL_CAROUSEL_SLIDES = [
  {
    id: "slide-1",
    title: "Automatización de Portones en San Juan",
    subtitle: "Comodidad, rapidez y seguridad para entrar y salir de tu casa sin bajarte del vehículo.",
    badge: "Especialistas en Portones",
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
