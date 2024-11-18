'use client';
import Link from 'next/link';
import borrarProducto from './utils/borrarProducto';
import formatearDinero from './utils/darFormatoDinero';
import React, { useEffect, useState } from 'react';
import  Icon  from "./icon/icons"
import BtnSecundario from "./components/Btn-secundario"

function Productos() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState(''); // Estado para el mensaje
  const [mostrarMensaje, setMostrarMensaje] = useState(false); // Estado para mostrar/ocultar mensaje
  const [busqueda, setBusqueda] = useState(""); 
  const [productosOriginales, setProductosOriginales] = useState([]);

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
        if (!response.ok) throw new Error('Error al obtener los productos');
        
        const productosJson = await response.json();
        const productosArray = Object.values(productosJson).sort((a, b) =>
          a.nombreProducto.localeCompare(b.nombreProducto)
        );
        
        setProductos(productosArray);
        setProductosOriginales(productosArray); // Guarda una copia de la lista original
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


  const handleChange = (e) => {
    const valorBusqueda = e.target.value;
    setBusqueda(valorBusqueda);
    filtrado(valorBusqueda);
  };

  const filtrado = (busquedaActual) => {
    if (!busquedaActual) {
      setProductos(productosOriginales); // Restaura la lista original si no hay búsqueda
    } else {
      const resultadoBusqueda = productosOriginales.filter((producto) =>
        producto.nombreProducto.toLowerCase().includes(busquedaActual.toLowerCase())
      );
      setProductos(resultadoBusqueda);
    }
  };

  return (
    <div className="bg-white pb-10 w-full flex flex-col items-center">
      <div className="w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-light tracking-tight text-indigo-900 uppercase">Productos</h2>
        <div class="flex justify-center p-4">
    <div class="relative w-full max-w-md">
        <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={handleChange}
            className="w-full p-3 pl-10 pr-4 border text-indigo-800 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <svg
            class="absolute left-3 top-3 w-5 h-5 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
        </svg>
    </div>
</div>
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
                  
                           <BtnSecundario
                    
                          color="bg-green-800 white"
                          icono={Icon.agregar}
                          onClick={() => agregarProducto(producto)}/>
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
        className="text-center uppercase bg-indigo-600  px-2 py-1  block mt-0 m-auto w-1/4 fixed bottom-4 right-4  text-white p-4 rounded-l shadow-lg hover:bg-blue-600 focus:outline-none"
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
