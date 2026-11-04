import React, { useState } from 'react';
import { ProjectItem } from '../config/company';
import { 
  Camera, 
  MapPin, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  PlusCircle, 
  CheckCircle,
  ExternalLink,
  Layers,
  Lock,
  Unlock
} from 'lucide-react';

interface GallerySectionProps {
  projects: ProjectItem[];
  onOpenAdmin: () => void;
  onOpenQuoteModal: (workTitle?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  projects,
  onOpenAdmin,
  onOpenQuoteModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  
  // Per-card active sub-image selection (for works with open/closed images)
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({});
  // Sub-image selection inside the Lightbox modal
  const [lightboxSubImageIndex, setLightboxSubImageIndex] = useState<number>(0);

  const categories = [
    { id: 'todos', label: 'Todos los Trabajos' },
    { id: 'levadizos', label: 'Portones Levadizos' },
    { id: 'corredizos', label: 'Portones Corredizos' },
    { id: 'batientes', label: 'Portones Batientes' },
    { id: 'cctv_alarmas', label: 'CCTV y Alarmas' },
  ];

  const filteredProjects = activeCategory === 'todos'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const openLightbox = (index: number, subIndex: number = 0) => {
    setSelectedProjectIndex(index);
    setLightboxSubImageIndex(subIndex);
  };

  const closeLightbox = () => {
    setSelectedProjectIndex(null);
    setLightboxSubImageIndex(0);
  };

  const handleNextProject = () => {
    if (selectedProjectIndex === null) return;
    const nextIdx = (selectedProjectIndex + 1) % filteredProjects.length;
    setSelectedProjectIndex(nextIdx);
    setLightboxSubImageIndex(0);
  };

  const handlePrevProject = () => {
    if (selectedProjectIndex === null) return;
    const prevIdx = selectedProjectIndex === 0 ? filteredProjects.length - 1 : selectedProjectIndex - 1;
    setSelectedProjectIndex(prevIdx);
    setLightboxSubImageIndex(0);
  };

  const currentProject = selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

  // Active image url inside lightbox
  const currentLightboxImageUrl = currentProject?.galleryImages && currentProject.galleryImages.length > 0
    ? currentProject.galleryImages[lightboxSubImageIndex]?.url || currentProject.imageUrl
    : currentProject?.imageUrl || '';

  return (
    <section id="trabajos" className="py-24 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
              <Camera className="w-3.5 h-3.5" />
              Evidencia Real en San Juan
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
              Trabajos Realizados e Instalaciones
            </h2>
            <p className="text-base text-zinc-600">
              Fotografías reales de automatizaciones de portones y sistemas de seguridad ejecutados por AXXESOS en San Juan.
            </p>
          </div>

          {/* Customer CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              <span>Consultar por tu Portón</span>
            </button>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-zinc-900 text-white shadow-md'
                  : 'bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid / Mosaic */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-zinc-200 p-8 space-y-3">
            <p className="text-zinc-500 text-sm">No hay trabajos cargados en esta categoría actualmente.</p>
            <button
              onClick={() => setActiveCategory('todos')}
              className="text-xs text-red-600 font-bold hover:underline"
            >
              Ver todos los trabajos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => {
              const hasMultipleViews = project.galleryImages && project.galleryImages.length > 1;
              const activeSubIdx = cardImageIndices[project.id] ?? 0;
              const currentCardImage = hasMultipleViews
                ? project.galleryImages![activeSubIdx].url
                : project.imageUrl;

              return (
                <div
                  key={project.id}
                  className="group rounded-2xl overflow-hidden bg-white border border-zinc-200 hover:border-zinc-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Photo container with zoom on hover */}
                  <div 
                    onClick={() => openLightbox(idx, activeSubIdx)}
                    className="relative aspect-[4/3] bg-zinc-950 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={currentCardImage}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Verification Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-zinc-900/90 text-white backdrop-blur-sm border border-zinc-800">
                        <CheckCircle className="w-3 h-3 text-red-500" />
                        Trabajo AXXESOS
                      </span>
                    </div>

                    {/* Zoom Icon Button on Hover */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="p-2 rounded-lg bg-zinc-900/80 text-white backdrop-blur-sm">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Integrated Open/Closed Gate Switcher on the Card */}
                    {hasMultipleViews && (
                      <div 
                        className="absolute bottom-3 right-3 z-10 flex items-center bg-zinc-950/90 p-1 rounded-lg border border-zinc-700/80 backdrop-blur-sm gap-1 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.galleryImages!.map((img, subIdx) => {
                          const isSelected = activeSubIdx === subIdx;
                          const isClosed = img.label.toLowerCase().includes('cerrado');
                          return (
                            <button
                              key={subIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCardImageIndices(prev => ({ ...prev, [project.id]: subIdx }));
                              }}
                              className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-red-600 text-white shadow-sm'
                                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                              }`}
                              title={`Ver ${img.label}`}
                            >
                              {isClosed ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                              <span>{isClosed ? 'Cerrado' : 'Abierto'}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Location badge on bottom left of photo */}
                    <div className="absolute bottom-3 left-3 text-white flex items-center gap-1.5 text-xs font-semibold drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Card Meta Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-red-600 tracking-wider uppercase">
                          {project.serviceType}
                        </span>
                        {hasMultipleViews && (
                          <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 flex items-center gap-1">
                            <Layers className="w-3 h-3 text-red-600" />
                            2 Vistas (Abierto/Cerrado)
                          </span>
                        )}
                      </div>

                      <h3 
                        onClick={() => openLightbox(idx, activeSubIdx)}
                        className="text-base font-bold text-zinc-900 group-hover:text-red-600 transition-colors mt-1 line-clamp-1 cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs text-zinc-500 line-clamp-2 mt-1 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div 
                      onClick={() => openLightbox(idx, activeSubIdx)}
                      className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 cursor-pointer"
                    >
                      <span className="font-medium text-zinc-700">Ver en tamaño completo</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-600 transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedProjectIndex !== null && currentProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-zinc-900/90 text-white hover:bg-red-600 transition-colors cursor-pointer"
            aria-label="Cerrar vista"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox Container */}
          <div 
            className="max-w-5xl w-full max-h-[92vh] flex flex-col lg:flex-row bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left / Main: Photo Display with Controls */}
            <div className="relative flex-1 bg-black flex flex-col items-center justify-center min-h-[340px] lg:min-h-[540px]">
              
              {/* Integrated Views Toggle Bar at Top of Lightbox */}
              {currentProject.galleryImages && currentProject.galleryImages.length > 1 && (
                <div className="absolute top-4 z-30 flex items-center bg-zinc-950/85 p-1 rounded-xl border border-zinc-800 backdrop-blur-md gap-1.5 shadow-xl">
                  {currentProject.galleryImages.map((img, subIdx) => {
                    const isSelected = lightboxSubImageIndex === subIdx;
                    const isClosed = img.label.toLowerCase().includes('cerrado');
                    return (
                      <button
                        key={subIdx}
                        onClick={() => setLightboxSubImageIndex(subIdx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-red-600 text-white shadow-md'
                            : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                        }`}
                      >
                        {isClosed ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                        <span>{img.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Displayed Image */}
              <img
                src={currentLightboxImageUrl}
                alt={currentProject.title}
                className="max-h-[65vh] lg:max-h-[78vh] w-auto max-w-full object-contain transition-all duration-300"
              />

              {/* Prev / Next controls for project navigation */}
              {filteredProjects.length > 1 && (
                <>
                  <button
                    onClick={handlePrevProject}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-zinc-900/80 hover:bg-red-600 text-white transition-all backdrop-blur-sm cursor-pointer"
                    aria-label="Trabajo anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNextProject}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-zinc-900/80 hover:bg-red-600 text-white transition-all backdrop-blur-sm cursor-pointer"
                    aria-label="Trabajo siguiente"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Bottom Thumbnail Strip for Multi-View Projects */}
              {currentProject.galleryImages && currentProject.galleryImages.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-3 px-4 z-20">
                  {currentProject.galleryImages.map((img, subIdx) => (
                    <button
                      key={subIdx}
                      onClick={() => setLightboxSubImageIndex(subIdx)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        lightboxSubImageIndex === subIdx
                          ? 'border-red-600 scale-105 shadow-lg'
                          : 'border-zinc-700 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        className="w-14 h-10 object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-white text-center font-bold">
                        {img.label.includes('Cerrado') ? 'Cerrado' : 'Abierto'}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Project Counter */}
              <div className="absolute top-4 left-4 bg-zinc-900/80 text-white text-[11px] font-mono px-2.5 py-1 rounded-md backdrop-blur-sm">
                Trabajo {selectedProjectIndex + 1} de {filteredProjects.length}
              </div>
            </div>

            {/* Right: Info Panel */}
            <div className="w-full lg:w-80 p-6 flex flex-col justify-between bg-zinc-900 text-white space-y-6 border-t lg:border-t-0 lg:border-l border-zinc-800">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-red-500">
                    {currentProject.serviceType}
                  </span>
                  <h3 className="text-xl font-black text-white leading-tight">
                    {currentProject.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>{currentProject.location}</span>
                  </div>
                </div>

                <div className="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-zinc-800">
                  {currentProject.description}
                </div>

                {currentProject.galleryImages && currentProject.galleryImages.length > 1 && (
                  <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-1">
                    <div className="font-bold text-red-400 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Mismo trabajo en 2 estados:</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-tight">
                      Podés alternar entre el portón abierto (vista del pistón y mecanismo lateral) y el portón cerrado (vista exterior con fachada de ladrillo).
                    </p>
                  </div>
                )}

                <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-1">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    ¿Te interesa este trabajo?
                  </div>
                  <div className="text-xs text-zinc-200">
                    Podemos presupuestar la automatización o reforma de tu portón en San Juan.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    closeLightbox();
                    onOpenQuoteModal(`Presupuesto para portón similar a: ${currentProject.title}`);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors shadow-md text-center cursor-pointer"
                >
                  Pedir Presupuesto Similar
                </button>
                <button
                  onClick={closeLightbox}
                  className="w-full text-zinc-400 hover:text-white py-2 text-xs font-semibold cursor-pointer"
                >
                  Volver a la galería
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
