import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';

const CatalogoArgentina = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pendingCompra, setPendingCompra] = useState(null);
  const [talles, setTalles] = useState({});

  useEffect(() => {
    const storedNombre = localStorage.getItem('nombreCliente');
    if (storedNombre) setNombre(storedNombre);
  }, []);

  useEffect(() => {
    fetch('https://aliceblue-echidna-403440.hostingersite.com/backend/productos.php')
      .then(res => res.json())
      .then(data => {
        // Filtrar productos con destino 'seleccion_argentina'
        const filtrados = Array.isArray(data)
          ? data.filter(p =>
              p.destino && (Array.isArray(p.destino)
                ? p.destino.includes('seleccion_argentina')
                : p.destino.split(',').map(d => d.trim()).includes('seleccion_argentina'))
            )
          : [];
        setProductos(filtrados);
      });
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

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

  const handleTalleChange = (idx, talle) => {
    setTalles(prev => ({ ...prev, [idx]: talle }));
  };

  const handleComprar = (prod, idx) => {
    if (!nombre) {
      setPendingCompra({ prod, idx });
      setShowModal(true);
      return;
    }
    comprar(prod, idx, nombre);
  };

  const comprar = (prod, idx, nombreFinal) => {
    const talle = talles[idx] || '';
    const precioFinal = prod.descuento && Number(prod.descuento) > 0 
      ? (Number(prod.price) - (Number(prod.price) * Number(prod.descuento) / 100)).toFixed(2)
      : prod.price;
    const mensaje = `¡Hola! Mi nombre es ${nombreFinal || 'cliente'} y estoy interesado en el producto "${prod.title}" ($${Number(precioFinal).toLocaleString('es-AR')}) de la Selección Argentina.\nCategoría: ${prod.categoria || '-'}\nGénero: ${prod.genero || '-'}\nTalle seleccionado: ${talle}.\n¿Está disponible? Gracias.`;
  window.open(`https://wa.me/5491127117960?text=${encodeURIComponent(mensaje)}`);
  };

  return (
    <Box ref={sectionRef} sx={{ width: '100%', py: 6, bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: 28, md: 36 },
          color: '#1565c0',
          mx: 'auto',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s, transform 1s',
        }}
      >
        Catálogo Selección Argentina
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
          mb: 5,
          color: '#23232a',
          fontSize: { xs: 16, md: 20 },
          mx: 'auto',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s 0.2s, transform 1s 0.2s',
        }}
      >
        Descubre los productos oficiales y exclusivos para hinchas argentinos. ¡Llevá la pasión celeste y blanca a todos lados!
      </Typography>
      
      {/* Modal para pedir nombre */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={e => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
              setPendingCompra(null);
            }
          }}
        >
          <div className="bg-[#101820] rounded-2xl p-8 shadow-2xl flex flex-col items-center max-w-xs w-full border-2 border-cyan-300 relative">
            <button
              className="absolute top-3 right-3 text-cyan-300 hover:text-white text-2xl font-bold focus:outline-none"
              aria-label="Cerrar"
              onClick={() => {
                setShowModal(false);
                setPendingCompra(null);
              }}
            >
              &times;
            </button>
            <h2 className="text-white font-bold text-lg mb-4 drop-shadow">¿Cómo te llamás?</h2>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Escribe tu nombre..."
              className="w-full px-4 py-2 rounded-lg border-2 border-cyan-300 bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4 font-semibold placeholder:text-cyan-300"
              autoFocus
            />
            <button
              className="bg-cyan-300 text-blue-900 font-bold rounded-lg px-4 py-2 shadow-lg hover:bg-cyan-400 transition-colors w-full border-2 border-blue-900"
              disabled={!nombre.trim()}
              onClick={() => {
                if (nombre.trim()) {
                  localStorage.setItem('nombreCliente', nombre);
                  setShowModal(false);
                  if (pendingCompra) {
                    comprar(pendingCompra.prod, pendingCompra.idx, nombre);
                    setPendingCompra(null);
                  }
                }
              }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Grid de productos usando ProductCard unificado */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl justify-items-center mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'opacity 1s 0.4s, transform 1s 0.4s' }}
      >
        {productos.map((prod, idx) => (
          <ProductCard
            key={idx}
            prod={{
              ...prod,
              talles: typeof prod.talles === 'string' ? prod.talles.split(',') : prod.talles
            }}
            idx={idx}
            talleSeleccionado={talles[idx]}
            onTalleChange={handleTalleChange}
            onComprar={handleComprar}
          />
        ))}
      </div>

      {/* Botón Ver más */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 8, mb: 2, position: 'relative' }}>
        <a href="/catalogo" style={{
          background: '#1565c0',
          color: '#fff',
          padding: '14px 40px',
          borderRadius: '10px',
          fontWeight: 'bold',
          fontSize: 20,
          textDecoration: 'none',
          boxShadow: '0 2px 12px #1565c044',
          transition: 'background .2s',
          display: 'inline-block',
          margin: '0 auto'
        }}>
          Ver más
        </a>
      </Box>
    </Box>
  );
};

export default CatalogoArgentina;
