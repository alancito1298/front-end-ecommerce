// Btn.js
import React from 'react';

const Btn = ({ texto, color, icono, onClick }) => (
  <button
    onClick={onClick}
    className={`ml-2 h-12 ${color} text-white p-0 gap-2 uppercase px-3 rounded flex flex-row items-center  justify-center w-64`}
  >
    {icono} {/* Renderiza el ícono aquí */}
    {texto}
  </button>
);

export default Btn;
