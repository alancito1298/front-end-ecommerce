'use client'
import React, { useState } from 'react';

const FormEditarPrecio = ({ producto, onUpdatePrice }) => {
  const [precioNuevo, setPrecioNuevo] = useState(producto.precioProducto);

  const handleEditPrice = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://tu-backend.com/producto/${producto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ precioProducto: parseInt(precioNuevo) }),
      });

      if (response.ok) {
        onUpdatePrice(producto.id, parseInt(precioNuevo)); // Actualiza el precio en el estado del componente padre
        alert('Precio actualizado correctamente');
      } else {
        alert('Error al actualizar el precio');
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error en la conexión');
    }
  };

  return (
    <form onSubmit={handleEditPrice} className="space-y-4 bg-indigo-100 p-6 text-indigo-900 rounded-md">
      <h4 className="text-2xl font-light tracking-tight">Editar Precio de {producto.nombreProducto}</h4>
      <div>
        <label className="block text-sm font-medium text-indigo-900">Nuevo Precio</label>
        <input
          type="number"
          value={precioNuevo}
          onChange={(e) => setPrecioNuevo(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">
        Actualizar Precio
      </button>
    </form>
  );
};

export default FormEditarPrecio;