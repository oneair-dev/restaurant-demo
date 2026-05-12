'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.5 });

      tl.from(eyebrowRef.current, { y: 24, opacity: 0, duration: 0.8 })
        .from(titleRef.current, { y: 60, opacity: 0, duration: 1.2 }, '-=0.4')
        .from(dividerRef.current, { scaleX: 0, opacity: 0, duration: 0.8, transformOrigin: 'center' }, '-=0.5')
        .from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.8 }, '-=0.4')
        .from(descRef.current, { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
        .from(Array.from(ctaRef.current?.children ?? []), { y: 20, opacity: 0, stagger: 0.15, duration: 0.6 }, '-=0.4')
        .from(scrollRef.current, { opacity: 0, duration: 0.8 }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0a0000' }}
    >
      {/* Hero background photo */}
      <Image
        src="/images/hero-bg.jpg"
        alt="La Bella Roma restaurant interior"
        fill
        priority
        className="object-cover object-center"
        style={{ opacity: 0.45 }}
      />

      {/* Dark crimson overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(160deg, rgba(10,0,0,0.7) 0%, rgba(61,0,0,0.55) 50%, rgba(139,0,0,0.45) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-32">
        <p
          ref={eyebrowRef}
          className="text-xs sm:text-sm tracking-[0.5em] uppercase mb-6"
          style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
        >
          Est. 1987 · Roma, Italia
        </p>

        <h1
          ref={titleRef}
          className="text-6xl sm:text-8xl lg:text-[7rem] xl:text-[8rem] font-bold leading-none mb-6"
          style={{
            color: '#FFF8F0',
            fontFamily: 'var(--font-playfair)',
            textShadow: '0 4px 40px rgba(0,0,0,0.5)',
          }}
        >
          La Bella Roma
        </h1>

        {/* Gold ornamental divider */}
        <div ref={dividerRef} className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px flex-1 max-w-[120px] sm:max-w-[200px]" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="#D4AF37" />
          </svg>
          <div className="h-px flex-1 max-w-[120px] sm:max-w-[200px]" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
        </div>

        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl lg:text-3xl italic mb-6 font-light"
          style={{ color: '#D4AF37', fontFamily: 'var(--font-playfair)' }}
        >
          An Authentic Italian Experience
        </p>

        <p
          ref={descRef}
          className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'rgba(255, 248, 240, 0.7)', fontFamily: 'var(--font-lato)' }}
        >
          Where every meal is a journey through the cobblestone streets and candlelit trattorie
          of Rome. Crafted with love, served with passion, remembered forever.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#reservation"
            className="inline-block px-8 py-4 text-xs sm:text-sm tracking-widest uppercase font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: '#D4AF37',
              color: '#1C0A00',
              fontFamily: 'var(--font-lato)',
              boxShadow: '0 4px 24px rgba(212, 175, 55, 0.3)',
            }}
          >
            Reserve a Table
          </a>
          <a
            href="#menu"
            className="inline-block px-8 py-4 text-xs sm:text-sm tracking-widest uppercase font-bold border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: '#D4AF37',
              color: '#D4AF37',
              fontFamily: 'var(--font-lato)',
            }}
          >
            Explore Menu
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ color: 'rgba(212, 175, 55, 0.5)', fontFamily: 'var(--font-lato)' }}
        >
          Scroll
        </span>
        <div className="relative w-[1px] h-12 overflow-hidden" style={{ background: 'rgba(212, 175, 55, 0.15)' }}>
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '60%',
              background: '#D4AF37',
              animation: 'scrollDrop 1.8s ease-in-out infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes scrollDrop {
            0% { transform: translateY(-100%); opacity: 1; }
            100% { transform: translateY(200%); opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  );
}
