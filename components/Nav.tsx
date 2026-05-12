"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });

      ScrollTrigger.create({
        start: "top -80",
        onEnter: () =>
          gsap.to(navRef.current, {
            backgroundColor: "rgba(248,246,242,0.95)",
            backdropFilter: "blur(12px)",
            duration: 0.4,
          }),
        onLeaveBack: () =>
          gsap.to(navRef.current, {
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            duration: 0.4,
          }),
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const links = ["Philosophy", "Treatments", "Results", "Team", "Booking"];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-6 flex items-center justify-between"
    >
      <span
        className="font-display text-xl font-light tracking-[0.3em] uppercase text-[#1A1A1A]"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        Lumière
      </span>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-10 items-center">
        {links.map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/70 hover:text-[#B8966E] transition-colors duration-300"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {l}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#booking"
            className="px-6 py-2.5 border border-[#B8966E] text-[#B8966E] text-xs tracking-[0.2em] uppercase hover:bg-[#B8966E] hover:text-white transition-all duration-300"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Book Now
          </a>
        </li>
      </ul>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span
          className={`block w-6 h-px bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
        />
        <span
          className={`block w-6 h-px bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-6 h-px bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
        />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#F8F6F2] border-t border-[#1A1A1A]/10 py-8 flex flex-col items-center gap-6 md:hidden">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-[0.2em] uppercase text-[#1A1A1A]/70"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
