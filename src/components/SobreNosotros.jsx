import React, { useState, useEffect } from 'react';
import { SiAdobephotoshop, SiAdobeillustrator } from 'react-icons/si';
import Beneficios from './Beneficios';

const SobreNosotros = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = React.useRef();
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);
  return (
    <>
  <section ref={sectionRef} className="w-full py-16 px-4 bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#0d0d0d] text-white animate-fadein">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400 drop-shadow"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)',
            }}
          >Sobre Nosotros</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8 justify-items-center">
            {[1,2,3,4].map((i, idx) => (
              <img
                key={i}
                src={`/img/sobremi/sobremi${i}.webp`}
                alt={`Sobre mí ${i}`}
                className="w-80 h-80 object-cover shadow-lg border-2 border-yellow-400 bg-[#23232a]"
                style={{
                  opacity: animate ? 1 : 0,
                  transform: animate ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.8s cubic-bezier(.4,0,.2,1) ${0.1 + idx * 0.1}s, transform 0.8s cubic-bezier(.4,0,.2,1) ${0.1 + idx * 0.1}s`,
                }}
              />
            ))}
          </div>
          <p className="text-lg mb-6 text-gray-200"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.9s cubic-bezier(.4,0,.2,1) 0.2s, transform 0.9s cubic-bezier(.4,0,.2,1) 0.2s',
            }}
          >
            Somos La Pasión Estampados, un equipo apasionado por el diseño y la personalización de prendas. El equipo está formado por Sacha y el DJ, dos creativos que se especializan en crear productos únicos, pensados para cada cliente, utilizando materiales de alta calidad y técnicas modernas de estampado.
          </p>
          <p className="text-md text-gray-400"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 1s cubic-bezier(.4,0,.2,1) 0.3s, transform 1s cubic-bezier(.4,0,.2,1) 0.3s',
            }}
          >
            Nuestra misión es ayudarte a expresar tu estilo y personalidad a través de nuestras creaciones. Valoramos la atención personalizada, la innovación y el compromiso con cada proyecto. ¡Gracias por confiar en nosotros para vestir tus ideas!
          </p>
          <div className="mt-8 text-center"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 1.1s cubic-bezier(.4,0,.2,1) 0.4s, transform 1.1s cubic-bezier(.4,0,.2,1) 0.4s',
            }}
          >
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Herramientas y programas que usamos</h3>
            <div className="grid grid-cols-2 gap-2 mt-4 mb-2 place-items-center max-w-xs mx-auto justify-center items-center sm:flex sm:flex-row sm:gap-6 sm:max-w-2xl">
              <span className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <SiAdobephotoshop size={80} color="#FFD700" title="Photoshop" className="w-full h-full" />
              </span>
              <span className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <SiAdobeillustrator size={80} color="#FF9A00" title="Illustrator" className="w-full h-full" />
              </span>
              <img src={require('../img/sobremi/sobremi5.webp')} alt="Cortadora de vinilo" className="w-20 h-20 sm:w-24 sm:h-24 rounded shadow-lg object-cover" />
              <img src={require('../img/sobremi/sobremi6.webp')} alt="Estampadora" className="w-20 h-20 sm:w-24 sm:h-24 rounded shadow-lg object-cover" />
            </div>
            <ul className="text-gray-200 text-md mb-2">
              {/* Lista eliminada, solo íconos e imágenes */}
            </ul>
            <p className="text-gray-400 text-sm">Combinamos software profesional y maquinaria especializada para lograr resultados únicos y personalizados en cada prenda.</p>
          </div>
        </div>
      </section>
      <Beneficios />
    </>
);

}
export default SobreNosotros;
