'use client';
import React, { useState, useEffect } from 'react';
import formatearDinero from "./funciones/darFormatoDinero"
import Btn from './components/btn';
import BtnSecudario from './components/btn-secundario';
import Icon from './icon/icons';




function Carrito() {
  const [carrito, setCarrito] = useState([]); // Estado para almacenar los productos en el carrito
  const [totalCarrito, setTotalCarrito] = useState(0); // Estado para almacenar el total del carrito

  useEffect(() => {
    // Obtener el carrito desde el localStorage al cargar el componente
    const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoLocal);
  }, []);

  // Se recalcula el total del carrito cada vez que cambie el carrito
  useEffect(() => {
    calcularTotal(carrito); // Calcula el total del carrito
  }, [carrito]);

  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map((producto) => {
      if (producto.id === id) {
        return { ...producto, quantity: producto.quantity + 1 };
      }
      return producto;
    });
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito
      .map((producto) => {
        if (producto.id === id && producto.quantity > 1) {
          return { ...producto, quantity: producto.quantity - 1 };
        }
        return producto;
      })
      .filter((producto) => producto.quantity > 0); // Elimina productos con cantidad 0
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const limpiarCarrito = () => {
    const confirmar = window.confirm('¿Estás seguro de que quieres inciar nueva compra?, se borrarán todos los productos del carrito ');
    if(confirmar){
    const nuevoCarrito = []; 
    setCarrito(nuevoCarrito); 
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito)); 
  }
  };

  const handleRedirectProductos = () => {
    window.location.href = '/productos'; // Redirige a la URL deseada
  };
  const handleRedirectFactura = () => {
    window.location.href = '/resumen'; // Redirige a la URL deseada
  };

  // Función para calcular el total del carrito
  const calcularTotal = (carritoActual = []) => {
    const total = carritoActual.reduce(
      (acc, producto) => acc + producto.precioProducto * producto.quantity,
      0
    );
    setTotalCarrito(total); // Actualiza el total del carrito
  };

  // Función para calcular el subtotal de un producto
  const obtenerSubtotal = (producto) => {
    return producto.precioProducto * producto.quantity;
  };

  return (
    <div className="bg-indigo-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-light tracking-tight text-indigo-900 uppercase">Carrito de Compras</h2>

        <div className="mt-6">
          {carrito.length === 0 ? (
            <p className="text-gray-500">El carrito está vacío.</p>
          ) : (
            <div className="flex gap-x-6 gap-y-10 xl:gap-x-8 flex-col">
              {carrito.map((producto) => (
                <div
                  key={producto.id}
                  className="flex flex-row items-center justify-between gap-7 border p-4 rounded-md shadow-md bg-gray-100"
                >
                  <div className="w-auto flex flex-col items-start pl-0">
                    <h3 className="text-xl uppercase p-0 text-indigo-900">{producto.nombreProducto}</h3>
                    <p className="mt-1 text-sm font-medium text-indigo-300">{producto.detalleProducto}</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      <small className="indigo-900">Cantidad:</small>{' '}
                      <strong className="text-indigo-600">{producto.quantity}</strong>
                    </p>
                    <p className="text-sm font-medium text-green-900">${formatearDinero(producto.precioProducto)}</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      <small className="indigo-900 uppercase">Subtotal:</small>{' '}
                      <strong className="text-indigo-600">${formatearDinero(obtenerSubtotal(producto))}</strong>
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-end gap-2 h-auto w-1/3">
                   
                  
                    <BtnSecudario
        color="bg-red-600"
        icono={Icon.disminuir}
        onClick={() => disminuirCantidad(producto.id)}
      />
                    <BtnSecudario
        color="bg-gray-600"
        icono={Icon.eliminar}
        onClick={() => eliminarProducto(producto.id)}
      />
                   <BtnSecudario
        color="bg-green-600"
        icono={Icon.aumentar}
        onClick={() => aumentarCantidad(producto.id)}
      />    
                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-4 text-l font-bold text-white " >
          <span className="flex flex-row items-center justify-end gap-7 border p-4 rounded-md shadow-md bg-indigo-400">Total del Carrito: <strong className='text-red-500 text-xl bg-white p-2 rounded-md'>${formatearDinero(totalCarrito)}</strong></span>
          
      </div>
      </div>
          
          <div className='flex flex-col items-center gap-4 p-auto pt-0 text-xl'>
          

          <Btn
        texto="Seguir Comprando"
        color="bg-green-700 "
        icono={Icon.seguirComprando}
        onClick={handleRedirectProductos}
      />
        <Btn
        texto="Finalizar Compra"
        color="bg-indigo-700  "
        icono={Icon.seguirComprando}
        onClick={handleRedirectFactura}
      />
       <Btn
        texto="nueva compra"
        color="bg-red-700  "
        icono={Icon.nuevaCompra}
        onClick={limpiarCarrito}
      />
    </div>
    </div>
  );
}

export default Carrito;
