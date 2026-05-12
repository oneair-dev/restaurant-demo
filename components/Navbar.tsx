'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const links = [
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Reservations', href: '#reservation' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, { y: -80, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(28, 10, 0, 0.96)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.2)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex flex-col leading-none group">
            <span
              className="text-xl sm:text-2xl font-bold tracking-wide"
              style={{ color: '#D4AF37', fontFamily: 'var(--font-playfair)' }}
            >
              La Bella Roma
            </span>
            <span
              className="text-[10px] tracking-[0.35em] uppercase opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ color: '#FFF8F0' }}
            >
              Ristorante Italiano
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase transition-colors duration-200 hover:opacity-100 opacity-75"
                style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservation"
              className="px-5 py-2 text-xs tracking-widest uppercase font-bold transition-all duration-200 hover:scale-105"
              style={{ background: '#D4AF37', color: '#1C0A00', fontFamily: 'var(--font-lato)' }}
            >
              Book a Table
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-[1.5px] w-6 transition-all duration-300"
                style={{
                  background: '#D4AF37',
                  transformOrigin: 'center',
                  transform:
                    mobileOpen
                      ? i === 0
                        ? 'rotate(45deg) translate(4.5px, 4.5px)'
                        : i === 1
                        ? 'scaleX(0)'
                        : 'rotate(-45deg) translate(4.5px, -4.5px)'
                      : 'none',
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? '300px' : '0',
          background: 'rgba(28, 10, 0, 0.98)',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-4 border-t border-gold/20">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-xs tracking-widest uppercase py-2 opacity-80 hover:opacity-100 transition-opacity"
              style={{ color: '#FFF8F0', fontFamily: 'var(--font-lato)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservation"
            onClick={() => setMobileOpen(false)}
            className="text-center py-3 text-xs tracking-widest uppercase font-bold mt-2"
            style={{ background: '#D4AF37', color: '#1C0A00' }}
          >
            Book a Table
          </a>
        </div>
      </div>
    </nav>
  );
}
