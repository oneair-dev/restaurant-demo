"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Treatments: [
    "Botox & Preventive Care",
    "Hyaluronic Fillers",
    "Laser Rejuvenation",
    "PRP Therapy",
    "Thread Lifting",
  ],
  Clinic: ["Philosophy", "Our Team", "Results", "Testimonials", "Blog"],
  Legal: ["Privacy Policy", "Terms of Use", "Medical Disclaimer", "GDPR"],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });

      // Marquee
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const marqueeText = Array(6).fill("Lumière Clinic · Medical Aesthetics · Paris · ").join("");

  return (
    <footer ref={footerRef} className="bg-[#F8F6F2] border-t border-[#1A1A1A]/10">
      {/* Marquee */}
      <div className="overflow-hidden py-6 border-b border-[#1A1A1A]/10">
        <div
          ref={marqueeRef}
          className="flex gap-0 whitespace-nowrap"
          style={{ width: "200%" }}
        >
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-[#1A1A1A]/20 block flex-shrink-0"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", width: "50%" }}
          >
            {marqueeText}
          </span>
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-[#1A1A1A]/20 block flex-shrink-0"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", width: "50%" }}
          >
            {marqueeText}
          </span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-20">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {/* Brand col */}
          <div className="footer-col col-span-2 md:col-span-1">
            <span
              className="block font-display text-2xl font-light tracking-[0.3em] uppercase text-[#0D0D0D] mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Lumière
            </span>
            <p
              className="text-xs text-[#1A1A1A]/40 leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Medical aesthetics for the discerning individual. Precision, artistry, and care — in the heart of Paris.
            </p>
            <div className="flex gap-4">
              {["IG", "FB", "TW", "LI"].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 border border-[#1A1A1A]/20 flex items-center justify-center hover:border-[#B8966E] hover:text-[#B8966E] transition-colors duration-300 text-[9px] tracking-wider text-[#1A1A1A]/40"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer-col">
              <span
                className="block text-[9px] tracking-[0.35em] uppercase text-[#B8966E] mb-5"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {category}
              </span>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[11px] text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors duration-300 tracking-wide"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-col flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#1A1A1A]/10">
          <span
            className="text-[10px] text-[#1A1A1A]/30 tracking-wide"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            © 2024 Lumière Clinic SAS. All rights reserved.
          </span>
          <span
            className="text-[10px] text-[#1A1A1A]/20 tracking-wide text-center"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Medical treatments are regulated acts. Results vary. Always consult a qualified physician.
          </span>
          <span
            className="text-[10px] tracking-[0.2em] uppercase text-[#B8966E]"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Paris · Est. 2009
          </span>
        </div>
      </div>
    </footer>
  );
}
