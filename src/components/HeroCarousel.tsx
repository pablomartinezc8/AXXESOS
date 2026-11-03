import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Star, Sparkles } from 'lucide-react';
import { CarouselSlide } from '../services/storage';

interface HeroCarouselProps {
  slides: CarouselSlide[];
  onOpenQuoteModal: () => void;
  googleRating: number;
  googleReviewCount: number;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  onOpenQuoteModal,
  googleRating,
  googleReviewCount
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-play interval
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section 
      id="inicio"
      className="relative w-full h-[90vh] min-h-[580px] max-h-[820px] bg-zinc-950 text-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Galería principal de AXXESOS"
    >
      {/* Slides Background Images with Smooth Crossfade */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with slight zoom animation */}
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className={`w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              loading={idx === 0 ? "eager" : "lazy"}
            />
            {/* Dark & Gradient Overlays for high readability and premium look */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        );
      })}

      {/* Slide Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-16">
        <div className="max-w-2xl sm:max-w-3xl space-y-6">
          {/* Badge & Social Proof */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/90 text-white border border-red-500/40 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              {currentSlide.badge || "Especialistas en San Juan"}
            </span>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900/80 text-zinc-200 border border-zinc-800 backdrop-blur-sm">
              <div className="flex text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <span>Google {googleRating.toFixed(1)}</span>
              <span className="text-zinc-400">({googleReviewCount} opiniones)</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] text-balance">
            {currentSlide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-300 max-w-xl font-normal leading-relaxed">
            {currentSlide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-lg text-base font-bold tracking-wide transition-all shadow-lg shadow-red-950/50 hover:shadow-red-600/30 active:scale-95 group cursor-pointer"
            >
              <span>{currentSlide.ctaText || "Pedir Presupuesto"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {currentSlide.secondaryLink && (
              <a
                href={currentSlide.secondaryLink}
                className="inline-flex items-center justify-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-100 hover:text-white px-5 py-3.5 rounded-lg text-base font-semibold transition-all border border-zinc-700/80 backdrop-blur-sm"
              >
                <span>{currentSlide.secondaryText || "Ver Trabajos"}</span>
              </a>
            )}
          </div>

          {/* Quick guarantees strip */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-red-500" />
              <span>Instalación profesional en San Juan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Presupuestos y asesoramiento sin cargo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls: Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-zinc-900/70 hover:bg-red-600 text-white border border-zinc-700/60 transition-all backdrop-blur-sm hidden sm:flex items-center justify-center hover:scale-110 active:scale-95"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-zinc-900/70 hover:bg-red-600 text-white border border-zinc-700/60 transition-all backdrop-blur-sm hidden sm:flex items-center justify-center hover:scale-110 active:scale-95"
        aria-label="Foto siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-2.5">
        {slides.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => setCurrentIndex(dotIdx)}
            aria-label={`Ir a diapositiva ${dotIdx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              dotIdx === currentIndex
                ? 'w-8 h-2.5 bg-red-600'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
