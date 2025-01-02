export function calcularTotal(carrito) {
  return carrito.reduce(
    (acumulador, producto) =>
      acumulador + producto.precioProducto * (producto.quantity || 1),
    0
  );
}

// Aumentar cantidad de un producto
export function aumentarCantidad(id, carrito, setCarrito, setTotalCarrito) {
  const nuevoCarrito = carrito.map((producto) =>
    producto.id === id
      ? { ...producto, quantity: (producto.quantity || 1) + 1 }
      : producto
  );
  setCarrito(nuevoCarrito);
  setTotalCarrito(calcularTotal(nuevoCarrito));
  actualizarLocalStorage(nuevoCarrito); // Actualiza el localStorage
}

// Disminuir cantidad de un producto
export function disminuirCantidad(id, carrito, setCarrito, setTotalCarrito) {
  const nuevoCarrito = carrito
    .map((producto) =>
      producto.id === id && producto.quantity > 1
        ? { ...producto, quantity: producto.quantity - 1 }
        : producto
    )
    .filter((producto) => producto.quantity > 0); // Elimina productos con cantidad 0
  setCarrito(nuevoCarrito);
  setTotalCarrito(calcularTotal(nuevoCarrito));
  actualizarLocalStorage(nuevoCarrito); // Actualiza el localStorage
}

// Eliminar producto del carrito
export function eliminarProducto(id, carrito, setCarrito, setTotal) {
  const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
  setCarrito(nuevoCarrito);
  setTotal(calcularTotal(nuevoCarrito));
  actualizarLocalStorage(nuevoCarrito); // Actualiza el localStorage
}

// Actualizar localStorage
export function actualizarLocalStorage(carrito) {
  try {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  } catch (error) {
    console.error('Error al actualizar localStorage:', error);
  }
}
