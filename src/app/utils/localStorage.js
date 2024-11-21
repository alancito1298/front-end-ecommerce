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
  
// Obtiene el carrito desde localStorage
export function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Actualiza el carrito en localStorage
export function actualizarCarritoLocalStorage(nuevoCarrito) {
  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
}

// Vacía el carrito de localStorage
export function vaciarCarritoLocalStorage() {
  localStorage.removeItem('carrito');
}