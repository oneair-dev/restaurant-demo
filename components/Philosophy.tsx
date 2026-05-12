"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "./CountUp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 98, suffix: "%", label: "Patient Satisfaction" },
  { value: 12, suffix: "K+", label: "Procedures Performed" },
  { value: 15, suffix: "Y", label: "Years of Excellence" },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      gsap.from(".philosophy-stat", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".philosophy-stats",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-24 md:py-40 px-8 md:px-0 overflow-hidden"
    >
      {/* Background text */}
      <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden">
        <span
          className="block text-[20vw] leading-none text-[#1A1A1A]/[0.03]"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}
        >
          Beauté
        </span>
      </div>

      <div className="max-w-screen-xl mx-auto">
        {/* Section label */}
        <div className="md:pl-16 mb-16">
          <div
            ref={lineRef}
            className="w-16 h-px bg-[#B8966E] mb-4"
            style={{ transformOrigin: "left" }}
          />
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-[#B8966E]"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Our Philosophy
          </span>
        </div>

        {/* Asymmetric split */}
        <div className="flex flex-col md:flex-row gap-0">
          {/* Left 30% */}
          <div
            ref={leftRef}
            className="md:w-[35%] md:pl-16 md:pr-12 flex flex-col justify-center mb-12 md:mb-0"
          >
            <h2
              className="leading-none text-[#0D0D0D] mb-10"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 100,
                fontSize: "clamp(40px, 5vw, 72px)",
              }}
            >
              Beauty is
              <br />
              <em>precision</em>
            </h2>

            <blockquote className="relative mb-10">
              <span className="absolute -top-4 -left-4 text-6xl text-[#B8966E]/20 font-display leading-none">&ldquo;</span>
              <p
                className="text-[#1A1A1A]/60 text-sm leading-loose tracking-wide italic pl-4"
                style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.1rem" }}
              >
                We don&apos;t change who you are — we reveal the finest version of you. Every treatment begins with listening.
              </p>
              <footer className="mt-6 pl-4">
                <span
                  className="block text-[10px] tracking-[0.3em] uppercase text-[#B8966E]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  Dr. Sophie Laurent
                </span>
                <span
                  className="block text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 mt-1"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  Founder & Medical Director
                </span>
              </footer>
            </blockquote>
          </div>

          {/* Right 70% */}
          <div ref={rightRef} className="md:w-[65%] relative">
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
              <img
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1400&q=90&fit=crop"
                alt="Clinic interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#F8F6F2]/20" />
            </div>

            {/* Floating stat card */}
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-4 md:-translate-x-10 bg-[#0D0D0D] text-[#F8F6F2] px-8 py-6 hidden md:block">
              <span
                className="block text-[9px] tracking-[0.3em] uppercase text-[#B8966E] mb-2"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Certified Excellence
              </span>
              <span
                className="block text-3xl font-light"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Since 2009
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="philosophy-stats grid grid-cols-3 gap-8 mt-32 md:mt-48 md:pl-16 border-t border-[#1A1A1A]/10 pt-16">
          {stats.map((s) => (
            <div key={s.label} className="philosophy-stat">
              <div
                className="text-4xl md:text-5xl text-[#0D0D0D] mb-2"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}
              >
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <span
                className="text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A]/40"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
