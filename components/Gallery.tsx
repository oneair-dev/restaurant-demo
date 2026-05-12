'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    label: 'Cucina',
    title: 'The Art of Italian Cooking',
    img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
    size: 'lg:col-span-2 lg:row-span-2',
  },
  {
    label: 'Cantina',
    title: 'Over 800 Fine Wines',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    size: 'lg:col-span-1 lg:row-span-1',
  },
  {
    label: 'Dolci',
    title: 'Handcrafted Desserts',
    img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    size: 'lg:col-span-1 lg:row-span-1',
  },
  {
    label: 'Sala',
    title: 'Private Dining Rooms',
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    size: 'lg:col-span-1 lg:row-span-2',
  },
  {
    label: 'Pasta',
    title: 'Fresh Pasta Daily',
    img: 'https://images.unsplash.com/photo-1551183053-bf91798d792e?w=800&q=80',
    size: 'lg:col-span-1 lg:row-span-1',
  },
  {
    label: 'Ambiente',
    title: 'Intimate Evenings',
    img: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80',
    size: 'lg:col-span-2 lg:row-span-1',
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      const cards = sectionRef.current?.querySelectorAll('.gallery-card') ?? [];
      gsap.from(cards, {
        scale: 0.88,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current?.querySelector('.gallery-grid'),
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: '#1C0A00' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <p
            className="text-xs tracking-[0.5em] uppercase mb-3"
            style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
          >
            A Feast for the Eyes
          </p>
          <h2
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ color: '#FFF8F0', fontFamily: 'var(--font-playfair)' }}
          >
            The Experience
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16" style={{ background: '#D4AF37' }} />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L9 7L15 8L9 9L8 15L7 9L1 8L7 7L8 1Z" fill="#D4AF37" />
            </svg>
            <div className="h-px w-16" style={{ background: '#D4AF37' }} />
          </div>
        </div>

        {/* Gallery grid */}
        <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px] lg:auto-rows-[200px]">
          {items.map((item, i) => (
            <div
              key={i}
              className={`gallery-card relative overflow-hidden group cursor-pointer ${item.size}`}
            >
              {/* Real photo */}
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,0,0,0.85) 0%, rgba(10,0,0,0.2) 50%, rgba(10,0,0,0.1) 100%)',
                }}
              />

              {/* Hover crimson tint */}
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{ background: 'rgba(139, 0, 0, 0.2)' }}
              />

              {/* Inner border */}
              <div
                className="absolute inset-2 border opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10"
                style={{ borderColor: '#D4AF37' }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <p
                  className="text-[10px] tracking-[0.4em] uppercase mb-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                >
                  {item.label}
                </p>
                <p
                  className="text-lg font-bold leading-tight text-white"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {item.title}
                </p>
              </div>

              {/* Bottom gold line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20"
                style={{ background: '#D4AF37' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
