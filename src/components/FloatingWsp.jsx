

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWsp = () => {
  const [showMsg, setShowMsg] = React.useState(false);
  const timerRef = React.useRef();
  const lastStateRef = React.useRef(false);
  
  // Detectar si estamos en la página del catálogo
  const isInCatalog = window.location.pathname === '/catalogo';
  
  React.useEffect(() => {
    // Si estamos en el catálogo, no mostramos el mensaje flotante
    if (isInCatalog) {
      setShowMsg(false);
      return;
    }
    
    const onScroll = () => {
      const hero = document.getElementById('hero-section');
      let shouldShow = false;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom < 0) shouldShow = true;
      } else {
        if (window.scrollY > 300) shouldShow = true;
      }
      if (shouldShow && !lastStateRef.current) {
        setShowMsg(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setShowMsg(false);
        }, 5000);
      }
      if (!shouldShow) {
        setShowMsg(false);
        if (timerRef.current) clearTimeout(timerRef.current);
      }
      lastStateRef.current = shouldShow;
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isInCatalog]);
  const handleClick = () => {
    window.open('https://wa.me/5491134567890?text=¡Hola!%20Estoy%20visitando%20La%20Pasión%20Estampados%20y%20quiero%20hacer%20una%20consulta%20personalizada.', '_blank');
  };
  return (
  <div style={{position:'fixed',bottom:100,right:32,zIndex:9999,display:'flex',flexDirection:'column',alignItems:'flex-end',gap:12}} id="floating-buttons-col">
      {showMsg && !isInCatalog && (
        <div style={{position:'relative',background:'#23232a',color:'#fff',padding:'18px 24px',borderRadius:16,boxShadow:'0 4px 24px #25d36655',marginBottom:8,fontWeight:'bold',fontSize:18,maxWidth:320,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <span style={{textAlign:'left',width:'100%'}}>¿Necesitás ayuda?<br/>Escribinos por WhatsApp y te asesoramos al instante.</span>
          <button
            onClick={()=>setShowMsg(false)}
            aria-label="Cerrar mensaje flotante"
            style={{
              position:'absolute',
              top:10,
              right:14,
              background:'transparent',
              border:'none',
              color:'#FFD700',
              fontSize:28,
              cursor:'pointer',
              lineHeight:1,
              fontWeight:'bold',
              padding:0
            }}
          >
            &times;
          </button>
        </div>
      )}
      <button
        onClick={handleClick}
        style={{
          background: 'linear-gradient(90deg, #25d366 0%, #128c7e 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 56,
          height: 56,
          boxShadow: '0 4px 24px #25d36655',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          position: 'relative'
        }}
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={32} color="#fff" />
        {!showMsg && (
          <span style={{
            position: 'absolute',
            top: -6,
            right: -6,
            width: 20,
            height: 20,
            background: '#ff1744',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
            boxShadow: '0 2px 8px #ff174488',
            border: '2px solid #fff'
          }}>1</span>
        )}
      </button>
    </div>
  );
};

export default FloatingWsp;
