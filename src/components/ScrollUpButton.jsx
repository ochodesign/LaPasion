import React, { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollUpButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    return (
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32, // Adjusted to align with WhatsApp button
          zIndex: 9999,
          background: '#FFD700',
          color: '#143d7a',
          border: 'none',
          borderRadius: '50%',
          width: 56,
          height: 56,
          boxShadow: '0 4px 24px #00ffff55',
          cursor: 'pointer',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transition: 'opacity 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Ir arriba"
      >
        <KeyboardArrowUpIcon sx={{ fontSize: 32, color: '#2563eb' }} />
      </button>
  );
};

export default ScrollUpButton;
