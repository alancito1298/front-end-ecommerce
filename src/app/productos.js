'use client';
import Link from 'next/link';
import borrarProducto from './funciones/borrarProducto';
import formatearDinero from './funciones/darFormatoDinero';
import React, { useEffect, useState } from 'react';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState(''); // Estado para el mensaje
  const [mostrarMensaje, setMostrarMensaje] = useState(false); // Estado para mostrar/ocultar mensaje

  useEffect(() => {
    // Inicializa el carrito en el localStorage
    const iniciarCarrito = () => {
      if (typeof window !== 'undefined') {
        const carrito = localStorage.getItem('carrito');
        if (!carrito) {
          localStorage.setItem('carrito', JSON.stringify([])); // Inicializa el carrito como una lista vacía
        }
      }
    };

    iniciarCarrito();

    // Cargar los productos desde la API
    const fetchProductos = async () => {
      try {
        const response = await fetch('https://back-end-artlimpieza.vercel.app/producto');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const productosJson = await response.json();

        // Convertir el objeto recibido en un array de productos
        const productosArray = Object.values(productosJson);

        // Ordenar los productos alfabéticamente por 'nombreProducto'
        const productosOrdenados = productosArray.sort((a, b) =>
          a.nombreProducto.localeCompare(b.nombreProducto)
        );
        
        setProductos(productosOrdenados); // Actualiza el estado con los productos ordenados
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const agregarProducto = (producto) => {
    if (typeof window !== 'undefined') {
      // Obtén el carrito actual del localStorage
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      // Verifica si el producto ya está en el carrito
      const productoIndex = carrito.findIndex((item) => item.id === producto.id);

      if (productoIndex > -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        carrito[productoIndex].quantity = (carrito[productoIndex].quantity || 1) + 1;
      } else {
        // Si el producto no está en el carrito, agrégalo
        carrito.push({ ...producto, quantity: 1 });
      }

      mostrarAviso('Producto agregado');
      // Guarda el carrito actualizado en el localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  };

  const eliminarProducto = async (id) => {
    const eliminado = await borrarProducto(id);
    if (eliminado) {
      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== id)
      );
      mostrarAviso('Producto eliminado');
    }
  };

  const mostrarAviso = (mensaje) => {
    setMensaje(mensaje);
    setMostrarMensaje(true); // Mostrar el mensaje
    setTimeout(() => {
      setMostrarMensaje(false); // Ocultar después de 2 segundos
    }, 2000);
  };

  return (
    <div className="bg-white pb-10 w-full flex flex-col items-center">
      <div className="w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-light tracking-tight text-indigo-900 uppercase">Productos</h2>

        <div className="mt-6 gap-x-6 gap-y-10 flex flex-col ">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <div key={producto.id} className="flex flex-col ">
                <div className="mt-0 flex justify-between items-center border-b-2 border-gray-200">
                  <div className="w-1/2">
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
                    <button
                      className="ml-2 bg-green-700 text-white px-2 py-2 rounded flex-none mr-10 w-12"
                      onClick={() => agregarProducto(producto)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="auto"
                        height="auto"
                        fill="currentColor"
                        className="bi bi-cart-plus-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-red-600">Cargando productos...</p>
          )}
        </div>
      </div>
      <Link
        className="text-center uppercase bg-indigo-500 text-white px-2 py-1 rounded block mt-0 m-auto w-1/4"
        href="/carrito"
      >
        Finalizar Compra
      </Link>
      {/* Notificación */}
      {mostrarMensaje && (
        <div className="fixed top-0 right-0 m-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
          {mensaje}
        </div>
      )}
    </div>
  );
}

export default Productos;
