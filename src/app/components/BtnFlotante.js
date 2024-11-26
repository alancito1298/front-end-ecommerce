
import React from 'react';





const BtnFlotante = ({ texto, color, icono, onClick }) => (
  <button
    onClick={onClick}
    className={`ml-2 h-10 w-auto ${color} text-white p-0 gap-2 uppercase px-3 rounded fixed bottom-2 right-2 flex flex-row items-center  justify-center w-64`}
  >
    {icono} {/* Renderiza el ícono aquí */}
    {texto}
  </button>
);

export default BtnFlotante;
