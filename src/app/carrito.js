'use client';
import React, { useState, useEffect } from 'react';
import ProductoEnCarrito from './components/ProductosEnCarrito';
import ResumenCarrito from './components/ResumenCarrito';
import {
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto,
  calcularTotal,
} from './utils/carritoUtils';

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState(0);

  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoLocal);
    setTotalCarrito(calcularTotal(carritoLocal));
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
          onNuevaCompra={() => setCarrito([])}
          onSeguirComprando={() => (window.location.href = '/productos')}
          onFinalizarCompra={() => (window.location.href = '/resumen')}
        />
      )}
    </div>
  );
}

export default Carrito;
