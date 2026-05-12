"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const doctors = [
  {
    name: "Dr. Sophie Laurent",
    role: "Founder & Medical Director",
    specialty: "Facial Anatomy · Neurotoxins",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=85&fit=crop&crop=face",
    years: "18 yrs",
  },
  {
    name: "Dr. Marc Delacroix",
    role: "Senior Aesthetic Physician",
    specialty: "Fillers · Thread Lifting",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=85&fit=crop&crop=top",
    years: "12 yrs",
  },
  {
    name: "Dr. Amélie Rousseau",
    role: "Laser & Skin Specialist",
    specialty: "Laser · PRP · Skin Health",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=85&fit=crop&crop=face",
    years: "9 yrs",
  },
  {
    name: "Dr. Thomas Mercier",
    role: "Reconstructive Aesthetics",
    specialty: "Body Sculpting · Regenerative",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=85&fit=crop&crop=face",
    years: "14 yrs",
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-heading", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".team-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="py-24 md:py-40 px-8 md:px-16 bg-[#0D0D0D] text-[#F8F6F2]"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="team-heading flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div>
            <div className="w-12 h-px bg-[#B8966E] mb-4" />
            <span
              className="text-[10px] tracking-[0.4em] uppercase text-[#B8966E] block mb-4"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Our Physicians
            </span>
            <h2
              className="leading-none text-[#F8F6F2]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 100,
                fontSize: "clamp(40px, 6vw, 88px)",
              }}
            >
              Trained by the
              <br />
              <em>world&apos;s best</em>
            </h2>
          </div>
          <p
            className="max-w-xs text-sm text-[#F8F6F2]/40 leading-relaxed md:text-right"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Our team combines Paris medical training with an artist&apos;s eye for beauty and proportion.
          </p>
        </div>

        {/* Editorial grid */}
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F8F6F2]/10">
          {doctors.map((d, i) => (
            <div
              key={d.name}
              className={`team-card bg-[#0D0D0D] group relative overflow-hidden ${i % 2 === 0 ? "" : "lg:mt-12"}`}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/20 to-transparent" />

                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span
                    className="block text-[9px] tracking-[0.3em] uppercase text-[#B8966E] mb-2"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {d.specialty}
                  </span>
                  <h3
                    className="text-[#F8F6F2] leading-tight mb-1"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 400,
                      fontSize: "1.2rem",
                    }}
                  >
                    {d.name}
                  </h3>
                  <span
                    className="block text-[9px] tracking-[0.2em] uppercase text-[#F8F6F2]/40"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {d.role}
                  </span>
                </div>

                {/* Years badge */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-[#B8966E] px-3 py-2 text-center">
                    <span
                      className="block text-xs text-white leading-none font-medium"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {d.years}
                    </span>
                    <span
                      className="block text-[8px] text-white/70 tracking-widest uppercase mt-0.5"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      exp.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
