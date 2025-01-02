'use client';
import React from 'react';
import Btn from './Btn.js';
import Icon from '../icon/icons'; 
import formatearDinero from '../utils/darFormatoDinero';

const ResumenCarrito = ({ total, onNuevaCompra, onSeguirComprando, onFinalizarCompra }) => (<>
  <span className='flex flex-row items-center justify-between bg-indigo-200 w-4/5 rounded-lg uppercase p-3 my-5 text-indigo-800'>
  <p>Total</p>
  <p className='bg-white rounded-lg p-2 font-bold text-red-700'>${formatearDinero(total)}</p>
  </span>
  
  <div className="flex flex-col items-center gap-4 p-auto pt-0 text-xl mt-3">
    <Btn texto="Seguir Comprando"   icono={Icon.seguirComprando} color="bg-green-700" onClick={onSeguirComprando} />
    <Btn texto="Finalizar Compra"   icono={Icon.FinalizarCompra} color="bg-indigo-700" onClick={onFinalizarCompra} />
    <Btn texto="Nueva Compra"  icono={Icon.nuevaCompra} color="bg-red-700" onClick={onNuevaCompra} />
  </div>
</>
);

export default ResumenCarrito;
