// utils/calculoUtils.js
export const obtenerSubtotal = (producto) => producto.precioProducto * producto.quantity;

export const calcularTotal = (carrito) =>
  carrito.reduce((acc, producto) => acc + producto.precioProducto * producto.quantity, 0);
