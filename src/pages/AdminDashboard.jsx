
import React, { useEffect, useState } from 'react';
// Removed unused List, ListItem, ListItemText imports
import AdminAgregarProducto from './AdminAgregarProducto';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Container, Typography, Paper, Card, CardContent, CardActions, Button, TextField, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = 'https://aliceblue-echidna-403440.hostingersite.com/backend/getMensajes.php';
const MARCAR_LEIDO_URL = 'https://aliceblue-echidna-403440.hostingersite.com/backend/marcarLeido.php';
const DELETE_URL = 'https://aliceblue-echidna-403440.hostingersite.com/backend/deleteMensaje.php';
const UPDATE_URL = 'https://aliceblue-echidna-403440.hostingersite.com/backend/updateMensaje.php';

const AdminDashboard = () => {
  // Estado para el modal de productos

  // Cambiar el título de la pestaña al entrar al dashboard
  React.useEffect(() => {
    document.title = 'Admin La Pasión';
    return () => {
      document.title = 'La Pasión';
    };
  }, []);
  // ...existing code...
  // Total de visitas (usa el contador mensual, que incluye todas las visitas del mes actual)
  // Formatea el número de WhatsApp al formato internacional argentino
  const formatWsp = (wsp) => {
    if (!wsp) return '';
    let num = wsp.replace(/\D/g, ''); // solo dígitos
    // Si ya empieza con 549 y tiene 11 o más dígitos, lo dejamos
    if (/^549\d{10,}$/.test(num)) return num;
    // Si empieza con 54 y tiene 11 o más dígitos, agregamos el 9
    if (/^54\d{10,}$/.test(num)) return '549' + num.slice(2);
    // Si empieza con 9 y tiene 10 o más dígitos, agregamos el 54
    if (/^9\d{10,}$/.test(num)) return '54' + num;
    // Si tiene 10 o 11 dígitos, agregamos 549
    if (/^\d{10,11}$/.test(num)) return '549' + num;
    // Si tiene menos, lo dejamos como está
    return num;
  };
  const [totalVisitas, setTotalVisitas] = useState(0);
  // Exportar visitas a Excel
  // const exportarVisitasExcel = async () => {
  //   try {
  // const res = await axios.get('https://aliceblue-echidna-403440.hostingersite.com/backend/getVisitas.php?detalle=1');
  //     if (Array.isArray(res.data.visitas)) {
  //       // Formatear datos para Excel
  //       const datos = res.data.visitas.map(v => ({
  //         ID: v.id,
  //         Fecha: new Date(v.fecha).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
  //         IP: v.ip
  //       }));
  //       const ws = XLSX.utils.json_to_sheet(datos);
  //       // Encabezados bonitos
  //       XLSX.utils.sheet_add_aoa(ws, [['ID', 'Fecha (Argentina)', 'IP']], { origin: 'A1' });
  //       // Ancho de columnas
  //       ws['!cols'] = [
  //         { wch: 8 }, // ID
  //         { wch: 28 }, // Fecha
  //         { wch: 18 }  // IP
  //       ];
  //       const wb = XLSX.utils.book_new();
  //       XLSX.utils.book_append_sheet(wb, ws, "Visitas");
  //       XLSX.writeFile(wb, "visitas_web.xlsx");
  //     } else {
  //       alert('No se encontraron datos de visitas.');
  //     }
  //   } catch (err) {
  //     alert('Error al exportar visitas.');
  //   }
  // };
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  // ids de mensajes leídos (eliminado porque no se usa)
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [editData, setEditData] = useState({ nombre: '', email: '', wsp: '', motivo: '', mensaje: '' });
  const [actionLoading, setActionLoading] = useState(false);
  // Estadísticas de visitas
  const [visitas, setVisitas] = useState({ hoy: 0, semana: 0, mes: 0 });
  const VISITAS_URL = 'https://aliceblue-echidna-403440.hostingersite.com/backend/getVisitas.php';

  useEffect(() => {
    axios.get(VISITAS_URL)
      .then(res => {
        setVisitas(res.data);
        // Usa solo el total histórico del backend
        if (res.data && res.data.total !== undefined) {
          setTotalVisitas(Number(res.data.total));
        } else {
          setTotalVisitas(0);
        }
      })
      .catch(() => {
        setVisitas({ hoy: 0, semana: 0, mes: 0 });
        setTotalVisitas(0);
      });
  }, []);
  const handleOpenDelete = (msg) => {
    setSelectedMsg(msg);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedMsg(null);
  };

  // Abrir modal editar
  const handleOpenEdit = (msg) => {
    setSelectedMsg(msg);
    setEditData({
      nombre: msg.nombre,
      email: msg.email,
      wsp: msg.wsp,
      motivo: msg.motivo,
      mensaje: msg.mensaje
    });
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedMsg(null);
  };

  // Eliminar mensaje
  const eliminarMensaje = async () => {
    if (!selectedMsg) return;
    setActionLoading(true);
    try {
      await axios.post(DELETE_URL, { id: selectedMsg.id });
      setMensajes(prev => prev.filter(m => m.id !== selectedMsg.id));
      handleCloseDelete();
    } catch (err) {
      alert('Error al eliminar');
    }
    setActionLoading(false);
  };

  // Editar mensaje
  const editarMensaje = async () => {
    if (!selectedMsg) return;
    setActionLoading(true);
    try {
      await axios.post(UPDATE_URL, { id: selectedMsg.id, ...editData });
      setMensajes(prev => prev.map(m => m.id === selectedMsg.id ? { ...m, ...editData } : m));
      handleCloseEdit();
    } catch (err) {
      alert('Error al editar');
    }
    setActionLoading(false);
  };

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        if (Array.isArray(res.data)) {
          setMensajes(res.data);
        } else {
          setMensajes([]);
          setError('La respuesta del servidor no es un array.');
        }
        setLoading(false);
      })
      .catch((err) => {
        setMensajes([]);
        setError('Error al conectar con el servidor: ' + err.message);
        setLoading(false);
      });
  }, []);

  // Filtrado de mensajes
  const mensajesFiltrados = mensajes.filter(msg => {
    const texto = `${msg.nombre} ${msg.email} ${msg.motivo} ${msg.mensaje}`.toLowerCase();
    return texto.includes(search.toLowerCase());
  });

  // Contadores
  const totalMensajes = mensajes.length;
  const nuevosMensajes = mensajes.filter(msg => Number(msg.leido) !== 1).length;

  // Marcar como leído (persistente)
  const marcarLeido = async (id) => {
    try {
      await axios.post(MARCAR_LEIDO_URL, { id });
      setMensajes(prev => prev.map(m => m.id === id ? { ...m, leido: 1 } : m));
    } catch (err) {
      alert('Error al marcar como leído');
    }
  };

  // Exportar a Excel
  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(mensajes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Mensajes");
    XLSX.writeFile(wb, "mensajes_contacto.xlsx");
  };

  // Mensaje de bienvenida y fecha/hora Argentina
  const [fechaHoraArgentina, setFechaHoraArgentina] = useState(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setFechaHoraArgentina(
        new Date().toLocaleString('es-AR', {
          timeZone: 'America/Argentina/Buenos_Aires',
          hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

    return (
      <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
        <div className="w-full flex justify-between items-center mb-6 px-2 py-3 bg-gradient-to-r from-cyan-900 via-[#18181b] to-blue-900 rounded-xl shadow-lg border-2 border-cyan-300">
          <a href="/" className="text-cyan-300 font-bold text-lg hover:underline transition-colors">
            Ir al sitio
          </a>
          <button
            className="flex items-center gap-2 bg-red-500 text-white font-bold rounded-lg px-4 py-2 shadow hover:bg-red-600 transition-colors border-2 border-red-700"
            onClick={() => {
              window.location.href = '/login';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      <Paper elevation={6} sx={{ p: 3, borderRadius: 4, bgcolor: '#f5f5f5', mb: 4 }}>
        <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
          Bienvenidos Dj y Sacha
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: '#555', mb: 0 }}>
          Aquí puedes gestionar los mensajes, visitas y el contenido de tu sitio web de manera sencilla y segura.
        </Typography>
      </Paper>
      <Paper elevation={6} sx={{ p: 3, borderRadius: 4, bgcolor: '#f5f5f5' }}>
        <Card elevation={8} sx={{ mb: 4, p: 3, borderRadius: 4, bgcolor: '#e3f2fd', textAlign: 'center', position: 'relative' }}>
          <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <TimelineIcon sx={{ fontSize: 32, color: '#1976d2' }} /> Estadísticas de visitas
          </Typography>
          <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 16 }}>
            {['Hoy', 'Semana', 'Mes'].map((label, idx) => {
              const value = [visitas.hoy, visitas.semana, visitas.mes][idx];
              const color = [
                'rgba(25, 118, 210, 0.7)',
                'rgba(67, 160, 71, 0.7)',
                'rgba(255, 152, 0, 0.7)'
              ][idx];
              return (
                <div key={label} style={{
                  width: 100,
                  height: 100,
                  background: color,
                  borderRadius: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px #0002',
                  position: 'relative',
                  margin: '0 4px'
                }}>
                  <span style={{ fontSize: 36, fontWeight: 'bold', color: '#fff', textShadow: '0 2px 8px #0004' }}>{value}</span>
                  <span style={{ fontSize: 16, color: '#fff', opacity: 0.9, marginTop: 4 }}>{label}</span>
                </div>
              );
            })}
          </div>
          <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mt: 3, mb: 1 }}>
            Total de visitas recibidas: {totalVisitas}
          </Typography>
          <div style={{ width: '100%', marginTop: 32, marginBottom: 8 }}>
            <Typography variant="subtitle2" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
              Línea de tiempo
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ height: 2, background: '#1976d2', flex: 1, borderRadius: 2 }} />
              <Typography variant="body2" sx={{ color: '#333', px: 2, py: 0.5, borderRadius: 2, bgcolor: '#e3f2fd', fontWeight: 'bold', boxShadow: 1 }}>
                {fechaHoraArgentina}
              </Typography>
              <div style={{ height: 2, background: '#1976d2', flex: 1, borderRadius: 2 }} />
            </div>
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
              (Próximamente podrás navegar por meses desde aquí)
            </Typography>
          </div>
        </Card>
        {/* Sección para agregar productos entre visitas y mensajes */}
  <Paper elevation={8} sx={{ p: { xs: 1, sm: 4 }, borderRadius: 4, bgcolor: '#e3f2fd', mb: 4, width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
          <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
            Agregar producto
          </Typography>
          {/* Se eliminó la sección explicativa solicitada */}
          <AdminAgregarProducto />
        </Paper>
        <Card elevation={8} sx={{ mb: 4, p: 3, borderRadius: 4, bgcolor: '#e3f2fd', textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
            Mensajes recibidos
          </Typography>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 3, bgcolor: '#fff', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: '#333', mb: 1 }}>
                  Total de mensajes
                </Typography>
                <Typography variant="h2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  {totalMensajes}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 3, bgcolor: '#fff', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: '#333', mb: 1 }}>
                  Mensajes sin leer
                </Typography>
                <Typography variant="h2" sx={{ color: nuevosMensajes > 0 ? 'red' : 'green', fontWeight: 'bold' }}>
                  {nuevosMensajes}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Card>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Buscar mensaje"
              variant="outlined"
              value={search}
              onChange={e => setSearch(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="success"
              startIcon={<FileDownloadIcon />}
              fullWidth
              onClick={exportarExcel}
            >
              Exportar a Excel
            </Button>
          </Grid>
        </Grid>
        {loading ? (
          <Typography align="center">Cargando...</Typography>
        ) : error ? (
          <Typography align="center" color="error" sx={{ mt: 4 }}>
            {error}
          </Typography>
        ) : mensajesFiltrados.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
            No hay mensajes registrados.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {mensajesFiltrados.map((msg) => (
              <Grid item xs={12} key={msg.id}>
                <Card elevation={3} sx={{ mb: 2, borderRadius: 3, position: 'relative', bgcolor: '#fff', p: { xs: 1, sm: 2 } }}>
                  <CardContent sx={{ pb: 1 }}>
                    {Number(msg.leido) === 1 && (
                      <Typography sx={{ position: 'absolute', top: 16, right: 16, bgcolor: '#43a047', color: 'white', px: 2, py: 0.5, borderRadius: 2, fontWeight: 'bold', fontSize: 15, zIndex: 2, boxShadow: 2 }}>
                        Leído
                      </Typography>
                    )}
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontSize: { xs: 13, sm: 15 } }}>
                      #{msg.id} - {msg.fecha}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', fontSize: { xs: 18, sm: 22 } }}>
                      {msg.nombre}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: 13, sm: 15 } }}>
                      <b>Email:</b> {msg.email}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: 13, sm: 15 } }}>
                      <b>WhatsApp:</b> {msg.wsp}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: 13, sm: 15 } }}>
                      <b>Motivo:</b> {msg.motivo}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: 14, sm: 16 } }}>
                      <b>Mensaje:</b> {msg.mensaje}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', fontStyle: 'italic', fontSize: { xs: 13, sm: 15 } }}>
                      Puedes responderle directamente usando los botones de WhatsApp o Email aquí abajo.
                    </Typography>
                  </CardContent>
                  <Grid container spacing={1} sx={{ px: 2, pb: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <CardActions sx={{ justifyContent: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                        {Number(msg.leido) !== 1 ? (
                          <Button size="small" variant="outlined" sx={{ color: '#ff9800', borderColor: '#ff9800', fontWeight: 'bold' }} onClick={() => marcarLeido(msg.id)}>
                            Marcar como leído
                          </Button>
                        ) : (
                          <Button size="small" variant="outlined" sx={{ color: '#43a047', borderColor: '#43a047', fontWeight: 'bold' }} disabled>
                            Ya leído
                          </Button>
                        )}
                        <IconButton color="error" onClick={() => handleOpenDelete(msg)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="info" onClick={() => handleOpenEdit(msg)}>
                          <EditIcon />
                        </IconButton>
                      </CardActions>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CardActions sx={{ justifyContent: 'flex-end', flexWrap: 'wrap', gap: 1 }}>
                        <Button
                          size="small"
                          color="success"
                          startIcon={<WhatsAppIcon />}
                          href={`https://wa.me/${formatWsp(msg.wsp)}`}
                          target="_blank"
                        >
                          WhatsApp
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          startIcon={<EmailIcon />}
                          href={`mailto:${msg.email}`}
                          target="_blank"
                        >
                          Email
                        </Button>
                      </CardActions>
                    </Grid>
                  </Grid>
      <Dialog open={openDelete} onClose={handleCloseDelete} TransitionComponent={Slide}>
        <DialogTitle sx={{ textAlign: 'center', color: 'error.main' }}>
          <DeleteIcon sx={{ fontSize: 40, mb: 1 }} />
          <br />¿Seguro que quieres eliminar este mensaje?
        </DialogTitle>
        <DialogContent>
          <Typography align="center" sx={{ mb: 2 }}>
            <b>De:</b> {selectedMsg?.nombre}<br />
            <b>Email:</b> {selectedMsg?.email}<br />
            <b>Mensaje:</b> {selectedMsg?.mensaje}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={handleCloseDelete} color="inherit" variant="outlined">Cancelar</Button>
          <Button onClick={eliminarMensaje} color="error" variant="contained" disabled={actionLoading} startIcon={<CheckCircleOutlineIcon />}>Eliminar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal editar */}
      <Dialog open={openEdit} onClose={handleCloseEdit} TransitionComponent={Slide}>
        <DialogTitle sx={{ textAlign: 'center', color: 'info.main' }}>
          <EditIcon sx={{ fontSize: 40, mb: 1 }} />
          <br />Editar mensaje
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField label="Nombre" fullWidth value={editData.nombre} onChange={e => setEditData(d => ({ ...d, nombre: e.target.value }))} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email" fullWidth value={editData.email} onChange={e => setEditData(d => ({ ...d, email: e.target.value }))} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="WhatsApp" fullWidth value={editData.wsp} onChange={e => setEditData(d => ({ ...d, wsp: e.target.value }))} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Motivo" fullWidth value={editData.motivo} onChange={e => setEditData(d => ({ ...d, motivo: e.target.value }))} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Mensaje" fullWidth multiline minRows={2} value={editData.mensaje} onChange={e => setEditData(d => ({ ...d, mensaje: e.target.value }))} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={handleCloseEdit} color="inherit" variant="outlined">Cancelar</Button>
          <Button onClick={editarMensaje} color="info" variant="contained" disabled={actionLoading} startIcon={<CheckCircleOutlineIcon />}>Guardar</Button>
        </DialogActions>
      </Dialog>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
