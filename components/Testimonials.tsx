"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Lumière completely changed how I see myself. Dr. Laurent understood exactly what I wanted before I even finished explaining. The results are breathtaking — completely natural.",
    name: "Isabelle M.",
    treatment: "Hyaluronic Fillers & Botox",
    location: "Paris, France",
  },
  {
    quote:
      "I was terrified of looking 'done'. Three sessions later, I look like the best version of myself. My colleagues think I've been on a very good holiday.",
    name: "Charlotte B.",
    treatment: "Thread Lifting & PRP",
    location: "London, UK",
  },
  {
    quote:
      "The clinic itself is like a luxury hotel. The team treats you as an individual, not a patient. I've recommended Lumière to every woman I know.",
    name: "Nadia A.",
    treatment: "Laser Rejuvenation",
    location: "Monaco",
  },
  {
    quote:
      "Scientific precision meets genuine care. Dr. Delacroix explained every step. Six months post-treatment and the results keep impressing me.",
    name: "Sophie R.",
    treatment: "Full Facial Rejuvenation",
    location: "Geneva, Switzerland",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const animateIn = (el: HTMLDivElement | null) => {
    if (!el) return;
    gsap.fromTo(
      el,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  };

  const goTo = (index: number) => {
    const el = quoteRef.current;
    if (!el) return;
    gsap.to(el, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setActive(index);
        animateIn(el);
      },
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % testimonials.length;
        const el = quoteRef.current;
        if (el) {
          gsap.fromTo(
            el,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
          );
        }
        return next;
      });
    }, 5000);

    return () => {
      ctx.revert();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 md:px-16 py-24 bg-[#F8F6F2] overflow-hidden"
    >
      {/* Giant background quote mark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="text-[40vw] leading-none text-[#1A1A1A]/[0.025]"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          &ldquo;
        </span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="w-px h-16 bg-[#B8966E] mx-auto mb-12" />

        <span
          className="text-[10px] tracking-[0.4em] uppercase text-[#B8966E] block mb-12"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Client Stories
        </span>

        <div ref={quoteRef}>
          <blockquote
            className="leading-relaxed text-[#0D0D0D] mb-10"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              fontStyle: "italic",
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div className="space-y-2">
            <span
              className="block text-sm font-medium text-[#0D0D0D]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {t.name}
            </span>
            <span
              className="block text-[10px] tracking-[0.25em] uppercase text-[#B8966E]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {t.treatment}
            </span>
            <span
              className="block text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/30"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {t.location}
            </span>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-14">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                goTo(i);
              }}
              className={`transition-all duration-300 ${
                i === active
                  ? "w-8 h-px bg-[#B8966E]"
                  : "w-4 h-px bg-[#1A1A1A]/20 hover:bg-[#B8966E]/50"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
