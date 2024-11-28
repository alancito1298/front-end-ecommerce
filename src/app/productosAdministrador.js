'use client';

import React, { useEffect, useState } from 'react';
import { obtenerProductos, actualizarPrecioProducto, eliminarProducto } from './utils/api';
import { ordenarProductosPorNombre } from './utils/ordenamiento';
import ProductosLista from './components/ProductosLista';
import EditarProductoModal from './components/EditarProductoModal';
import Aviso from './components/Aviso';


const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [mensajeAviso, setMensajeAviso] = useState(''); // Mensaje del aviso
  const [colorAviso, setColorAviso] = useState(''); // Color del aviso
  const [mostrarAviso, setMostrarAviso] = useState(false); // Control de visibilidad del aviso
  const [busqueda, setBusqueda] = useState('');
  const [productoEditando, setProductoEditando] = useState(null);

  // Obtener productos al cargar el componente
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

  // Función para mostrar el aviso
  const manejarAviso = (mensaje, color) => {
    setMensajeAviso(mensaje);
    setColorAviso(color);
    setMostrarAviso(true);
    setTimeout(() => setMostrarAviso(false), 3000); // Ocultar aviso después de 3 segundos
  };

  // Actualizar el precio de un producto
  const actualizarProducto = async (id, nuevoPrecio) => {
    try {
      await actualizarPrecioProducto(id, nuevoPrecio);
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.id === id ? { ...producto, precioProducto: nuevoPrecio } : producto
        )
      );
      setProductoEditando(null);
      manejarAviso('Producto Actualizado', 'bg-indigo-500');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      manejarAviso('Error al actualizar producto', 'bg-red-500');
    }
  };

  
  // Eliminar un producto
  const eliminarProductoHandler = async (productoId) => {
    try {
      await eliminarProducto(productoId);
      setProductos((prevProductos) => prevProductos.filter((producto) => producto.productoId !== productoId));
      manejarAviso('Producto Eliminado', 'bg-red-500');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      manejarAviso('Error al eliminar producto', 'bg-red-500');
    }
  };

  // Filtrar productos por búsqueda
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

      <Aviso
        mensaje={mensajeAviso}
        color={colorAviso}
        mostrar={mostrarAviso}
        onClose={() => setMostrarAviso(false)}
      />
    </div>
  );
};

export default ProductosAdmin;
