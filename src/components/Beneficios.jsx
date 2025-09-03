
import React, { useRef, useEffect, useState } from "react";
import beneficiosBg from '../img/beneficios/beneficios-bg.webp';
import { FaMapMarkerAlt, FaTruck, FaMedal, FaPaintBrush } from "react-icons/fa";
import Header from "./Header";

const beneficios = [
  {
    icon: <FaMapMarkerAlt className="w-10 h-10 text-cyan-400" />,
    title: "Ubicación en Santos Lugares",
    desc: "Estamos en Santos Lugares, pero trabajamos para todo el país."
  },
  {
    icon: <FaTruck className="w-10 h-10 text-purple-400" />,
    title: "Envíos a todo el país",
    desc: "Recibí tus productos donde estés, con envíos rápidos y seguros."
  },
  {
    icon: <FaMedal className="w-10 h-10 text-yellow-400" />,
    title: "Calidad Premium",
    desc: "Materiales y estampados de alta calidad que garantizan durabilidad y confort."
  },
  {
    icon: <FaPaintBrush className="w-10 h-10 text-pink-400" />,
    title: "Personalización total",
    desc: "Creamos tu idea en la prenda que elijas, adaptándonos a tu estilo."
  }
];

export default function Beneficios() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <section
        id="beneficios"
        ref={sectionRef}
        className="w-full flex flex-col items-center justify-center py-12 px-2 relative"
        style={{
          position: 'relative',
          background: `url(${beneficiosBg}) center/cover no-repeat`,
          backgroundAttachment: 'fixed',
          minHeight: '600px',
          zIndex: 1,
          top: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(16,26,43,0.85) 0%, rgba(16,26,43,0.7) 60%, rgba(16,26,43,0.2) 100%)',
            zIndex: 0,
            pointerEvents: 'none',
            boxShadow: 'none',
          }}
        />
        <h2
          className={`text-3xl md:text-4xl font-bold text-center text-white mb-10 drop-shadow-lg transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ position: 'relative', zIndex: 1 }}
        >
          Beneficios de elegir La Pasión
        </h2>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {beneficios.map((b, idx) => (
            <div key={idx} className="relative bg-[#181f2a] rounded-xl p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 border-0 overflow-hidden">
              <span className={`flex items-center justify-center w-16 h-16 rounded-full mb-4 z-10 ${idx===0?'bg-cyan-500/20':idx===1?'bg-purple-500/20':idx===2?'bg-yellow-400/20':'bg-pink-400/20'}`}>
                {b.icon}
              </span>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-md z-10">{b.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed z-10">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
