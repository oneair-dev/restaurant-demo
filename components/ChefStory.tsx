'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ChefStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(textRef.current?.children ?? [], {
        x: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chef"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: '#F5F0EB' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image — left */}
          <div ref={imgRef} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1583394293214-28a4b6f8c5f5?w=900&q=80"
                alt="Chef Marco Rinaldi"
                fill
                className="object-cover object-center"
              />
              {/* Gold corner accent */}
              <div
                className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 pointer-events-none"
                style={{ borderColor: '#D4AF37' }}
              />
              <div
                className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 pointer-events-none"
                style={{ borderColor: '#D4AF37' }}
              />
            </div>

            {/* Floating credential card */}
            <div
              className="absolute -bottom-6 -right-4 sm:-right-8 px-6 py-4 shadow-xl"
              style={{ background: '#8B0000' }}
            >
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
              >
                Executive Chef
              </p>
              <p
                className="text-lg font-bold mt-0.5"
                style={{ color: '#FFF8F0', fontFamily: 'var(--font-playfair)' }}
              >
                22 Years · 3 Stars
              </p>
            </div>
          </div>

          {/* Text — right */}
          <div ref={textRef} className="pt-8 lg:pt-0">
            {/* Eyebrow */}
            <p
              className="text-xs tracking-[0.5em] uppercase mb-4"
              style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
            >
              The Heart of Our Kitchen
            </p>

            {/* Heading */}
            <h2
              className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
              style={{ color: '#1C0A00', fontFamily: 'var(--font-playfair)' }}
            >
              Chef Marco Rinaldi
            </h2>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px w-12" style={{ background: '#D4AF37' }} />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 0.5L8.18 5.27H12.66L9.04 7.9L10.21 12.17L7 9.54L3.79 12.17L4.96 7.9L1.34 5.27H5.82L7 0.5Z" fill="#D4AF37" />
              </svg>
              <div className="h-px w-12" style={{ background: '#D4AF37' }} />
            </div>

            {/* Story paragraphs */}
            <p
              className="text-base leading-relaxed mb-5"
              style={{ color: 'rgba(28, 10, 0, 0.72)', fontFamily: 'var(--font-lato)' }}
            >
              Born in the sun-drenched hills of Tuscany, Marco Rinaldi grew up surrounded by the
              rhythms of the Italian kitchen — his grandmother's hand-rolled pici, the earthy
              perfume of truffle season, the unhurried ritual of the Sunday table. These early
              memories became the foundation of a culinary philosophy rooted in simplicity,
              reverence for the land, and an uncompromising pursuit of flavour.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'rgba(28, 10, 0, 0.72)', fontFamily: 'var(--font-lato)' }}
            >
              Over 22 years, Chef Rinaldi has earned three Michelin stars across kitchens in
              Florence, Paris, and London before bringing his vision to La Bella Roma. His
              tasting menus are a dialogue between tradition and restraint — each dish a precise
              distillation of Italian heritage, prepared with the finest seasonal ingredients
              sourced directly from trusted producers across Italy.
            </p>

            {/* Pull quote */}
            <blockquote
              className="border-l-2 pl-6 py-1"
              style={{ borderColor: '#D4AF37' }}
            >
              <p
                className="text-lg italic leading-relaxed mb-3"
                style={{ color: '#8B0000', fontFamily: 'var(--font-playfair)' }}
              >
                "Great Italian cooking is not about complexity — it is about honesty. The best
                ingredient, treated with respect, needs nothing more."
              </p>
              <cite
                className="text-xs tracking-widest uppercase not-italic"
                style={{ color: '#1C0A00', fontFamily: 'var(--font-lato)', opacity: 0.5 }}
              >
                — Chef Marco Rinaldi
              </cite>
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
}
