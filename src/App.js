import './App.css';
import MainPage from './pages/MainPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginAdmin from './pages/LoginAdmin';
import CatalogoCompleto from './pages/CatalogoCompleto';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Header from './components/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollUpButton from './components/ScrollUpButton';
import FloatingWsp from './components/FloatingWsp';




function App() {
  useEffect(() => {
    if (window.location.pathname === '/') {
      const lastVisit = localStorage.getItem('ultimaVisita');
      const now = Date.now();
      // Solo registrar si pasaron más de 60 segundos desde la última visita
      if (!lastVisit || now - parseInt(lastVisit) > 60000) {
        axios.get('https://ochodesignweb.com/backend/registrarVisita.php');
        localStorage.setItem('ultimaVisita', now.toString());
      }
    }
    // Atajos de teclado globales
    const handleKeyDown = (e) => {
      // Escape: cerrar modales genéricos
      if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal, [role="dialog"], .MuiDialog-root');
        modals.forEach(modal => {
          // Intenta cerrar modales con botón X
          const closeBtn = modal.querySelector('[aria-label="Cerrar"], .close, .MuiDialog-close');
          if (closeBtn) closeBtn.click();
        });
      }
      // Ctrl+F: buscar (nativo)
      if (e.ctrlKey && e.key.toLowerCase() === 'f') {
        // Dejar que el navegador maneje
        return;
      }
      // Ctrl+S: guardar (evitar recarga)
      if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        // Puedes disparar una función de guardado global aquí
        window.dispatchEvent(new CustomEvent('globalSave'));
      }
      // Ctrl+P: imprimir
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        window.print();
      }
      // Ctrl+Shift+N: nuevo producto (ejemplo)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('nuevoProducto'));
      }
      // Ctrl+Shift+D: ir al dashboard
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        window.location.href = '/admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: true,
      offset: 60,
    });
  }, []);
  // Detectar ruta actual
  const pathname = window.location.pathname;
  const isDashboard = pathname === '/admin';
  const isMainPage = pathname === '/' || pathname === '/catalogo';

  return (
    <BrowserRouter>
      {!isDashboard && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={localStorage.getItem('adminAuth') === 'true' ? <AdminDashboard /> : <LoginAdmin />} />
        <Route path="/catalogo" element={<CatalogoCompleto />} />
      </Routes>
      {isDashboard && <ScrollUpButton />}
  {isMainPage && <><ScrollUpButton /><FloatingWsp /></>}
    </BrowserRouter>
  );
}

export default App;
