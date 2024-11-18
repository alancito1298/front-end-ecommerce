const iniciarCarrito = () => {
    const carrito = localStorage.getItem('carrito');
    if (!carrito) {
      localStorage.setItem('carrito', JSON.stringify([])); // Inicializa el carrito como una lista vacía
    }
  };
  iniciarCarrito();



const agregarProducto = (producto) => {
    // Obtén el carrito actual del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    // Verifica si el producto ya está en el carrito
    const productoIndex = carrito.findIndex(item => item.id === producto.id);
  
    if (productoIndex > -1) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      carrito[productoIndex].quantity = (carrito[productoIndex].quantity || 1) + 1;
    } else {
      // Si el producto no está en el carrito, agrégalo
      carrito.push({ ...producto, quantity: 1 });
    }
  
    // Guarda el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito))}



    export default agregarProducto;