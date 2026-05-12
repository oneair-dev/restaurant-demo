"use client";
import { useRef, useCallback } from "react";
import gsap from "gsap";

interface Props {
  children: React.ReactNode;
  href?: string;
  dark?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function MagneticButton({
  children,
  href,
  dark = false,
  onClick,
  type = "button",
  className = "",
}: Props) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }, []);

  const baseClass = `magnetic-btn inline-block px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 ${className}`;

  const darkClass = dark
    ? "bg-[#0D0D0D] text-[#F8F6F2] hover:bg-[#B8966E]"
    : "border border-[#1A1A1A]/30 text-[#1A1A1A] hover:border-[#B8966E] hover:text-[#B8966E]";

  const style = { fontFamily: "var(--font-dm-sans), sans-serif" };

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`${baseClass} ${darkClass}`}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={`${baseClass} ${darkClass}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
