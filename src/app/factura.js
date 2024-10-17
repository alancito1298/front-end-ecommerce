'use client';
import React, { useEffect, useState } from 'react';
import formatearDinero from './funciones/darFormatoDinero';


function Factura() {
  const [carrito, setCarrito] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState(0);
  useEffect(() => {
    // Inicializa el carrito en el localStorage
    const iniciarCarrito = () => {
      if (typeof window !== 'undefined') {
        const carritoStorage = localStorage.getItem('carrito');
        if (!carritoStorage) {
          localStorage.setItem('carrito', JSON.stringify([])); // Inicializa el carrito como una lista vacía
        } else {
          setCarrito(JSON.parse(carritoStorage)); // Carga el carrito desde localStorage
        }
      }
    };
    iniciarCarrito();
  }, []);

  const obtenerSubtotal = (producto) => {
    return producto.precioProducto * producto.quantity;
  };


  useEffect(() => {
    calcularTotal(carrito); // Calcula el total del carrito
  }, [carrito]);

  const calcularTotal = (carritoActual = []) => {
    const total = carritoActual.reduce(
      (acc, producto) => acc + producto.precioProducto * producto.quantity,
      0
    );
    setTotalCarrito(total); // Actualiza el total del carrito
  };

  return (
    <div >
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl ">
        {/* Component */}
        <div className="flex flex-col items-center w-full">
          {/* Heading Content */}
          

         
            {/* Tabla de productos */}
            <div className="bg-gray-100 shadow-md rounded overflow-hidden w-full ">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th colSpan="1" className=" pl-2 text-start uppercase text-white bg-indigo-600 font-light text-sm w-full">
                      Producto
                    </th>
                    <th colSpan="1" className="p-0 py-2 text-center uppercase text-white bg-indigo-600 font-light text-sm w-full">
                      
                    </th>
                    <th colSpan="1" className="p-0 py-2 text-center uppercase text-white bg-indigo-600 font-light text-sm w-full">
                    c/dad
                    </th>
                    <th colSpan="1" className="p-0 py-2 text-center uppercase text-white bg-indigo-600 font-light  text-sm w-full">
                    $u
                    </th>
                    <th colSpan="1" className="p-0 py-2 text-center uppercase text-white bg-indigo-600 font-light text-sm w-full">
                    precio
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((producto) => (
                    <tr
                      key={producto.id}
                      className="border-b border-gray-300"
                    >
                      <td className="py-1  pl-2 text-indigo-900 uppercase">{producto.nombreProducto}<br></br><small className='text-sm lowercase text-indigo-500'>{producto.detalleProducto}</small></td>
                      <td></td>
                      <td className="p-0 pr-3 text-gray-900">
                        <strong className="text-indigo-600">{producto.quantity}</strong>
                      </td>
                      <td className="p-2 text-green-900 text-sm"><small>${formatearDinero(producto.precioProducto)}</small></td>
                      <td className="p-2 text-gray-900 text-sm">
                        <strong className="text-indigo-600">${formatearDinero(obtenerSubtotal(producto))}</strong>
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
               
              </table>
              <footer className='bg-green-600 flex flex-row items-center justify-around w-full'>
                <input className="rounded-xl m-1 p-2 text-black font-semibold bg-green-100 " placeholder='cliente'></input>
                <div className='uppercase font-light text-sm' >total</div>
                <div className= 'font-bold'>${formatearDinero(totalCarrito)}</div>
                </footer>
                <a href='/carrito' className='w-1/2 bg-indigo-400 block m-auto my-4 p-auto text-center rounded-l focus-none'> ←volver al carrito</a>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Factura;
