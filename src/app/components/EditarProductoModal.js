'use client'
import React, { useState } from 'react';
import Btn from './Btn';

const EditarProductoModal = ({ producto, onClose, onActualizar }) => {
  const [precioNuevo, setPrecioNuevo] = useState(producto.precioProducto);

  const actualizarPrecio = async () => {
    try {
      const response = await fetch(
        `https://back-end-artlimpieza.vercel.app/producto/${producto.productoId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ precioProducto: parseInt(precioNuevo) }),
        }
      );

      if (response.ok) {
        onActualizar({ ...producto, precioProducto: parseInt(precioNuevo) });
      } else {
        console.error('Error al actualizar el precio');
      }
    } catch (error) {
      console.error('Error al enviar el precio:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg gap-2">
        <h2 className="text-2xl font-light tracking-tight text-indigo-900 uppercase">Editar Precio</h2>
        <input
          type="number"
          value={precioNuevo}
          onChange={(e) => setPrecioNuevo(e.target.value)}
          className="mt-4 w-full h-12 p-2 text-xl border rounded text-red-600"
          placeholder="Nuevo precio"
          aria-label="Nuevo precio"
        />
        <div className="flex flex-col justify-center items-center gap-2 mt-3">
          <Btn texto="Actualizar" color="bg-blue-400" onClick={actualizarPrecio} />
          <Btn texto="Cancelar" color="bg-red-400" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default EditarProductoModal;