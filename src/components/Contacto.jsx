
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import MenuItem from '@mui/material/MenuItem';

import { Box, Container, Typography, TextField, Button, InputAdornment, FormControlLabel, Checkbox } from '@mui/material';
import Select from '@mui/material/Select';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TShirtIcon from '@mui/icons-material/Checkroom';
import HoodieIcon from '@mui/icons-material/EmojiPeople';
// ...existing code...
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import BrushIcon from '@mui/icons-material/Brush';

const motivos = [
  { value: 'corporativo', label: 'Diseños corporativos', icon: <TShirtIcon sx={{ color: '#FFD700' }} /> },
  { value: 'cantidad', label: 'Trabajo en cantidad', icon: <HoodieIcon sx={{ color: '#FFD700' }} /> },
  { value: 'personalizado', label: 'Diseño personalizado', icon: <BrushIcon sx={{ color: '#FFD700' }} /> },
  { value: 'vinilo', label: 'Vinilo textil', icon: <TShirtIcon sx={{ color: '#FFD700' }} /> },
  { value: 'consulta', label: 'Consulta general', icon: <HelpOutlineIcon sx={{ color: '#FFD700' }} /> },
];

const validationSchema = Yup.object({
  nombre: Yup.string().min(2, 'Mínimo 2 caracteres').required('El nombre es obligatorio'),
  email: Yup.string().email('Email inválido').required('El email es obligatorio'),
  wsp: Yup.string()
    .matches(/^\d{10,15}$/,'WhatsApp inválido')
    .required('El WhatsApp es obligatorio'),
  motivo: Yup.string().required('El motivo es obligatorio'),
  mensaje: Yup.string().min(10, 'El mensaje es muy corto').required('El mensaje es obligatorio'),
    noRobot: Yup.boolean().oneOf([true], 'Debes confirmar que no eres un robot'),
});

