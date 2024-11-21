'use client';
import React, { useState, useEffect } from 'react';
import ProductoEnCarrito from './components/ProductosEnCarrito';
import ResumenCarrito from './components/ResumenCarrito';
import {
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto,
  calcularTotal,
  actualizarLocalStorage
} from './utils/carritoUtils';
import Aviso from './components/Aviso';
import { manejarAviso } from './utils/manejarAviso';

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [mensajeAviso, setMensajeAviso] = useState('');
  const [colorAviso, setColorAviso] = useState('');

 
  // Cargar carrito desde localStorage al montar el componente
  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoLocal);
    setTotalCarrito(calcularTotal(carritoLocal));
  }, []);

  // Limpiar carrito
  const vaciarCarrito = () => {
    const nuevoCarrito = [];
    setCarrito(nuevoCarrito);
    actualizarLocalStorage(nuevoCarrito);
    setTotalCarrito(0);
    manejarAviso('Carrito vacío con éxito', 'bg-red-600', setMensajeAviso, setColorAviso, setMostrarAviso);
  };


  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-16">
      <h1 className="text-2xl font-bold mb-4 text-indigo-800 uppercase mt-10">Carrito de Compras</h1>
      <div className="w-4/5 bg-indigo-200 rounded-lg shadow-md p-2 gap-3 ">
        {carrito.length > 0 ? (
          carrito.map((producto) => (
            <ProductoEnCarrito
              key={producto.id}
              producto={producto}
              onAumentar={() => aumentarCantidad(producto.id, carrito, setCarrito, setTotalCarrito)}
              onDisminuir={() => disminuirCantidad(producto.id, carrito, setCarrito, setTotalCarrito)}
              onEliminar={() => eliminarProducto(producto.id, carrito, setCarrito, setTotalCarrito)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Tu carrito está vacío</p>
        )}
      </div>
      {carrito.length > 0 && (
        <ResumenCarrito
       
          total={totalCarrito}
          onNuevaCompra={vaciarCarrito}
          onSeguirComprando={() => (window.location.href = '/productos')}
          onFinalizarCompra={() => (window.location.href = '/resumen')}
        />
        
      )
      }
      <Aviso
        mensaje={mensajeAviso}
        color={colorAviso}
        mostrar={mostrarAviso}
        onClose={() => setMostrarAviso(false)}
      />
    </div>
  );
}

export default Carrito;
