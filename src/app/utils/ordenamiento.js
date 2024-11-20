/**
 * Ordenar productos por nombre.
 * @param {Array} productos - Lista de productos.
 * @returns {Array} Productos ordenados.
 */
 export const ordenarProductosPorNombre = (productos) => {
    return productos.sort((a, b) => a.nombreProducto.localeCompare(b.nombreProducto));
  };