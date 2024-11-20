import React from 'react';

const Notificacion = ({ mensaje }) => (
  <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded">
    {mensaje}
  </div>
);

export default Notificacion;
