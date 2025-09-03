import React, { useState, useEffect } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import CatalogoWsp from '../components/CatalogoWsp';
import Footer from '../components/Footer';

// Consumir productos desde la API PHP
const API_URL = 'https://aliceblue-echidna-403440.hostingersite.com/backend/productos.php';

const CatalogoCompleto = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [genero, setGenero] = useState([]);
  const [orden, setOrden] = useState('default');
  const [categoria, setCategoria] = useState([]);
  const [tipo, setTipo] = useState('Todos');
  const [destino, setDestino] = useState('Todos');
  const [precioMinimo, setPrecioMinimo] = useState('');
  const [precioMaximo, setPrecioMaximo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para obtener valores únicos dinámicamente
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);
  const [generosUnicos, setGenerosUnicos] = useState([]);
  const [tiposUnicos, setTiposUnicos] = useState([]);
  const [destinosUnicos, setDestinosUnicos] = useState([]);
  // ...eliminado filtro con descuento...

  // Categorías que están disponibles en el dashboard del cliente
  const categoriasCompletas = [
  'Remera',
  'Camiseta', 
  'Buzo',
  'Campera',
  'Gorra',
  'Piluso',
  'Conjuntos',
  'Selección Argentina',
  'Estampados'
  ];

  // Géneros disponibles en el dashboard
  const generosCompletos = [
    'Hombre',
    'Mujer', 
    'Unisex',
    'Niño'
  ];

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setProductos(data);
        // Extraer valores únicos para los filtros
        const categorias = [...new Set(data.map(p => p.categoria).filter(Boolean))];
        const generos = [...new Set(data.map(p => p.genero).filter(Boolean))];
        const tipos = [...new Set(data.map(p => p.tipo).filter(Boolean))];
        const destinos = [...new Set(data.map(p => p.destino).filter(Boolean))];
        setCategoriasUnicas(categorias);
        setGenerosUnicos(generos);
        setTiposUnicos(tipos);
        setDestinosUnicos(destinos);
      } catch (err) {
        setError('Error al cargar productos');
      }
      setLoading(false);
    };
    fetchProductos();
  }, []);

  // useEffect para filtrar productos
  useEffect(() => {
    let productosFiltrados = [...productos];

    // Filtrar por búsqueda
    if (busqueda) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.title?.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.desc?.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.categoria?.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.genero?.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    // Filtrar por categorías múltiples
    if (categoria.length > 0) {
      productosFiltrados = productosFiltrados.filter(producto => {
        // Caso especial para Selección Argentina
        if (categoria.includes('Selección Argentina')) {
          if (producto.categoria === 'Selección Argentina' || (producto.destino && producto.destino.includes('seleccion_argentina'))) {
            return true;
          }
        }
        return categoria.includes(producto.categoria);
      });
    }
    // Filtrar por géneros múltiples
    if (genero.length > 0) {
      productosFiltrados = productosFiltrados.filter(producto => genero.includes(producto.genero));
    }
    // Filtrar productos con descuento
    // ...filtro por descuento eliminado...

    // Filtrar por destino
    if (destino !== 'Todos') {
      if (destino === 'principal' || destino === 'Página principal') {
        productosFiltrados = productosFiltrados.filter(producto => {
          if (Array.isArray(producto.destino)) {
            return producto.destino.includes('principal');
          }
          return producto.destino === 'principal' || producto.destino === 'Página principal';
        });
      } else {
        productosFiltrados = productosFiltrados.filter(producto => {
          if (Array.isArray(producto.destino)) {
            return producto.destino.includes(destino);
          }
          return producto.destino === destino;
        });
      }
    }

    // Ordenamiento
    if (orden === 'menor') {
      productosFiltrados.sort((a, b) => {
        const precioA = parseFloat(a.price?.replace(/[^0-9.-]+/g, '')) || 0;
        const precioB = parseFloat(b.price?.replace(/[^0-9.-]+/g, '')) || 0;
        return precioA - precioB;
      });
    } else if (orden === 'mayor') {
      productosFiltrados.sort((a, b) => {
        const precioA = parseFloat(a.price?.replace(/[^0-9.-]+/g, '')) || 0;
        const precioB = parseFloat(b.price?.replace(/[^0-9.-]+/g, '')) || 0;
        return precioB - precioA;
      });
    } else if (orden === 'nombre') {
      productosFiltrados.sort((a, b) => a.title?.localeCompare(b.title) || 0);
    } else if (orden === 'reciente') {
      productosFiltrados.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
    }

    setProductosFiltrados(productosFiltrados);
  }, [productos, busqueda, categoria, genero, tipo, destino, precioMinimo, precioMaximo, orden]);

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoria([]);
    setGenero([]);
    setTipo('Todos');
    setDestino('Todos');
    setOrden('default');
  };

  return (
    <>
      <section id="catalogo-completo" className="w-full py-16 px-4 bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#0d0d0d] mt-24 animate-fadein" data-aos="fade-up">
        <div className="w-full flex justify-center mb-2">
          <nav className="flex items-center gap-2 text-base">
            <a href="/" className="text-white font-light hover:underline">Inicio</a>
            <span className="text-white opacity-40">/</span>
            <span className="text-cyan-300 font-bold text-lg">Catálogo</span>
          </nav>
        </div>
        <Typography variant="h2" component="h2" align="center" fontWeight={700} sx={{ mb: 4, color: 'var(--white)', fontSize: { xs: 32, sm: 40 }, textShadow: '0 2px 16px #00ffff44' }}>
          Todos los productos
        </Typography>
        
        {/* Filtros minimalistas */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 2, 
          justifyContent: 'center', 
          alignItems: 'center', 
          mb: 4,
          maxWidth: '900px',
          mx: 'auto'
        }}>
          <FormControl sx={{ minWidth: 180, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(179, 229, 252, 0.3)' }, background: 'rgba(35, 35, 42, 0.6)', borderRadius: 2 }}>
            <InputLabel htmlFor="busqueda" style={{ color: '#b3e5fc' }}>Buscar producto...</InputLabel>
            <OutlinedInput
              id="busqueda"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              label="Buscar producto..."
              sx={{ color: '#b3e5fc', borderRadius: 2, height: 48 }}
            />
          </FormControl>
          
          <FormControl sx={{ minWidth: 160, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(179, 229, 252, 0.3)' }, background: 'rgba(35, 35, 42, 0.6)', borderRadius: 2 }}>
            <InputLabel id="categoria-label" style={{ color: '#b3e5fc' }}>Categoría</InputLabel>
            <Select
              labelId="categoria-label"
              multiple
              value={categoria}
              onChange={e => setCategoria(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
              input={<OutlinedInput label="Categoría" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
              sx={{ background: 'rgba(35, 35, 42, 0.6)', color: '#b3e5fc', borderRadius: 2 }}
            >
              {[...categoriasUnicas, ...categoriasCompletas.filter(cat => !categoriasUnicas.includes(cat))].map(cat => (
                <MenuItem key={cat} value={cat}>
                  <Checkbox checked={categoria.indexOf(cat) > -1} sx={{ color: '#0ea5e9', '&.Mui-checked': { color: '#00eaff' } }} />
                  <ListItemText primary={cat} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 140, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(179, 229, 252, 0.3)' }, background: 'rgba(35, 35, 42, 0.6)', borderRadius: 2 }}>
            <InputLabel id="genero-label" style={{ color: '#b3e5fc' }}>Género</InputLabel>
            <Select
              labelId="genero-label"
              multiple
              value={genero}
              onChange={e => setGenero(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
              input={<OutlinedInput label="Género" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
              sx={{ background: 'rgba(35, 35, 42, 0.6)', color: '#b3e5fc', borderRadius: 2 }}
            >
              {[...generosUnicos, ...generosCompletos.filter(gen => !generosUnicos.includes(gen))].map(gen => (
                <MenuItem key={gen} value={gen}>
                  <Checkbox checked={genero.indexOf(gen) > -1} sx={{ color: '#0ea5e9', '&.Mui-checked': { color: '#00eaff' } }} />
                  <ListItemText primary={gen} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(179, 229, 252, 0.3)' }, background: 'rgba(35, 35, 42, 0.6)', borderRadius: 2 }}>
            <InputLabel id="orden-label" style={{ color: '#b3e5fc' }}>Ordenar por</InputLabel>
            <Select
              labelId="orden-label"
              value={orden}
              onChange={e => setOrden(e.target.value)}
              input={<OutlinedInput label="Ordenar por" />}
              sx={{ background: 'rgba(35, 35, 42, 0.6)', color: '#b3e5fc', borderRadius: 2 }}
            >
              <MenuItem value="default">Ordenar por</MenuItem>
              <MenuItem value="reciente">Más recientes</MenuItem>
              <MenuItem value="menor">Precio: menor a mayor</MenuItem>
              <MenuItem value="mayor">Precio: mayor a menor</MenuItem>
              <MenuItem value="nombre">Nombre A-Z</MenuItem>
            </Select>
          </FormControl>

          {/* Filtros adicionales solo si hay datos */}
          {tiposUnicos.length > 0 && (
            <FormControl sx={{ minWidth: 140, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(179, 229, 252, 0.3)' }, background: 'rgba(35, 35, 42, 0.6)', borderRadius: 2 }}>
              <InputLabel id="tipo-label" style={{ color: '#b3e5fc' }}>Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                input={<OutlinedInput label="Tipo" />}
                sx={{ background: 'rgba(35, 35, 42, 0.6)', color: '#b3e5fc', borderRadius: 2 }}
              >
                <MenuItem value="Todos">Tipo</MenuItem>
                {tiposUnicos.map(tip => (
                  <MenuItem key={tip} value={tip}>{tip}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          
          {/* ...filtro con descuento eliminado... */}

          {/* ...existing code... */}

          {/* Botón limpiar solo si hay filtros activos */}
          {(busqueda || categoria !== 'Todas' || genero !== 'Todos' || tipo !== 'Todos' || precioMinimo || precioMaximo || orden !== 'default') && (
            <button
              onClick={limpiarFiltros}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid rgba(239, 68, 68, 0.5)',
                background: 'transparent',
                color: '#ef4444',
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(239, 68, 68, 0.1)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent';
              }}
            >
              Limpiar
            </button>
          )}
        </Box>

        {/* Contador de resultados discreto */}
        {!loading && !error && (
          <div style={{ 
            textAlign: 'center', 
            color: 'rgba(179, 229, 252, 0.7)', 
            fontSize: 14, 
            marginBottom: 20,
            fontWeight: 300
          }}>
            {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} encontrado{productosFiltrados.length !== 1 ? 's' : ''}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', color: 'rgba(179, 229, 252, 0.8)', fontSize: 16, padding: '60px 0', fontWeight: 300 }}>
            Cargando productos...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', color: 'rgba(239, 68, 68, 0.8)', fontSize: 16, padding: '60px 0', fontWeight: 300 }}>
            {error}
          </div>
        )}

        {!loading && !error && productosFiltrados.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            color: 'rgba(179, 229, 252, 0.8)', 
            fontSize: 16, 
            padding: '60px 20px',
            fontWeight: 300
          }}>
            No se encontraron productos con los filtros seleccionados
          </div>
        )}

        {!loading && !error && productosFiltrados.length > 0 && (
          <CatalogoWsp productos={productosFiltrados} whatsappNumber="5491127117960" />
        )}
      </section>
      <Footer />
    </>
  );
};

export default CatalogoCompleto;
