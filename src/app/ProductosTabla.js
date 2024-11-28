'use client';

import React, { useEffect, useState } from 'react';
import PanelAgregarProducto from './components/panelAgregarProducto';

function ProductosTabla() {
  const [productos, setProductos] = useState([]);

  // Cargar los productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:8000/producto'); 
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const productos = await response.json();
      if (Array.isArray(productos)) {
        setProductos(productos);
      } else {
        console.error('El formato de productos no es correcto:', productos);
        setProductos([]); // O cualquier valor por defecto
      }
    } catch (error) {
      console.error('Error:', error);
      setProductos([]); // Asegura que productos siempre sea un array
    }
  };
    

 
  fetchProductos();
 
}, []);

  // Función para agregar un nuevo producto
const handleAddProduct = async (nuevoProducto) => {
  // Lógica para enviar el nuevo producto a la API
  try {
    const response = await fetch('https://back-end-artlimpieza.vercel.app/producto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const productoAgregado = await response.json(); // Obtener el producto que devuelve el servidor
    
    // Agregar el nuevo producto al estado local solo si la API respondió correctamente
    setProductos((prevProductos) => [...prevProductos, productoAgregado]);

    console.log('Producto agregado con éxito');
  } catch (error) {
    console.error('Error al enviar el producto:', error);
  }
};

  // Función para eliminar un producto
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://back-end-artlimpieza.vercel.app/producto?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProductos((prevProductos) =>
          prevProductos.filter((producto) => producto.id !== id)
        );
      } else {
        console.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <div className="p-0">
      <h3 className="text-center bg-indigo-600 uppercase">Panel de Administrador</h3>

      {/* Panel para agregar un nuevo producto */}
      <div className="my-4">
        <PanelAgregarProducto onAddProduct={handleAddProduct} />
      </div>

      {/* Tabla de productos */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
            <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
            <th className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.keys(productos).map(key => {
            const producto = productos[key];
            return(
            <tr key={producto.precioProducto}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{producto.nombreProducto}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${Number.isFinite(producto.precioProducto) ? producto.precioProducto.toFixed(2) : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex flex-col text-sm font-medium">
                <button className="bg-cyan-600 text-white px-4 py-2 rounded-md  hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-600">Act</button>
                <button onClick={() => handleDelete(productos.id)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 ml-2">Eli</button>
              </td>
            </tr>
         ); })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductosTabla;
