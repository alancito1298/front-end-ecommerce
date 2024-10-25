'use client';
import Link from 'next/link';
import borrarProducto from './funciones/borrarProducto';
import formatearDinero from './funciones/darFormatoDinero';
import React, { useEffect, useState } from 'react';

function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('https://back-end-artlimpieza.vercel.app/producto');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const productosJson = await response.json();
        const productosArray = Object.keys(productosJson).map((key) => ({
          ...productosJson[key],
          productoId: key,  // Asigna la clave única al campo `productoId` o el nombre que corresponda
        }));

        // Ordenar alfabéticamente por 'nombreProducto'
      productosArray.sort((a, b) => a.nombreProducto.localeCompare(b.nombreProducto));

        setProductos(productosArray);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
   
   
   
    };

    fetchProductos();
  }, []);

  const eliminarProducto = async (productoId) => {
    try {
      const response = await fetch(`https://back-end-artlimpieza.vercel.app/producto/${productoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      setProductos(productos.filter(producto => producto.productoId !== productoId));
      mostrarAviso('Producto eliminado');
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const mostrarAviso = (mensaje) => {
    setMensaje(mensaje);
    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 2000);
  };

  return (
    <div className="bg-white">

      <div className="w-1/1 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl  lg:px-8">
        <h2 className="text-3xl font-light tracking-tight text-indigo-900 uppercase">ADMINISTRAR PRODUCTOS</h2>
  
        <div className="mt-6 gap-x-6 gap-y-10 flex flex-col ">
          { productos.length > 0 ? (
            productos.map((producto) => (
              
              <div key={producto.id} className="flex flex-col ">
                <div className="mt-0 flex justify-around items-center border-b-2 border-gray-200">
                  <div className='w-1/2'>
                    <h3 className="text-xl  w m-4 p-0 flex-initial w-auto uppercase text-indigo-950">
                      {producto.nombreProducto|| "sin nombre"}  
                    </h3><p className="mt-1 m-6 text-sm text-indigo-400">{producto.detalleProducto}</p> {/* Asegúrate de que el JSON tenga el campo 'detalleProducto' */}
                    <p className="text-sm font-medium text-red-900 mr-1 ml-4 w-10"><small className='m-1'>$</small>{formatearDinero(producto.precioProducto)}</p>
                  </div>
                 <div className='flex felx-col items-center justify-start m-0'> 
                
              
                
                <button
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded flex-none w-14"
                    onClick={() => eliminarProducto(producto.productoId)}
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                  </svg>
                  </button>

                  <button
                    className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded flex-none w-14"
                    onClick={() => editarProducto(key)}
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                   <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg>
                  </button>
                           
              
               </div>
                </div>
              </div>
            )))
             : (
            <p className="text-center text-red-600">Cargando productos...</p>
          )}
        </div>
      </div>
      <Link  className="ml-2 bg-blue-500 text-white px-2 py-1 rounded block w-1/2 m-auto" href="/carrito">volver a inicio</Link>
      {/* Notificación */}
      {mostrarMensaje && (
          <div className="fixed top-0 right-0 m-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
            {mensaje}
          </div>
        )}
    </div>
  );
}

export default ProductosAdmin;
