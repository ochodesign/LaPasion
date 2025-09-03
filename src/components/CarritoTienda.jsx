import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const CarritoTienda = ({ cartItems, onRemove, onClear }) => {
  // Número de WhatsApp destino (ejemplo, cambiar por el tuyo)
  const whatsappNumber = '5491127117960';

  // Genera el mensaje para WhatsApp
  const getWhatsappMessage = () => {
    if (cartItems.length === 0) return '';
    let msg = '¡Hola! Quiero hacer un pedido en La Pasión:\n';
    cartItems.forEach((item, idx) => {
      msg += `\n${idx + 1}. ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;
    });
    const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    msg += `\n\nTotal: $${total}`;
    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${getWhatsappMessage()}`;

  return (
    <Box id="carrito-tienda" sx={{ width: '100%', py: 4, background: 'var(--bg-gray)', textAlign: 'center', borderRadius: 4, boxShadow: '0 2px 12px #ffd70022', mb: 6 }}>
      <Typography variant="h4" sx={{ color: 'var(--primary-color)', fontWeight: 800, mb: 2 }}>
        Carrito de Compras
      </Typography>
      {cartItems.length === 0 ? (
        <Typography sx={{ color: 'var(--primary-color)', mb: 2 }}>
          El carrito está vacío.
        </Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={`${item.nombre} x${item.cantidad}`} secondary={`$${item.precio * item.cantidad}`} />
                <Button color="error" onClick={() => onRemove(item.id)}>Eliminar</Button>
              </ListItem>
            ))}
          </List>
          <Button color="secondary" onClick={onClear} sx={{ mr: 2 }}>Vaciar carrito</Button>
          <Button variant="contained" sx={{ bgcolor: 'var(--accent-color)', color: 'var(--primary-color)', fontWeight: 700 }} href={whatsappUrl} target="_blank">
            Comprar por WhatsApp
          </Button>
        </>
      )}
    </Box>
  );
};

export default CarritoTienda;
