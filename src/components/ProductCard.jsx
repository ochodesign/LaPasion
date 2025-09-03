import React, { useState, useRef, useEffect } from 'react';

const ProductCard = ({ prod, idx, onTalleChange, talleSeleccionado, onComprar }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState('center center');
  const imgRef = useRef(null);
  const images = [prod.img, prod.img2].filter(Boolean);
  
  // Debug product data
  useEffect(() => {
    console.log(`Producto ${idx} datos:`, {
      titulo: prod.title,
      precio: prod.price,
      descuento: prod.descuento,
      valorDescuento: Number(prod.descuento),
      descuentoString: String(prod.descuento),
      tieneDescuento: prod.descuento && prod.descuento !== '0' && prod.descuento !== 0 && prod.descuento !== null && prod.descuento !== 'null',
      precioConDescuento: prod.descuento && Number(prod.descuento) > 0 ? 
        Number(prod.price * (1 - Number(prod.descuento)/100)).toFixed(2) : null,
      tipoDescuento: typeof prod.descuento
    });
  }, [prod, idx]);
  
  // Efecto para manejar el zoom en dispositivos móviles
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        setIsZoomed(true);
        const rect = img.getBoundingClientRect();
        const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
        setTransformOrigin(`${x}% ${y}%`);
      }
    };
    
    const handleTouchMove = (e) => {
      if (isZoomed && e.touches.length === 1) {
        e.preventDefault(); // Prevenir scroll de la página
        const rect = img.getBoundingClientRect();
        const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
        setTransformOrigin(`${x}% ${y}%`);
      }
    };
    
    const handleTouchEnd = () => {
      setIsZoomed(false);
      setTransformOrigin('center center');
    };
    
    // Manejar el movimiento del mouse para el zoom en desktop
    const handleMouseMove = (e) => {
      if (isZoomed) {
        const rect = img.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setTransformOrigin(`${x}% ${y}%`);
      }
    };
    
    // Usar addEventListener con passive: false para poder usar preventDefault
    img.addEventListener('touchstart', handleTouchStart, { passive: false });
    img.addEventListener('touchmove', handleTouchMove, { passive: false });
    img.addEventListener('touchend', handleTouchEnd);
    img.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      img.removeEventListener('touchstart', handleTouchStart);
      img.removeEventListener('touchmove', handleTouchMove);
      img.removeEventListener('touchend', handleTouchEnd);
      img.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isZoomed]);

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg p-4 w-full max-w-xs relative">
      {/* Header con badges minimalistas */}
      <div className="flex justify-between items-start mb-3 h-6">
        {prod.tipo === 'Nuevo' && (
          <span className="bg-red-500 text-white font-bold text-xs px-2 py-1 rounded-sm">NUEVO</span>
        )}
        {prod.tipo === 'SALE' && (
          <span className="bg-yellow-400 text-blue-900 font-bold text-xs px-2 py-1 rounded-sm">SALE</span>
        )}
        {prod.categoria && (
          <span className="bg-gray-100 text-gray-700 font-medium text-xs px-2 py-1 rounded-sm ml-auto">{prod.categoria}</span>
        )}
      </div>
      {/* Carrusel de imágenes con zoom */}
      <div className="mb-4 flex flex-col items-center">
        <div className="relative w-full h-48 overflow-hidden rounded-xl">
          <img 
            ref={imgRef}
            src={images[imgIndex]} 
            alt={prod.title} 
            className="w-full h-full object-cover rounded-xl cursor-zoom-in" 
            style={{
              transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
              transformOrigin: transformOrigin,
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => {
              setIsZoomed(false);
              setTransformOrigin('center center');
            }}
          />
        </div>
        {images.length > 1 && (
          <div className="flex items-center justify-between mt-2 w-full">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shadow"
              onClick={() => setImgIndex((imgIndex - 1 + images.length) % images.length)}
              aria-label="Anterior"
              type="button"
            >
              &#60;
            </button>
            <div className="flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === imgIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                  onClick={() => setImgIndex(i)}
                  aria-label={`Imagen ${i + 1}`}
                  type="button"
                />
              ))}
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shadow"
              onClick={() => setImgIndex((imgIndex + 1) % images.length)}
              aria-label="Siguiente"
              type="button"
            >
              &#62;
            </button>
          </div>
        )}
      </div>
      <div className="text-center flex-grow flex flex-col">
        <h3 className="text-gray-900 font-bold text-lg mb-2 leading-tight">{prod.title}</h3>
        {prod.descuento && prod.descuento !== '0' && prod.descuento !== 0 && prod.descuento !== null && prod.descuento !== 'null' ? (
          <div className="bg-green-50 border-2 border-green-200 text-green-800 font-bold rounded-lg py-2 px-3 mb-3">
            <div className="flex items-center justify-center gap-2">
              <span className="line-through text-red-500 text-sm">${Number(prod.price).toLocaleString('es-AR')}</span>
              <span className="text-green-800 text-xl font-bold">${(Number(prod.price) - (Number(prod.price) * Number(prod.descuento) / 100)).toLocaleString('es-AR', {minimumFractionDigits: 0, maximumFractionDigits: 2})}</span>
              <span className="text-xs bg-red-500 text-white font-semibold px-2 py-1 rounded-full">{Number(prod.descuento)}% OFF</span>
            </div>
          </div>
        ) : (
          <div className={`bg-green-50 border-2 border-green-200 text-green-800 font-bold rounded-lg py-2 px-3 mb-3 ${prod.price.length > 6 ? 'text-lg' : prod.price.length > 4 ? 'text-xl' : 'text-2xl'}`}>
            {'$' + Number(prod.price).toLocaleString('es-AR')}
          </div>
        )}
        <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-3 flex-grow">{prod.desc}</p>
        {prod.genero && (
          <div className="flex justify-center mb-3">
            <span className="bg-blue-50 text-blue-700 font-medium text-xs px-3 py-1 rounded-full border border-blue-200">{prod.genero}</span>
          </div>
        )}
      </div>
      {/* Selector de talles */}
      {prod.categoria !== 'Piluso' && prod.categoria !== 'Gorra' && prod.talles && Array.isArray(prod.talles) && prod.talles.length > 0 && (
        <div className="w-full mb-4">
          <div className="text-center text-xs text-gray-500 mb-1">Talle</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {prod.talles.map(talle => (
              <button
                key={talle}
                className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer transition-all ${talleSeleccionado === talle ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                onClick={() => onTalleChange && onTalleChange(idx, talleSeleccionado === talle ? '' : talle)}
                type="button"
              >
                {talle}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Botón comprar */}
      {onComprar && (
        <button
          className="bg-blue-600 text-white font-bold rounded-lg px-4 py-2 shadow hover:bg-blue-700 transition-colors w-full"
          onClick={() => onComprar(prod, idx)}
        >
          Comprar
        </button>
      )}
    </div>
  );
};

export default ProductCard;
