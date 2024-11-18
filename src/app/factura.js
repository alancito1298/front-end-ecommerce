// Factura.js
'use client';
import React, { useEffect, useState, useRef } from 'react';
import formatearDinero from './utils/darFormatoDinero';
import Btn from './components/Btn';
import Icon from './icon/icons';

import { iniciarCarrito } from './utils/localStorage';
import { obtenerSubtotal, calcularTotal } from './utils/calculoUtils';
import { descargarImagen, compartirFactura } from './utils/exportUtils';

function Factura() {
  const [carrito, setCarrito] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const facturaRef = useRef(null);

  useEffect(() => {
    iniciarCarrito(setCarrito);
  }, []);

  useEffect(() => {
    setTotalCarrito(calcularTotal(carrito));
  }, [carrito]);

  const handleRedirect = () => {
    window.location.href = '/carrito';
  };

  return (
    <div className='bg-red-100'>
      <div className="mx-auto w-full h-vw max-w-7xl">
        <div className="flex flex-col items-center w-full">
          <div className="bg-gray-100 shadow-md rounded overflow-hidden w-full">
            <div ref={facturaRef}>
              <table className="w-full">
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
              <Btn
                texto="Compartir Factura"
                color="bg-blue-700 w-auto"
                icono={Icon.compartir}
                onClick={() => compartirFactura(facturaRef)}
              />
              <Btn
                texto="Volver a carrito"
                color="bg-indigo-700"
                icono={Icon.volver}
                onClick={handleRedirect}
              />
              <Btn
                texto="Descargar Factura"
                color="bg-green-700"
                icono={Icon.descargar}
                onClick={() => descargarImagen(facturaRef)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Factura;
