import React, { useState, useRef } from 'react';

const trabajos = [
  {
    nombre: 'Equipo Santillán',
    rubro: 'Deportes',
    img: require('../img/productos/personalizados/buzochinchin.webp'),
    desc: 'Prendas personalizadas para el equipo Santillán.'
  },
  {
    nombre: 'Construcción S.A.',
    rubro: 'Construcción',
    img: require('../img/productos/personalizados/buzoroling.webp'),
    desc: 'Indumentaria para empresa de construcción.'
  },
  {
    nombre: 'Fiambrería El Buen Sabor',
    rubro: 'Fiambrería',
    img: require('../img/productos/personalizados/buzosrandom.webp'),
    desc: 'Prendas para personal de fiambrería.'
  },
  {
    nombre: 'Panadería La Masa',
    rubro: 'Panadería',
    img: require('../img/productos/personalizados/gameoverblack.webp'),
    desc: 'Uniformes para panaderos y atención al público.'
  },
  {
    nombre: 'Estudio Creativo',
    rubro: 'Diseño gráfico',
    img: require('../img/productos/personalizados/gameoverorange.webp'),
    desc: 'Remeras para equipo de diseño y marketing.'
  },
  {
    nombre: 'Barbería El Corte',
    rubro: 'Barbería',
    img: require('../img/productos/mundial/buzomundial1.webp'),
    desc: 'Prendas para barberos y clientes.'
  },
  {
    nombre: 'Veterinaria Patitas',
    rubro: 'Veterinaria',
    img: require('../img/productos/mundial/buzomessi.webp'),
    desc: 'Indumentaria para veterinarios y asistentes.'
  },
  {
    nombre: 'Cafetería Aroma',
    rubro: 'Cafetería',
    img: require('../img/productos/mundial/buzoarg1.webp'),
    desc: 'Uniformes para baristas y atención al cliente.'
  },
  {
    nombre: 'Gimnasio PowerFit',
    rubro: 'Gimnasio',
    img: require('../img/productos/mundial/lostresmundiales2.webp'),
    desc: 'Prendas deportivas para entrenadores y socios.'
  },
  {
    nombre: 'Carnicería El Corte',
    rubro: 'Carnicería',
    img: require('../img/productos/mundial/lostresmundiales3.webp'),
    desc: 'Indumentaria para carniceros y atención al público.'
  },
];


const SLIDES_TO_SHOW = 3;

const PortfolioGaleria = () => {
  const prevCard = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + total) % total);
      setIsAnimating(false);
    }, 300);
  };

  const nextCard = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % total);
      setIsAnimating(false);
    }, 300);
  };
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const sliderRef = useRef(null);
  const touchStartX = useRef(null);

  const CARDS_TO_SHOW = window.innerWidth < 768 ? 1 : 3;
  const total = trabajos.length;

  // Swipe para mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) {
      prevCard();
    } else if (deltaX < -50) {
      nextCard();
    }
    touchStartX.current = null;
  };

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  // ...existing code...

  // Cards a mostrar
  const visibleCards = [];
  for (let i = 0; i < CARDS_TO_SHOW; i++) {
    visibleCards.push(trabajos[(current + i) % total]);
  }

  React.useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 px-0 rounded-2xl" style={{ background: 'rgba(20,20,40,0.85)', backdropFilter: 'blur(8px)' }}>
      <h2
        className="text-center text-3xl font-bold text-yellow-400 mb-8 transition-all duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s, transform 1s',
        }}
      >
        Trabajos realizados para clientes
      </h2>
      <div
        className="portfolio-galeria-slider flex items-center gap-8 overflow-hidden relative transition-all duration-1000"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          minHeight: 320,
          width: '100vw',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s 0.2s, transform 1s 0.2s',
        }}
      >
        <button onClick={prevCard} className="absolute left-2 top-1/2 -translate-y-1/2 bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center z-20 shadow-lg hover:bg-yellow-400 transition-all duration-200">
          &#8592;
        </button>
        <div className="flex gap-8 w-full justify-center">
          {visibleCards.map((trabajo, idx) => (
            <div
              key={idx}
              className={`portfolio-galeria-slide rounded-xl border-2 border-yellow-400 shadow-lg flex flex-col items-center min-w-[260px] max-w-xs p-6 transition-all duration-300 hover:shadow-[0_0_16px_4px_rgba(255,215,0,0.4)] hover:border-yellow-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
              style={{ cursor: 'pointer', overflow: 'visible', background: 'transparent' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <img src={trabajo.img} alt={trabajo.nombre} className="w-full h-56 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold text-yellow-300 mb-2 text-center transition-all duration-300">{trabajo.nombre}</h3>
              <span className="text-sm text-yellow-200 mb-2 text-center transition-all duration-300">{trabajo.rubro}</span>
              <p className="text-gray-300 text-center transition-all duration-300">{trabajo.desc}</p>
            </div>
          ))}
        </div>
        <button onClick={nextCard} className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center z-20 shadow-lg hover:bg-yellow-400 transition-all duration-200">
          &#8594;
        </button>
      </div>
      {/* Círculos de navegación */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {trabajos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${current === idx ? 'bg-yellow-400 border-yellow-400 opacity-100 scale-100' : 'bg-transparent border-yellow-300 opacity-60 scale-95'}`}
            style={{ outline: 'none' }}
          />
        ))}
      </div>
      {/* CTA WhatsApp */}
      <div className="flex justify-center mt-10">
        <a
          href="https://wa.me/5491127117960?text=¡Hola!%20Quiero%20potenciar%20mi%20emprendimiento%20con%20productos%20personalizados."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 text-lg"
          style={{ textDecoration: 'none' }}
        >
          Quiero un Diseño
        </a>
      </div>
    </section>
  );
  
}
export default PortfolioGaleria;
