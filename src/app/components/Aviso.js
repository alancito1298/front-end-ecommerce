'use client';

import React, { useState, useEffect } from 'react';

function Aviso({ mensaje, color, mostrar, onClose }) {
  const [visible, setVisible] = useState(mostrar);
  

  useEffect(() => {
    setVisible(mostrar);

    if (mostrar) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose && onClose(); // Llama la función onClose si está definida
      }, 3000); // Duración del aviso (3 segundos)

      return () => clearTimeout(timer);
    }
  }, [mostrar, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded shadow-md text-white font-medium ${color}`}
    >
      {mensaje}
    </div>
  );
}

export default Aviso;
