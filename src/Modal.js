import React, { useEffect } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      // Solo bloquear scroll sin cambiar posición
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
