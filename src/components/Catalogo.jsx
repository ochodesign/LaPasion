import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import CatalogoWsp from './CatalogoWsp';
// import Footer from './Footer';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('https://aliceblue-echidna-403440.hostingersite.com/backend/productos.php')
      .then(res => res.json())
      .then(data => {
        // Filtrar productos cuyo destino incluya 'principal' (array o string)
        const destacados = data.filter(p => {
          if (!p.destino) return false;
          if (Array.isArray(p.destino)) {
            return p.destino.includes('principal');
          }
          if (typeof p.destino === 'string') {
            // Puede ser 'principal', 'ambos', o una lista separada por coma
            const arr = p.destino.split(',').map(d => d.trim());
            return arr.includes('principal') || arr.includes('ambos');
          }
          return false;
        });
        // Ordenar por fecha_creacion descendente (más nuevo primero)
        destacados.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
        // Tomar solo los 6 más recientes y procesar los descuentos
        const procesados = destacados.slice(0, 6).map(p => {
          // Asegurarnos de que el descuento tenga un valor válido
          let descuentoFinal = p.descuento;
          if (descuentoFinal === null || descuentoFinal === 'null') descuentoFinal = '0';
          if (descuentoFinal === '') descuentoFinal = '0';
          
          return {
            ...p,
            descuento: descuentoFinal
          };
        });
        console.log('Productos cargados:', procesados);
        setProductos(procesados);
      })
      .catch(error => {
        console.error('Error al cargar productos:', error);
      });
  }, []);

  return (
    <>
      <section id="catalogo" className="w-full py-16 px-4 bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#0d0d0d]" data-aos="fade-up">
        <Typography variant="h2" component="h2" align="center" fontWeight={500} sx={{ mb: 4, color: 'var(--white)', fontSize: { xs: 32, sm: 40 }, textShadow: '0 2px 16px #00ffff44' }}>
          Catálogo
        </Typography>
        
        {/* Párrafo descriptivo */}
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            mb: 6, 
            color: '#b3e5fc', 
            fontSize: { xs: 16, sm: 18 }, 
            maxWidth: 600, 
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          Descubrí nuestros productos más destacados. Remeras, buzos, gorras y más, personalizados con la mejor calidad. 
          Cada diseño está pensado para expresar tu estilo único.
        </Typography>
        
        <div className="flex flex-col items-center justify-center w-full">
          <CatalogoWsp productos={productos} whatsappNumber="5491127117960" />
          <div className="w-full flex justify-center items-center mt-8 mb-2">
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
            }}>Ver más</a>
          </div>
        </div>
      </section>
      {/* <section id="footer-section">
        <Footer />
      </section> */}
    </>
  );
};

export default Catalogo;