"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function CountUp({ end, suffix = "", prefix = "", duration = 2 }: Props) {
  const elRef = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const obj = { val: 0 };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: end,
          duration,
          ease: "power2.out",
          onUpdate: () => setValue(Math.round(obj.val)),
        });
      },
    });

    return () => st.kill();
  }, [end, duration]);

  return (
    <span ref={elRef}>
      {prefix}{value}{suffix}
    </span>
  );
}
