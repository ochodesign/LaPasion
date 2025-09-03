
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import Slide from '@mui/material/Slide';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import logoUrl from '../img/logo/logolapasion.svg';

// Estilos para el subrayado animado en los links del header
const style = document.createElement('style');
style.innerHTML = `
  .nav-link-header {
    position: relative;
    color: #fff;
    transition: color 0.2s;
  }
  .nav-link-header:hover {
    color: #FFD700;
  }
  .nav-link-header::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 4px;
    height: 3px;
    width: 100%;
    background: #FFD700;
    border-radius: 2px;
    transform: scaleX(0);
    transition: transform 0.3s;
  }
  .nav-link-header:hover::after {
    transform: scaleX(1);
  }
`;
if (typeof document !== 'undefined' && !document.head.querySelector('style[data-header-nav]')) {
  style.setAttribute('data-header-nav', 'true');
  document.head.appendChild(style);
}

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Contacto', to: '/#contacto' },
  ];

  // Función para scroll suave
  const navigate = useNavigate();
  const handleNavClick = (e, to) => {
    if (to === '/') {
      e.preventDefault();
      if (window.location.pathname === '/') {
        const el = document.querySelector('#hero');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector('#hero');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
      }
    } else if (to.startsWith('/catalogo')) {
      e.preventDefault();
      navigate('/catalogo');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 400);
    } else if (to.startsWith('/#')) {
      e.preventDefault();
      const section = to.replace('/#', '#');
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(section);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
      } else {
        const el = document.querySelector(section);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit appear={false}>
      <AppBar position="fixed" sx={{ bgcolor: 'var(--primary-color)', transition: 'top 0.3s', zIndex: 1201, height: 90 }} elevation={4}>
  <Toolbar sx={{ minHeight: 90, justifyContent: { xs: 'space-between', md: 'space-evenly' }, alignItems: 'center', paddingTop: '6px' }}>
          {/* Mobile: logo izquierda, burger derecha */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <a href="/" style={{ display: 'block' }}>
              <img src={logoUrl} alt="Logo" style={{ height: 56, width: 56, borderRadius: '50%', marginLeft: 8, boxShadow: '0 0 16px #00ffff88', display: 'block' }} />
            </a>
            <IconButton
              sx={{ color: 'var(--secondary-color)', mr: 2 }}
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label={drawerOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {drawerOpen ? <CloseIcon fontSize="large" /> : <MenuIcon />}
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{
                sx: {
                  bgcolor: 'var(--bg-dark) !important',
                  backgroundColor: 'var(--bg-dark) !important',
                  color: 'var(--text-primary)',
                  boxShadow: 6,
                  borderRadius: 0,
                  minHeight: 320,
                  maxHeight: 420,
                  overflow: 'hidden',
                  mt: { xs: '64px', md: 0 }, // Menos espacio debajo del header en mobile
                  top: { xs: '64px !important', md: '0 !important' },
                  position: 'absolute',
                }
              }}
            >
              <Box sx={{ width: 240, p: 2, minHeight: 320, maxHeight: 420, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box', borderRadius: 0, overflow: 'hidden' }}>
                <Box>
                  {menuItems.map(item => (
                    <Button
                      key={item.label}
                      sx={{
                        color: '#FFD700',
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        mb: 1,
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                      component={Link}
                      to={item.to}
                      onClick={e => {
                        handleNavClick(e, item.to);
                        setDrawerOpen(false);
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                  <IconButton sx={{ color: '#FFD700' }} href="https://wa.me/5491127117960" target="_blank" aria-label="WhatsApp">
                    <WhatsAppIcon fontSize="large" />
                  </IconButton>
                  <IconButton sx={{ color: '#FFD700' }} href="https://www.instagram.com/estampados.lapasion/" target="_blank" aria-label="Instagram">
                    <InstagramIcon fontSize="large" />
                  </IconButton>
                </Box>
              </Box>
            </Drawer>
          </Box>
          {/* Desktop: logo izquierda, menú derecha */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <a href="/" style={{ display: 'block' }}>
                <img src={logoUrl} alt="Logo" style={{ height: 72, width: 72, borderRadius: '50%', marginRight: 16, boxShadow: '0 0 16px #00ffff88', display: 'block' }} />
            </a>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {menuItems.map(item => (
              <Link
                key={item.label}
                to={item.to}
                className="nav-link-header"
                style={{
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: 17,
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: 'transparent',
                  textDecoration: 'none',
                  display: 'inline-block',
                  margin: '0 2px',
                  position: 'relative',
                  transition: 'color 0.2s',
                }}
                onClick={e => handleNavClick(e, item.to)}
              >
                {item.label}
              </Link>
            ))}
          </Box>
          {/* Redes sociales solo en desktop */}
          <Box sx={{ ml: 2, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <IconButton sx={{ color: '#FFD700' }} href="https://wa.me/5491127117960" target="_blank" aria-label="WhatsApp">
              <WhatsAppIcon />
            </IconButton>
            <IconButton sx={{ color: '#FFD700' }} href="https://www.instagram.com/estampados.lapasion/" target="_blank" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Header;
