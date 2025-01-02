import React from 'react';

const BtnSecudario = ({ color, icono, onClick }) => (
  <button
    onClick={onClick}
    className={`ml-2 h-10 ${color} text-white  gap-2 uppercase p-1 rounded flex flex-row items-center justify-start w-10`}
  >
    {icono} 
    
  </button>
);

export default BtnSecudario;
