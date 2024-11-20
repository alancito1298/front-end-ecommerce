'use client';

import React, { useEffect, useState } from 'react';
import { obtenerProductos, actualizarPrecioProducto, eliminarProducto } from './utils/api';
import { ordenarProductosPorNombre } from './utils/ordenamiento';
import ProductosLista from './components/ProductosLista';
import EditarProductoModal from './components/EditarProductoModal';
import Notificacion from './components/Notificacion';

const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [productoEditando, setProductoEditando] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosArray = await obtenerProductos();
        setProductos(ordenarProductosPorNombre(productosArray));
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProductos();
  }, []);

  const mostrarAviso = (mensaje) => {
    setMensaje(mensaje);
    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 2000);
  };

  const actualizarProducto = async (productoId, nuevoPrecio) => {
    try {
      await actualizarPrecioProducto(productoId, nuevoPrecio);
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.productoId === productoId ? { ...producto, precioProducto: nuevoPrecio } : producto
        )
      );
      setProductoEditando(null);
      mostrarAviso('Producto actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  const eliminarProductoHandler = async (productoId) => {
    try {
      await eliminarProducto(productoId);
      setProductos((prevProductos) => prevProductos.filter((producto) => producto.productoId !== productoId));
      mostrarAviso('Producto eliminado');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombreProducto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-white flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-light tracking-tight text-indigo-900 uppercase">Administrar Productos</h2>

        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="mt-4 w-full p-2 border rounded text-indigo-700"
          aria-label="Buscar producto"
        />

        <ProductosLista
          productos={productosFiltrados}
          onEditar={setProductoEditando}
          onEliminar={eliminarProductoHandler}
        />
      </div>

      {productoEditando && (
        <EditarProductoModal
          producto={productoEditando}
          onClose={() => setProductoEditando(null)}
          onActualizar={(nuevoPrecio) =>
            actualizarProducto(productoEditando.productoId, nuevoPrecio)
          }
        />
      )}

      {mostrarMensaje && <Notificacion mensaje={mensaje} />}
    </div>
  );
};

export default ProductosAdmin;
