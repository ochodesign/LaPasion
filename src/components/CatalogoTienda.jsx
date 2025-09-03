import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid } from '@mui/material';

const productos = [
  {
    id: 1,
    nombre: 'Buzo Chinchin',
    precio: 12000,
    img: require('../img/productos/personalizados/buzochinchin.webp'),
    desc: 'Buzo personalizado, calidad premium, estampado a elección.'
  },
  {
    id: 2,
    nombre: 'Buzo Chinchin 2',
    precio: 11500,
    img: require('../img/productos/personalizados/buzochinchin2.webp'),
    desc: 'Buzo con diseño exclusivo, variedad de colores.'
  },
  {
    id: 3,
    nombre: 'Buzo Roling',
    precio: 13000,
    img: require('../img/productos/personalizados/buzoroling.webp'),
    desc: 'Buzo estampado, ideal para equipos y empresas.'
  },
  {
    id: 4,
    nombre: 'Buzos Random',
    precio: 11000,
    img: require('../img/productos/personalizados/buzosrandom.webp'),
    desc: 'Buzos personalizados, diferentes estilos y colores.'
  },
  {
    id: 5,
    nombre: 'Game Over Black',
    precio: 9500,
    img: require('../img/productos/personalizados/gameoverblack.webp'),
    desc: 'Remera negra con estampado Game Over.'
  },
  {
    id: 6,
    nombre: 'Game Over Orange',
    precio: 9500,
    img: require('../img/productos/personalizados/gameoverorange.webp'),
    desc: 'Remera naranja con estampado Game Over.'
  }
];

const CatalogoTienda = ({ onAddToCart }) => {
  return (
    <Box id="catalogo-tienda" sx={{ width: '100%', py: 8, background: 'var(--bg-light)', textAlign: 'center' }}>
      <Typography variant="h3" sx={{ color: 'var(--primary-color)', fontWeight: 800, mb: 4 }}>
        Catálogo de Productos
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {productos.map((prod) => (
          <Grid item xs={12} sm={6} md={4} key={prod.id}>
            <Card sx={{ maxWidth: 340, mx: 'auto', boxShadow: '0 4px 24px #ffd70044', borderRadius: 4, bgcolor: 'var(--bg-light)' }}>
              <CardMedia
                component="img"
                height="220"
                image={prod.img}
                alt={prod.nombre}
                sx={{ objectFit: 'cover', borderRadius: 4 }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: 'var(--accent-color)', fontWeight: 700, mb: 1 }}>
                  {prod.nombre}
                </Typography>
                <Typography sx={{ color: 'var(--primary-color)', fontSize: 16, mb: 1 }}>
                  {prod.desc}
                </Typography>
                <Typography sx={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: 18, mb: 2 }}>
                  ${prod.precio}
                </Typography>
                <Button variant="contained" color="primary" sx={{ bgcolor: 'var(--accent-color)', color: 'var(--primary-color)', fontWeight: 700 }} onClick={() => onAddToCart(prod)}>
                  Agregar al carrito
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CatalogoTienda;
