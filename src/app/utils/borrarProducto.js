const borrarProducto = async (id) => {
  try {
    const response = await fetch(`https://artlimpieza-back-4tzgk8uo8-alancito1298s-projects.vercel.app/producto/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }

    // Si el producto se elimina correctamente en el servidor, también se elimina del estado local
    /*setProductos((prevProductos) =>
      prevProductos.filter((producto) => producto.id !== id)
    );*/

    console.log(`Producto con ID ${id} eliminado exitosamente`);
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    alert('Hubo un error al intentar eliminar el producto.');
  }
  
};
export default borrarProducto;