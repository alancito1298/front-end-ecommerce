import { manejarAviso } from "./manejarAviso";




export function calcularTotal(carrito) {
  return carrito.reduce(
    (acumulador, producto) => acumulador + producto.precioProducto * producto.quantity,
    0
  );
}

// Asegúrate de exportar también las demás funciones que necesitas
export function aumentarCantidad(id, carrito, setCarrito, setTotalCarrito) {
  const nuevoCarrito = carrito.map((producto) =>
    producto.id === id ? { ...producto, quantity: producto.quantity + 1 } : producto
  );
  setCarrito(nuevoCarrito);
  setTotalCarrito(calcularTotal(nuevoCarrito));
}

export function disminuirCantidad(id, carrito, setCarrito, setTotalCarrito) {
  const nuevoCarrito = carrito.map((producto) =>
    producto.id === id && producto.quantity > 1
      ? { ...producto, quantity: producto.quantity - 1 }
      : producto
  );
  setCarrito(nuevoCarrito);
  setTotalCarrito(calcularTotal(nuevoCarrito));
}

export function eliminarProducto(id, carrito, setCarrito, setTotal) {
  const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
  setCarrito(nuevoCarrito);
  actualizarLocalStorage(nuevoCarrito);
  setTotal(calcularTotal(nuevoCarrito));
 
}

export function actualizarLocalStorage(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}



