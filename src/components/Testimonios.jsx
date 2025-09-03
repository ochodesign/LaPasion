import React from 'react';
import { useState, useEffect, useRef } from 'react';

const testimonios = [
  {
    nombre: 'María G.',
    texto: '¡Excelente calidad y atención! Mi remera personalizada quedó increíble. Recomiendo totalmente La Pasión Estampados.',
    emprendimiento: 'Fiambrería El Buen Sabor'
  },
  {
    nombre: 'Lucas P.',
    texto: 'Muy buena experiencia, el diseño fue tal cual lo pedí y el envío rápido. Volveré a comprar.',
    emprendimiento: 'Tienda de Ropa Urbana'
  },
  {
    nombre: 'Sofía R.',
    texto: 'Me ayudaron a elegir el mejor estampado para mi buzo. ¡Gracias por la paciencia y el profesionalismo!',
    emprendimiento: 'Panadería La Familia'
  },
  {
    nombre: 'Martín D.',
    texto: 'La atención personalizada y la calidad de los productos es lo que más destaco. ¡Sigan así!',
    emprendimiento: 'Kiosco 24 Horas'
  },
  {
    nombre: 'Valentina S.',
    texto: '¡Me encantó el resultado! Súper recomendable, atención rápida y personalizada.',
    emprendimiento: 'Mercado Don Pepe'
  }
];

const STAR = <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF9800" style={{display:'inline',verticalAlign:'middle'}}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;

const Testimonios = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const total = testimonios.length;
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const next = () => setIndex(i => (i + 1) % total);
    timeoutRef.current = setTimeout(next, 3500);
    return () => clearTimeout(timeoutRef.current);
  }, [index, total]);

  useEffect(() => {
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

  // Slider infinito visual
  return (
    <section ref={sectionRef} className="w-full py-16 px-4 bg-gradient-to-br from-[#23232a] via-[#18181b] to-[#0d0d0d] text-white animate-fadein">
      <div className="max-w-2xl mx-auto text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s, transform 1s',
        }}
      >
        <h2 className="text-3xl font-bold mb-8 text-yellow-400 drop-shadow">Testimonios</h2>
        <div className="relative overflow-hidden h-64 flex items-center justify-center">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className={`absolute left-0 right-0 mx-auto transition-all duration-700 ease-in-out ${i === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-90 z-0'}`}
              style={{top:0, bottom:0, margin:'auto', width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}
            >
              <span className="text-yellow-300 font-bold text-lg mb-2">{t.nombre}</span>
              <div className="mb-2">
                {Array(5).fill(0).map((_, s) => <span key={s}>{STAR}</span>)}
              </div>
              <p className="text-gray-200 text-lg italic max-w-xl px-4 mb-4">"{t.texto}"</p>
              <span className="text-yellow-200 font-semibold text-md block mt-2">{t.emprendimiento}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {testimonios.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${i === index ? 'bg-yellow-400' : 'bg-gray-600'} transition-all`}
              onClick={() => setIndex(i)}
              aria-label={`Ver testimonio ${i+1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
