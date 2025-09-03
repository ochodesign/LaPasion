import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';

// Fecha de inicio del Mundial 2026 (ejemplo: 8 junio 2026)
const mundialDate = new Date('2026-06-08T00:00:00');

function getTimeLeft() {
  const now = new Date();
  const diff = mundialDate - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function CircularCountdown({ days, hours, minutes, seconds }) {
  // For visual: show days, hours, minutes, seconds as 4 circles
  const circle = (value, label, max) => {
    const percent = max ? Math.min(100, (value / max) * 100) : 100;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg width="90" height="90">
          <circle cx="45" cy="45" r="40" stroke="#b3e5fc" strokeWidth="8" fill="none" opacity="0.18" />
          <circle cx="45" cy="45" r="40" stroke="#1565c0" strokeWidth="8" fill="none" strokeDasharray={2 * Math.PI * 40} strokeDashoffset={2 * Math.PI * 40 * (1 - percent / 100)} style={{ transition: 'stroke-dashoffset 0.5s' }} />
          <text x="45" y="54" textAnchor="middle" fontSize="2rem" fill="#fff" fontWeight="bold">{value}</text>
        </svg>
        <span style={{ color: '#b3e5fc', fontWeight: 600, fontSize: 16, marginTop: 4 }}>{label}</span>
      </div>
    );
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: window.innerWidth < 600 ? 2 : 0
      }}
    >
      {circle(days, 'Días', 365)}
      {circle(hours, 'Horas', 24)}
      {circle(minutes, 'Min', 60)}
      {circle(seconds, 'Seg', 60)}
    </div>
  );
}

const logoFifa = require('../img/mundial/logofifa.webp');
const messiBanner = require('../img/mundial/messicopa.webp');

const Mundial2026 = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <Box id="mundial2026" ref={sectionRef} sx={{ width: '100%', py: 8, background: 'linear-gradient(180deg, var(--bg-light) 80%, var(--bg-blue-light) 100%)', textAlign: 'center', boxShadow: '0 0 48px #ffd70044' }}>
      <Typography
        variant="h3"
        sx={{
          color: '#1565c0',
          fontWeight: 800,
          mb: 2,
          fontSize: { xs: 28, md: 38 },
          textShadow: '0 2px 16px #00ffff44',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s, transform 1s',
        }}
      >
        Mundial 2026<br />¡La pasión nos une!
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100vw',
        minWidth: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: '#18181b',
        borderRadius: 0,
        boxShadow: '0 4px 32px #000a',
        overflow: 'hidden',
        mb: 6
      }}>
        {/* Logo FIFA */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#010101', minHeight: { xs: 120, md: 220 } }}>
          <img src={logoFifa} alt="Logo FIFA Mundial 2026" style={{ width: '90%', maxWidth: 180, objectFit: 'contain' }} />
        </Box>
        {/* Contador */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#18181b',
          minHeight: { xs: 280, md: 220 },
          position: 'relative',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s 0.2s, transform 1s 0.2s',
        }}>
          {/* Mobile: horizontal */}
          <Box sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            width: '100%',
            py: 2,
          }}>
            {[{ value: timeLeft.days, label: 'Días', max: 365 }, { value: timeLeft.hours, label: 'Horas', max: 24 }, { value: timeLeft.minutes, label: 'Min', max: 60 }, { value: timeLeft.seconds, label: 'Seg', max: 60 }].map((item, idx) => (
              <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mx: 1 }}>
                <svg width="80" height="80">
                  <circle cx="40" cy="40" r="32" stroke="#b3e5fc" strokeWidth="8" fill="none" opacity="0.18" />
                  <circle cx="40" cy="40" r="32" stroke="#1565c0" strokeWidth="8" fill="none" strokeDasharray={2 * Math.PI * 32} strokeDashoffset={2 * Math.PI * 32 * (1 - Math.min(100, (item.value / item.max) * 100) / 100)} style={{ transition: 'stroke-dashoffset 0.5s' }} />
                  <text x="40" y="50" textAnchor="middle" fontSize="2rem" fill="#fff" fontWeight="bold">{item.value}</text>
                </svg>
                <Typography sx={{ color: '#1565c0', fontWeight: 700, fontSize: 13, mt: 1 }}>{item.label}</Typography>
              </Box>
            ))}
          </Box>
          {/* Desktop: circular */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <CircularCountdown {...timeLeft} />
          </Box>
        </Box>
        {/* Imagen Messi sticky */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#18181b',
          minHeight: { xs: 120, md: 220 },
          position: 'sticky',
          top: 0,
          zIndex: 10,
          width: '100%'
        }}>
          <img src={messiBanner} alt="Messi Campeón" style={{ width: '100vw', maxWidth: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Mundial2026;
