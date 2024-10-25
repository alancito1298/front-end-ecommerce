'use client'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const PanelAgregarProducto = ({ onAddProduct }) => {
  const [nombreProducto, setNombre] = useState('');
  const [precioProducto, setPrecio] = useState('');
  const [detalleProducto, setDetalle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);// Estado para controlar el envío

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Valida que los campos no estén vacíos
    if (!nombreProducto || !precioProducto) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    const nuevoProducto = {
      id: uuidv4(),
      nombreProducto,
      precioProducto: parseInt(precioProducto),
      detalleProducto,
    };
  
    try {
      const response = await fetch('https://back-end-artlimpieza.vercel.app/producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });
  
      if (response.ok) {
        onAddProduct(nuevoProducto); // Actualizar el estado del producto en el componente padre
        setNombre(''); // Limpiar los campos del formulario
        setPrecio(0);
        setDetalle('');
      } else {
        console.error('Error al agregar el producto');
      }
  
    
    } catch (error) {
      console.error('Error al enviar el producto:', error);
      alert('Hubo un error al agregar el producto.');
    }
    finally {
      setIsSubmitting(false); // Rehabilitar el botón después del envío
      setTimeout(() => window.location.reload(), 500);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mx-5 my-36 bg-indigo-100 p-6 text-indigo-900 rounded-md" >
      <h4 className='text-4xl font-light tracking-tight text-indigo-900 uppercase'>AGREGA UN PRODUCTO</h4>
      <div>
        <label className="block text-sm font-medium text-indigo-900 ">Nombre del Producto</label>
        <input
          type="text"
          value={nombreProducto}
          onChange={(e) => setNombre(e.target.value)}
          className="text-indigo-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:text-blue-600 focus:border-indigo-500 sm:text-sm"
          required
          
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Precio</label>
        <input
          type="number"
          value={precioProducto}
          onChange={(e) => setPrecio(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border text-indigo-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      
      <div>
        <label className="block text-sm font-medium">Detalle</label>
        <input
          type="text"
          value={detalleProducto}
          onChange={(e) => setDetalle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border text-indigo-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
 

      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Agregar Producto
      </button>
    </form>
  );
};

export default PanelAgregarProducto;