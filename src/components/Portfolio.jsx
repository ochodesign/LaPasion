import React from 'react';
import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material';

const trabajos = [
  { img: '', title: 'Ejemplo 1', desc: 'Web para comercio local', cliente: 'Juan', testimonial: '¡Me ayudaron a vender más!' },
  { img: '', title: 'Ejemplo 2', desc: 'Tienda online', cliente: 'María', testimonial: 'Fácil y rápido, lo recomiendo.' },
  { img: '', title: 'Ejemplo 3', desc: 'Rediseño web', cliente: 'Carlos', testimonial: 'Mi web se ve mucho mejor.' },
];

// Renombrado: Portfolio.jsx -> Proyectos.jsx
const Proyectos = () => (
  <Grid container spacing={3} sx={{ py: 6 }} justifyContent="center" id="proyectos">
    {trabajos.map((t, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Avatar sx={{ width: 56, height: 56, mb: 2 }}>{t.cliente[0]}</Avatar>
            <Typography variant="h6" fontWeight="bold">{t.title}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{t.desc}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              "{t.testimonial}" - {t.cliente}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default Proyectos;