const Contacto = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = useState(false);
  const [msgEnviado, setMsgEnviado] = useState("");
  const [openMotivo, setOpenMotivo] = useState(false);

  // Cierra el dropdown de motivo al hacer scroll en la ventana
  React.useEffect(() => {
    if (!openMotivo) return;
    const handleScroll = () => {
      setOpenMotivo(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openMotivo]);
  // Formatea el número de WhatsApp al formato internacional argentino
  const formatWsp = (wsp) => {
    if (!wsp) return '';
    let num = wsp.replace(/\D/g, ''); // solo dígitos
    if (/^549\d{10,}$/.test(num)) return num;
    if (/^54\d{10,}$/.test(num)) return '549' + num.slice(2);
    if (/^9\d{10,}$/.test(num)) return '54' + num;
    if (/^\d{10,11}$/.test(num)) return '549' + num;
    return num;
  };
  React.useEffect(() => {
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
    <Box id="contacto" ref={sectionRef} sx={{ position: 'relative', width: '100%', minHeight: '100vh', py: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `url('/img/contacto/fondo-bg-contacto.webp') center center/cover no-repeat`, backgroundAttachment: 'fixed', boxShadow: '0 0 80px 0 #ffd70022' }}>
      {/* Overlay oscuro */}
      <Box sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: 'rgba(10,20,40,0.7)', zIndex: 1 }} />
      <Container
        maxWidth="sm"
        sx={{
          position: 'sticky',
          top: 32,
          zIndex: 2,
          bgcolor: 'rgba(20,20,40,0.85)',
          borderRadius: 4,
          boxShadow: '0 0 24px 0 #ffd70055, 0 2px 8px #000a',
          p: { xs: 2, md: 4 },
          border: '2px solid #ffd70055',
          color: 'var(--text-primary)',
          backdropFilter: 'blur(2px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s, transform 1s',
        }}
      >
  <Typography variant="h2" align="center" sx={{ color: '#FFD700', fontWeight: 700, mb: 2, fontSize: { xs: 28, md: 36 } }}>
          ¡Contactá a La Pasión!
        </Typography>
        <Typography align="center" sx={{ color: 'var(--white)', mb: 4, fontSize: 18 }}>
          ¿Querés potenciar tu marca con estampados únicos? Escribinos por WhatsApp, Instagram o completá el formulario. ¡La Pasión Estampados responde rápido!
        </Typography>
        {/* Formulario y redes sociales igual que antes */}
        <Formik
          initialValues={{ nombre: '', email: '', wsp: '', motivo: '', mensaje: '', noRobot: false }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              await axios.post('https://aliceblue-echidna-403440.hostingersite.com/backend/contacto.php', {
                nombre: values.nombre,
                email: values.email,
                wsp: formatWsp(values.wsp),
                motivo: values.motivo,
                mensaje: values.mensaje
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              setMsgEnviado('¡Mensaje enviado y guardado!');
              resetForm();
              setTimeout(() => setMsgEnviado(""), 4000);
            } catch (error) {
              setMsgEnviado('Error al enviar el mensaje.');
              setTimeout(() => setMsgEnviado(""), 4000);
            }
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Box sx={{ bgcolor: 'rgba(20,61,122,0.98)', p: { xs: 2, md: 4 }, borderRadius: 4, boxShadow: '0 0 24px 0 #ffd70055, 0 2px 8px #000a', border: '2px solid #ffd70055', color: 'var(--text-primary)' }}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  margin="normal"
                  value={values.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.nombre && Boolean(errors.nombre)}
                  helperText={touched.nombre && errors.nombre}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: '#FFD700' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& label': { color: '#FFD700' }, '& .MuiOutlinedInput-root': { bgcolor: 'rgba(20,20,40,0.85)', color: 'var(--white)', '& fieldset': { borderColor: '#FFD700' }, '&:hover fieldset': { borderColor: '#FFD700' }, '&.Mui-focused fieldset': { borderColor: '#FFD700' } } }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  margin="normal"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: '#FFD700' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& label': { color: '#FFD700' }, '& .MuiOutlinedInput-root': { bgcolor: 'rgba(20,20,40,0.85)', color: 'var(--white)', '& fieldset': { borderColor: '#FFD700' }, '&:hover fieldset': { borderColor: '#FFD700' }, '&.Mui-focused fieldset': { borderColor: '#FFD700' } } }}
                />
                <TextField
                  fullWidth
                  label="WhatsApp"
                  name="wsp"
                  margin="normal"
                  value={values.wsp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.wsp && Boolean(errors.wsp)}
                  helperText={touched.wsp && errors.wsp}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WhatsAppIcon sx={{ color: '#FFD700' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& label': { color: '#FFD700' }, '& .MuiOutlinedInput-root': { bgcolor: 'rgba(20,20,40,0.85)', color: 'var(--white)', '& fieldset': { borderColor: '#FFD700' }, '&:hover fieldset': { borderColor: '#FFD700' }, '&.Mui-focused fieldset': { borderColor: '#FFD700' } } }}
                />
                {/* Dropdown Motivo desde cero con MUI Select */}
                <Box sx={{ mt: 1, mb: 0, p: 0 }}>
                  <Typography sx={{ color: '#FFD700', fontWeight: 600, mb: 1, fontSize: 18 }}>Motivo</Typography>
                  <Select
                    fullWidth
                    displayEmpty
                    name="motivo"
                    value={values.motivo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.motivo && Boolean(errors.motivo)}
                    sx={{
                      bgcolor: 'rgba(20,20,40,0.85)',
                      color: 'var(--white)',
                      border: '2px solid #FFD700',
                      boxShadow: '0 4px 24px #ffd70044',
                      borderRadius: '12px',
                      '& .MuiSelect-icon': { color: '#FFD700' },
                    }}
                    MenuProps={{
                      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                      transformOrigin: { vertical: 'top', horizontal: 'left' },
                      disablePortal: false,
                      getContentAnchorEl: null,
                      onScroll: () => setOpenMotivo(false),
                    }}
                    open={openMotivo}
                    onOpen={() => setOpenMotivo(true)}
                    onClose={() => setOpenMotivo(false)}
                    renderValue={selected => {
                      if (!selected) return <span style={{ color: '#999' }}>Selecciona un motivo</span>;
                      const motivo = motivos.find(m => m.value === selected);
                      return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {React.cloneElement(motivo?.icon, { sx: { color: '#FFD700' } })}
                          <span style={{ marginLeft: 8 }}>{motivo?.label}</span>
                        </Box>
                      );
                    }}
                  >
                    <MenuItem value="">
                      <span style={{ color: '#999' }}>Selecciona un motivo</span>
                    </MenuItem>
                    {motivos.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {option.icon}
                          <span style={{ marginLeft: 8 }}>{option.label}</span>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.motivo && errors.motivo && (
                    <Typography sx={{ color: 'var(--accent-color)', fontSize: 14, mt: 1 }}>{errors.motivo}</Typography>
                  )}
                </Box>
                <TextField
                  fullWidth
                  label="Mensaje"
                  name="mensaje"
                  margin="normal"
                  multiline
                  rows={4}
                  value={values.mensaje}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.mensaje && Boolean(errors.mensaje)}
                  helperText={touched.mensaje && errors.mensaje}
                  sx={{ '& label': { color: '#FFD700' }, '& .MuiOutlinedInput-root': { bgcolor: 'rgba(20,20,40,0.85)', color: 'var(--white)', '& fieldset': { borderColor: '#FFD700' }, '&:hover fieldset': { borderColor: '#FFD700' }, '&.Mui-focused fieldset': { borderColor: '#FFD700' } } }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="noRobot"
                      color="primary"
                      checked={values.noRobot}
                      onChange={handleChange}
                      sx={{ '&.Mui-checked, &.MuiCheckbox-root': { boxShadow: 'none', color: '#FFD700' }, '&:focus-visible': { outline: 'none' } }}
                    />
                  }
                  label="No soy un robot"
                  sx={{ mt: 2, '& .MuiFormControlLabel-label': { borderBottom: 'none', color: '#FFD700', fontWeight: 'bold' } }}
                />
                {touched.noRobot && Boolean(errors.noRobot) && (
                  <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {errors.noRobot}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    fontWeight: 'bold',
                    fontSize: 18,
                    bgcolor: '#FFD700',
                    color: '#18181b',
                    opacity: isSubmitting || !values.noRobot ? 0.6 : 1,
                    cursor: isSubmitting || !values.noRobot ? 'not-allowed' : 'pointer',
                    boxShadow: isSubmitting || !values.noRobot ? 'none' : undefined,
                    '&:hover': {
                      bgcolor: '#e6c200',
                    },
                    '&.Mui-disabled': {
                      bgcolor: '#FFD700',
                      color: '#18181b',
                      opacity: 0.6,
                    },
                  }}
                  fullWidth
                  disabled={isSubmitting || !values.noRobot}
                >
                  Enviar
                </Button>
                {msgEnviado && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body1" sx={{ color: msgEnviado.includes('Error') ? 'var(--accent-color)' : 'var(--accent-color)', fontWeight: 'bold', bgcolor: '#143d7a', borderRadius: 2, py: 1 }}>
                      {msgEnviado}
                    </Typography>
                  </Box>
                )}
              </Box>
              {/* Redes sociales flotantes estilo burbuja */}
              <Box sx={{ mt: 5, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700, mb: 2 }}>
                  También podés contactarnos por:
                </Typography>
                <Box sx={{
                  display: 'flex',
                  gap: 4,
                  justifyContent: 'center',
                  mb: 2,
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: 280,
                  mx: 'auto',
                }}>
                  <a href="https://www.instagram.com/lapasionestampados/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Box sx={{
                      width: 64,
                      height: 64,
                      bgcolor: '#FFD700 !important',
                      borderRadius: '50%',
                      boxShadow: '0 4px 16px #FFD70088, 0 2px 8px #000a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.15) translateY(-8px)',
                        boxShadow: '0 8px 32px #FFD700cc, 0 2px 16px #000a',
                        bgcolor: '#e6c200',
                      },
                    }}>
                      <InstagramIcon sx={{ color: '#18181b', fontSize: 36 }} />
                    </Box>
                  </a>
                  <a href="https://wa.me/5491127117960" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Box sx={{
                      width: 64,
                      height: 64,
                      bgcolor: '#FFD700 !important',
                      borderRadius: '50%',
                      boxShadow: '0 8px 32px #FFD70088, 0 2px 8px #000a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.15) translateY(-8px)',
                        boxShadow: '0 16px 48px #FFD700cc, 0 2px 16px #000a',
                        bgcolor: '#e6c200',
                      },
                    }}>
                      <WhatsAppIcon sx={{ color: '#18181b', fontSize: 36 }} />
                    </Box>
                  </a>
                  <a href="mailto:lapasionestampados@gmail.com" style={{ textDecoration: 'none' }}>
                    <Box sx={{
                      width: 64,
                      height: 64,
                      bgcolor: '#FFD700 !important',
                      borderRadius: '50%',
                      boxShadow: '0 8px 32px #FFD70088, 0 2px 8px #000a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.15) translateY(-8px)',
                        boxShadow: '0 16px 48px #FFD700cc, 0 2px 16px #000a',
                        bgcolor: '#e6c200',
                      },
                    }}>
                      <EmailIcon sx={{ color: '#18181b', fontSize: 36 }} />
                    </Box>
                  </a>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Contacto;
