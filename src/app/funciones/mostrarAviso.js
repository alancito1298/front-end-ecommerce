const mostrarAviso = (mensaje) => {
    setMensaje(mensaje);
    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 2000);
  };

  export default mostrarAviso;