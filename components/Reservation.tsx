'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const inputClass =
  'w-full bg-transparent border-b py-3 px-0 text-sm outline-none transition-colors duration-200 placeholder:opacity-40';

const inputStyle = {
  borderColor: 'rgba(212, 175, 55, 0.35)',
  color: '#FFF8F0',
  fontFamily: 'var(--font-lato)',
};

export default function Reservation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

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

      const fields = formRef.current?.querySelectorAll('.form-field') ?? [];
      gsap.from(fields, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0a0000 0%, #3d0000 40%, #8B0000 100%)',
      }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <p
            className="text-xs tracking-[0.5em] uppercase mb-3"
            style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
          >
            Join Us for Dinner
          </p>
          <h2
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ color: '#FFF8F0', fontFamily: 'var(--font-playfair)' }}
          >
            Reservations
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16" style={{ background: '#D4AF37' }} />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L9 7L15 8L9 9L8 15L7 9L1 8L7 7L8 1Z" fill="#D4AF37" />
            </svg>
            <div className="h-px w-16" style={{ background: '#D4AF37' }} />
          </div>
          <p
            className="text-sm mt-5 opacity-70 max-w-md mx-auto leading-relaxed"
            style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
          >
            For parties of 8 or more, or for private dining enquiries, please call us directly at{' '}
            <span style={{ color: '#D4AF37' }}>+39 06 1234 5678</span>.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16">
            <svg
              className="mx-auto mb-6"
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
            >
              <circle cx="28" cy="28" r="27" stroke="#D4AF37" strokeWidth="1.5" />
              <path
                d="M18 28L24 34L38 20"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3
              className="text-3xl font-bold mb-3"
              style={{ color: '#FFF8F0', fontFamily: 'var(--font-playfair)' }}
            >
              Grazie Mille!
            </h3>
            <p
              className="text-sm opacity-70 leading-relaxed"
              style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
            >
              Your reservation request has been received. We will confirm your table within 24 hours via email.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {/* First name */}
              <div className="form-field">
                <label
                  className="block text-xs tracking-widest uppercase mb-2 opacity-60"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                >
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Giovanni"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>

              {/* Last name */}
              <div className="form-field">
                <label
                  className="block text-xs tracking-widest uppercase mb-2 opacity-60"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rossi"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>

              {/* Email */}
              <div className="form-field">
                <label
                  className="block text-xs tracking-widest uppercase mb-2 opacity-60"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="giovanni@example.com"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>

              {/* Phone */}
              <div className="form-field">
                <label
                  className="block text-xs tracking-widest uppercase mb-2 opacity-60"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+39 06 000 0000"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>

              {/* Date */}
              <div className="form-field">
                <label
                  className="block text-xs tracking-widest uppercase mb-2 opacity-60"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                >
                  Date *
                </label>
                <input
                  type="date"
                  required
                  className={inputClass}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                />
              </div>

              {/* Time */}
              <div className="form-field">
                <label
                  className="block text-xs tracking-widest uppercase mb-2 opacity-60"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                >
                  Time *
                </label>
                <select
                  required
                  className={inputClass}
                  style={{ ...inputStyle, background: 'transparent' }}
                >
                  <option value="" style={{ background: '#3d0000' }}>Select a time</option>
                  {['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map((t) => (
                    <option key={t} value={t} style={{ background: '#3d0000' }}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Party size */}
              <div className="form-field">
                <label
                  className="block text-xs tracking-widest uppercase mb-2 opacity-60"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                >
                  Party Size *
                </label>
                <select
                  required
                  className={inputClass}
                  style={{ ...inputStyle, background: 'transparent' }}
                >
                  <option value="" style={{ background: '#3d0000' }}>Number of guests</option>
                  {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} style={{ background: '#3d0000' }}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Occasion */}
              <div className="form-field">
                <label
                  className="block text-xs tracking-widest uppercase mb-2 opacity-60"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                >
                  Occasion
                </label>
                <select
                  className={inputClass}
                  style={{ ...inputStyle, background: 'transparent' }}
                >
                  <option value="" style={{ background: '#3d0000' }}>Select occasion</option>
                  {['Birthday', 'Anniversary', 'Business Dinner', 'Proposal', 'Date Night', 'Other'].map((o) => (
                    <option key={o} value={o} style={{ background: '#3d0000' }}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special requests */}
              <div className="form-field sm:col-span-2">
                <label
                  className="block text-xs tracking-widest uppercase mb-2 opacity-60"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                >
                  Special Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="Dietary requirements, allergies, special arrangements..."
                  className={inputClass}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="form-field mt-10 text-center">
              <button
                type="submit"
                className="px-12 py-4 text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: '#D4AF37',
                  color: '#1C0A00',
                  fontFamily: 'var(--font-lato)',
                  boxShadow: '0 4px 24px rgba(212, 175, 55, 0.25)',
                }}
              >
                Request a Reservation
              </button>
              <p
                className="text-xs mt-4 opacity-50"
                style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
              >
                We will confirm your reservation within 24 hours.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
