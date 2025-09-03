import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PASSWORD = 'Magno10!';

const LoginAdmin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      localStorage.setItem('adminAuth', 'true');
      window.location.href = '/admin';
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#e3f2fd' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, maxWidth: 340, width: '100%' }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#1976d2', fontWeight: 'bold' }}>
          Iniciar sesión admin
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Contraseña"
            type={showPw ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPw ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    onClick={() => setShowPw(v => !v)}
                    edge="end"
                  >
                    {showPw ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Acceder
          </Button>
        </form>
        <Button
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          href="/"
        >
          Ir al sitio principal
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginAdmin;
