import React from 'react';
import ProductoCard from './ProductoCard';

const ProductosLista = ({ productos, agregarProducto }) => (
  <div className="mt-6 gap-x-2 w-full px-4 flex flex-col">
    {productos.length > 0 ? (
      productos.map((producto) => (
        <ProductoCard key={producto.id} producto={producto} agregarProducto={agregarProducto} />
      ))
    ) : (
      <p className="text-center text-red-600">Cargando productos...</p>
    )}
  </div>
);

export default ProductosLista;
