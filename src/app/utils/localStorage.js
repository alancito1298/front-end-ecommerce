'use client';
export const iniciarCarrito = (setCarrito) => {
    if (typeof window !== 'undefined') {
      const carritoStorage = localStorage.getItem('carrito');
      if (!carritoStorage) {
        localStorage.setItem('carrito', JSON.stringify([]));
      } else {
        setCarrito(JSON.parse(carritoStorage));
      }
    }
  };
  