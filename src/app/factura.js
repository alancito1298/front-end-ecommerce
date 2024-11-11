'use client';
import React, { useEffect, useState, useRef } from 'react';
import formatearDinero from './funciones/darFormatoDinero';
import html2canvas from 'html2canvas';

function Factura() {
  const [carrito, setCarrito] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const facturaRef = useRef(null); 

  useEffect(() => {
    const iniciarCarrito = () => {
      if (typeof window !== 'undefined') {
        const carritoStorage = localStorage.getItem('carrito');
        if (!carritoStorage) {
          localStorage.setItem('carrito', JSON.stringify([]));
        } else {
          setCarrito(JSON.parse(carritoStorage));
        }
      }
    };
    iniciarCarrito();
  }, []);

  const obtenerSubtotal = (producto) => producto.precioProducto * producto.quantity;

  useEffect(() => {
    calcularTotal(carrito);
  }, [carrito]);

  const calcularTotal = (carritoActual = []) => {
    const total = carritoActual.reduce(
      (acc, producto) => acc + producto.precioProducto * producto.quantity,
      0
    );
    setTotalCarrito(total);
  };

  const descargarImagen = async () => {
    if (facturaRef.current) {
      const canvas = await html2canvas(facturaRef.current);
      const imagenURL = canvas.toDataURL('image/png');
      const enlace = document.createElement('a');
      enlace.href = imagenURL;
      enlace.download = 'factura.png';
      enlace.click();
    }
  };

  const compartirFactura = async () => {
    if (navigator.share && facturaRef.current) {
      const canvas = await html2canvas(facturaRef.current);
      const imagenURL = canvas.toDataURL('image/png');

      const response = await fetch(imagenURL);
      const blob = await response.blob();
      const archivo = new File([blob], 'factura.png', { type: 'image/png' });

      try {
        await navigator.share({
          title: 'Factura',
          text: 'Aquí tienes la factura de tu compra.',
          files: [archivo],
        });
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      alert("La funcionalidad de compartir no está soportada en este navegador.");
    }
  };

  return (
    <div className='bg-red-100'>
      <div className="mx-auto w-full h-vw max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="bg-gray-100 shadow-md rounded overflow-hidden w-full">
            <div ref={facturaRef}>
            <table className="w-full"  >
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="pl-2 text-start uppercase text-white bg-indigo-600 font-light text-sm w-full">Producto</th>
                  <th className="p-0 py-2 text-center uppercase text-white bg-indigo-600 font-light text-sm w-full"></th>
                  <th className="p-0 py-2 text-center uppercase text-white bg-indigo-600 font-light text-sm w-full">c/dad</th>
                  <th className="p-0 py-2 text-center uppercase text-white bg-indigo-600 font-light text-sm w-full">$u</th>
                  <th className="p-0 py-2 text-center uppercase text-white bg-indigo-600 font-light text-sm w-full">precio</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((producto) => (
                  <tr key={producto.id} className="border-b border-gray-300">
                    <td className="py-1 text-sm pl-2 text-indigo-900 uppercase">{producto.nombreProducto}<br /><small className='text-sm lowercase text-indigo-500'>{producto.detalleProducto}</small></td>
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
              <input className="rounded-xl m-1 p-2 text-black font-semibold bg-green-100" placeholder='cliente'></input>
              <div className='uppercase font-light text-sm'>total</div>
              <div className='font-bold'>${formatearDinero(totalCarrito)}</div>
            </footer>
            </div>
          <div className='flex flex-col items-center gap-3 m-6'>
            <a href='/carrito' className='ml-2 h-12 bg-indigo-500 text-white p-0 gap-2 uppercase px-3 rounded flex flex-row items-center justify-start w-56'>← volver al carrito</a>
            <button onClick={descargarImagen} className='ml-2 h-12 bg-green-500 text-white p-0 gap-2 uppercase px-3 rounded flex flex-row items-center justify-start w-56'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="auto" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0"/>
            </svg>
            Descargar Factura
            </button>
            <button onClick={compartirFactura} className='ml-2 h-12 bg-blue-500 text-white p-0 gap-2 uppercase px-3 rounded flex flex-row items-center justify-start w-56'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="auto" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
              <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
            </svg>
            Compartir Factura
            </button>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Factura;
