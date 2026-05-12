'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 'antipasti',
    name: 'Antipasti',
    subtitle: 'Starters',
    image: null,
    items: [
      { name: 'Burrata con Pomodori', desc: 'Fresh burrata, heirloom tomatoes, basil oil, Maldon sea salt', price: '€18' },
      { name: 'Carpaccio di Manzo', desc: 'Aged beef tenderloin, shaved Parmigiano Reggiano, capers, truffle oil', price: '€22' },
      { name: 'Fritto Misto Mare', desc: 'Lightly battered mixed seafood, lemon aioli, fresh herbs', price: '€24' },
      { name: 'Crostini al Tartufo', desc: 'Toasted sourdough, Périgord black truffle paste, aged ricotta', price: '€20' },
    ],
  },
  {
    id: 'primi',
    name: 'Primi Piatti',
    subtitle: 'First Course',
    image: '/images/tagliatelle-tartufo.jpg',
    items: [
      { name: 'Tagliatelle al Ragù', desc: 'Hand-rolled egg pasta, slow-braised Bolognese, 24-month Parmigiano', price: '€26' },
      { name: 'Risotto al Tartufo Nero', desc: 'Carnaroli rice, shaved black truffle, mascarpone, aged Pecorino', price: '€32' },
      { name: "Paccheri all'Astice", desc: 'Large pasta tubes, half Maine lobster, cherry tomato confit, basil', price: '€38' },
      { name: 'Gnocchi di Patate', desc: 'Handmade potato gnocchi, Gorgonzola fonduta, candied walnuts, acacia honey', price: '€24' },
    ],
  },
  {
    id: 'secondi',
    name: 'Secondi Piatti',
    subtitle: 'Main Course',
    image: '/images/pizza-margherita.jpg',
    items: [
      { name: 'Branzino al Forno', desc: 'Roasted whole sea bass, Sicilian caponata, salmoriglio, extra virgin olive oil', price: '€36' },
      { name: 'Bistecca alla Fiorentina', desc: '28-day aged Florentine T-bone, rosemary roasted potatoes, truffle butter', price: '€120' },
      { name: 'Agnello in Crosta di Erbe', desc: 'Herb-crusted rack of lamb, cannellini bean purée, rosemary jus, mint gremolata', price: '€42' },
      { name: 'Pollo alla Cacciatora', desc: 'Free-range chicken, Taggiasca olives, capers, San Marzano tomato, creamy polenta', price: '€28' },
    ],
  },
  {
    id: 'dolci',
    name: 'Dolci',
    subtitle: 'Desserts',
    image: '/images/tiramisu.jpg',
    items: [
      { name: 'Tiramisù della Casa', desc: 'Classic mascarpone cream, espresso-drenched Savoiardi, Valrhona cacao', price: '€14' },
      { name: 'Panna Cotta al Pistacchio', desc: 'Bronte pistachio cream, candied rose petals, Sicilian orange blossom honey', price: '€12' },
      { name: 'Cannolo Siciliano', desc: 'Crispy fried pastry shell, sheep ricotta cream, dark chocolate chips, candied orange', price: '€13' },
      { name: 'Soufflé al Cioccolato', desc: 'Warm Manjari dark chocolate soufflé, Madagascan vanilla bean gelato', price: '€16' },
    ],
  },
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState('antipasti');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(tabsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: tabsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.menu-card');
    gsap.fromTo(
      items,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out' }
    );
  }, [activeTab]);

  const active = categories.find((c) => c.id === activeTab)!;

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: '#FFF8F0' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <p
            className="text-xs tracking-[0.5em] uppercase mb-3"
            style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
          >
            Curated with Passion
          </p>
          <h2
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ color: '#1C0A00', fontFamily: 'var(--font-playfair)' }}
          >
            Our Menu
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16" style={{ background: '#D4AF37' }} />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L9 7L15 8L9 9L8 15L7 9L1 8L7 7L8 1Z" fill="#D4AF37" />
            </svg>
            <div className="h-px w-16" style={{ background: '#D4AF37' }} />
          </div>
        </div>

        {/* Category tabs */}
        <div ref={tabsRef} className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="px-5 sm:px-7 py-3 text-xs tracking-widest uppercase font-bold transition-all duration-300"
              style={{
                background: activeTab === cat.id ? '#8B0000' : 'transparent',
                color: activeTab === cat.id ? '#D4AF37' : '#8B0000',
                border: '1px solid #8B0000',
                fontFamily: 'var(--font-lato)',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active category subtitle */}
        <p
          className="text-center text-lg italic mb-10"
          style={{ color: '#8B0000', fontFamily: 'var(--font-playfair)' }}
        >
          {active.subtitle}
        </p>

        {/* Feature dish image */}
        {active.image && (
          <div className="relative w-full h-56 sm:h-72 mb-10 overflow-hidden">
            <Image
              src={active.image}
              alt={active.subtitle}
              fill
              className="object-cover object-center"
              style={{ transition: 'opacity 0.4s' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 50%, rgba(255,248,240,0.95) 100%)',
              }}
            />
          </div>
        )}

        {/* Menu items grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {active.items.map((item) => (
            <div
              key={item.name}
              className="menu-card group p-7 border transition-all duration-300 hover:shadow-xl"
              style={{
                borderColor: 'rgba(139, 0, 0, 0.15)',
                background: '#FFFAF4',
              }}
            >
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3
                  className="text-lg sm:text-xl font-bold leading-tight"
                  style={{ color: '#1C0A00', fontFamily: 'var(--font-playfair)' }}
                >
                  {item.name}
                </h3>
                <span
                  className="text-base font-bold shrink-0 mt-0.5"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-lato)' }}
                >
                  {item.price}
                </span>
              </div>
              <div className="h-px mb-3" style={{ background: 'rgba(212, 175, 55, 0.3)' }} />
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(28, 10, 0, 0.6)', fontFamily: 'var(--font-lato)' }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          className="text-center text-xs mt-10 opacity-50"
          style={{ color: '#1C0A00', fontFamily: 'var(--font-lato)' }}
        >
          All dishes are prepared with seasonal, locally sourced ingredients. Please inform your server of any allergies.
        </p>
      </div>
    </section>
  );
}
