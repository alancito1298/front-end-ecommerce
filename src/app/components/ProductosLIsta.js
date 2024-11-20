import React from 'react';
import BtnSecundario from './Btn-secundario';
import Icon from '../icon/icons';
import formatearDinero from '../utils/darFormatoDinero';

const ProductosLista = ({ productos, onEditar, onEliminar }) => {
  return (
    <div className="mt-6 gap-x-6 gap-y-10 flex flex-col">
      {productos.length > 0 ? (
        productos.map((producto) => (
          <div key={producto.productoId} className="flex flex-col">
            <div className="mt-0 flex justify-around items-center border-b-2 border-gray-200">
              <div className="w-full">
                <h3 className="text-xl m-4 p-0 uppercase text-indigo-950">
                  {producto.nombreProducto || 'Sin nombre'}
                </h3>
                <p className="mt-1 m-6 text-sm text-indigo-400">{producto.detalleProducto}</p>
                <p className="text-sm font-medium text-red-900 mr-1 ml-4 w-10">
                  <small className="m-1">$</small>{formatearDinero(producto.precioProducto)}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-center justify-start m-0">
                <BtnSecundario
                  color="bg-red-500"
                  icono={Icon.eliminar}
                  onClick={() => onEliminar(producto.productoId)}
                  aria-label="Eliminar producto"
                />
                <BtnSecundario
                  color="bg-yellow-400"
                  icono={Icon.editar}
                  onClick={() => onEditar(producto)}
                  aria-label="Editar producto"
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-indigo-900">No hay productos que coincidan con la búsqueda.</p>
      )}
    </div>
  );
};

export default ProductosLista;
