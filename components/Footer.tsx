'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Reservations', href: '#reservation' },
];

const hours = [
  { day: 'Monday – Thursday', time: '18:00 – 22:30' },
  { day: 'Friday & Saturday', time: '17:30 – 23:00' },
  { day: 'Sunday', time: '17:00 – 21:30' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = footerRef.current?.querySelectorAll('.footer-col') ?? [];
      gsap.from(cols, {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{ background: '#0a0000' }}
    >
      {/* Gold top border */}
      <div className="h-[1px]" style={{ background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="footer-col lg:col-span-1">
            <div className="mb-5">
              <p
                className="text-2xl font-bold"
                style={{ color: '#D4AF37', fontFamily: 'var(--font-playfair)' }}
              >
                La Bella Roma
              </p>
              <p
                className="text-[10px] tracking-[0.35em] uppercase opacity-50 mt-1"
                style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
              >
                Ristorante Italiano · Est. 1987
              </p>
            </div>
            <p
              className="text-sm leading-relaxed opacity-50 mb-6"
              style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
            >
              Bringing the authentic flavours and warmth of Rome to every table since 1987.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'TripAdvisor'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[10px] tracking-widest uppercase transition-opacity duration-200 opacity-40 hover:opacity-100"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                  aria-label={s}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4
              className="text-xs tracking-[0.4em] uppercase mb-6"
              style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm opacity-50 hover:opacity-100 transition-opacity duration-200"
                    style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#reservation"
                  className="text-sm transition-opacity duration-200 hover:opacity-80"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                >
                  Book a Table →
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="footer-col">
            <h4
              className="text-xs tracking-[0.4em] uppercase mb-6"
              style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
            >
              Hours
            </h4>
            <ul className="space-y-4">
              {hours.map((h) => (
                <li key={h.day}>
                  <p
                    className="text-xs opacity-50 mb-0.5"
                    style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
                  >
                    {h.day}
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
                  >
                    {h.time}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4
              className="text-xs tracking-[0.4em] uppercase mb-6"
              style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
            >
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <p
                  className="text-xs opacity-50 mb-0.5"
                  style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
                >
                  Address
                </p>
                <p
                  className="text-sm"
                  style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
                >
                  Via della Croce 18<br />
                  00187 Roma, Italia
                </p>
              </li>
              <li>
                <p
                  className="text-xs opacity-50 mb-0.5"
                  style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
                >
                  Phone
                </p>
                <a
                  href="tel:+390612345678"
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
                >
                  +39 06 1234 5678
                </a>
              </li>
              <li>
                <p
                  className="text-xs opacity-50 mb-0.5"
                  style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
                >
                  Email
                </p>
                <a
                  href="mailto:info@labellaroma.it"
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
                >
                  info@labellaroma.it
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: 'rgba(212, 175, 55, 0.1)' }}
        >
          <p
            className="text-xs opacity-30 text-center sm:text-left"
            style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
          >
            © 2025 La Bella Roma. All rights reserved.
          </p>
          <div className="flex items-center gap-2 opacity-30">
            <div className="h-px w-8" style={{ background: '#D4AF37' }} />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 0.5L7 5H11.5L8 7.5L9.5 12L6 9.5L2.5 12L4 7.5L0.5 5H5L6 0.5Z" fill="#D4AF37" />
            </svg>
            <div className="h-px w-8" style={{ background: '#D4AF37' }} />
          </div>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs opacity-30 hover:opacity-60 transition-opacity"
                style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
