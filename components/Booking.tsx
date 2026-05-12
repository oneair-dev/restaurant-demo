"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const treatments = [
  "Botox & Preventive Care",
  "Hyaluronic Fillers",
  "Laser Rejuvenation",
  "PRP Therapy",
  "Thread Lifting",
  "Consultation Only",
];

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    treatment: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".booking-content", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gsap.to(".booking-form", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => setSubmitted(true),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="min-h-screen bg-[#0D0D0D] text-[#F8F6F2] py-24 md:py-40 px-8 md:px-16 flex items-center"
    >
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Left info */}
          <div className="lg:w-[40%]">
            <div className="booking-content">
              <div className="w-12 h-px bg-[#B8966E] mb-4" />
              <span
                className="text-[10px] tracking-[0.4em] uppercase text-[#B8966E] block mb-6"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Reserve Your Visit
              </span>
            </div>
            <h2
              className="booking-content leading-none text-[#F8F6F2] mb-8"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 100,
                fontSize: "clamp(40px, 5vw, 80px)",
              }}
            >
              Begin Your
              <br />
              <em>Journey</em>
            </h2>
            <p
              className="booking-content text-[#F8F6F2]/40 text-sm leading-relaxed mb-12"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Every transformation begins with a conversation. Our physicians will take time to understand your goals, your anatomy, and your lifestyle before designing a bespoke treatment plan.
            </p>

            <div className="booking-content space-y-6">
              {[
                { label: "Location", value: "12 Avenue Montaigne, Paris 75008" },
                { label: "Phone", value: "+33 1 47 23 44 55" },
                { label: "Hours", value: "Mon–Sat · 9:00–19:00" },
              ].map((item) => (
                <div key={item.label} className="border-b border-[#F8F6F2]/10 pb-4">
                  <span
                    className="block text-[9px] tracking-[0.3em] uppercase text-[#B8966E] mb-1"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="block text-sm text-[#F8F6F2]/60"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="lg:w-[60%]">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-px h-20 bg-[#B8966E] mb-8 mx-auto" />
                <h3
                  className="text-[#F8F6F2] mb-4"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 100,
                    fontSize: "2.5rem",
                  }}
                >
                  Thank you, {form.name || "dear guest"}.
                </h3>
                <p
                  className="text-[#F8F6F2]/40 text-sm max-w-sm"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  Our team will contact you within 24 hours to confirm your consultation. We look forward to welcoming you to Lumière.
                </p>
              </div>
            ) : (
              <form
                className="booking-form space-y-0"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#F8F6F2]/10">
                  <div className="bg-[#0D0D0D] p-6">
                    <label
                      className="block text-[9px] tracking-[0.3em] uppercase text-[#F8F6F2]/30 mb-3"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[#F8F6F2]/10 pb-2 text-[#F8F6F2] text-sm outline-none focus:border-[#B8966E] transition-colors"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="bg-[#0D0D0D] p-6">
                    <label
                      className="block text-[9px] tracking-[0.3em] uppercase text-[#F8F6F2]/30 mb-3"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[#F8F6F2]/10 pb-2 text-[#F8F6F2] text-sm outline-none focus:border-[#B8966E] transition-colors"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="bg-[#0D0D0D] p-6 border-t border-[#F8F6F2]/10">
                  <label
                    className="block text-[9px] tracking-[0.3em] uppercase text-[#F8F6F2]/30 mb-3"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    Treatment of Interest
                  </label>
                  <select
                    name="treatment"
                    value={form.treatment}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#F8F6F2]/10 pb-2 text-[#F8F6F2] text-sm outline-none focus:border-[#B8966E] transition-colors appearance-none"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    <option value="" className="bg-[#0D0D0D]">Select a treatment…</option>
                    {treatments.map((t) => (
                      <option key={t} value={t} className="bg-[#0D0D0D]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-[#0D0D0D] p-6 border-t border-[#F8F6F2]/10">
                  <label
                    className="block text-[9px] tracking-[0.3em] uppercase text-[#F8F6F2]/30 mb-3"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-transparent border-b border-[#F8F6F2]/10 pb-2 text-[#F8F6F2] text-sm outline-none focus:border-[#B8966E] transition-colors resize-none"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    placeholder="Tell us about your goals…"
                  />
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <MagneticButton type="submit" dark className="w-full sm:w-auto text-center justify-center">
                    Request Consultation
                  </MagneticButton>
                  <span
                    className="text-[9px] tracking-[0.15em] text-[#F8F6F2]/20 uppercase"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    Confidential · No commitment required
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
