'use cliente'
import React from 'react';
import BtnSecundario from './Btn-secundario';
import Icon from '../icon/icons';
import { aumentarCantidad, disminuirCantidad, eliminarProducto, calcularTotal } from '../utils/carritoUtils'
import formatearDinero from '../utils/darFormatoDinero'


const ProductoEnCarrito = ({ producto, onAumentar, onDisminuir, onEliminar }) => {
  const subTotal = formatearDinero(producto.precioProducto * producto.quantity);

return(
  <div className="flex flex-row items-center justify-between gap-7 border p-4 rounded-md shadow-md bg-gray-100 w-full my-2 ">
    <div>
      <h3 className='font-medium text-xl uppercase text-black'>{producto.nombreProducto}</h3>
      <p className='text-indigo-600 text-sm font-light'>{producto.detalleProducto}</p>
      <p className='text-indigo-600 text-sm font-light' >Cantidad: <strong className='font-bold bg-indigo-800 p-1 rounded-xl text-white'>{producto.quantity}</strong></p>
      <p className='text-indigo-600'>Subtotal:  $<smaller className='font-normal text-red-600 text-light'>{subTotal}</smaller></p>
    </div>
    <div className='flex flex-col gap-2'>
      <BtnSecundario color="bg-red-400" icono={Icon.disminuir} onClick={() => onDisminuir(producto.id)} />
      <BtnSecundario color="bg-red-800" icono={Icon.eliminar} onClick={() => onEliminar(producto.id)} />
      <BtnSecundario color="bg-green-600" icono={Icon.aumentar} onClick={() => onAumentar(producto.id)} />
    </div>
  </div>
);};

export default ProductoEnCarrito;
