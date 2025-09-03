import React, { useState } from "react";
import { FaExternalLinkAlt, FaImages, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Adaptación visual y estructural al diseño general del sitio
import Header from './Header';

export default function InvitacionesDigitales() {
  // Importa imágenes desktop
  const desktopImages = require.context('../img/invitacion-digital-section', false, /image-\d+\.webp$|admin-\d+\.webp$/);
  // Importa imágenes mobile
  const mobileImages = require.context('../img/invitacion-digital-section/inv-dig-mb', false, /image-\d+-mb\.webp$/);
  // Detecta si es mobile
  const isMobile = window.innerWidth < 768;
  const images = [
    'image-1.webp',
    'image-2.webp',
    'image-3.webp',
    'image-4.webp',
    'image-5.webp',
    'image-6.webp',
    'image-7.webp',
    'image-8.webp',
    'admin-1.webp',
    'admin-2.webp'
  ];
  const [modalOpen, setModalOpen] = useState(false);
  // Lista de integraciones de la invitación digital
  const integraciones = [
    "Contador regresivo al evento",
    "Sección 'Sobre nosotros' + galería de imágenes",
    "Información del evento + Google Maps",
    "Formulario para confirmar asistencia",
    "Sección de regalos + datos bancarios",
    "Panel de administración protegido",
    "Lista y sumador de invitados",
    "Mejor organización, menos estrés",
    "Todo en un solo lugar",
    "Diseño personalizado y responsivo"
  ];
  const [activeIdx, setActiveIdx] = useState(0);

  const openModal = (idx = 0) => {
    setActiveIdx(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const nextImg = () => setActiveIdx((activeIdx + 1) % images.length);
  const prevImg = () => setActiveIdx((activeIdx - 1 + images.length) % images.length);

  return (
    <>
      <Header />
    <section id="invitaciones-digitales" className="w-full py-16 px-4 bg-bg-gray flex items-center justify-center overflow-x-hidden" data-aos="fade-up">
  <div className="max-w-7xl w-full mx-auto grid grid-cols-1 gap-10 overflow-x-hidden">
        <div className="flex flex-col md:flex-row gap-10 items-start w-full overflow-x-hidden">
          {/* Galería y descripción */}
          <div className="flex-1 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-accent mb-4 drop-shadow-lg tracking-tight">
              Invitaciones Digitales
            </h2>
            <p className="text-lg text-white mb-8 max-w-xl mx-auto">
              Invitaciones digitales personalizadas, elegantes y listas para compartir en WhatsApp, redes sociales o email. Ideal para bodas, cumpleaños, eventos empresariales y más. ¡Sorprendé a tus invitados con una experiencia única y moderna!
            </p>
            <div className="flex flex-col items-center justify-center">
              <div className="bg-bg-light rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer max-w-md w-full mb-4 border-2 border-accent">
                <FaImages className="w-12 h-12 text-accent mb-4 animate-pulse" />
                <span className="text-accent font-semibold text-lg mb-2">Ver galería de invitaciones digitales</span>
                <span className="text-white text-sm">Haz clic para ver ejemplos en grande</span>
                {/* Imagen de ejemplo dentro del contenedor */}
                <img
                  src={require('../img/invitacion-digital-section/image-2.webp')}
                  alt="Ejemplo invitación digital"
                  className="rounded-xl shadow-lg object-cover w-full max-w-xs border-2 border-accent mt-4"
                  onClick={() => openModal(0)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
            <div className="mt-8">
              <a href="https://lightblue-bat-128924.hostingersite.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-accent bg-white shadow-lg hover:bg-accent hover:text-white transition-colors border border-accent">
                <span>Ver invitación digital</span>
                <FaExternalLinkAlt className="w-5 h-5" />
              </a>
            </div>
          </div>
          {/* Integraciones mejoradas */}
          <div className="flex-1 mt-10 md:mt-0 bg-bg-light rounded-3xl shadow-xl p-8 border-4 border-accent flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-accent mb-6 flex items-center justify-center gap-3 drop-shadow">
              <span>Beneficios de la invitación digital</span>
              <span className="text-accent animate-bounce">❤</span>
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integraciones.map((item, idx) => (
                <li key={idx} className="flex items-center text-white text-base md:text-lg font-semibold bg-bg-gray rounded-xl px-4 py-2 shadow-sm hover:bg-accent hover:text-white transition-colors duration-300">
                  <span className="text-accent text-2xl mr-3">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal galería */}
      {modalOpen && (
  <div className="fixed inset-0 bg-bg-gray bg-opacity-95 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="relative max-w-[95vw] max-h-[90vh] flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-white text-3xl bg-accent bg-opacity-80 rounded-full px-2 hover:bg-white hover:text-accent z-10" onClick={closeModal}><FaTimes /></button>
            <img 
              src={isMobile
                ? mobileImages(`./image-${activeIdx+1}-mb.webp`)
                : desktopImages(`./${images[activeIdx]}`)
              }
              alt={`Invitación digital grande ${activeIdx+1}`} 
              className="rounded-2xl shadow-2xl object-contain border-4 border-accent animate-fadeIn" 
              style={isMobile 
                ? {maxWidth: '100vw', maxHeight: '95vh'} 
                : {maxWidth: '1800px', maxHeight: '95vh'}}
            />
            <div className="flex justify-between items-center w-full mt-4">
              <button className="text-white text-2xl bg-accent bg-opacity-80 rounded-full px-3 py-1 hover:bg-white hover:text-accent" onClick={prevImg}><FaChevronLeft /></button>
              <span className="text-accent text-sm mx-4 font-bold drop-shadow">{activeIdx+1} / {images.length}</span>
              <button className="text-white text-2xl bg-accent bg-opacity-80 rounded-full px-3 py-1 hover:bg-white hover:text-accent" onClick={nextImg}><FaChevronRight /></button>
            </div>
          </div>
        </div>
      )}
    </section>
  </> 
  );
}
