import React, { useState } from 'react';
import logolapasion from '../img/logo/logolapasion.svg';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import { Box, Typography, Link, Container, IconButton } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenTerms = () => setOpenTerms(true);
  const handleCloseTerms = () => setOpenTerms(false);
  return (
    <>
  <Box sx={{ width: '100%', background: 'linear-gradient(90deg, #18181b 0%, #0a2342 40%, #1e3a8a 70%, #2563eb 100%)', color: 'var(--white)', pt: 8, pb: 6, mt: 8, boxShadow: '0 0 48px #2563eb44', borderTopLeftRadius: 32, borderTopRightRadius: 32 }}>
  <Container maxWidth="lg" sx={{ color: 'var(--white)' }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'center', md: 'space-between' }, alignItems: { xs: 'center', md: 'flex-start' }, gap: 6 }}>
            {/* Columna 1: Logo y descripción */}
            <Box sx={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <img src={logolapasion} alt="Logo La Pasión" style={{ height: 140, borderRadius: 16, marginBottom: 8, boxShadow: '0 0 32px #bfa94a88' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#bfa94a', letterSpacing: 1, mb: 1, textShadow: '0 2px 12px #1e3a8a' }}>La Pasión</Typography>
              <Typography sx={{ color: 'var(--white)', fontSize: 17, textAlign: 'center', mb: 2 }}>
                Estampados personalizados, indumentaria y accesorios para todos los gustos. ¡Consultanos por WhatsApp, Instagram o Gmail!
              </Typography>
            </Box>
            {/* Columna 2: Servicios */}
            <Box sx={{ flex: 1, minWidth: 180, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#bfa94a', mb: 2, textShadow: '0 2px 12px #1e3a8a' }}>Servicios</Typography>
              <Typography sx={{ color: 'var(--white)', mb: 1 }}>Estampados personalizados</Typography>
              <Typography sx={{ color: 'var(--white)', mb: 1 }}>Indumentaria y accesorios</Typography>
              <Typography sx={{ color: 'var(--white)', mb: 1 }}>Remeras, buzos, gorras y más</Typography>
              <Typography sx={{ color: 'var(--white)', mb: 1 }}>Diseños exclusivos para vos o tu grupo</Typography>
            </Box>
            {/* Columna 3: Navegacion */}
            <Box sx={{ flex: 1, minWidth: 140, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#bfa94a', mb: 2, textShadow: '0 2px 12px #1e3a8a' }}>Navegación</Typography>
              <Link href="/" underline="none" sx={{ color: '#fff', display: 'block', mb: 1, fontWeight: 500, '&:hover': { color: '#FFD700', textShadow: '0 2px 12px #bfa94a' } }}>Inicio</Link>
              <Link href="#servicios" underline="none" sx={{ color: 'var(--white)', display: 'block', mb: 1, fontWeight: 500, '&:hover': { color: '#FFD700' } }}>Servicios</Link>
              <Link href="/catalogo" underline="none" sx={{ color: 'var(--white)', display: 'block', mb: 1, fontWeight: 500, '&:hover': { color: '#FFD700' } }}>Catálogo</Link>
              <Link href="#contacto" underline="none" sx={{ color: 'var(--white)', display: 'block', mb: 1, fontWeight: 500, '&:hover': { color: '#FFD700' } }}>Contacto</Link>
            </Box>
            {/* Columna 4: Contacto y redes */}
            <Box sx={{ flex: 1, minWidth: 220, textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#bfa94a', mb: 2, textShadow: '0 2px 12px #1e3a8a' }}>Contacto y Redes</Typography>
              <Typography sx={{ color: 'var(--white)', mb: 1 }}>WhatsApp: +54 9 11 2711-7960</Typography>
              <Typography sx={{ color: 'var(--white)', mb: 1 }}>Instagram: @estampados.lapasion</Typography>
              <Typography sx={{ color: 'var(--white)', mb: 1 }}>Gmail: estampadoslapasion@gmail.com</Typography>
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mt: 3, width: '100%' }}>
                <IconButton href="https://www.instagram.com/estampados.lapasion/" target="_blank" rel="noopener" sx={{ bgcolor: '#23232a', color: '#FFD700', boxShadow: '0 4px 16px #FFD70055', p: 2, borderRadius: '50%', transition: '0.3s', '&:hover': { bgcolor: '#FFD700', color: '#23232a', boxShadow: '0 8px 32px #FFD70099' } }}>
                  <InstagramIcon fontSize="large" />
                </IconButton>
                <IconButton href="mailto:estampadoslapasion@gmail.com" sx={{ bgcolor: '#23232a', color: '#FFD700', boxShadow: '0 4px 16px #FFD70055', p: 2, borderRadius: '50%', transition: '0.3s', '&:hover': { bgcolor: '#FFD700', color: '#23232a', boxShadow: '0 8px 32px #FFD70099' } }}>
                  <EmailIcon fontSize="large" />
                </IconButton>
                <IconButton href="https://wa.me/5491127117960" target="_blank" rel="noopener" sx={{ bgcolor: '#23232a', color: '#FFD700', boxShadow: '0 4px 16px #FFD70055', p: 2, borderRadius: '50%', transition: '0.3s', '&:hover': { bgcolor: '#FFD700', color: '#23232a', boxShadow: '0 8px 32px #FFD70099' } }}>
                  <WhatsAppIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </Box>
          {/* Línea divisoria */}
          <Box sx={{ width: '100%', borderBottom: '1px solid #FFD70099', my: 4 }} />
          {/* Derechos reservados y enlaces legales */}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2, mt: 2 }}>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: 15, textAlign: { xs: 'center', md: 'left' }, fontWeight: 500 }}>
              <span style={{color:'#bfa94a',fontWeight:'bold'}}>© 2025 La Pasión.</span> Todos los derechos reservados.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <Button onClick={handleOpen} sx={{ color: '#FFD700', fontWeight: 600, fontSize: 16, textDecoration: 'underline', bgcolor: 'transparent', boxShadow: 'none', textTransform: 'none', p: 0, minWidth: 0, '&:hover': { color: '#e6c200', bgcolor: 'transparent', textDecoration: 'underline' } }}>
                Política de Privacidad
              </Button>
              <Button onClick={handleOpenTerms} sx={{ color: '#FFD700', fontWeight: 600, fontSize: 16, textDecoration: 'underline', bgcolor: 'transparent', boxShadow: 'none', textTransform: 'none', p: 0, minWidth: 0, '&:hover': { color: '#e6c200', bgcolor: 'transparent', textDecoration: 'underline' } }}>
                Términos y Condiciones
              </Button>
            </Box>
          </Box>
          <Box sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#bfa94a', fontWeight: 500, fontSize: 15 }}>
              Sitio web diseñado por{' '}
              <Link href="https://ochodesignweb.com" target="_blank" rel="noopener" sx={{ color: '#00ffff', fontWeight: 700, textDecoration: 'underline' }}>
                Ocho Design
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
      {/* Modal de Políticas y Privacidad */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle sx={{ bgcolor: '#23232a', color: '#FFD700', fontWeight: 700 }}>Políticas y Privacidad</DialogTitle>
        <DialogContent sx={{ bgcolor: '#23232a', color: 'var(--white)', fontSize: 16 }}>
          <Typography gutterBottom>
            Tu privacidad es importante para nosotros. Este sitio web recopila datos mínimos necesarios para el funcionamiento y la comunicación. No compartimos tu información con terceros y protegemos tus datos según la normativa vigente.
          </Typography>
          <Typography gutterBottom>
            Al utilizar nuestros formularios, aceptás el tratamiento de tus datos para responder consultas y brindar servicios. Podés solicitar la eliminación de tus datos en cualquier momento.
          </Typography>
          <Typography gutterBottom>
            Para más información, contactanos a través de los medios disponibles en el sitio.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#23232a' }}>
          <Button onClick={handleClose} sx={{ color: '#FFD700', fontWeight: 700 }}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      {/* Modal de Términos y Condiciones */}
      <Dialog open={openTerms} onClose={handleCloseTerms} maxWidth="sm" fullWidth>
  <DialogTitle sx={{ bgcolor: '#23232a', color: '#FFD700', fontWeight: 700 }}>Términos y Condiciones</DialogTitle>
        <DialogContent sx={{ bgcolor: '#23232a', color: 'var(--white)', fontSize: 16 }}>
          <Typography gutterBottom>
            El uso de este sitio implica la aceptación de los términos y condiciones aquí expuestos. Los contenidos, servicios y funcionalidades pueden cambiar sin previo aviso.
          </Typography>
          <Typography gutterBottom>
            El usuario se compromete a utilizar el sitio de manera responsable y respetuosa. No se permite el uso indebido, la copia o distribución no autorizada de los contenidos.
          </Typography>
          <Typography gutterBottom>
            Para dudas o consultas sobre los términos, contactanos a través de los medios disponibles en el sitio.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#23232a' }}>
          <Button onClick={handleCloseTerms} sx={{ color: '#FFD700', fontWeight: 700 }}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Footer;
