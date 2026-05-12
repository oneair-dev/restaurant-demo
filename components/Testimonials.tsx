'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'La Bella Roma transported us straight to the backstreets of Trastevere. Every dish was a masterpiece — the truffle risotto alone is worth the flight from New York.',
    author: 'Margaret & Thomas H.',
    origin: 'New York, USA',
    rating: 5,
    date: 'March 2025',
  },
  {
    quote:
      'The finest Italian dining experience I have had outside of Italy itself. The sommelier curated a flawless pairing journey. An absolute must for any lover of true Italian cuisine.',
    author: 'Jean-Pierre Moreau',
    origin: 'Paris, France',
    rating: 5,
    date: 'January 2025',
  },
  {
    quote:
      "Chef's tasting menu with wine pairings — five hours passed in what felt like minutes. The lamb in herb crust and the chocolate soufflé were simply without equal. Truly unforgettable.",
    author: 'Sophia & Rajan Mehta',
    origin: 'London, UK',
    rating: 5,
    date: 'April 2025',
  },
  {
    quote:
      'We celebrated our anniversary here and the team made it magical. The private dining room, the personalised menu, the impeccable service — every detail was perfect beyond words.',
    author: 'Claire & Antoine Dubois',
    origin: 'Brussels, Belgium',
    rating: 5,
    date: 'February 2025',
  },
  {
    quote:
      "I have dined at Michelin-starred restaurants across Europe, and La Bella Roma stands proudly among the very best. The pasta is extraordinary — it doesn't get better than this.",
    author: 'Alessandro Ferraro',
    origin: 'Milan, Italy',
    rating: 5,
    date: 'May 2025',
  },
  {
    quote:
      'From the amuse-bouche to the piccola pasticceria, every moment was a revelation. The ambiance, the wine list, the service — an experience that lingers long after the last course.',
    author: 'Dr. Ingrid Schreiber',
    origin: 'Vienna, Austria',
    rating: 5,
    date: 'March 2025',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1L8.18 5.27H12.66L9.04 7.9L10.21 12.17L7 9.54L3.79 12.17L4.96 7.9L1.34 5.27H5.82L7 1Z"
            fill="#D4AF37"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
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

      const cards = sectionRef.current?.querySelectorAll('.testimonial-card') ?? [];
      Array.from(cards).forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: '#FFF8F0' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <p
            className="text-xs tracking-[0.5em] uppercase mb-3"
            style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
          >
            Voices of Our Guests
          </p>
          <h2
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ color: '#1C0A00', fontFamily: 'var(--font-playfair)' }}
          >
            What They Say
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16" style={{ background: '#D4AF37' }} />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L9 7L15 8L9 9L8 15L7 9L1 8L7 7L8 1Z" fill="#D4AF37" />
            </svg>
            <div className="h-px w-16" style={{ background: '#D4AF37' }} />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card p-8 border relative"
              style={{
                borderColor: 'rgba(139, 0, 0, 0.12)',
                background: '#FFFAF4',
              }}
            >
              {/* Large quote mark */}
              <span
                className="absolute top-4 right-6 text-7xl leading-none opacity-[0.06] select-none"
                style={{ color: '#8B0000', fontFamily: 'var(--font-playfair)' }}
              >
                &quot;
              </span>

              <Stars count={t.rating} />

              <p
                className="text-sm leading-relaxed mb-6 italic"
                style={{ color: 'rgba(28, 10, 0, 0.75)', fontFamily: 'var(--font-playfair)' }}
              >
                &quot;{t.quote}&quot;
              </p>

              <div className="h-px mb-5" style={{ background: 'rgba(212, 175, 55, 0.3)' }} />

              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: '#1C0A00', fontFamily: 'var(--font-lato)' }}
                  >
                    {t.author}
                  </p>
                  <p
                    className="text-xs mt-0.5 opacity-60"
                    style={{ color: '#1C0A00', fontFamily: 'var(--font-lato)' }}
                  >
                    {t.origin}
                  </p>
                </div>
                <span
                  className="text-xs opacity-50"
                  style={{ color: '#8B0000', fontFamily: 'var(--font-lato)' }}
                >
                  {t.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <div
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t"
          style={{ borderColor: 'rgba(139, 0, 0, 0.12)' }}
        >
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '2,400+', label: 'Guest Reviews' },
            { value: '3×', label: 'Michelin Recognition' },
            { value: '37', label: 'Years of Excellence' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p
                className="text-4xl font-bold mb-1"
                style={{ color: '#8B0000', fontFamily: 'var(--font-playfair)' }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs tracking-widest uppercase opacity-60"
                style={{ color: '#1C0A00', fontFamily: 'var(--font-lato)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
