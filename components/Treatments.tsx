"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const treatments = [
  {
    num: "01",
    name: "Botox & Preventive Care",
    desc: "Precision micro-injections that relax expression lines and prevent premature aging. The art of natural movement preserved.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=85&fit=crop",
    tag: "Neurotoxin",
    duration: "30 min",
  },
  {
    num: "02",
    name: "Hyaluronic Fillers",
    desc: "Volumetric restoration and sculpting using premium HA fillers. Cheekbones refined, lips enhanced with surgical precision.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85&fit=crop",
    tag: "Injectable",
    duration: "45 min",
  },
  {
    num: "03",
    name: "Laser Rejuvenation",
    desc: "Fractional laser protocols that remodel collagen, erase pigmentation, and restore luminous skin texture.",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=85&fit=crop",
    tag: "Energy-Based",
    duration: "60 min",
  },
  {
    num: "04",
    name: "PRP Therapy",
    desc: "Harness your body's own growth factors. Platelet-rich plasma stimulates deep tissue regeneration and radiance.",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=85&fit=crop",
    tag: "Regenerative",
    duration: "75 min",
  },
  {
    num: "05",
    name: "Thread Lifting",
    desc: "Minimally invasive lifting with biodegradable PDO threads. A non-surgical facelift with zero downtime.",
    img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=85&fit=crop",
    tag: "Lifting",
    duration: "90 min",
  },
];

export default function Treatments() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;

      // Horizontal scroll pinned section
      const totalWidth = track.scrollWidth - wrap.clientWidth;

      const scrollTween = gsap.to(track, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth + window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate cards on scroll
      gsap.from(".treatment-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      return () => scrollTween.scrollTrigger?.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="treatments"
      className="relative overflow-hidden bg-[#F8F6F2]"
    >
      <div ref={wrapRef} className="w-screen h-screen flex flex-col justify-center overflow-hidden">
        {/* Header row */}
        <div className="flex items-end justify-between px-8 md:px-16 pb-10 flex-shrink-0">
          <div>
            <div className="w-12 h-px bg-[#B8966E] mb-4" />
            <span
              className="text-[10px] tracking-[0.4em] uppercase text-[#B8966E] block mb-3"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Our Treatments
            </span>
            <h2
              className="leading-none text-[#0D0D0D]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 100,
                fontSize: "clamp(36px, 5vw, 64px)",
              }}
            >
              Bespoke Protocols
            </h2>
          </div>
          <p
            className="hidden md:block max-w-xs text-sm text-[#1A1A1A]/50 leading-relaxed text-right"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Each treatment is individually designed — scroll to explore our full menu.
          </p>
        </div>

        {/* Scrolling track */}
        <div ref={trackRef} className="flex gap-6 px-8 md:px-16 pb-8 flex-shrink-0" style={{ width: "max-content" }}>
          {treatments.map((t) => (
            <div
              key={t.num}
              className="treatment-card flex-shrink-0 w-72 md:w-80 group"
            >
              <div className="relative overflow-hidden mb-5" style={{ aspectRatio: "3/4" }}>
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 bg-[#F8F6F2] px-3 py-1">
                  <span
                    className="text-[9px] tracking-[0.25em] uppercase text-[#B8966E]"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {t.tag}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span
                  className="text-[#B8966E]/40 text-sm mt-0.5 flex-shrink-0"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {t.num}
                </span>
                <div>
                  <h3
                    className="text-[#0D0D0D] leading-tight mb-2"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 400,
                      fontSize: "1.25rem",
                    }}
                  >
                    {t.name}
                  </h3>
                  <p
                    className="text-[#1A1A1A]/50 text-xs leading-relaxed mb-3"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {t.desc}
                  </p>
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase text-[#1A1A1A]/30"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {t.duration} session
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* End CTA card */}
          <div className="flex-shrink-0 w-72 md:w-80 flex flex-col justify-end">
            <div
              className="h-full border border-[#1A1A1A]/10 flex flex-col items-center justify-center gap-6 p-10"
              style={{ aspectRatio: "3/4" }}
            >
              <span
                className="text-[10px] tracking-[0.3em] uppercase text-[#B8966E] text-center"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Tailored to you
              </span>
              <h3
                className="text-center leading-tight text-[#0D0D0D]"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 100,
                  fontSize: "2rem",
                }}
              >
                Book Your Consultation
              </h3>
              <a
                href="#booking"
                className="px-8 py-3 bg-[#0D0D0D] text-[#F8F6F2] text-[10px] tracking-[0.3em] uppercase hover:bg-[#B8966E] transition-colors duration-300"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
