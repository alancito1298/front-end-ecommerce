import React from 'react';

const BtnSecudario = ({ color, icono, onClick }) => (
  <button
    onClick={onClick}
    className={`ml-2 h-12 ${color} text-white p-0 gap-2 uppercase px-3 rounded flex flex-row items-center justify-start w-12`}
  >
    {icono} 
    
  </button>
);

export default BtnSecudario;
