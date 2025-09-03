import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const CatalogoWsp = ({ productos, whatsappNumber }) => {
  const [nombre, setNombre] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pendingCompra, setPendingCompra] = useState(null);
  const [talles, setTalles] = useState({});

  useEffect(() => {
    const storedNombre = localStorage.getItem('nombreCliente');
    if (storedNombre) setNombre(storedNombre);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const handleTalleChange = (idx, talle) => {
    setTalles(prev => ({ ...prev, [idx]: talle }));
  };

  const handleComprar = (prod, idx) => {
    if (!nombre) {
      setPendingCompra({ prod, idx });
      setShowModal(true);
      return;
    }
    comprar(prod, idx, nombre);
  };

  const comprar = (prod, idx, nombreFinal) => {
    const talle = talles[idx] || '';
    const precioFinal = prod.descuento && Number(prod.descuento) > 0 
      ? (Number(prod.price) - (Number(prod.price) * Number(prod.descuento) / 100)).toFixed(2)
      : prod.price;
    const mensaje = `¡Hola! Mi nombre es ${nombreFinal || 'cliente'} y estoy interesado en el producto "${prod.title}" ($${Number(precioFinal).toLocaleString('es-AR')}).\nCategoría: ${prod.categoria || '-'}\nGénero: ${prod.genero || '-'}\nTalle seleccionado: ${talle}.\n¿Está disponible? Gracias.`;
  window.open(`https://wa.me/5491127117960?text=${encodeURIComponent(mensaje)}`);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Modal para pedir nombre */}
{showModal && (
  <ModalNombreCentered
    nombre={nombre}
    setNombre={setNombre}
    onClose={() => {
      setShowModal(false);
      setPendingCompra(null);
    }}
    onContinuar={() => {
      if (nombre.trim()) {
        localStorage.setItem('nombreCliente', nombre);
        setShowModal(false);
        if (pendingCompra) {
          comprar(pendingCompra.prod, pendingCompra.idx, nombre);
          setPendingCompra(null);
        }
      }
    }}
  />
)}

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl justify-items-center mx-auto"
        style={{ gridAutoRows: '1fr' }}>
        {productos.map((prod, idx) => (
          <ProductCard
            key={idx}
            prod={{
              ...prod,
              talles: typeof prod.talles === 'string' ? prod.talles.split(',') : prod.talles,
              descuento: prod.descuento && prod.descuento !== 'null' ? prod.descuento : '0'
            }}
            idx={idx}
            talleSeleccionado={talles[idx]}
            onTalleChange={handleTalleChange}
            onComprar={handleComprar}
          />
        ))}
      </div>
    </div>
  );
}

export default CatalogoWsp;

// Modal centrado y scroll bloqueado
function ModalNombreCentered({ nombre, setNombre, onClose, onContinuar }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      style={{ top: 0, left: 0, width: '100vw', height: '100vh' }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#101820] rounded-2xl p-8 shadow-2xl flex flex-col items-center max-w-xs w-full border-2 border-cyan-300 relative">
        <button
          className="absolute top-3 right-3 text-cyan-300 hover:text-white text-2xl font-bold focus:outline-none"
          aria-label="Cerrar"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-white font-bold text-lg mb-4 drop-shadow">¿Cómo te llamás?</h2>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Escribe tu nombre..."
          className="w-full px-4 py-2 rounded-lg border-2 border-cyan-300 bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4 font-semibold placeholder:text-cyan-300"
          autoFocus
        />
        <button
          className="bg-cyan-300 text-blue-900 font-bold rounded-lg px-4 py-2 shadow-lg hover:bg-cyan-400 transition-colors w-full border-2 border-blue-900"
          disabled={!nombre.trim()}
          onClick={onContinuar}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
