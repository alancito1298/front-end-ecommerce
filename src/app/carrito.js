'use client';
import React, { useState, useEffect } from 'react';
import formatearDinero from "./funciones/darFormatoDinero"
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
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Carrito de Compras</h2>

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
                    <button
                      className="ml-2 bg-red-600 text-white px-2 h-10 w-10 py-1 rounded"
                      onClick={() => disminuirCantidad(producto.id)}
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"/>
                    </svg>
                    </button>
                    <button
                      className="ml-2 bg-gray-600 px-2 py-1 h-10 w-10 rounded"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                    <button
                      className="ml-2 bg-green-600 text-white px-2 w-10 h-10 py-1 rounded"
                      onClick={() => aumentarCantidad(producto.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                      </svg>
                    </button>
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
          
          <div className='flex flex-col items-end p-4 pt-0 text-xl'>
            
          <a href='/productos' className='bg-white border-2 text-center justify-center items-center border-green-600 p-2 m-1 flex h-10 w-auto flex-row gap-1 uppercase rounded-md text-green-600 cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-0 p-0 w-auto h-1/1" class="bi bi-bag-plus" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5"/>
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
          </svg>
          Seguir comprando</a>
          
          <a href='/resumen' className='bg-white border-2 text-center justify-center items-center border--600 p-2 m-1 flex h-10 w-auto flex-row gap-1 uppercase rounded-md text-indigo-600 cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-0 p-0 w-auto h-1/1" class="bi bi-bag-check" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
            </svg>
          Finalizar compra</a>
        <br></br>
          <a onClick={limpiarCarrito} className='bg-red-500 p-2  m-1 flex h-10 w-auto flex-row gap-1 uppercase rounded-md text-white text-center justify-center items-center cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-0 p-0 w-auto h-1/1" class="bi bi-bag" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
              </svg>
              Nueva Compra</a>
          </div>
    </div>
  );
}

export default Carrito;
