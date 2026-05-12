"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    label: "Hyaluronic Fillers — Lip Enhancement",
    before: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80&fit=crop&crop=face",
    after: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&fit=crop&crop=face",
  },
  {
    label: "Botox — Forehead Smoothing",
    before: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80&fit=crop&crop=face",
    after: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80&fit=crop&crop=face",
  },
];

function BeforeAfterSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging.current) updatePos(e.clientX); };
  const onMouseUp = () => { isDragging.current = false; };

  const onTouchMove = (e: React.TouchEvent) => { updatePos(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none"
      style={{ aspectRatio: "3/4", maxHeight: "70vh" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchStart={onMouseDown}
      onTouchEnd={onMouseUp}
    >
      {/* Before */}
      <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" />

      {/* After (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${10000 / sliderPos}%`, maxWidth: "none" }} />
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-0.5 h-full bg-white/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-[#B8966E] flex items-center justify-center gap-1">
          <span className="text-[#B8966E] text-xs">◄</span>
          <span className="text-[#B8966E] text-xs">►</span>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4">
        <span className="bg-[#0D0D0D]/70 text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1.5"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
          Before
        </span>
      </div>
      <div className="absolute bottom-4 right-4">
        <span className="bg-[#B8966E]/90 text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1.5"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
          After
        </span>
      </div>
    </div>
  );
}

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".results-heading", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".results-slider", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="results"
      className="py-24 md:py-40 px-8 md:px-16 bg-[#F8F6F2]"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
          {/* Left content */}
          <div className="md:w-[38%] results-heading">
            <div className="w-12 h-px bg-[#B8966E] mb-4" />
            <span
              className="text-[10px] tracking-[0.4em] uppercase text-[#B8966E] block mb-6"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Real Results
            </span>
            <h2
              className="leading-none text-[#0D0D0D] mb-8"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 100,
                fontSize: "clamp(40px, 5vw, 72px)",
              }}
            >
              Transformations
              <br />
              <em>that speak</em>
            </h2>
            <p
              className="text-[#1A1A1A]/50 text-sm leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Each result is the product of meticulous planning, premium products, and a physician&apos;s trained eye for proportion and balance.
            </p>

            {/* Case selector */}
            <div className="space-y-3">
              {cases.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-5 py-4 border transition-all duration-300 ${
                    active === i
                      ? "border-[#B8966E] bg-[#B8966E]/5"
                      : "border-[#1A1A1A]/10 hover:border-[#B8966E]/40"
                  }`}
                >
                  <span
                    className={`text-[10px] tracking-[0.2em] uppercase ${active === i ? "text-[#B8966E]" : "text-[#1A1A1A]/50"}`}
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {c.label}
                  </span>
                </button>
              ))}
            </div>

            <p
              className="mt-6 text-[10px] tracking-[0.15em] text-[#1A1A1A]/30 uppercase"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              * Results may vary. Drag slider to compare.
            </p>
          </div>

          {/* Right: slider */}
          <div className="md:w-[62%] results-slider w-full">
            <BeforeAfterSlider
              key={active}
              before={cases[active].before}
              after={cases[active].after}
              label={cases[active].label}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
