const API_BASE_URL = 'https://back-end-artlimpieza.vercel.app/producto';

/**
 * Obtener todos los productos desde el backend.
 * @returns {Promise<Array>} Lista de productos.
 */
export const obtenerProductos = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error('Error al obtener los productos');
  const productosJson = await response.json();

  return Object.keys(productosJson).map((key) => ({
    ...productosJson[key],
    productoId: key,
  }));
};

/**
 * Actualizar el precio de un producto.
 * @param {string} productoId - ID del producto.
 * @param {number} nuevoPrecio - Nuevo precio del producto.
 */
export const actualizarPrecioProducto = async () => {
  try {
    const response = await fetch(`https://back-end-artlimpieza.vercel.app/producto/${productoEditando.productoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ precioProducto: parseInt(precioNuevo) }),
    });

    if (response.ok) {
      const productosActualizados = productos.map((p) =>
        p.productoId === productoEditando.productoId ? { ...p, precioProducto: parseInt(precioNuevo) } : p
      );
      setProductos(productosActualizados);
      setProductoEditando(null);
      mostrarAviso('Precio actualizado correctamente');
    } else {
      console.error('Error al actualizar el precio');
    }
  } catch (error) {
    console.error('Error al enviar el precio:', error);
  }
};

/**
 * Eliminar un producto.
 * @param {string} productoId - ID del producto a eliminar.
 */
export const eliminarProducto = async (productoId) => {
  const response = await fetch(`${API_BASE_URL}/${productoId}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar el producto');
};
