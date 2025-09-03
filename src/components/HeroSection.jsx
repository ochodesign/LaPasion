

// import React from 'react';
import hero1Dk from '../img/hero/hero-bg-1-dk.webp';
import hero1Mb from '../img/hero/hero-bg-1-mb.webp';
import hero2Dk from '../img/hero/hero-bg-2-dk.webp';
import hero2Mb from '../img/hero/hero-bg-2-mb.webp';
import '../theme-colors.css';


import React, { useState, useRef } from 'react';

const slides = [
  {
    dk: hero1Dk,
    mb: hero1Mb,
    h2: 'Estampados Textiles Personalizados en Argentina',
    p: 'Calidad y Diseño Único para tu marca, evento o emprendimiento.',
    ctas: [
      { href: '#catalogo', text: 'Ver catálogo', color: 'blue' },
      { href: '#contacto', text: 'Quiero un diseño', color: 'gold' }
    ]
  },
  {
    dk: hero2Dk,
    mb: hero2Mb,
  h2: 'Siempre estamos actualizados',
  p: 'Tenemos los diseños de todos los equipos.',
    ctas: [
      { href: '#contacto', text: 'Quiero un diseño', color: 'gold' }
    ]
  }
];

const HeroSection = () => {
  const [animate, setAnimate] = useState(false);
  React.useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);
  const [current, setCurrent] = useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Cambio automático cada 6 segundos
  // Swipe en mobile
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    if (deltaX < -50) setCurrent((prev) => (prev + 1) % slides.length);
    touchStartX.current = null;
  };

  const isMobile = window.innerWidth <= 768;
  const slide = slides[current];

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--color-blue-light) 70%, var(--color-gold) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: isMobile ? '0 0 0 0' : '0',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={isMobile ? slide.mb : slide.dk}
        alt="Hero background"
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.32, position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1
          style={{
            fontSize: isMobile ? '2rem' : '5rem',
            lineHeight: isMobile ? '1.12' : '1.35',
            padding: isMobile ? '0 10px' : '0',
            fontWeight: '900',
            color: '#fff',
            marginBottom: isMobile ? '1.2rem' : '1rem',
            textAlign: 'center',
            fontFamily: 'Montserrat, Arial, sans-serif',
            letterSpacing: '0.04em',
            textShadow: '0 2px 12px rgba(20,61,122,0.18)',
            textTransform: 'uppercase',
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {(() => {
            const h2 = slide.h2;
            if (h2.includes('Estampados Textiles Personalizados')) {
              const [, rest] = h2.split('Estampados Textiles Personalizados');
              if (rest.includes('en Argentina')) {
                const [beforeArg, afterArg] = rest.split('en Argentina');
                return <><span>Estampados Textiles Personalizados</span><br />{beforeArg}<span style={{ color: '#6ec6f1' }}>en Argentina</span>{afterArg}</>;
              }
              return <><span>Estampados Textiles Personalizados</span><br />{rest}</>;
            } else if (h2.includes('en Argentina')) {
              const [before, after] = h2.split('en Argentina');
              return <>{before}<span style={{ color: '#6ec6f1' }}>en Argentina</span>{after}</>;
            }
            return h2;
          })()}
        </h1>
        <p style={{
          fontSize: isMobile ? '0.85rem' : '1.5rem',
          color: '#eaeaea',
          marginBottom: '2rem',
          textAlign: 'center',
          padding: isMobile ? '0 10px' : '0',
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.9s cubic-bezier(.4,0,.2,1) 0.2s, transform 0.9s cubic-bezier(.4,0,.2,1) 0.2s',
        }}>{slide.p}</p>
        <div style={{
          display: 'flex',
          gap: isMobile ? '0.7rem' : '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1.1s cubic-bezier(.4,0,.2,1) 0.4s, transform 1.1s cubic-bezier(.4,0,.2,1) 0.4s',
        }}>
          {slide.ctas.map((cta, idx) => {
            let bg, color, hoverBg;
            if (cta.text === 'Ver catálogo') {
              bg = '#b3e5fc';
              color = '#1565c0';
              hoverBg = '#81d4fa';
            } else {
              bg = '#1565c0';
              color = '#fff';
              hoverBg = '#0d47a1';
            }
            return (
              <a
                key={idx}
                href={cta.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  background: bg,
                  color: color,
                  width: isMobile ? '90vw' : '220px',
                  height: isMobile ? '64px' : '70px',
                  fontSize: isMobile ? '1.35rem' : '1.1rem',
                  fontWeight: '700',
                  border: 'none',
                  borderRadius: '14px',
                  margin: isMobile ? '8px 0' : '10px 0',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(21,101,192,0.12)',
                  transition: 'background 0.2s',
                  textDecoration: 'none',
                  maxWidth: isMobile ? '420px' : undefined,
                }}
                onMouseOver={e => e.currentTarget.style.background = hoverBg}
                onMouseOut={e => e.currentTarget.style.background = bg}
              >
                {cta.text}
              </a>
            );
          })}
        </div>
      </div>
      {/* Circles navigation */}
      <div style={{ position: 'absolute', bottom: '2rem', left: 0, right: 0, zIndex: 2, display: 'flex', justifyContent: 'center', gap: '0.7rem', width: '100%' }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              border: 'none',
              background: idx === current ? '#1565c0' : '#b3e5fc',
              opacity: idx === current ? 1 : 0.5,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

