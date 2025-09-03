import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import Header from './Header';
import Catalogo from './Catalogo';


const Servicios = () => (
  <>
    <Header />
  <section id="servicios" className="w-full py-16 px-4 bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#0d0d0d]" data-aos="fade-up">
    <Typography variant="h2" component="h2" align="center" fontWeight={700} sx={{ mb: 4, color: '#FFD700', fontSize: { xs: 32, sm: 40 }, textShadow: '0 2px 16px #000a' }}>
      Servicios
    </Typography>
  <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ maxWidth: 1400, mx: 'auto', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
      {[{
        img: require('../img/servicios/produccionpormayor.webp'),
        title: 'Diseños corporativos'
      }, {
        img: require('../img/servicios/trabajocantidad.webp'),
        title: 'Trabajo en cantidad'
      }, {
        img: require('../img/servicios/servicios-personalizados.webp'),
        title: 'Diseño personalizado'
      }, {
        img: require('../img/servicios/vinilo.webp'),
        title: 'Vinilo textil'
      }].map((serv, idx) => (
        <Grid item xs={12} sm={6} md={3} lg={3} key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 340, height: '380px', position: 'relative', mb: 1, '&:hover img': { boxShadow: '0 0 0 2px #FFD700, 0 4px 16px #FFD70022', transition: 'box-shadow 0.25s' } }}>
            <img src={serv.img} alt={serv.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'box-shadow 0.25s' }} />
          </Box>
          <Box sx={{
            width: '100%',
            maxWidth: 340,
            bgcolor: 'rgba(16,26,43,0.92)',
            boxShadow: '0 2px 8px #000a',
            mt: -2,
            py: 2,
            px: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Typography variant="h6" align="center" sx={{ color: '#FFD700', fontWeight: 700, fontSize: 24, textShadow: '0 2px 8px #000a', letterSpacing: '0.04em' }}>
              {serv.title}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 6 }}>
      <a
        href="#contacto"
        style={{
          background: '#FFD700',
          color: '#18181b',
          fontWeight: 700,
          fontSize: '1.2rem',
          border: 'none',
          borderRadius: '12px',
          padding: '18px 38px',
          boxShadow: '0 2px 8px #FFD70044',
          textDecoration: 'none',
          transition: 'background 0.35s cubic-bezier(.4,0,.2,1), color 0.35s cubic-bezier(.4,0,.2,1)',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onMouseOver={e => {
          e.currentTarget.style.transition = 'background 0.35s cubic-bezier(.4,0,.2,1), color 0.35s cubic-bezier(.4,0,.2,1)';
          e.currentTarget.style.background = '#FFEB3B';
          e.currentTarget.style.color = '#18181b';
        }}
        onMouseOut={e => {
          e.currentTarget.style.transition = 'background 0.35s cubic-bezier(.4,0,.2,1), color 0.35s cubic-bezier(.4,0,.2,1)';
          e.currentTarget.style.background = '#FFD700';
          e.currentTarget.style.color = '#18181b';
        }}
      >
        Contactar
      </a>
    </Box>
  </section>
  <Catalogo />
  </>
);

export default Servicios;
