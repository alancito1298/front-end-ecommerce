'use client';
import React, { useEffect, useState } from 'react';
import Busqueda from './components/Busqueda';
import ProductosListaHome from './components/ProductosListaHome';
import BtnFlotante from './components/BtnFlotante';
import Aviso from './components/Aviso';

import Icon from './icon/icons';




  function Productos() {
    const [productos, setProductos] = useState([]);
    const [mensajeAviso, setMensajeAviso] = useState('');
    const [mostrarAviso, setMostrarAviso] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [productosOriginales, setProductosOriginales] = useState([]);
    const [colorAviso, setColorAviso] = useState('');
  
    // Lógica para filtrar productos
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
    const manejarAviso = (mensaje, color) => {
      setMensajeAviso(mensaje);
      setColorAviso(color);
      setMostrarAviso(true);
      setTimeout(() => setMostrarAviso(false), 3000); // Ocultar aviso después de 3 segundos
    };
  
  
    // Fetch de productos
    useEffect(() => {
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
  
    // Función para agregar productos al carrito
    const agregarProducto = (producto) => {
      if (typeof window !== 'undefined') {
        let carrito;
        try {
          carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        } catch (error) {
          console.error('Error al analizar el carrito de localStorage:', error);
          carrito = [];
        }
    
        const productoIndex = carrito.findIndex((item) => item.id === producto.id);
    
        if (productoIndex > -1) {
          carrito[productoIndex].quantity = (carrito[productoIndex].quantity || 1) + 1;
        } else {
          carrito.push({ ...producto, quantity: 1 });
        }
    
        // Actualizar el carrito en localStorage
        try {
          localStorage.setItem('carrito', JSON.stringify(carrito));
          manejarAviso('Producto agregado', 'bg-green-500');
        } catch (error) {
          console.error('Error al guardar el carrito en localStorage:', error);
          manejarAviso('No se pudo agregar el producto', 'bg-red-500');
        }
      }
    };
  
    return (
      <div className="bg-white pb-10  flex flex-col items-center pt-24">
        <Busqueda busqueda={busqueda} handleChange={handleChange} />
        <ProductosListaHome productos={productos} agregarProducto={agregarProducto} />
        <BtnFlotante
        texto="Finalizar Compra" 
        color="bg-green-700" 
        onClick={() => (window.location.href = '/carrito')}
        icono={Icon.FinalizarCompra}
        
   />
        <Aviso
        mensaje={mensajeAviso}
        color={colorAviso}
        mostrar={mostrarAviso}
        onClose={() => setMostrarAviso(false)}
      />
      </div>
    );
  }
  
  export default Productos;