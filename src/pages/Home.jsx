import React from 'react';
import FormularioFuncional from '../components/FormularioFuncional';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Página Principal
      </Typography>
      <FormularioFuncional />
    </Container>
  );
};

export default Home;
