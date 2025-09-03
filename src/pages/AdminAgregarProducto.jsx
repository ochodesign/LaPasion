import ScrollUpButton from '../components/ScrollUpButton';
// ...eliminado, se agrega correctamente dentro del componente...
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';

const AdminAgregarProducto = () => {
  // ...existing code...
  // Estado para editar/eliminar producto
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  const [editData, setEditData] = useState({ title: '', price: '', desc: '', categoria: '', genero: '', tipo: '', talles: '', destino: '', descuento: '0' });
  const [actionLoading, setActionLoading] = useState(false);

  // Eliminar producto
  const handleOpenDelete = (prod) => { setSelectedProd(prod); setOpenDelete(true); };
  const handleCloseDelete = () => { setOpenDelete(false); setSelectedProd(null); };
  const eliminarProducto = async () => {
    if (!selectedProd) return;
    setActionLoading(true);
    try {
      const res = await fetch('https://aliceblue-echidna-403440.hostingersite.com/backend/productos.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id: selectedProd.id })
      });
      const data = await res.json();
      console.log('Respuesta eliminar:', data); // Para depuración
      if (data.success) {
        setProductos(prev => prev.filter(p => p.id !== selectedProd.id));
        handleCloseDelete();
      } else {
        alert(data.error ? `Error al eliminar: ${data.error}` : 'Error al eliminar');
      }
    } catch (err) {
      console.error('Error catch eliminar:', err);
      alert('Error al eliminar (catch)');
    }
    setActionLoading(false);
  };

  // Editar producto
  const handleOpenEdit = (prod) => {
    setSelectedProd(prod);
    setEditData({
      title: prod.title,
      price: prod.price,
      desc: prod.desc,
      categoria: prod.categoria,
      genero: prod.genero,
      tipo: prod.tipo,
      talles: prod.talles,
      destino: prod.destino,
      descuento: prod.descuento
    });
    setOpenEdit(true);
  };
  const handleCloseEdit = () => { setOpenEdit(false); setSelectedProd(null); };
  const editarProducto = async () => {
    if (!selectedProd) return;
    setActionLoading(true);
    try {
      // Si hay nuevas imágenes, subirlas primero
      let imgUrl = editData.img || selectedProd.img;
      let imgUrl2 = editData.img2 || selectedProd.img2;
      const uploadPromises = [];
      if (editData.imgFile) {
        const formData = new FormData();
        formData.append('file', editData.imgFile);
        uploadPromises.push(fetch('https://aliceblue-echidna-403440.hostingersite.com/backend/uploadImg.php', {
          method: 'POST',
          body: formData
        }).then(res => res.json()));
      } else {
        uploadPromises.push(Promise.resolve({ success: true, url: imgUrl }));
      }
      if (editData.imgFile2) {
        const formData2 = new FormData();
        formData2.append('file', editData.imgFile2);
        uploadPromises.push(fetch('https://aliceblue-echidna-403440.hostingersite.com/backend/uploadImg.php', {
          method: 'POST',
          body: formData2
        }).then(res => res.json()));
      } else {
        uploadPromises.push(Promise.resolve({ success: true, url: imgUrl2 }));
      }
      const [dataImg, dataImg2] = await Promise.all(uploadPromises);
      if (!dataImg.success) throw new Error(dataImg.error || 'Error al subir imagen principal');
      if (!dataImg2.success) throw new Error(dataImg2.error || 'Error al subir imagen secundaria');
      imgUrl = dataImg.url;
      imgUrl2 = dataImg2.url;
      // Procesar descuento - asegurarnos de que no sea un valor vacío o nulo
      const descuentoFinal = editData.descuento === '' || editData.descuento === null ? '0' : editData.descuento;
      const editDataProcessed = {
        ...editData,
        img: imgUrl,
        img2: imgUrl2,
        descuento: descuentoFinal
      };
      
      // Log para depuración
      console.log('Editando producto con datos:', editDataProcessed);
      console.log('Descuento:', editDataProcessed.descuento, typeof editDataProcessed.descuento);
      
      // Enviar edición
      const res = await fetch('https://aliceblue-echidna-403440.hostingersite.com/backend/productos.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', id: selectedProd.id, ...editDataProcessed })
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        alert('Error de respuesta del servidor: ' + text);
        setActionLoading(false);
        return;
      }
      if (data.success) {
        setProductos(prev => prev.map(p => p.id === selectedProd.id ? { ...p, ...editData, img: imgUrl, img2: imgUrl2 } : p));
        handleCloseEdit();
      } else {
        alert(data.error || 'Error al editar');
      }
    } catch (err) {
      alert(err.message || 'Error al editar');
    }
    setActionLoading(false);
  };
  // Estado para el modal de productos
  const [openProductos, setOpenProductos] = useState(false);
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(false);
  // Filtros de búsqueda
  const [searchText, setSearchText] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [filterGenero, setFilterGenero] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  // Estado para saber si hay algún modal abierto
  const modalAbierto = openProductos || openEdit || openDelete;

  // Obtener productos al abrir el modal
  const handleOpenProductos = async () => {
    setOpenProductos(true);
    setLoadingProductos(true);
    try {
      const res = await fetch('https://aliceblue-echidna-403440.hostingersite.com/backend/productos.php');
      const data = await res.json();
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      setProductos([]);
    }
    setLoadingProductos(false);
  };
  const handleCloseProductos = () => setOpenProductos(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState(''); // URL o nombre de archivo principal
  const [img2, setImg2] = useState(''); // URL o nombre de archivo secundaria
  const [imgFile, setImgFile] = useState(null);
  const [imgFile2, setImgFile2] = useState(null);
  const [categoria, setCategoria] = useState('');
  const [genero, setGenero] = useState('');
  const [talles, setTalles] = useState([]);
  const [tipo, setTipo] = useState('Genérico');
  // Permitir múltiples destinos
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [descuento, setDescuento] = useState('0');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Evita doble envío
    setLoading(true);
    setSuccess(null);
    setError(null);
    let imgUrl = img;
    let imgUrl2 = img2;
      // La imagen es obligatoria
      if (!imgFile && !imgFile2) {
        setError('Debes subir al menos una imagen para el producto');
        setLoading(false);
        return;
      }
      if (destinos.length === 0) {
        setError('Selecciona al menos un destino para el producto');
        setLoading(false);
        return;
      }
      // Validar y preparar datos para enviar
      let categoriaFinal = categoria;
      if (destinos.includes('seleccion_argentina')) {
        categoriaFinal = 'Selección Argentina';
      }
    try {
      // Subir ambas imágenes en paralelo
      const uploadPromises = [];
      if (imgFile) {
        const formData = new FormData();
        formData.append('file', imgFile);
        uploadPromises.push(fetch('https://aliceblue-echidna-403440.hostingersite.com/backend/uploadImg.php', {
          method: 'POST',
          body: formData
        }).then(res => res.json()));
      } else {
        uploadPromises.push(Promise.resolve({ success: true, url: '' }));
      }
      if (imgFile2) {
        const formData2 = new FormData();
        formData2.append('file', imgFile2);
        uploadPromises.push(fetch('https://aliceblue-echidna-403440.hostingersite.com/backend/uploadImg.php', {
          method: 'POST',
          body: formData2
        }).then(res => res.json()));
      } else {
        uploadPromises.push(Promise.resolve({ success: true, url: '' }));
      }
      const [dataImg, dataImg2] = await Promise.all(uploadPromises);
      if (!dataImg.success) throw new Error(dataImg.error || 'Error al subir imagen principal');
      if (!dataImg2.success) throw new Error(dataImg2.error || 'Error al subir imagen secundaria');
      imgUrl = dataImg.url;
      imgUrl2 = dataImg2.url;
      // Procesar descuento - asegurarnos de que no sea un valor vacío
      const descuentoFinal = descuento === '' || descuento === null ? '0' : descuento;
      
      // Log para depuración
      console.log('Enviando producto con descuento:', descuentoFinal, typeof descuentoFinal);
      
      // Enviar producto
      const res = await fetch('https://aliceblue-echidna-403440.hostingersite.com/backend/productos.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, price, desc, img: imgUrl, img2: imgUrl2, categoria, genero, tipo, 
          talles, destino: destinos, descuento: descuentoFinal 
        })
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        setError('Error de respuesta del servidor: ' + text);
        setLoading(false);
        return;
      }
      if (data.success) {
        setSuccess('¡Producto agregado correctamente!');
        setTitle(''); setPrice(''); setDesc(''); setImg(''); setImg2(''); setImgFile(null); setImgFile2(null); setCategoria(''); setGenero('');
  setTipo('Genérico'); setDestinos([]); setDescuento(0);
        // Limpiar blobs
        if (imgFile) URL.revokeObjectURL(imgFile);
        if (imgFile2) URL.revokeObjectURL(imgFile2);
        // Animación de éxito
        const successDiv = document.createElement('div');
        successDiv.textContent = '✔️ Producto publicado';
        successDiv.style.position = 'fixed';
        successDiv.style.top = '30px';
        successDiv.style.left = '50%';
        successDiv.style.transform = 'translateX(-50%)';
        successDiv.style.background = '#00e676';
        successDiv.style.color = '#18181b';
        successDiv.style.fontWeight = 'bold';
        successDiv.style.fontSize = '22px';
        successDiv.style.padding = '16px 32px';
        successDiv.style.borderRadius = '12px';
        successDiv.style.boxShadow = '0 2px 16px #00e67688';
        successDiv.style.zIndex = '9999';
        document.body.appendChild(successDiv);
        setTimeout(() => {
          document.body.removeChild(successDiv);
        }, 1800);
      } else {
        setError(data.error || 'Error al agregar producto');
      }
    } catch (err) {
      setError(err.message || 'Error de conexión');
    }
    setLoading(false);
  };

  return (
  <div className="w-full mt-0">
      {!modalAbierto && <ScrollUpButton />}
      <div className="w-full bg-[#e3f2fd] rounded-xl mb-6 text-center shadow border border-cyan-200" style={{ padding: 0 }}>
        <p className="text-gray-700 mb-2">
          Completa los datos para publicar un nuevo producto en el catálogo. Todos los campos son obligatorios salvo la imagen.<br/>
          <span className="text-[#1976d2] font-bold block mt-2 mb-1">¿Cómo funciona?</span>
          <span className="text-gray-700 block text-left pl-2">1. Escribe el nombre y precio del producto.<br/>
          2. Selecciona la categoría y el género.<br/>
          3. Elige si el producto es <b>"Nuevo"</b> (aparecerá un cartel destacado arriba del artículo en el catálogo) o <b>"Genérico"</b> (será un producto normal sin cartel).<br/>
          4. Sube una imagen (opcional).<br/>
          5. Escribe una breve descripción.<br/>
          6. Selecciona el <b>Destino del producto</b>:<br/>
          <span className="block pl-4 text-sm text-gray-600">- <b>Catálogo</b>: El producto solo aparecerá en el catálogo completo.<br/>
          - <b>Página principal</b>: El producto aparecerá destacado en la página principal y desplazará los anteriores (solo se muestran 6, el más antiguo se elimina automáticamente).<br/>
          - <b>Ambos</b>: El producto estará tanto en el catálogo como en la página principal.</span><br/>
          7. Haz clic en <b>Agregar producto</b> y aparecerá automáticamente en el catálogo.</span><br/>
          <span className="text-green-500 font-semibold block mt-2">¡Listo! El producto estará visible para todos los clientes.</span>
        </p>
      </div>
  <div className="w-full max-w-lg sm:max-w-2xl mx-auto p-2 sm:p-8 bg-[#18181b] rounded-xl shadow-lg border-2 border-cyan-300" style={{ width: '100%' }}>
  <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <label className="text-cyan-300 font-semibold flex items-center gap-2">
          <span>📍 Destino del producto</span>
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {['catalogo', 'principal', 'seleccion_argentina'].map(dest => (
            <label key={dest} className={`px-2 py-1 rounded-lg border font-bold text-xs cursor-pointer ${destinos.includes(dest) ? 'bg-cyan-300 text-blue-900 border-blue-900' : 'bg-[#23232a] text-cyan-300 border-cyan-300'}`}>
              <input
                type="checkbox"
                value={dest}
                checked={destinos.includes(dest)}
                onChange={e => {
                  if (e.target.checked) setDestinos([...destinos, dest]);
                  else setDestinos(destinos.filter(d => d !== dest));
                }}
                className="hidden"
              />
              {dest === 'catalogo' ? 'Catálogo' : dest === 'principal' ? 'Página principal' : 'Selección Argentina'}
            </label>
          ))}
        </div>
        <label className="text-cyan-300 font-semibold flex items-center gap-2">
          <span>📝 Nombre del producto</span>
        </label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ej: Remera personalizada" required className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white" />
        <label className="text-cyan-300 font-semibold flex items-center gap-2">
          <span>💲 Precio</span>
        </label>
        <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Ej: 7000" required className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white" />
        <label className="text-cyan-300 font-semibold flex items-center gap-2">
          <span>🏷️ Descuento (%)</span>
        </label>
        <input type="number" min="0" max="100" value={descuento} onChange={e => setDescuento(e.target.value === '' ? '0' : e.target.value.replace(/[^0-9]/g, ''))} placeholder="Ej: 30" className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white" />
        {price && descuento && Number(descuento) > 0 && (
          <div className="mt-2 text-center">
            <span className="line-through text-red-500 text-base mr-2">${price}</span>
            <span className="text-green-400 text-xl font-bold">${(Number(price) - (Number(price) * Number(descuento) / 100)).toFixed(2)}</span>
            <span className="text-xs text-green-600 font-semibold ml-2">{descuento}% OFF</span>
          </div>
        )}
        <label className="text-cyan-300 font-semibold flex items-center gap-2">
          <span>📂 Categoría</span>
        </label>
        <select value={categoria} onChange={e => setCategoria(e.target.value)} required className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white">
          <option value="" disabled>Selecciona categoría</option>
          <option value="Remera">Remera</option>
          <option value="Buzo">Buzo</option>
          <option value="Gorra">Gorra</option>
          <option value="Piluso">Piluso</option>
          <option value="Campera">Campera</option>
          <option value="Camiseta">Camiseta</option>
          <option value="Conjuntos">Conjuntos</option>
          <option value="Estampados">Estampados</option>
        </select>
        <label className="text-cyan-300 font-semibold flex items-center gap-2">
          <span>🧑‍🎨 Género</span>
        </label>
        <select value={genero} onChange={e => setGenero(e.target.value)} required className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white">
          <option value="" disabled>Selecciona género</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
          <option value="Unisex">Unisex</option>
          <option value="Niño">Niño</option>
        </select>
        {categoria !== 'Piluso' && categoria !== 'Gorra' && (
          <>
            <label className="text-cyan-300 font-semibold flex items-center gap-2">
              <span>📏 Talles disponibles</span>
            </label>
            <label className="text-cyan-300 font-semibold">Destino</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(genero === 'Niño' ? ['2','4','6','8','10','12','14','16'] : ['XS','S','M','L','XL','XXL']).map(talle => (
                <label key={talle} className={`px-2 py-1 rounded-lg border font-bold text-xs cursor-pointer ${talles.includes(talle) ? 'bg-cyan-300 text-blue-900 border-blue-900' : 'bg-[#23232a] text-cyan-300 border-cyan-300'}`}>
                  <input
                    type="checkbox"
                    value={talle}
                    checked={talles.includes(talle)}
                    onChange={e => {
                      if (e.target.checked) setTalles([...talles, talle]);
                      else setTalles(talles.filter(t => t !== talle));
                    }}
                    className="hidden"
                  />
                  {talle}
                </label>
              ))}
            </div>
          </>
        )}
        <label className="text-cyan-300 font-semibold flex items-center gap-2">
          <span>🏷️ Tipo de producto</span>
        </label>
        <select value={tipo} onChange={e => setTipo(e.target.value)} required className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white">
          <option value="Genérico">Genérico</option>
          <option value="Nuevo">Nuevo</option>
          <option value="SALE">SALE</option>
        </select>
        <label className="text-cyan-300 font-semibold flex items-center gap-2">
          <span>🖼️ Imagen principal</span>
        </label>
        <input type="file" accept="image/*" onChange={e => setImgFile(e.target.files[0])} required className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white" />
        {imgFile && (
          <div className="flex flex-col items-center mt-2">
            <span className="text-xs text-cyan-300 mb-1">Previsualización principal:</span>
            <img src={URL.createObjectURL(imgFile)} alt="Previsualización principal" style={{ maxWidth: 180, maxHeight: 140, borderRadius: 12, boxShadow: '0 2px 12px #00ffff44', border: '2px solid #1565c0' }} />
          </div>
        )}
        <label className="text-cyan-300 font-semibold flex items-center gap-2 mt-2">
          <span>🖼️ Imagen secundaria (opcional)</span>
        </label>
        <input type="file" accept="image/*" onChange={e => setImgFile2(e.target.files[0])} className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white" />
        {imgFile2 && (
          <div className="flex flex-col items-center mt-2">
            <span className="text-xs text-cyan-300 mb-1">Previsualización secundaria:</span>
            <img src={URL.createObjectURL(imgFile2)} alt="Previsualización secundaria" style={{ maxWidth: 180, maxHeight: 140, borderRadius: 12, boxShadow: '0 2px 12px #00ffff44', border: '2px solid #1565c0' }} />
          </div>
        )}
        <label className="text-cyan-300 font-semibold flex items-center gap-2">
          <span>📝 Descripción</span>
        </label>
  <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Ej: Remera 100% algodón, personalizada a tu gusto." required className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white" style={{ minHeight: 100, height: 140, resize: 'vertical' }} />
        <button type="submit" disabled={loading} className="bg-cyan-300 text-blue-900 font-bold rounded-lg px-4 py-2 shadow hover:bg-cyan-400 transition-colors">
          {loading ? 'Agregando...' : 'Agregar producto'}
        </button>
        {success && <div className="text-green-400 font-semibold mt-2">{success}</div>}
        {error && <div className="text-red-400 font-semibold mt-2">{error}</div>}
      </form>
      <div className="mt-8 flex justify-center">
        <Button variant="contained" color="info" startIcon={<InventoryIcon />} onClick={handleOpenProductos}>
          Ver productos subidos
        </Button>
      </div>
      <Dialog open={openProductos} onClose={handleCloseProductos} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', color: 'info.main' }}>
          <InventoryIcon sx={{ fontSize: 40, mb: 1 }} />
          <br />Productos subidos
        </DialogTitle>
        <DialogContent>
          {/* Filtros de búsqueda */}
          <div className="flex flex-wrap gap-3 mb-4 items-center justify-between">
            <input
              type="text"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Buscar por nombre, descripción, destino, etc."
              className="px-3 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white w-full sm:w-64"
            />
            <select value={filterCategoria} onChange={e => setFilterCategoria(e.target.value)} className="px-3 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white">
              <option value="">Categoría</option>
              <option value="Remera">Remera</option>
              <option value="Buzo">Buzo</option>
              <option value="Gorra">Gorra</option>
              <option value="Piluso">Piluso</option>
              <option value="Campera">Campera</option>
              <option value="Camiseta">Camiseta</option>
              <option value="Conjuntos">Conjuntos</option>
              <option value="Selección Argentina">Selección Argentina</option>
            </select>
            <select value={filterGenero} onChange={e => setFilterGenero(e.target.value)} className="px-3 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white">
              <option value="">Género</option>
              <option value="Unisex">Unisex</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Niño">Niño</option>
            </select>
            <select value={filterTipo} onChange={e => setFilterTipo(e.target.value)} className="px-3 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white">
              <option value="">Tipo</option>
              <option value="Genérico">Genérico</option>
              <option value="Nuevo">Nuevo</option>
              <option value="SALE">SALE</option>
            </select>
          </div>
          {/* Filtrar productos */}
          {loadingProductos ? (
            <div className="text-center">Cargando productos...</div>
          ) : productos.length === 0 ? (
            <div className="text-center">No hay productos subidos.</div>
          ) : (
            <List>
              {productos
                .filter(prod => {
                  // Filtro de texto
                  const text = searchText.toLowerCase();
                  const tallesStr = prod.talles ? prod.talles.toString() : "";
                  const destinoStr = Array.isArray(prod.destino) ? prod.destino.join(", ") : (prod.destino || "");
                  return (
                    (!text ||
                      prod.title?.toLowerCase().includes(text) ||
                      prod.desc?.toLowerCase().includes(text) ||
                      prod.categoria?.toLowerCase().includes(text) ||
                      prod.genero?.toLowerCase().includes(text) ||
                      prod.tipo?.toLowerCase().includes(text) ||
                      tallesStr.toLowerCase().includes(text) ||
                      destinoStr.toLowerCase().includes(text)
                    ) &&
                    (!filterCategoria || prod.categoria === filterCategoria) &&
                    (!filterGenero || prod.genero === filterGenero) &&
                    (!filterTipo || prod.tipo === filterTipo)
                  );
                })
                .map(prod => (
                  <ListItem key={prod.id} divider>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 8 }}>
                      <ImageCarousel images={[prod.img, prod.img2].filter(Boolean)} />
                      <ListItemText
                        primary={<span style={{ fontWeight: 'bold', fontSize: 18 }}>{prod.title}</span>}
                        secondary={
                          <div style={{ fontSize: 15 }}>
                            <b>Precio:</b> ${prod.price} {prod.descuento && Number(prod.descuento) > 0 && (<span style={{ color: '#43a047', fontWeight: 'bold', marginLeft: 8 }}>{prod.descuento}% OFF</span>)}<br />
                            <b>Categoría:</b> {prod.categoria} <b>Género:</b> {prod.genero} <b>Tipo:</b> {prod.tipo}<br />
                            <b>Talles:</b> {prod.talles || '-'}<br />
                            <b>Destino:</b> {Array.isArray(prod.destino) ? prod.destino.join(', ') : (prod.destino || '-')}
                            {prod.fecha && (<><br /><b>Fecha:</b> {prod.fecha}</>)}
                            <br /><b>Descripción:</b> {prod.desc}
                          </div>
                        }
                      />
                      <div style={{ display: 'flex', flexDirection: 'row', gap: 12, justifyContent: 'center', marginTop: 6, flexWrap: 'wrap' }}>
                        <Button color="info" startIcon={<EditIcon />} size="medium" sx={{ fontWeight: 'bold', minWidth: 110 }} onClick={() => handleOpenEdit(prod)}>Editar</Button>
                        <Button color="error" startIcon={<DeleteIcon />} size="medium" sx={{ fontWeight: 'bold', minWidth: 110 }} onClick={() => handleOpenDelete(prod)}>Eliminar</Button>
                      </div>
                    </div>
                  </ListItem>
                ))}
            </List>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={handleCloseProductos} color="info" variant="outlined">Cerrar</Button>
        </DialogActions>
      </Dialog>
      {/* Modal eliminar producto */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle sx={{ textAlign: 'center', color: 'error.main', fontWeight: 'bold', fontSize: 22 }}>
          <DeleteIcon sx={{ fontSize: 40, mb: 1 }} />
          <br />¿Seguro que quieres eliminar este producto?
        </DialogTitle>
        <DialogContent>
          <div className="text-center text-lg text-red-500 font-semibold mb-2">
            Esta acción no se puede deshacer.<br />
          </div>
          <div className="text-center">
            <b>Producto:</b> {selectedProd?.title}<br />
            <b>Precio:</b> ${selectedProd?.price}<br />
            <b>Categoría:</b> {selectedProd?.categoria}
          </div>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={handleCloseDelete} color="inherit" variant="outlined" sx={{ fontWeight: 'bold', fontSize: 16 }}>Cancelar</Button>
          <Button onClick={eliminarProducto} color="error" variant="contained" disabled={actionLoading} startIcon={<DeleteIcon />} sx={{ fontWeight: 'bold', fontSize: 16 }}>Eliminar</Button>
        </DialogActions>
      </Dialog>
      {/* Modal editar producto */}
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', color: 'info.main' }}>
          <EditIcon sx={{ fontSize: 40, mb: 1 }} />
          <br />Editar producto
        </DialogTitle>
        <DialogContent>
          <form className="flex flex-col gap-3">
            <label className="text-cyan-300 font-semibold">Nombre del producto</label>
            <input type="text" value={editData.title} onChange={e => setEditData(d => ({ ...d, title: e.target.value }))} placeholder="Ej: Remera Argentina" className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white" />
            <label className="text-cyan-300 font-semibold">Precio</label>
            <input type="text" value={editData.price} onChange={e => setEditData(d => ({ ...d, price: e.target.value }))} placeholder="Ej: 17000" className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white" />
            <label className="text-cyan-300 font-semibold">Categoría</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {["Remera","Buzo","Gorra","Piluso","Campera","Camiseta","Conjuntos","Selección Argentina"].map(cat => (
                <label key={cat} className={`px-2 py-1 rounded-lg border font-bold text-xs cursor-pointer transition-all duration-150 ${editData.categoria === cat ? 'bg-green-500 text-white border-green-700' : 'bg-gray-100 text-gray-700 border-gray-300'}`}>
                  <input
                    type="radio"
                    name="categoria"
                    value={cat}
                    checked={editData.categoria === cat}
                    onChange={() => setEditData(d => ({ ...d, categoria: cat }))}
                    className="hidden"
                  />
                  {cat}
                </label>
              ))}
            </div>
            <label className="text-cyan-300 font-semibold">Género</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {["Unisex","Hombre","Mujer","Niño"].map(gen => (
                <label key={gen} className={`px-2 py-1 rounded-lg border font-bold text-xs cursor-pointer transition-all duration-150 ${editData.genero === gen ? 'bg-green-500 text-white border-green-700' : 'bg-gray-100 text-gray-700 border-gray-300'}`}>
                  <input
                    type="radio"
                    name="genero"
                    value={gen}
                    checked={editData.genero === gen}
                    onChange={() => setEditData(d => ({ ...d, genero: gen }))}
                    className="hidden"
                  />
                  {gen}
                </label>
              ))}
            </div>
            <label className="text-cyan-300 font-semibold">Tipo</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {["Genérico","SALE","Nuevo"].map(tipo => (
                <label key={tipo} className={`px-2 py-1 rounded-lg border font-bold text-xs cursor-pointer transition-all duration-150 ${editData.tipo === tipo ? 'bg-green-500 text-white border-green-700' : 'bg-gray-100 text-gray-700 border-gray-300'}`}>
                  <input
                    type="radio"
                    name="tipo"
                    value={tipo}
                    checked={editData.tipo === tipo}
                    onChange={() => setEditData(d => ({ ...d, tipo: tipo }))}
                    className="hidden"
                  />
                  {tipo}
                </label>
              ))}
            </div>
            <label className="text-cyan-300 font-semibold">Talles</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {["XS","S","M","L","XL","XXL"].map(talle => {
                let tallesArr = editData.talles?.split(',').map(t=>t.trim()).filter(Boolean) || [];
                return (
                  <label key={talle} className={`px-2 py-1 rounded-lg border font-bold text-xs cursor-pointer transition-all duration-150 ${tallesArr.includes(talle) ? 'bg-green-500 text-white border-green-700' : 'bg-gray-100 text-gray-700 border-gray-300'}`}>
                    <input
                      type="checkbox"
                      value={talle}
                      checked={tallesArr.includes(talle)}
                      onChange={e => {
                        let newArr = [...tallesArr];
                        if (e.target.checked) {
                          if (!newArr.includes(talle)) newArr.push(talle);
                        } else {
                          newArr = newArr.filter(t => t !== talle);
                        }
                        setEditData(d => ({ ...d, talles: newArr.join(',') }));
                      }}
                      className="hidden"
                    />
                    {talle}
                  </label>
                );
              })}
            </div>
            <label className="text-cyan-300 font-semibold">Destino</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {["catalogo","principal","seleccion_argentina"].map(dest => {
                // Normalizar el valor a array siempre
                let destArr = Array.isArray(editData.destino)
                  ? editData.destino
                  : String(editData.destino).split(',').map(d=>d.trim()).filter(Boolean);
                return (
                  <label key={dest} className={`px-2 py-1 rounded-lg border font-bold text-xs cursor-pointer transition-all duration-150 ${destArr.includes(dest) ? 'bg-green-500 text-white border-green-700' : 'bg-gray-100 text-gray-700 border-gray-300'}`}>
                    <input
                      type="checkbox"
                      value={dest}
                      checked={destArr.includes(dest)}
                      onChange={e => {
                        let newArr = [...destArr];
                        if (e.target.checked) {
                          if (!newArr.includes(dest)) newArr.push(dest);
                        } else {
                          newArr = newArr.filter(d => d !== dest);
                        }
                        setEditData(d => ({ ...d, destino: newArr }));
                      }}
                      className="hidden"
                    />
                    {dest === 'catalogo' ? 'Catálogo' : dest === 'principal' ? 'Página principal' : 'Selección Argentina'}
                  </label>
                );
              })}
            </div>
            <label className="text-cyan-300 font-semibold">Descuento (%)</label>
            <div className="relative">
              <input 
                type="number" 
                value={editData.descuento || '0'} 
                onChange={e => setEditData(d => ({ ...d, descuento: e.target.value.replace(/[^0-9]/g, '') }))} 
                placeholder="Ej: 20" 
                className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white w-full" 
                min="0" 
                max="100" 
              />
              {editData.price && editData.descuento && Number(editData.descuento) > 0 && (
                <div className="mt-2 bg-[#333] p-2 rounded-lg text-center">
                  <span className="line-through text-red-500">${Number(editData.price).toLocaleString('es-AR')}</span>
                  <span className="text-green-400 text-xl font-bold ml-2">${(Number(editData.price) - (Number(editData.price) * Number(editData.descuento) / 100)).toFixed(2)}</span>
                  <span className="text-xs text-green-600 font-semibold ml-2">{editData.descuento}% OFF</span>
                </div>
              )}
            </div>
            <label className="text-cyan-300 font-semibold">Descripción</label>
            <textarea value={editData.desc} onChange={e => setEditData(d => ({ ...d, desc: e.target.value }))} placeholder="Ej: Remera 100% algodón, personalizada a tu gusto." className="px-4 py-2 rounded-lg border border-cyan-300 bg-[#23232a] text-white" />
          </form>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={handleCloseEdit} color="inherit" variant="outlined">Cancelar</Button>
          <Button onClick={editarProducto} color="info" variant="contained" disabled={actionLoading} startIcon={<EditIcon />}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  </div>
  );
};


export default AdminAgregarProducto;

// Carrusel simple para mostrar dos imágenes con navegación por círculos
function ImageCarousel({ images }) {
  const [index, setIndex] = React.useState(0);
  if (!images.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
      <div style={{ position: 'relative', width: 120, height: 120 }}>
        <img src={images[index]} alt="Producto" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', boxShadow: '0 0 12px #2563eb55' }} />
        {images.length > 1 && (
          <>
            <button onClick={() => setIndex((index - 1 + images.length) % images.length)} style={{ position: 'absolute', left: -18, top: '50%', transform: 'translateY(-50%)', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, fontWeight: 'bold', fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #2563eb44' }}>&lt;</button>
            <button onClick={() => setIndex((index + 1) % images.length)} style={{ position: 'absolute', right: -18, top: '50%', transform: 'translateY(-50%)', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, fontWeight: 'bold', fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #2563eb44' }}>&gt;</button>
          </>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
        {images.map((_, i) => (
          <span key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i === index ? '#2563eb' : '#bfa94a', display: 'inline-block' }} />
        ))}
      </div>
    </div>
  );
}
