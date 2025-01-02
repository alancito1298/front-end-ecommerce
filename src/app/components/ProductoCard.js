import React from 'react';
import BtnSecundario from './BtnSecundario';
import Icon from '../icon/icons';
import formatearDinero from '../utils/darFormatoDinero';

const ProductCard = ({ producto, agregarProducto }) => (
  <div className="flex flex-col">
    <div className="mt-0 px-2 flex justify-between items-center border-b-2 border-gray-200">
      <div className="w-full">
        <h3 className="text-xl m-4 p-0 flex-initial w-auto uppercase text-indigo-950">
          {producto.nombreProducto || 'Sin nombre'}
        </h3>
        <p className="mt-1 m-6 text-sm text-indigo-400">{producto.detalleProducto}</p>
        <p className="text-sm font-medium m-4 text-red-900 w-10">
          <small className="m-1">$</small>
          {formatearDinero(producto.precioProducto)}
        </p>
      </div>
      <div className="flex flex-col items-center justify-start m-0">
        <BtnSecundario
          color="bg-green-800 white"
          icono={Icon.agregar}
          onClick={() => agregarProducto(producto)}
        />
      </div>
    </div>
  </div>
);

export default ProductCard;
