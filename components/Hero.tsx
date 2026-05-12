"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animation
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(labelRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          headlineRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          subRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          imgRef.current,
          {
            scale: 1.08,
            opacity: 0,
            duration: 1.6,
            ease: "power3.out",
          },
          "-=1.4"
        );

      // Parallax scroll on image
      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Scroll indicator
      gsap.to(scrollLineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-end"
      id="hero"
    >
      {/* Background image */}
      <div
        ref={imgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      >
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=90&fit=crop"
          alt="Lumière Clinic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F2]/80 via-[#F8F6F2]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F6F2]/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-8 md:px-16 pb-20 md:pb-24 max-w-2xl">
        <span
          ref={labelRef}
          className="block text-[10px] tracking-[0.4em] uppercase text-[#B8966E] font-medium mb-6"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Medical Aesthetics · Paris-Trained Physicians
        </span>

        <h1
          ref={headlineRef}
          className="font-display leading-none text-[#0D0D0D] mb-8"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 100,
            fontSize: "clamp(64px, 10vw, 120px)",
          }}
        >
          Redefine
          <br />
          <em>Your Beauty</em>
        </h1>

        <p
          ref={subRef}
          className="text-[#1A1A1A]/60 text-sm md:text-base leading-relaxed tracking-wide max-w-md mb-10"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Where science meets artistry. Our physicians craft bespoke aesthetic
          journeys tailored to your unique anatomy and vision.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 items-start">
          <MagneticButton href="#booking" dark>
            Book a Consultation
          </MagneticButton>
          <MagneticButton href="#treatments">
            Explore Treatments
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-8 md:right-16 bottom-10 z-10 flex flex-col items-center gap-3">
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-[#1A1A1A]/40 rotate-90 origin-center"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Scroll
        </span>
        <div
          ref={scrollLineRef}
          className="w-px h-12 bg-[#B8966E]"
          style={{ transformOrigin: "top" }}
        />
      </div>

      {/* Logo watermark top right */}
      <div className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 z-10 hidden lg:block">
        <span
          className="font-display text-[10vw] leading-none text-[#1A1A1A]/[0.04] select-none"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}
        >
          L
        </span>
      </div>
    </section>
  );
}
